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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import ayu from "../rooms/Rooms.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import styles from "../rooms/Rooms.module.scss";
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
    deleteRoom,
    updateRoom,
} from "../../../components/State/Admin/Action.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";

const Rooms = () => {
    const [errors, setErrors] = useState({}); // Added error state

    const [anchorEl, setAnchorEl] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [addDialogOpen, setAddDialogOpen] = useState(false);

    const [selectedRoom, setSelectedRoom] = useState(null);
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

    const [formData, setFormData] = useState({
        roomID: "",
        name: "",
        doctorId: "",
        status: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const dispatch = useDispatch();

    const navigate = useNavigate();

    // const rooms = useSelector((state) => state.admin.rooms);
    // const loading = useSelector((state) => state.admin.isLoading);
    const rooms = [
        {
            roomID: "RM101",
            name: "Deluxe Room 1",
            status: "Available",
            assignedDoctor: { name: "Dr. Aditi Sharma" },
        },
        {
            roomID: "RM102",
            name: "Deluxe Room 2",
            status: "Occupied",
            assignedDoctor: { name: "Dr. Ravi Mehta" },
        },
        {
            roomID: "RM103",
            name: "General Ward 1",
            status: "Maintenance",
            assignedDoctor: null,
        },
        {
            roomID: "RM104",
            name: "ICU Room 1",
            status: "Available",
            assignedDoctor: { name: "Dr. Sneha Verma" },
        },
        {
            roomID: "RM105",
            name: "ICU Room 2",
            status: "Occupied",
            assignedDoctor: { name: "Dr. Vikram Singh" },
        },
        {
            roomID: "RM106",
            name: "General Ward 2",
            status: "Available",
            assignedDoctor: null,
        },
    ];

    const loading = false;
    const doctors = useSelector((state) => state.admin.doctors);

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
                            >
                                <div style={{ display: "flex" }}>
                                      <span
                                          onClick={() => navigate(-1)}
                                      >
                                        <ArrowBackIosIcon sx={{height: 21,width:21}}/>
                                      </span>
                                    <h2 className={ayu.departmentTitle}>Total Rooms:</h2>
                                    <h2 className={ayu.departmentTitleDetails}>{rooms.length}</h2>
                                </div>
                                <div style={{ display: "flex", gap: "1rem" }}>
                                    <Box sx={{ display: "flex", gap: 3 }}>
                                        {/* Adjust gap for spacing */}
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                            sx={{ color: "black",fontWeight: 500,fontSize: 15 }}
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
                                            sx={{ color: "black",fontWeight: 500,fontSize: 15}}
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
                                            sx={{ color: "black",fontWeight: 500,fontSize: 15}}
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
                                </div>
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
                                        width: "100%",
                                        zIndex: 10, // Keep it above other elements
                                    }}
                                >
                                    <TableRow>
                                        <TableCell sx={{ pl: 8 }}>Room ID</TableCell>
                                        <TableCell align="center" sx={{ pl: 14 }}>
                                            Name
                                        </TableCell>
                                        <TableCell align="center" sx={{ pl:8 }}>
                                            Status
                                        </TableCell>
                                        <TableCell align="center" sx={{ pl:8 }}>Doctor Assigned</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rooms.length > 0 ? (
                                        rooms.map((room, index) => (
                                            <TableRow
                                                key={index}
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
                                                <TableCell
                                                    sx={{ color: "#25307F", fontWeight: "bold",pl:8 }}
                                                >
                                                    {room.roomID}
                                                </TableCell>
                                                <TableCell align="center" sx={{ pl: 14 }}>
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
                                                <TableCell align="center" sx={{pl:6}}>
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
                                                                        ? "#3DB461"
                                                                        : room.status === "Occupied"
                                                                            ? "#FFA412"
                                                                            : "#AEC3FF",
                                                            }}
                                                        />
                                                        {room.status}
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="center" sx={{ color: "#747474",pl:8 }}>
                                                    {room.assignedDoctor?.name || "Not Assigned"}
                                                </TableCell>

                                                <TableCell align="right">
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
export default Rooms;
