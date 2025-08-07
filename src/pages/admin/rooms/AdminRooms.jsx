import React, { useEffect, useState } from "react";
import CommonPanel from "../Components/CommonPanel.jsx";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead, TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ayu from "../../receptionist/doctors/doctors.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import addIcon from "../../../assets/plus.svg";
import styles from "../../receptionist/styles.module.scss";
import Grid from "@mui/material/Grid2";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addRoom,
  deleteRoom, getFilteredRooms,
  updateRoom,
} from "../../../components/State/Admin/Action.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";

const AdminRooms = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);
  const [errors, setErrors] = useState({}); // Added error state

  const [anchorEl, setAnchorEl] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addDialogOpen1, setAddDialogOpen1] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const roomTypes = ["Available", "Occupied", "Under Maintenance"];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // State for editing room
  const [editedRoom, setEditedRoom] = useState({
    roomID: "",
    name: "",
    assignedDoctor: "",
    status: "",
    originalRoomID: "",
  });

  // Handle Edit Action
  const handleEdit = () => {
    if (selectedRoom) {
      setEditedRoom({
        roomID: selectedRoom.roomID,
        name: selectedRoom.name,
        assignedDoctor: selectedRoom.assignedDoctor._id,
        status: selectedRoom.status,
        originalRoomID: selectedRoom._id,
      });
      setEditDialogOpen(true);
    }
    handleMenuClose();
  };

  const handleSaveEditedRoom = () => {
    let newErrors = {};

    Object.keys(editedRoom).forEach((key) => {
      if (!editedRoom[key]) {
        newErrors[key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all required fields!", {
        position: "bottom-right",
      });
      return;
    }

    dispatch(updateRoom(editedRoom.originalRoomID, editedRoom));
    setErrors({});
    setEditDialogOpen(false);
  };

  // Handle Menu Open
  const handleMenuOpen = (event, room) => {
    event.stopPropagation(); // Prevent interference with other clicks
    setAnchorEl(event.currentTarget);
    setSelectedRoom(room);
  };

  // Handle Menu Close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRoom(null);
  };

  // Handle Delete Action
  const handleDelete = () => {
    dispatch(deleteRoom(selectedRoom._id));
    handleMenuClose();
  };

  // Handle Edit Dialog Close
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleAddDialogOpen = () => setAddDialogOpen(true);
  const handleAddDialogOpen1 = (room) => {
    setAddDialogOpen1(true);
    setCurrentRoom(room);
  };
  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  const handleSubmit = () => {
    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (key !== "beds" && !formData[key]) {
        newErrors[key] = "This field is required";
      }
    });

