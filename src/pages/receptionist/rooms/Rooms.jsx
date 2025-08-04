import React, { useEffect, useState } from "react";
import CommonPanel from "../components/CommonPanel.jsx";
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
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ayu from "../doctors/doctors.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import addIcon from "../../../assets/plus.svg";
import styles from "../styles.module.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid2";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addRoom,
  deleteRoom,
  updateRoom,
} from "../../../components/State/Receptionist/Action.js";
import CircularProgress from "@mui/material/CircularProgress";

const Rooms = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);
  const [errors, setErrors] = useState({}); // Added error state

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const roomTypes = ["Available", "Occupied", "Under Maintenance"];
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

  // Handle Save Edited Room
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
    dispatch(deleteRoom(selectedRoom._id)); // Dispatch delete action

    handleMenuClose();
  };

  // Handle Edit Dialog Close
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const dispatch = useDispatch();

  const handleAddDialogOpen = () => setAddDialogOpen(true);
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
      beds: [...formData.beds, { bedId: "", status: "", cost: ""}],
    });
  };

  const handleRemoveBed = (index) => {
    const updatedBeds = [...formData.beds];
    updatedBeds.splice(index, 1);
    setFormData({ ...formData, beds: updatedBeds });
  };

  const navigate = useNavigate();
  const rooms = useSelector((state) => state.receptionist.rooms);
  const doctors = useSelector((state) => state.receptionist.doctors);
  const loading = useSelector((state) => state.receptionist.isLoading);

  return (
    <div
      style={{
        background: "#f1f1f1",
        height: "99dvh", // Make the entire div take up the full viewport height
        overflow: "hidden", // Prevent scrolling on the rest of the page
      }}
    >
      <div>
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
              <Box>
                <div
                  className={ayu.headerContainer}
                  style={{ justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <div
                      className={ayu.backButton}
                      onClick={() => navigate(`/receptionist`)}
                    >
                      <ArrowBackIosIcon />
                    </div>
                    <h2 className={ayu.departmentTitle}>Total Rooms:</h2>
                    <h2 className={ayu.departmentTitleDetails}>
                      {rooms.length}
                    </h2>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2rem",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 3 }}>
                      {" "}
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
                          "&:active": {
                            backgroundColor: "#181F52",
                            outline: "none",
                            boxShadow: "none",
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
                                  <InputLabel id="status-select-label">Status</InputLabel>
                                  <Select
                                      labelId="status-select-label"
                                      id="status-select"
                                      name="status"
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
                              {/*<Grid xs={3} sx={{width:'22%'}}>*/}
                              {/*  <FormControl*/}
                              {/*      fullWidth*/}
                              {/*      margin="dense"*/}
                              {/*      error={!!errors[`status-${index}`]}*/}
                              {/*  >*/}
                              {/*    <InputLabel>Bed Type</InputLabel>*/}
                              {/*    <Select*/}
                              {/*        value={bed.bedType}*/}
                              {/*        onChange={(e) =>*/}
                              {/*            handleBedChange(index, "bedType", e.target.value)*/}
                              {/*        }*/}
                              {/*        label="Status"*/}
                              {/*    >*/}
                              {/*      <MenuItem value="ICU">ICU</MenuItem>*/}
                              {/*      <MenuItem value="General">General</MenuItem>*/}
                              {/*      <MenuItem value="Private">Private</MenuItem>*/}
                              {/*      <MenuItem value="Semi-Private">Semi-Private</MenuItem>*/}
                              {/*      <MenuItem value="Emergency">Emergency</MenuItem>*/}
                              {/*      <MenuItem value="Pediatric">Pediatric</MenuItem>*/}
                              {/*      <MenuItem value="Maternity">Maternity</MenuItem>*/}
                              {/*    </Select>*/}
                              {/*    {errors[`status-${index}`] && (*/}
                              {/*        <Typography variant="caption" color="error">*/}
                              {/*          {errors[`status-${index}`]}*/}
                              {/*        </Typography>*/}
                              {/*    )}*/}
                              {/*  </FormControl>*/}
                              {/*</Grid>*/}
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
                        "&:focus": {
                          outline: "none",
                          boxShadow: "none",
                        },
                      }}
                    >
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
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
                        Name
                      </TableCell>
                      <TableCell sx={{ fontWeight: "600", width: "25%" }}>
                        Status
                      </TableCell>
                      <TableCell sx={{ fontWeight: "600", width: "25%" }}>
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
                  <TableBody>
                    {rooms.length > 0 ? (
                      rooms.map((room) => (
                        <TableRow
                          key={room._id}
                          sx={{
                            background: "#fff",
                            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                            borderRadius: "8px",
                            "&:hover": {
                              backgroundColor: "#f9f9f9",
                            },
                          }}
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
                            <Box display="flex" alignItems="center" gap={1}>
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
                          colSpan={4}
                          align="center"
                          sx={{
                            background: "#fff",
                            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                            borderRadius: "8px",
                            "&:hover": {
                              backgroundColor: "#f9f9f9",
                            },
                          }}
                        >
                          No Rooms found!
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
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
                  <ListItemText sx={{ color: "error.main" }}>
                    Delete
                  </ListItemText>
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
                            setEditedRoom({
                              ...editedRoom,
                              name: e.target.value,
                            })
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
                          <InputLabel id="status-select-label">
                            Status
                          </InputLabel>
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
    </div>
  );
};
export default Rooms;
