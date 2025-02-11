import React, {useEffect, useState} from 'react'
import CommonPanel from "../Components/CommonPanel.jsx";
import {
    Box,
    Button, Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    TextField, Typography
} from "@mui/material";
import ayu from "../../receptionist/doctors/doctors.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Grid from "@mui/material/Grid2";
import Select from "../../../components/Select/index.jsx";
import addIcon from "../../../assets/plus.svg";
import styles from "../../receptionist/styles.module.scss";
import Avatar from "@mui/material/Avatar";
import {useNavigate} from "react-router-dom";

const AdminDoctors = (props) => {
    useEffect(() => {
        props?.setIsSignUpOrLogin(false);
    }, []);

    const [branches, setBranches] = useState(["All Branches", "Cardiology", "Therapy", "Dermatology"]);

    const [patients, setPatients] = useState([
        {
            profile: "1",
            doctorId: "#2YY2LCGY",
            name: "Jasmin Kaur",
            phone: "+91 79327728",
            specialization: "Cardiologist",
            status: "Emergency Room",
        },
        {
            profile: "2",
            doctorId: "#2YY2LCGY",
            name: "Amit Tripathi",
            phone: "+91 79327728",
            specialization: "Dentist",
            status: "On Leave",
        },
    ]);

    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [newDoctor, setNewDoctor] = useState({
        profile: "",
        doctorId: "",
        name: "",
        phone: "",
        specialization: "",
        status: "",
    });

    const handleSubmit = () => {
        console.log("New Doctor Data:",newDoctor)
    }

    const navigate = useNavigate()
    
    return (
        <>
            <CommonPanel/>

            <Box>
                <div className={ayu.headerContainer}>
                    <span onClick={() => navigate(-1)}
                          style={{transform: 'translateY(4px)', color: 'black', cursor: 'pointer'}}>
                        <ArrowBackIosIcon/>
                    </span>
                    <h2 className={ayu.departmentTitle}>Total Doctors:</h2>
                    <h2 className={ayu.departmentTitleDetails}>8</h2>

                    <div style={{marginLeft: '25px'}}>
                        {branches.length &&
                            <Grid item xs={3} spacing={2}>
                                <Box sx={{ width: '200px' }}> {/* Adjust width here */}
                                    <Select
                                        inputId="input-department"
                                        selectId="select-department"
                                        label="Department"
                                        list={branches}
                                        size="small"
                                    />
                                </Box>
                            </Grid>
                        }
                    </div>

                    <div style={{marginLeft: 'auto'}}>
                        <Button
                            variant="contained"
                            sx={{
                                fontSize: "20px",
                                color: "#ffffff",
                                textTransform: "capitalize",
                                padding: "2px 18px",
                                backgroundColor: "#25307F",
                            }}
                            onClick={() => setAddDialogOpen(true)} // Open the modal
                        >
                            <img src={addIcon} className={styles.appointmentBlock__plusIcon} />
                            Add
                        </Button>
                    </div>
                </div>
            </Box>

            <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
                <DialogTitle>Add New Doctor</DialogTitle>
                <DialogContent>

                    {/* Profile Icon Input */}
                    <Avatar
                        src={newDoctor.profile}
                        alt="Profile"
                        sx={{width: 60, height: 60, cursor: "pointer", marginBottom: 2}}
                        onClick={() => {
                            // Handle file input or image picker
                            alert('Open file picker to select profile picture');
                        }}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Doctor ID"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newDoctor.doctorId}
                        onChange={(e) => setNewDoctor({...newDoctor, doctorId: e.target.value})}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newDoctor.name}
                        onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                    />
                    <TextField
                        margin="dense"
                        label="Phone"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newDoctor.phone}
                        onChange={(e) => setNewDoctor({...newDoctor, phone: e.target.value})}
                    />

                    <TextField
                        select
                        label="Specialization"
                        name="specialization"
                        value={newDoctor.specialization}
                        onChange={(e) => setNewDoctor({...newDoctor,specialization: e.target.value})}
                        fullWidth
                        margin="dense"
                    >
                        <MenuItem value="General Checkup">General Checkup</MenuItem>
                        <MenuItem value="Follow Up">Follow Up</MenuItem>
                        <MenuItem value="Consultation">Consultation</MenuItem>
                    </TextField>

                    <TextField
                        select
                        label="Status"
                        name="status"
                        value={newDoctor.status}
                        onChange={(e) => setNewDoctor({...newDoctor,status: e.target.value})}
                        fullWidth
                        margin="dense"
                    >
                        <MenuItem value="Available">Available</MenuItem>
                        <MenuItem value="On Leave">On Leave</MenuItem>
                    </TextField>

                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                    {/*<Button onClick={handleAddDialogClose}>Cancel</Button>*/}
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{ width: "200px", backgroundColor: "#25307F", "&:hover": { backgroundColor: "green" } }}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Table Section */}
            <TableContainer component={Paper}>
                <Table sx={{ borderCollapse: "separate", borderSpacing: "0 10px", background: "#F1F1F1" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Profile</TableCell>
                            <TableCell>Doctor ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Specialization</TableCell>
                            <TableCell align='center'>Status</TableCell>
                            <TableCell align='center'>Profile</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patients.map((patient) => (
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
                                <TableCell>
                                    <Avatar
                                        src={patient.profile}
                                        alt="Profile"
                                        sx={{ width: 40, height: 40 }} // Adjust size
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1" sx={{ fontWeight: "bold"}}>
                                        {patient.doctorId}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body1">
                                        {patient.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>{patient.phone}</TableCell>
                                <TableCell>{patient.specialization}</TableCell>
                                <TableCell align='center'>
                                    <Chip
                                        label={patient.status}
                                        color={patient.status === "Active" ? "success" : "default"}
                                        size="small"
                                        sx={{
                                            bgcolor:
                                                patient.status === "Emergency Room"
                                                    ? "#d4edda"
                                                    : patient.status === "On Leave"
                                                        ? "#f8d7da"
                                                        : patient.status === "Idle"
                                                            ? "#ffffff"
                                                            : undefined,
                                            color:
                                                patient.status === "Emergency Room"
                                                    ? "#155724"
                                                    : patient.status === "On Leave"
                                                        ? "#721c24"
                                                        : patient.status === "Idle"
                                                            ? "#000000"
                                                            : undefined,

                                            width: "9rem",
                                            border: patient.status === "Emergency Room"
                                                ? "1px solid green"
                                                : patient.status === "On Leave"
                                                    ? "1px solid red"
                                                    : patient.status === "Idle"
                                                        ? "1px solid black"
                                                        : undefined,

                                            // fontSize: "12px"
                                            py: 1.7,
                                        }}
                                    />
                                </TableCell>
                                <TableCell align='center'>
                                    <Button variant="outlined"
                                            sx={{
                                                border: "2px solid purple", // Purple border
                                                borderRadius: "18px", // Rounded corners
                                                color: "purple", // Blue text color
                                                textTransform: "none", // Prevents uppercase text
                                                fontSize: "12px", // Adjust text size if needed
                                                "&:hover": {
                                                    borderColor: "purple", // Darker border on hover
                                                    backgroundColor: "rgba(128, 0, 128, 0.1)", // Light purple hover effect
                                                }
                                            }}
                                    >View Profile</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default AdminDoctors