// // Validate each bed
//     formData.beds.forEach((bed, i) => {
//       if (!bed.bedId) newErrors[`bedId-${i}`] = "Bed ID is required";
//       if (!bed.status) newErrors[`status-${i}`] = "Status is required";
//       if (!bed.cost) newErrors[`cost-${i}`] = "Cost is required";
//     });
//
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       toast.error("Please fill all required fields!", {
//         position: "bottom-right",
//       });
//       return;
//     }

    // Convert customRoomType into roomType before sending
    const finalData = {
      ...formData,
      roomType:
          formData.roomType === "custom"
              ? formData.customRoomType
              : formData.roomType,
    };
    delete finalData.customRoomType;

    // console.log("To: ",finalData)
    dispatch(addRoom(finalData));
    setErrors({});
    setAddDialogOpen(false);
  };

  const [formData, setFormData] = useState({
    roomID: "",
    name: "",
    roomType: "",
    doctorId: "",
    beds: [
      {
        bedId: "",
        status: "",
        cost: ""
      }
    ]
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBedChange = (index, key, value) => {
    const updatedBeds = [...formData.beds];
    updatedBeds[index][key] = value;
    setFormData({ ...formData, beds: updatedBeds });
  };

  const handleAddBed = () => {
    setFormData({
      ...formData,
      beds: [...formData.beds, { bedId: "", status: "", cost: "" }],
    });
  };

  const handleRemoveBed = (index) => {
    const updatedBeds = [...formData.beds];
    updatedBeds.splice(index, 1);
    setFormData({ ...formData, beds: updatedBeds });
  };



  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFilteredRooms(page, rowsPerPage))
  }, [dispatch, page, rowsPerPage]);

  const navigate = useNavigate();

  const rooms = useSelector((state) => state.admin.filteredRooms);
  const totalRooms = useSelector((state) => state.admin.totalFilteredRooms);
  const loading = useSelector((state) => state.admin.isLoading);
  // const rooms = undefined;
  const doctors = useSelector((state) => state.admin.doctors);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };


  return (
    <div
      style={{
        background: "#f1f1f1",
        height: "99dvh", // Make the entire div take up the full viewport height
        overflow: "hidden", // Prevent scrolling on the rest of the page
      }}
    >
      <div
        style={{
          position: "fixed",
          top: "0px",
          padding: "10px",
          width: "77%",
          background: " #F1F1F1",
          zIndex: 100,
        }}
      >
        <CommonPanel />
      </div>
      <div style={{ marginTop: "160px" }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh", // or full height you need
            }}
          >
            <CircularProgress sx={{ color: "#25307F" }} size={58} />
          </Box>
        ) : (
          <>
            <Box
              sx={{
                borderBottom: "1px solid #87878782",
                paddingBottom: 0.5,
                marginBottom: 1,
              }}
            >
              <div
                className={ayu.headerContainer}
                style={{ justifyContent: "space-between" }}
              >
                <div style={{ display: "flex" }}>
                  <span
                    onClick={() => navigate(-1)}
                    style={{
                      transform: "translateY(8px)",
                      color: "black",
                      cursor: "pointer",
                    }}
                  >
                    <ArrowBackIosIcon />
                  </span>
                  <h2 className={ayu.departmentTitle}>Total Rooms:</h2>
                  <h2 className={ayu.departmentTitleDetails}>{totalRooms}</h2>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <Box sx={{ display: "flex", gap: 3 }}>
                    {/* Adjust gap for spacing */}
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      sx={{ color: "black" }}
                    >
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "#3DB461",
                        }}
                      />
                      Available
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      sx={{ color: "black" }}
                    >
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "#FFA412",
                        }}
                      />
                      Occupied
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      sx={{ color: "black" }}
                    >
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "#AEC3FF",
                        }}
                      />
                      Under Maintenance
                    </Box>
                  </Box>

                  <div style={{ marginLeft: "auto" }}>
                    <Button
                      variant="contained"
                      sx={{
                        fontSize: "20px",
                        color: "#ffffff",
                        textTransform: "capitalize",
                        padding: "2px 18px",
                        backgroundColor: "#25307F",
                        boxShadow: "0px 4px 4px 0px #C2C2C240",
                        "&:hover": {
                          background: "#AEC3FF",
                        },
                      }}
                      onClick={handleAddDialogOpen} // Open modal on click
                    >
                      <img
                        src={addIcon}
                        className={styles.appointmentBlock__plusIcon}
                      />
                      Add
                    </Button>
                  </div>
                </div>
                <Dialog
                  open={addDialogOpen}
                  onClose={handleAddDialogClose}
                  maxWidth="md"
                  fullWidth
                  sx={{
                    "& .MuiDialog-paper": {
                      maxWidth: "65%", // This will reduce the max width between md and lg.
                    },
                  }}
                >
                  <DialogTitle>Add Room</DialogTitle>
                  <DialogContent>
                    <Box sx={{ width: "100%" }}>
                      {" "}
                      {/* Fix width issue */}
                      <Grid container spacing={2}>
                        <Grid xs={3}>
                          <TextField
                            autoFocus
                            margin="dense"
                            label="Room ID"
                            name="roomID"
                            value={formData.roomID}
                            onChange={handleChange}
                            type="text"
                            fullWidth
                            variant="outlined"
                            error={!!errors.roomID}
                            helperText={errors.roomID}
                            required
                          />
                        </Grid>

                        <Grid xs={3}>
                          <TextField
                              autoFocus
                              margin="dense"
                              label="Room Name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              type="text"
                              fullWidth
                              variant="outlined"
                              error={!!errors.name}
                              helperText={errors.name}
                              required
                          />
                        </Grid>

                        <Grid xs={3} sx={{ padding: 0, width: "22%" }}>
                          <FormControl
                              fullWidth
                              margin="dense"
                              error={!!errors.doctorId}
                          >
                            <InputLabel id="doctor-select-label">
                              Doctor Assigned
                            </InputLabel>
                            <Select
                                labelId="doctor-select-label"
                                id="doctor-select"
                                name="doctorId"
                                value={formData.doctorId}
                                onChange={handleChange}
                                label="Doctor Assigned"
                                variant="outlined"
                                required
                                MenuProps={{
                                  PaperProps: {
                                    sx: {
                                      maxHeight: 200, // Fixed dropdown height
                                      overflowY: "auto",
                                      "&::-webkit-scrollbar": {
                                        display: "none",
                                      },
                                      "-ms-overflow-style": "none", // IE and Edge
                                      "scrollbar-width": "none",    // Firefox
                                    },
                                  },
                                }}
                            >
                              {doctors?.map((doctor) => (
                                  <MenuItem key={doctor._id} value={doctor._id}>
                                    {doctor.name}
                                  </MenuItem>
                              ))}
                            </Select>
                            {errors.doctorId && (
                                <Typography variant="caption" color="error">
                                  {errors.doctorId}
                                </Typography>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid container spacing={2} xs={6} alignItems="center">
                          <Grid item xs={formData.roomType === "custom" ? 6 : 12}>
                            <FormControl
                                fullWidth
                                sx={{ minWidth: 150 }}
                                margin="dense"
                                error={!!errors.roomType}
                            >
                              <InputLabel id="roomType-select-label">Room Type</InputLabel>
                              <Select
                                  fullWidth
                                  labelId="roomType-select-label"
                                  id="roomType-select"
                                  name="roomType"
                                  value={formData.roomType || ""}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    setFormData({
                                      ...formData,
                                      roomType: value,
                                      customRoomType: value === "custom" ? "" : "", // optional reset
                                    });
                                  }}
                                  label="Room Type"
                                  variant="outlined"
                                  required
                              >
                                {roomTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                      {type}
                                    </MenuItem>
                                ))}
                                <MenuItem value="custom">Custom</MenuItem>
                              </Select>
                              {errors.roomType && (
                                  <Typography variant="caption" color="error">
                                    {errors.roomType}
                                  </Typography>
                              )}
                            </FormControl>
                          </Grid>

                          {formData.roomType === "custom" && (
                              <Grid item xs={6}>
                                <TextField
                                    name="customRoomType"
                                    value={formData.customRoomType || ""}
                                    onChange={(e) =>
                                        setFormData({ ...formData, customRoomType: e.target.value })
                                    }
                                    label="Custom Room Type"
                                    margin="dense"
                                    variant="outlined"
                                    required
                                    error={!!errors.roomType}
                                    helperText={errors.roomType}
                                    fullWidth
                                />
                              </Grid>
                          )}
                        </Grid>

                        {formData.beds.map((bed, index) => (
                            <Grid  container sx={{width:'100vw'}} spacing={2} key={index}>
                              <Grid xs={3}>
                                <TextField
                                    label="Bed ID"
                                    name={`bedId-${index}`}
                                    value={bed.bedId}
                                    onChange={(e) =>
                                        handleBedChange(index, "bedId", e.target.value)
                                    }
                                    fullWidth
                                    margin="dense"
                                    variant="outlined"
                                    required
                                    error={!!errors[`bedId-${index}`]}
                                    helperText={errors[`bedId-${index}`]}
                                />
                              </Grid>
                              <Grid xs={3}>
                                <TextField
                                    label="Cost"
                                    name={`cost-${index}`}
                                    type="number"
                                    value={bed.cost}
                                    onChange={(e) =>
                                        handleBedChange(index, "cost", e.target.value)
                                    }
                                    fullWidth
                                    margin="dense"
                                    variant="outlined"
                                    required
                                    error={!!errors[`cost-${index}`]}
                                    helperText={errors[`cost-${index}`]}
                                />
                              </Grid>
                              <Grid xs={3} sx={{width:'22%'}}>
                                <FormControl
                                    fullWidth
                                    margin="dense"
                                    error={!!errors[`status-${index}`]}
                                >
                                  <InputLabel>Status</InputLabel>
                                  <Select
                                      value={bed.status}
                                      onChange={(e) =>
                                          handleBedChange(index, "status", e.target.value)
                                      }
                                      label="Status"
                                  >
                                    <MenuItem value="Available">Available</MenuItem>
                                    <MenuItem value="Occupied">Occupied</MenuItem>
                                    <MenuItem value="Under Maintenance">
                                      Under Maintenance
                                    </MenuItem>
                                  </Select>
                                  {errors[`status-${index}`] && (
                                      <Typography variant="caption" color="error">
                                        {errors[`status-${index}`]}
                                      </Typography>
                                  )}
                                </FormControl>
                              </Grid>
                              <Grid xs={3} sx={{ display: "flex", alignItems: "center" }}>
                                {formData.beds.length > 1 && (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleRemoveBed(index)}
                                    >
                                      Remove
                                    </Button>
                                )}
                              </Grid>
                            </Grid>
                        ))}
                        <Button
                            variant="contained"
                            sx={{ mt: 2, backgroundColor: "#25307F", color: "white" }}
                            onClick={handleAddBed}
                        >
                          + Add Bed
                        </Button>
                      </Grid>
                    </Box>
                  </DialogContent>

                  <DialogActions sx={{ justifyContent: "center" }}>
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      sx={{
                        width: "200px",
                        backgroundColor: "#25307F",
                        "&:hover": { backgroundColor: "green" },
                      }}
                    >
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>

                <Dialog open={addDialogOpen1}
                        onClose={() => setAddDialogOpen1(false)}
                        maxWidth="md"
                        fullWidth
                        sx={{
                          "& .MuiDialog-paper": {
                            maxWidth: "65%", // This will reduce the max width between md and lg.
                          },
                        }}
                >
                  <DialogTitle sx={{ fontWeight: "600"}}>Beds ({currentRoom?.roomID})</DialogTitle>
                  <DialogContent sx={{
                    maxHeight: "500px", // Fixed height
                    overflowY: "auto",  // Enable vertical scrolling
                    paddingRight: "8px", // Optional: prevent clipping
                    // Hides scrollbar (for WebKit browsers)
                    '&::-webkit-scrollbar': {
                      width: 0,
                      display: 'none',
                    },
                    // Hides scrollbar for Firefox
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none', // IE and Edge
                  }}>
                    <Table sx={{
                      borderCollapse: "separate",
                      borderSpacing: "0 10px",
                      width: "100%",
                      marginBottom: "30px",
                    }}>
                      <TableHead sx={{
                        position: "sticky",
                        backgroundColor: "#f1f1f1",
                        top: 0,
                        zIndex: 10, // Keep it above other elements
                      }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "600", width: "30%" }}>
                            Bed ID
                          </TableCell>
                          <TableCell sx={{ fontWeight: "600", width: "30%" }}>
                            Cost
                          </TableCell>
                          <TableCell sx={{ fontWeight: "600", width: "30%" }}>
                            Status
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {
                          currentRoom?.beds.length > 0 ? (
                              currentRoom?.beds.map((bed,index) => (
                                  <TableRow key={index}>
                                    <TableCell>
                                      {bed?.bedNumber || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                      {bed?.cost || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                      {bed?.status || "N/A"}
                                    </TableCell>
                                  </TableRow>
                              ))
                          ) :
                              <TableRow>
                                <TableCell
                                    align="center"
                                    colSpan={7}
                                    sx={{
                                      background: "#fff",
                                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                                      borderRadius: "8px",
                                      "&:hover": {
                                        backgroundColor: "#f9f9f9",
                                      },
                                      "& > *": {
                                        borderBottom: "unset",
                                      },
                                    }}
                                >
                                  No data found!
                                </TableCell>
                              </TableRow>
                        }
                      </TableBody>
                    </Table>
                  </DialogContent>
                </Dialog>
              </div>
            </Box>

            {/* Table Section */}
            <TableContainer
              sx={{
                maxHeight: "70vh", // Adjust this to fit your layout needs
                overflowY: "auto",
              }}
            >
              <Table
                sx={{
                  borderCollapse: "separate",
                  borderSpacing: "0 10px",
                  width: "100%",
                  marginBottom: "30px",
                }}
              >
                <TableHead
                  sx={{
                    position: "sticky",
                    backgroundColor: "#f1f1f1",
                    top: 0,
                    zIndex: 10, // Keep it above other elements
                  }}
                >
                  <TableRow>
                    <TableCell sx={{ fontWeight: "600", width: "25%" }}>
                      Room ID
                    </TableCell>
                    <TableCell sx={{ fontWeight: "600", width: "25%" }}>
                      Room Type
                    </TableCell>
                    <TableCell sx={{ fontWeight: "600", width: "25%" }}>
                      Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "600", width: "25%" }}>
                      Status
                    </TableCell>
                    <TableCell sx={{ fontWeight: "600", minWidth: "8rem" }}>
                      Doctor Assigned
                    </TableCell>
                    <TableCell
                        sx={{
                          fontWeight: "600",
                          width: "auto",
                          textAlign: "right",
                        }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <TableRow
                            key={room._id}
                            sx={{
                              background: "#fff",
                              cursor:'pointer',
                              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                              borderRadius: "8px",
                              "&:hover": {
                                backgroundColor: "#f9f9f9",
                              },
                            }}
                            onClick={() => handleAddDialogOpen1(room)}
                        >
                        <TableCell
                            sx={{
                              color: "#25307F",
                              fontWeight: "bold",
                              width: "25%",
                            }}
                        >
                          {room.roomID}
                        </TableCell>
                          <TableCell
                              sx={{
                                color: "#25307F",
                                fontWeight: "bold",
                                width: "25%",
                              }}
                          >
                            {room?.roomType}
                          </TableCell>
                        <TableCell sx={{ width: "25%" }}>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: "bold",
                              color: "#25307F",
                              cursor: "pointer",
                              whiteSpace: "nowrap", // Prevents text from wrapping
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {room.name}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ width: "25%" }}>
                          {" "}
                          {/* Increase 'pl' value for more spacing */}
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={1}
                          >
                            <Box
                              sx={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                backgroundColor:
                                  room.status === "Available"
                                    ? "#3DB461"
                                    : room.status === "Occupied"
                                    ? "#FFA412"
                                    : "#AEC3FF",
                              }}
                            />
                            {room.status}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ width: "25%" }}>
                          {room.assignedDoctor?.name || "Not Assigned"}
                        </TableCell>

                        <TableCell sx={{ width: "auto", textAlign: "right" }}>
                          <IconButton
                            onClick={(event) => handleMenuOpen(event, room)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        align="center"
                        colSpan={7}
                        sx={{
                          background: "#fff",
                          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: "#f9f9f9",
                          },
                          "& > *": {
                            borderBottom: "unset",
                          },
                        }}
                      >
                        No data found!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              <TablePagination
                  component="div"
                  count={totalRooms}
                  page={page} // current page
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage} // items per page
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 20, 50, 100]} // 👈 Custom options
                  sx={{
                    width: '100%',
                    backgroundColor: "#fff",
                    borderTop: "2px solid #ddd",
                    zIndex: 11,
                  }}
              />

            </TableContainer>

            {/* Actions Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 2,
                sx: { padding: 1 },
              }}
            >
              <MenuItem onClick={handleEdit}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText sx={{ color: "error.main" }}>Delete</ListItemText>
              </MenuItem>
            </Menu>

            {/* Edit Room Dialog */}
            <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
              <DialogTitle>Edit Room</DialogTitle>
              <DialogContent>
                <Box sx={{ width: "100%" }}>
                  <Grid container spacing={2}>
                    <Grid xs={3}>
                      <TextField
                        autoFocus
                        margin="dense"
                        label="Room ID"
                        name="roomID"
                        value={editedRoom.roomID}
                        onChange={(e) =>
                          setEditedRoom({
                            ...editedRoom,
                            roomID: e.target.value,
                          })
                        }
                        type="text"
                        fullWidth
                        variant="outlined"
                        error={!!errors.roomID}
                        helperText={errors.roomID}
                        required
                      />
                    </Grid>
                    <Grid xs={3}>
                      <TextField
                        margin="dense"
                        label="Room Name"
                        name="name"
                        value={editedRoom.name}
                        onChange={(e) =>
                          setEditedRoom({ ...editedRoom, name: e.target.value })
                        }
                        type="text"
                        fullWidth
                        variant="outlined"
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                      />
                    </Grid>
                    <Grid xs={3}>
                      <FormControl
                        fullWidth
                        margin="dense"
                        error={!!errors.status}
                      >
                        <InputLabel id="status-select-label">Status</InputLabel>
                        <Select
                          labelId="status-select-label"
                          id="status-select"
                          name="status"
                          value={editedRoom.status}
                          onChange={(e) =>
                            setEditedRoom({
                              ...editedRoom,
                              status: e.target.value,
                            })
                          }
                          label="Status"
                          variant="outlined"
                        >
                          <MenuItem value="Available">Available</MenuItem>
                          <MenuItem value="Occupied">Occupied</MenuItem>
                          <MenuItem value="Under Maintenance">
                            Under Maintenance
                          </MenuItem>
                        </Select>
                        {errors.status && (
                          <Typography variant="caption" color="error">
                            {errors.status}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={3}>
                      <FormControl
                        fullWidth
                        margin="dense"
                        error={!!errors.doctorId}
                      >
                        <InputLabel id="doctor-select-label">
                          Doctor Assigned
                        </InputLabel>
                        <Select
                          labelId="doctor-select-label"
                          id="doctor-select"
                          name="doctorId"
                          value={editedRoom.assignedDoctor}
                          onChange={(e) =>
                            setEditedRoom({
                              ...editedRoom,
                              assignedDoctor: e.target.value,
                            })
                          }
                          label="Doctor Assigned"
                          variant="outlined"
                          required
                        >
                          {doctors?.map((doctor) => (
                            <MenuItem key={doctor._id} value={doctor._id}>
                              {doctor.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.doctorId && (
                          <Typography variant="caption" color="error">
                            {errors.doctorId}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </DialogContent>

              <DialogActions>
                <Button onClick={handleEditDialogClose}>Cancel</Button>
                <Button onClick={handleSaveEditedRoom} variant="contained">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
};
export default AdminRooms;
