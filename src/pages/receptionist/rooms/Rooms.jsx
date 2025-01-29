import React, {useEffect, useState} from 'react'
import CommonPanel from "../components/CommonPanel.jsx";
import {
    Box,
    Button,
    Chip,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl, FormControlLabel, FormLabel,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Paper, Radio, RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField,
    Typography
} from "@mui/material";
import ayu from "../doctors/doctors.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import addIcon from "../../../assets/plus.svg";
import styles from "../styles.module.scss";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useLocation} from "react-router-dom";

const Rooms = (props) => {

    useEffect(() => {
        props?.setIsSignUpOrLogin(false);
    }, []);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editedPatient, setEditedPatient] = useState({});

    const [patients, setPatients] = useState([
        {
            roomId: "XXXXXXXX",
            name: "Jasmin Kaur",
            status: "Available",
            doctorAssigned: "Dr. Manoj Singh"
        },
        {
            roomId: "XXXXXXXX",
            name: "Amit Tripathi",
            status: "Occupied",
            doctorAssigned: "Dr. Sunil Sharma"
        },
        {
            roomId: "XXXXXXXX",
            name: "ICU",
            status: "Under Maintenance",
            doctorAssigned: "Dr. Arvind Kumar"
        },
    ]);

    // Handle Menu Open
    const handleMenuOpen = (event, patient) => {
        event.stopPropagation(); // Prevent interference with other clicks
        setAnchorEl(event.currentTarget);
        setSelectedPatient(patient);
    };

    // Handle Menu Close
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedPatient(null);
    };

    // Handle Edit Action
    const handleEdit = () => {
        setEditedPatient(selectedPatient); // Load selected patient into editedPatient
        setEditDialogOpen(true);
        handleMenuClose();
    };

    // Handle Delete Action
    const handleDelete = () => {
        // setPatients((prev) => prev.filter((patient) => patient.id !== selectedPatient.id));
        console.log("Patient Deleted")
        handleMenuClose();
    };

    // Handle Edit Dialog Close
    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    // Handle Save Edited Patient
    const handleSaveEditedPatient = () => {
        // setPatients((prev) =>
        //     prev.map((patient) => (patient.id === editedPatient.id ? editedPatient : patient))
        // );
        console.log("Patient Edited Successfully")
        handleEditDialogClose();
    };

    const location = useLocation()
    const rooms = location.state?.rooms;

    console.log("ROOMS COMING:",rooms)

    return (
        <>
            <CommonPanel/>

            <Box>
                <div className={ayu.headerContainer}>
                    <button className={ayu.backButton}>
                        <ArrowBackIosIcon/>
                    </button>
                    <h2 className={ayu.departmentTitle}>Total Rooms:</h2>
                    <h2 className={ayu.departmentTitleDetails}>80</h2>

                    <Box sx={{ display: "flex", gap: 3 }}> {/* Adjust gap for spacing */}
                        <Box display="flex" alignItems="center" gap={1} sx={{ ml: 60, color: 'black' }}>
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
                        <Box display="flex" alignItems="center" gap={1} sx={{ color: 'black' }}>
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
                        <Box display="flex" alignItems="center" gap={1} sx={{ color: 'black' }}>
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

                    <div style={{marginLeft: 'auto'}}>
                        <Button variant="contained" sx={{
                            fontSize: "20px",
                            color: "#ffffff",
                            textTransform: "capitalize",
                            padding: "2px 18px",
                            backgroundColor: "#25307F"
                        }}><img src={addIcon}
                                className={styles.appointmentBlock__plusIcon}/>Add
                        </Button>
                    </div>
                </div>
            </Box>

            {/* Table Section */}
            <TableContainer component={Paper}>
                <Table sx={{borderCollapse: "separate", borderSpacing: "0 10px", background: "#F1F1F1"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Room ID</TableCell>
                            <TableCell align='center' sx={{pl:8}}>Name</TableCell>
                            <TableCell align='center' sx={{pr:14}}>Status</TableCell>
                            <TableCell align='center'>Doctor Assigned</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rooms.map((patient) => (
                            <TableRow
                                key={patient.id}
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
                                <TableCell sx={{color: "#25307F",fontWeight:"bold"}}>{patient.roomID}</TableCell>
                                <TableCell align='center' sx={{pl:8}}>
                                    <Typography variant="body1" sx={{ fontWeight: "bold",color:"#25307F", cursor: "pointer" }}>
                                        {patient.name}
                                    </Typography>
                                </TableCell>
                                <TableCell> {/* Increase 'pl' value for more spacing */}
                                    <Box display="flex" alignItems="center" gap={1} sx={{ml:16}}>
                                        <Box
                                            sx={{
                                                width: 10,
                                                height: 10,
                                                borderRadius: "50%",
                                                backgroundColor:
                                                    patient.status === "Available"
                                                        ? "green"
                                                        : patient.status === "Occupied"
                                                            ? "orange"
                                                            : "skyblue",
                                            }}
                                        />
                                        {patient.status}
                                    </Box>
                                </TableCell>
                                <TableCell align='center'>{patient.assignedDoctor.name}</TableCell>

                                <TableCell align='right'>
                                    <IconButton
                                        onClick={(event) => handleMenuOpen(event, patient)}
                                    >
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

            {/* Edit Patient Dialog */}
            <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
                <DialogTitle>Edit Patient</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Modify the details of the patient.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={editedPatient.name}
                        onChange={(e) => setEditedPatient({ ...editedPatient, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={editedPatient.email}
                        onChange={(e) => setEditedPatient({ ...editedPatient, email: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Phone"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={editedPatient.phone}
                        onChange={(e) => setEditedPatient({ ...editedPatient, phone: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Type of Visit"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={editedPatient.type}
                        onChange={(e) => setEditedPatient({ ...editedPatient, type: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Branch"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={editedPatient.branch}
                        onChange={(e) => setEditedPatient({ ...editedPatient, branch: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Date"
                        type="date"
                        fullWidth
                        variant="outlined"
                        value={editedPatient.date}
                        onChange={(e) => setEditedPatient({ ...editedPatient, date: e.target.value })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormControl fullWidth margin="dense">
                        <FormLabel>Status</FormLabel>
                        <RadioGroup
                            name="status"
                            value={editedPatient.status}
                            onChange={(e) => setEditedPatient({ ...editedPatient, status: e.target.value })}
                        >
                            <FormControlLabel value="Active" control={<Radio />} label="Active" />
                            <FormControlLabel value="In-active" control={<Radio />} label="In-active" />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditDialogClose}>Cancel</Button>
                    <Button onClick={handleSaveEditedPatient}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default Rooms
