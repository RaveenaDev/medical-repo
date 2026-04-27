import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ayu from "../rooms/Rooms.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styles from "../rooms/Rooms.module.scss";
import Grid from "@mui/material/Grid2";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addRoom,
  deleteRoom,
  updateRoom,
} from "../../../components/State/Admin/Action.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import CommonPanel from "../components/CommonPanel.jsx";
import {
  getFilteredPatients,
  getFilteredRooms,
} from "../../../components/State/Doctor/Action.js";
import { FiFilter } from "react-icons/fi";
import CloseIcon from "@mui/icons-material/Close";

const Rooms = () => {
  const [errors, setErrors] = useState({}); // Added error state

  const [anchorEl, setAnchorEl] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState(null);
  // State for editing room
  const [editedRoom, setEditedRoom] = useState({
    roomID: "",
    name: "",
    assignedDoctor: "",
    status: "",
    originalRoomID: "",
  });

  const [currentRoom, setCurrentRoom] = useState(null);

  const [addDialogOpen1, setAddDialogOpen1] = useState(false);

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("desc");
  const [filters, setFilters] = useState({
    status: "",
    type: "",
    sort: "desc",
  });

  useEffect(() => {
    // dispatch(getPatients());
    dispatch(getFilteredRooms(filters, page, rowsPerPage));
  }, [dispatch, sortOrder, page, rowsPerPage]);

  const doctor = useSelector((store) => store.doctor);
  const totalFilteredRooms = doctor.totalFilteredRooms;
  const filteredRooms = doctor.filteredRooms;

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchResults = () => {
    // admin = null;
    dispatch(getFilteredRooms(filters, page, rowsPerPage));
    setFilterDrawerOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

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

  const handleAddDialogOpen1 = (room) => {
    setAddDialogOpen1(true);
    setCurrentRoom(room);
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

  const [formData, setFormData] = useState({
    roomID: "",
    name: "",
    doctorId: "",
    status: "",
  });

  const navigate = useNavigate();

  // const rooms = useSelector((state) => state.admin.rooms);
  // const loading = useSelector((state) => state.admin.isLoading);

  const location = useLocation();
  const rooms = location.state?.rooms || [];

  // console.log("Rooms : ",rooms)

  const loading = doctor.isLoadingFilteredRooms;
  const doctors = useSelector((state) => state.admin.doctors);

  const isLaptop = useMediaQuery("(max-width: 1024px)");

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
          width: isLaptop ? "90%" : "77%",
          background: " #F1F1F1",
          zIndex: 100,
          padding: isLaptop ? "4px 3rem" : "4px 0",
        }}
      >
        <CommonPanel />
      </div>
      <div className={styles.parent}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh", // or full height you need
            }}
          >
            <CircularProgress sx={{ color: "#00a378" }} size={58} />
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
              <div className={ayu.headerContainer}>
                <div style={{ display: "flex" }}>
                  <span onClick={() => navigate(-1)}>
                    <ArrowBackIosIcon sx={{ height: 21, width: 21 }} />
                  </span>
                  <h2 className={ayu.departmentTitle}>Total Rooms:</h2>
                  <h2 className={ayu.departmentTitleDetails}>
                    {totalFilteredRooms}
                  </h2>
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <Box sx={{ display: "flex", gap: 3 }}>
                    {/* Adjust gap for spacing */}
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      sx={{ color: "black", fontWeight: 500, fontSize: 15 }}
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
                      sx={{ color: "black", fontWeight: 500, fontSize: 15 }}
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
                      sx={{ color: "black", fontWeight: 500, fontSize: 15 }}
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

                    <div
                      onClick={() => setFilterDrawerOpen(true)}
                      className={`${styles.filter} ${styles.boxStyle}`}
                    >
                      <FiFilter fill="#00a378" />
                      <p>Filter</p>
                    </div>
                  </Box>
                </div>

                <Dialog
                  open={addDialogOpen1}
                  onClose={() => setAddDialogOpen1(false)}
                  maxWidth="md"
                  fullWidth
                  sx={{
                    "& .MuiDialog-paper": {
                      maxWidth: "65%", // This will reduce the max width between md and lg.
                    },
                  }}
                >
                  <DialogTitle sx={{ fontWeight: "600" }}>
                    Room ({currentRoom?.roomID})
                  </DialogTitle>
                  <DialogContent
                    sx={{
                      maxHeight: "500px", // Fixed height
                      overflowY: "auto", // Enable vertical scrolling
                      paddingRight: "8px", // Optional: prevent clipping
                      // Hides scrollbar (for WebKit browsers)
                      "&::-webkit-scrollbar": {
                        width: 0,
                        display: "none",
                      },
                      // Hides scrollbar for Firefox
                      scrollbarWidth: "none",
                      msOverflowStyle: "none", // IE and Edge
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
                        {currentRoom?.beds.length > 0 ? (
                          currentRoom?.beds.map((bed, index) => (
                            <TableRow key={index}>
                              <TableCell>{bed?.bedNumber || "N/A"}</TableCell>
                              <TableCell>{bed?.cost || "N/A"}</TableCell>
                              <TableCell>{bed?.status || "N/A"}</TableCell>
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
                  </DialogContent>
                </Dialog>
              </div>
            </Box>

            {/* Table Section */}
            <TableContainer
              sx={{
                height: "60vh", // Adjust this to fit your layout needs
                overflowY: "auto",
              }}
            >
              <Table
                sx={{
                  borderCollapse: "separate",
                  borderSpacing: "0 10px",
                  width: "100%",
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
                    {/*<TableCell align="right" sx={{ pr: 2 }}>*/}
                    {/*  /!* Optional: Add label or keep empty *!/*/}
                    {/*</TableCell>*/}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRooms.length > 0 ? (
                    filteredRooms.map((room, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          background: "#fff",
                          cursor: "pointer",
                          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: "#f9f9f9",
                          },
                          "& > *": {
                            borderBottom: "unset",
                          },
                        }}
                        onClick={() => handleAddDialogOpen1(room)}
                      >
                        <TableCell
                          sx={{
                            color: "#00a378",
                            fontWeight: "bold",
                            width: "25%",
                          }}
                        >
                          {room.roomID}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#00a378",
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
                              color: "#00a378",
                              cursor: "pointer",
                            }}
                          >
                            {room.name}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ width: "25%" }}>
                          {" "}
                          {/* Increase 'pl' value for more spacing */}
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

                        {/*<TableCell align="right">*/}
                        {/*  <IconButton*/}
                        {/*    onClick={(event) => handleMenuOpen(event, room)}*/}
                        {/*  >*/}
                        {/*    <MoreVertIcon />*/}
                        {/*  </IconButton>*/}
                        {/*</TableCell>*/}
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
              {/* <Box
                sx={{
                  width: "100%",
                  position: "sticky",
                  bottom: 0,
                  backgroundColor: "#fff",
                  borderTop: "2px solid #ddd",
                  zIndex: 2,
                }}
              >
                <TablePagination
                  component="div"
                  count={totalFilteredRooms}
                  page={page} // current page
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage} // items per page
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 20, 50, 100]} // 👈 Custom options
                  sx={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderTop: "2px solid #ddd",
                    zIndex: 11,
                  }}
                />
              </Box> */}
            </TableContainer>
            <Box
              sx={{
                width: "100%",
                position: "sticky",
                bottom: 0,
                backgroundColor: "#fff",
                borderTop: "2px solid #ddd",
                zIndex: 2,
              }}
            >
              <TablePagination
                component="div"
                count={totalFilteredRooms}
                page={page} // current page
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage} // items per page
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 20, 50, 100]} // 👈 Custom options
                sx={{
                  width: "100%",
                  backgroundColor: "#fff",
                  borderTop: "2px solid #ddd",
                  zIndex: 11,
                }}
              />
            </Box>
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

            <Drawer
              anchor="right"
              open={filterDrawerOpen}
              onClose={() => setFilterDrawerOpen(false)}
              sx={{
                "& .MuiDrawer-paper": {
                  height: "58vh", // Adjust height as needed
                  top: "18vh", // Center it vertically
                  borderRadius: "10px 0 0 10px", // Optional rounded corners
                },
              }}
            >
              <Box sx={{ width: 200, padding: 2, paddingLeft: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#0B0B0B" }}>
                    Filter By
                  </Typography>
                  <IconButton
                    sx={{
                      "&:focus": {
                        outline: "none",
                        boxShadow: "none",
                      },
                      color: "black",
                    }}
                    onClick={() => setFilterDrawerOpen(false)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                {/* Filter Options */}
                <FormControl
                  sx={{ marginBottom: 6, marginTop: 2, width: "100%" }}
                  component="fieldset"
                >
                  <FormLabel
                    component="legend"
                    sx={{
                      marginBottom: 1,
                      color: "#000000",
                      "&.Mui-focused": { color: "#000000" }, // Prevents blue color on focus
                    }}
                  >
                    Status
                  </FormLabel>
                  <RadioGroup
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                  >
                    <FormControlLabel
                      value="Available"
                      control={
                        <Radio
                          sx={{
                            color: "#878787", // Default color
                            "&.Mui-checked": {
                              color: "#25307F", // Selected dot color
                            },
                          }}
                        />
                      }
                      label="Available"
                      sx={{ height: "34px", color: "#878787" }}
                    />
                    <FormControlLabel
                      value="Occupied"
                      control={
                        <Radio
                          sx={{
                            color: "#878787", // Default color
                            "&.Mui-checked": {
                              color: "#25307F", // Selected dot color
                            },
                          }}
                        />
                      }
                      label="Occupied"
                      sx={{ height: "34px", color: "#878787" }}
                    />
                    <FormControlLabel
                      value="Under Maintenance"
                      control={
                        <Radio
                          sx={{
                            color: "#878787", // Default color
                            "&.Mui-checked": {
                              color: "#25307F", // Selected dot color
                            },
                          }}
                        />
                      }
                      label="Under Maintenance"
                      sx={{ height: "34px", color: "#878787" }}
                    />
                    <FormControlLabel
                      value="Full"
                      control={
                        <Radio
                          sx={{
                            color: "#878787", // Default color
                            "&.Mui-checked": {
                              color: "#25307F", // Selected dot color
                            },
                          }}
                        />
                      }
                      label="Full"
                      sx={{ height: "34px", color: "#878787" }}
                    />
                    <FormControlLabel
                      value=""
                      control={
                        <Radio
                          sx={{
                            color: "#878787", // Default color
                            "&.Mui-checked": {
                              color: "#25307F", // Selected dot color
                            },
                          }}
                        />
                      }
                      label="All"
                      sx={{ height: "34px", color: "#878787" }}
                    />
                  </RadioGroup>
                </FormControl>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#25307F",
                    textTransform: "none", // Prevents uppercase transformation
                    borderRadius: "16px",
                    padding: "6px 35px",
                    marginLeft: "4px",
                  }}
                  onClick={handleSearchResults}
                >
                  Search Results
                </Button>
              </Box>
            </Drawer>
          </>
        )}
      </div>
    </div>
  );
};
export default Rooms;
