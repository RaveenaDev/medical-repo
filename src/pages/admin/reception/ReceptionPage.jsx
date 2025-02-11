import React from 'react'
import Grid from "@mui/material/Grid2";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import styles from './receptionPage.module.scss'
import ayu from "../departments/departments.module.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {useNavigate} from "react-router-dom";

function createData(name, appointmentWith, typeVisit, branch, tokenNumber) {
    return { name, appointmentWith, typeVisit, branch, tokenNumber };
}

const rows = [
    createData('Jasmin Kaur', 'Miss Gitanjali', 'Walk-in', 'Therapy', 2),
    createData('Amit Tripath', 'Miss Ananya Pandey', 'Referral', 'Therapy', 1),
    createData('Arvind Sharma', '+91 7245674634', 'Walk-in', 'Therapy', 2),
    createData('Kumari Sneha', '+91 7245674634', 'Online', 'Cardiology', 3),
    createData('Neeraj Tomar', '+91 7245674634', 'Online', 'Cardiology', 2),
];

const appointmentRequests = [1,1,1,1,1,1,1,1]

// Utility function to truncate text
const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const ReceptionPage = () => {
    const navigate = useNavigate()
    const handleAppointments = () => {
        navigate('/admin/reception/appointments')
    }

    const handlePatients = () => {
        navigate('/admin/reception/patients')
    }

    return (
        <Grid container spacing={2}>
            <Grid size={8.5}>
                <Grid container direction="column" spacing={2}>
                    {/* First vertically stacked item */}
                    <Grid className={styles.container1}>
                        <div className={styles.heading1} onClick={handleAppointments}>
                            <h3>Appointments</h3>
                            <span className={ayu.forwardButton}>
                                <ArrowForwardIosIcon/>
                            </span>
                        </div>

                        <div>
                            <TableContainer >
                                <Table sx={{borderCollapse: "separate", // Ensure border-spacing works
                                    borderSpacing: "0 4px", // Adds vertical spacing between rows
                                }} >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontSize: '13px',color: '#959595',padding: '0.5 1',border:'none',px:0.6}}>Case ID</TableCell>
                                            <TableCell align="left" sx={{ fontSize: '13px',color: '#959595',padding: '0.5 1',border:'none',px:0.6}}>Name</TableCell>
                                            <TableCell align="center" sx={{ fontSize: '13px',color: '#959595',padding: '0.5 1',border:'none',px:0.6}}>Appointment With</TableCell>
                                            <TableCell align="center" sx={{ fontSize: '13px',color: '#959595',padding: '0.5 1',border:'none',px:0.6}}>Type Visit</TableCell>
                                            <TableCell align="center" sx={{ fontSize: '13px',color: '#959595',padding: '0.5 1',border:'none',px:0.6}}>Branch</TableCell>
                                            <TableCell align="center" sx={{ fontSize: '13px',color: '#959595',padding: '0.5 1',border:'none',px:0.6}}>Token&nbsp;No.</TableCell>
                                            <TableCell align="center" sx={{ fontSize: '13px',color: '#959595',padding: '0.5 1',border:'none',px:0.6}}>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } , backgroundColor: '#EEF8F1'
                                                }}
                                            >
                                                <TableCell component="th" scope="row" sx={{color: '#25307f',border:'none',px:0.6,pl:2}}>
                                                    XXXXXXXX
                                                </TableCell>
                                                <TableCell component="th" scope="row" sx={{color: '#25307f',border:'none',px:0.6}}>
                                                    {truncateText(row.name,13)}
                                                </TableCell>
                                                <TableCell align="center" sx={{border:'none',px:0.6}}>{truncateText(row.appointmentWith,14)}</TableCell>
                                                <TableCell align="center" sx={{border:'none',px:0.6}}>{row.typeVisit}</TableCell>
                                                <TableCell align="center" sx={{border:'none',px:0.6}}>{row.branch}</TableCell>
                                                <TableCell align="center" sx={{border:'none',px:0.6}}>{row.tokenNumber}</TableCell>
                                                <TableCell align="center" sx={{border:'none',px:0.6,pr:2}}>
                                                    <span
                                                        style={{
                                                            color: 'white',
                                                            backgroundColor: '#3DB461', // Replace with your desired color
                                                            padding: '3px 8px',        // Add padding for spacing
                                                            borderRadius: '12px',       // Add rounded corners
                                                            display: 'inline-block',   // Ensures the span wraps only the text
                                                            fontSize: '12px'
                                                        }}
                                                    >
                                                        Ongoing
                                                     </span>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Grid>
                    {/* Second vertically stacked item */}
                    <Grid className={styles.container1}>
                        <div className={styles.heading1} onClick={handlePatients}>
                            <h3>Patients</h3>
                            <span className={ayu.forwardButton}>
                                <ArrowForwardIosIcon/>
                            </span>
                        </div>

                        <div>
                            <TableContainer component={Paper}>
                                <Table sx={{borderCollapse: "separate", // Ensure border-spacing works
                                    borderSpacing: "0 4px", // Adds vertical spacing between rows
                                }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontSize: '13px',color: '#959595',padding: '0.5 1',border:'none'}}>Name</TableCell>
                                            <TableCell align="left" sx={{ fontSize: '13px',color: '#959595',padding: '0.5 1',border:'none'}}>Responsible</TableCell>
                                            <TableCell align="left" sx={{ fontSize: '13px',color: '#959595',padding: '0.5 1',border:'none'}}>Phase</TableCell>
                                            <TableCell align="left" sx={{ fontSize: '13px',color: '#959595',padding: '0.5 1',border:'none'}}>Branch</TableCell>
                                            <TableCell align="center" sx={{ fontSize: '13px',color: '#959595',padding: '0.5 1',border:'none'}}>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } , backgroundColor: '#EEF8F1'
                                                }}
                                            >
                                                <TableCell component="th" scope="row" sx={{color: '#25307f',border: 'none',padding: '14px 14px'}}>
                                                    {truncateText(row.name,13)}
                                                </TableCell>
                                                <TableCell component="th" scope="row" sx={{border:'none',padding: '14px 14px'}}>
                                                    {truncateText(row.name,13)}
                                                </TableCell>
                                                <TableCell align="left" sx={{border:'none',padding: '14px 14px'}}>{truncateText(row.appointmentWith,14)}</TableCell>
                                                <TableCell align="left" sx={{border:'none',padding: '14px 14px'}}>{row.typeVisit}</TableCell>
                                                <TableCell align="center" sx={{border:'none',padding: '14px 14px'}}>
                                                    <span
                                                        style={{
                                                            color: '#4b9758',
                                                            backgroundColor: '#c6e1cb', // Replace with your desired color
                                                            padding: '6px 14px',        // Add padding for spacing
                                                            borderRadius: '16px',       // Add rounded corners
                                                            display: 'inline-block',   // Ensures the span wraps only the text
                                                            fontSize: '12px',
                                                            border: '1px solid #4b9758'
                                                        }}
                                                    >
                                                        Active
                                                     </span>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid size={3.5} className={styles.container1} sx={{ maxHeight: 'calc(110vh - 150px)', overflowY: 'auto' }}>
                <div>
                    <div className={styles.heading1}>
                        <h3>Appointment Requests (8)</h3>
                    </div>

                    {
                        appointmentRequests.map((req, index) => (
                            <div key={index} className={styles.items}>
                                <div className={styles.circle}></div>
                                <div>
                                    <h4>Mohan Sharma</h4>
                                    <p>Appointment for ENT, 28 September</p>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div>
                    <div className={styles.heading2}>
                        <h3>Canceled (4)</h3>
                    </div>

                    {
                        appointmentRequests.map((req, index) => (
                            <div key={index} className={styles.items}>
                                <div className={styles.circle}></div>
                                <div>
                                    <h4>Mohan Sharma</h4>
                                    <p>Appointment for ENT, 28 September</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Grid>
        </Grid>
    )
}
export default ReceptionPage
