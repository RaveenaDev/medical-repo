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
    MenuItem,
    IconButton,
    Button,
    Chip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

const PatientList = () => {
    const [sortOrder, setSortOrder] = useState("Newest to Oldest");
    const [selectedRow, setSelectedRow] = useState(null);
    const [patients, setPatients] = useState([
        {
            id: "XXXXXXX",
            name: "Amit Tripathi",
            email: "amittripathi@gmail.com",
            phone: "+91 79327728",
            type: "Referral",
            branch: "Cardiology",
            date: "08-10-2024",
            status: "In-active",
        },
        {
            id: "XXXXXXX",
            name: "Kumari Sneha",
            email: "kumarishe@gmail.com",
            phone: "+91 79327728",
            type: "Online",
            branch: "Cardiology",
            date: "08-10-2024",
            status: "In-active",
        },
        {
            id: "XXXXXXX",
            name: "Aditya Soni",
            email: "adityasoni@gmail.com",
            phone: "+91 79327728",
            type: "Online",
            branch: "Cardiology",
            date: "08-10-2024",
            status: "In-active",
        },
        {
            id: "XXXXXXX",
            name: "Khushi Saini",
            email: "khushisaini@gmail.com",
            phone: "+91 79327728",
            type: "Referral",
            branch: "Cardiology",
            date: "08-10-2024",
            status: "In-active",
        },
        {
            id: "XXXXXXX",
            name: "Ayush Trivedi",
            email: "ayushtrivedi@gmail.com",
            phone: "+91 79327728",
            type: "Referral",
            branch: "Cardiology",
            date: "08-10-2024",
            status: "In-active",
        },
    ]);

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleRowClick = (index) => {
        setSelectedRow(index);
    };

    return (
        <Box sx={{
            padding: 3,

        }}>


            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",

                    mb: 3,
                }}
            >

                {/* Header Section */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 3,



                    }}
                >

                    <Box


                    >
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: "bold", display: "inline", mr: 1 }}
                        >
                            56
                        </Typography>
                        <Typography variant="body1" sx={{ display: "inline" }}>
                            Patients
                        </Typography>
                    </Box>


                    <Box sx={{ display: "flex", flexDirection: "row", alignContent: "center" }}>
                        <Typography variant="body1" sx={{ display: "inline" }}>
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





                {/* Filter Section */}
                <Box
                    sx={{
                        alignItems: "center",
                        mb: 2,
                    }}
                >

                    <Button
                        variant="outlined"
                        startIcon={<FilterAltOutlinedIcon />}
                        sx={{ textTransform: "none" }}
                    >
                        Filter
                    </Button>
                </Box>



            </Box>







            {/* Table Section */}
            <TableContainer component={Paper}>
                <Table>
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
                        {patients.map((patient, index) => (
                            <TableRow
                                key={index}
                                onClick={() => handleRowClick(index)}
                                sx={{
                                    border: selectedRow === index ? "2px solid #007bff" : "none",
                                    "&:hover": {
                                        cursor: "pointer",
                                        backgroundColor: "#f9f9f9",
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
                                        color="default"
                                        size="small"
                                        sx={{
                                            bgcolor: "#f0f0f0",
                                            color: "#757575",
                                            fontWeight: "bold",
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton>
                                        <MoreVertIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default PatientList;
