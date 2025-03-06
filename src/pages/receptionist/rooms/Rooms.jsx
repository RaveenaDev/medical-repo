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

const Rooms = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);
  const [errors, setErrors] = useState({}); // Added error state

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
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
      if (!formData[key]) {
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
    dispatch(addRoom(formData));
    setErrors({});
    setAddDialogOpen(false);
  };

  const [formData, setFormData] = useState({
    roomID: "",
    name: "",
    doctorId: "",
    status: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const rooms = useSelector((state) => state.receptionist.rooms);
  const doctors = useSelector((state) => state.receptionist.doctors);

  return (
    <>
      <CommonPanel />
      <Box>
        <div
          className={ayu.headerContainer}
          style={{ justifyContent: "space-between" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div
              className={ayu.backButton}
              onClick={() => navigate(`/receptionist`)}
            >
              <ArrowBackIosIcon />
            </div>
            <h2 className={ayu.departmentTitle}>Total Rooms:</h2>
            <h2 className={ayu.departmentTitleDetails}>{rooms.length}</h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
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
                    backgroundColor: "green",
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
                    backgroundColor: "orange",
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
                    backgroundColor: "skyblue",
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
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="status-select-label">Status</InputLabel>
                    <Select
                      labelId="status-select-label"
                      id="status-select"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      label="Status"
                      variant="outlined"
                      sx={{ width: "100%" }}
                      required
                    >
                      <MenuItem value="Available">Available</MenuItem>
                      <MenuItem value="Occupied">Occupied</MenuItem>
                      <MenuItem value="Under Maintenance">
                        Under Maintenance
                      </MenuItem>
                    </Select>{" "}
                    {errors.status && (
                      <Typography variant="caption" color="error">
                        {errors.status}
                      </Typography>
                    )}
                  </FormControl>
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
      </Box>
      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table
          sx={{
            borderCollapse: "separate",
            borderSpacing: "0 10px",
            background: "#F1F1F1",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Room ID</TableCell>
              <TableCell align="center" sx={{ pl: 8 }}>
                Name
              </TableCell>
              <TableCell align="center" sx={{ pr: 14 }}>
                Status
              </TableCell>
              <TableCell align="center">Doctor Assigned</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow
                key={room._id}
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
                <TableCell sx={{ color: "#25307F", fontWeight: "bold" }}>
                  {room.roomID}
                </TableCell>
                <TableCell align="center" sx={{ pl: 8 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bold",
                      color: "#25307F",
                      cursor: "pointer",
                    }}
                  >
                    {room.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  {" "}
                  {/* Increase 'pl' value for more spacing */}
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{ ml: 16 }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor:
                          room.status === "Available"
                            ? "green"
                            : room.status === "Occupied"
                            ? "orange"
                            : "skyblue",
                      }}
                    />
                    {room.status}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {room.assignedDoctor?.name || "Not Assigned"}
                </TableCell>

                <TableCell align="right">
                  <IconButton onClick={(event) => handleMenuOpen(event, room)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
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
                    setEditedRoom({ ...editedRoom, roomID: e.target.value })
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
                <FormControl fullWidth margin="dense" error={!!errors.status}>
                  <InputLabel id="status-select-label">Status</InputLabel>
                  <Select
                    labelId="status-select-label"
                    id="status-select"
                    name="status"
                    value={editedRoom.status}
                    onChange={(e) =>
                      setEditedRoom({ ...editedRoom, status: e.target.value })
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
                <FormControl fullWidth margin="dense" error={!!errors.doctorId}>
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
  );
};
export default Rooms;
