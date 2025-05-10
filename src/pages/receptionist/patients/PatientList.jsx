import React, { useState } from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    Menu,
    MenuItem,
    IconButton,
    Button,
    Chip,
    Drawer,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import CloseIcon from "@mui/icons-material/Close";

const PatientList = () => {
    const [sortOrder, setSortOrder] = useState("Newest to Oldest");
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editedPatient, setEditedPatient] = useState({});

    const [patients, setPatients] = useState([
        {
            id: "1",
            name: "Jasmin Kaur",
            email: "jasmin@gmail.com",
            phone: "+91 79327728",
            type: "Walk In",
            branch: "Cardiology",
            date: "2024-10-08",
            status: "Active",
        },
        {
            id: "2",
            name: "Amit Tripathi",
            email: "amittripathi@gmail.com",
            phone: "+91 79327728",
            type: "Referral",
            branch: "Cardiology",
            date: "2024-10-08",
            status: "In-active",
        },
    ]);

    const [filters, setFilters] = useState({
        status: "All",
        type: "All",
    });

    // Handle Sort Change
    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

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
        setPatients((prev) => prev.filter((patient) => patient.id !== selectedPatient.id));
        handleMenuClose();
    };

    // Handle Filter Changes
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    // Handle Search Results
    const handleSearchResults = () => {
        console.log("Filters Applied:", filters);
        setFilterDrawerOpen(false);
    };

    // Handle Edit Dialog Close
    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    // Handle Save Edited Patient
    const handleSaveEditedPatient = () => {
        setPatients((prev) =>
            prev.map((patient) => (patient.id === editedPatient.id ? editedPatient : patient))
        );
        handleEditDialogClose();
    };

    return (
        <Box sx={{ padding: 2 }}>
            {/* Header Section */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "0.5px solid #4A4A4A8C",
                    borderBottom: "0.5px solid #4A4A4A8C",
                    paddingY: 2,
                    marginBottom: 3,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "bold",
                            borderRight: "0.5px solid #4A4A4A8C",
                            paddingRight: 2,
                            marginRight: 2,
                        }}
                    >
                        {patients.length}{" "}
                        <Typography
                            component="span"
                            variant="body1"
                            sx={{ fontWeight: "normal" }}
                        >
                            Patients
                        </Typography>
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body1" sx={{ marginRight: 1 }}>
                            Sort by:
                        </Typography>
                        <Select
                            value={sortOrder}
                            onChange={handleSortChange}
                            size="small"
                            sx={{ minWidth: 160 }}
                        >
                            <MenuItem value="Newest to Oldest">Newest to Oldest</MenuItem>
                            <MenuItem value="Oldest to Newest">Oldest to Newest</MenuItem>
                        </Select>
                    </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button
                        variant="outlined"
                        startIcon={<FilterAltOutlinedIcon />}
                        sx={{ textTransform: "none" }}
                        onClick={() => setFilterDrawerOpen(true)}
                    >
                        Filter
                    </Button>
                </Box>
            </Box>

            {/* Table Section */}
            <TableContainer component={Paper}>
                <Table sx={{ borderCollapse: "separate", borderSpacing: "0 10px", background: "#F1F1F1" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Case Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Type Visit</TableCell>
                            <TableCell>Branch</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
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
                                <TableCell>{patient.id}</TableCell>
                                <TableCell>
                                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                        {patient.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {patient.email}
                                    </Typography>
                                </TableCell>
                                <TableCell>{patient.phone}</TableCell>
                                <TableCell>{patient.type}</TableCell>
                                <TableCell>{patient.branch}</TableCell>
                                <TableCell>{patient.date}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={patient.status}
                                        color={patient.status === "Active" ? "success" : "default"}
                                        size="small"
                                        sx={{
                                            bgcolor:
                                                patient.status === "Active"
                                                    ? "#d4edda"
                                                    : "#f0f0f0",
                                            color:
                                                patient.status === "Active"
                                                    ? "#155724"
                                                    : "#757575",
                                            fontWeight: "bold",
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
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

            {/* Filter Drawer */}
            <Drawer
                anchor="right"
                open={filterDrawerOpen}
                onClose={() => setFilterDrawerOpen(false)}
            >
                <Box sx={{ width: 300, padding: 2 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 2,
                        }}
                    >
                        <Typography variant="h6">Filter By</Typography>
                        <IconButton onClick={() => setFilterDrawerOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Filter Options */}
                    <FormControl sx={{ marginBottom: 4, width: "100%" }} component="fieldset">
                        <FormLabel component="legend" sx={{ marginBottom: 1 }}>
                            Status
                        </FormLabel>
                        <RadioGroup
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                        >
                            <FormControlLabel
                                value="Active"
                                control={<Radio />}
                                label="Active"
                            />
                            <FormControlLabel
                                value="In-active"
                                control={<Radio />}
                                label="In-active"
                            />
                            <FormControlLabel
                                value="All"
                                control={<Radio />}
                                label="All"
                            />
                        </RadioGroup>
                    </FormControl>

                    <FormControl sx={{ marginBottom: 4, width: "100%" }} component="fieldset">
                        <FormLabel component="legend" sx={{ marginBottom: 1 }}>
                            Type of Visit
                        </FormLabel>
                        <RadioGroup
                            name="type"
                            value={filters.type}
                            onChange={handleFilterChange}
                        >
                            <FormControlLabel
                                value="Walk In"
                                control={<Radio />}
                                label="Walk in"
                            />
                            <FormControlLabel
                                value="Referral"
                                control={<Radio />}
                                label="Referral"
                            />
                            <FormControlLabel
                                value="Online"
                                control={<Radio />}
                                label="Online"
                            />
                            <FormControlLabel
                                value="All"
                                control={<Radio />}
                                label="All"
                            />
                        </RadioGroup>
                    </FormControl>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSearchResults}
                    >
                        Search Results
                    </Button>
                </Box>
            </Drawer>
        </Box>
    );
};

export default PatientList;