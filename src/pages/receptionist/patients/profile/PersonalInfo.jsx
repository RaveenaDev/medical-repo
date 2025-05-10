
import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';


const PersonalInfo = () => {


    const tables = [
        {
            headers: ["Gender", "Birthday", "Phone Number"],
            data: ["Female", "Feb 24th, 1997", "+91 79327728"]
        },
        {
            headers: ["Address", "Case ID", "Assessed by"],
            data: ["Data A", "Data B", "Dr. Arunita"]
        },
        {
            headers: ["Member status", "Registered Date"],
            data: ["Active Member", "June 24th, 2024"]
        }
    ];



    return (

        <>

            {tables.map((table, index) => (
                <React.Fragment key={index}>
                    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
                        <Table sx={{ border: "none" }}>
                            <TableHead>
                                <TableRow>
                                    {table.headers.map((header, i) => (
                                        <TableCell
                                            key={i}
                                            align="center"
                                            sx={{
                                                borderBottom: "none",
                                                padding: "4px 8px", // Reduced padding
                                                fontSize: "14px",
                                                color: "#4A4A4A",
                                                fontWeight: "600"
                                            }}
                                        >
                                            {header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    {table.data.map((cell, i) => (
                                        <TableCell
                                            key={i}
                                            align="center"
                                            sx={{
                                                borderBottom: "none",
                                                padding: "20.5px 8px", // Reduced padding
                                                fontSize: "15px",
                                                color: "#1A1A1A",
                                                fontWeight: "700"
                                            }}
                                        >
                                            {cell}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {index < tables.length - 1 && <Divider sx={{ margin: "0px 0" }} />}
                </React.Fragment>
            ))}

        </>


    );




}


export default PersonalInfo;