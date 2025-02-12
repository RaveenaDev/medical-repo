import React, {useEffect} from 'react'
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
import {useDispatch, useSelector} from "react-redux";
import {
    getAppointmentRequests,
    getAppointments,
    getPatients,
    getRejectedAppointments
} from "../../../components/State/Admin/Action.js";

function createData(name, appointmentWith, typeVisit, branch, tokenNumber) {
    return { name, appointmentWith, typeVisit, branch, tokenNumber };
}

const appointmentRequests = [1,1,1,1,1,1,1,1]

// Utility function to truncate text
const truncateText = (text, maxLength) => {
    return text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const ReceptionPage = () => {
    const navigate = useNavigate()
    const handleAppointments = () => {
        navigate('/admin/reception/appointments')
    }

    const handlePatients = () => {
        navigate('/admin/reception/patients')
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAppointments());
        dispatch(getAppointmentRequests());
        dispatch(getRejectedAppointments());
        dispatch(getPatients());
    }, [dispatch]);

    const admin = useSelector((store) => store.admin)

    const totalAppointments = admin.totalAppointments
    const totalPatients = admin.patients
    const totalAppointmentRequests = admin.appointmentRequests
    const totalRejectedAppointments = admin.rejectedAppointments

    // console.log("Total Appointments : ",totalAppointments)
    // console.log("Total Patients : ",totalPatients)

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
                                        {totalAppointments.length > 0 ?totalAppointments.slice(0,5).map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } , backgroundColor: '#EEF8F1'
                                                }}
                                            >
                                                <TableCell component="th" scope="row" sx={{color: '#25307f',border:'none',px:0.6,pl:2}}>
                                                    {truncateText(row.caseId,13)}
                                                </TableCell>
                                                <TableCell component="th" scope="row" sx={{color: '#25307f',border:'none',px:0.6}}>
                                                    {truncateText(row.patient.name,13)}
                                                </TableCell>
                                                <TableCell align="center" sx={{border:'none',px:0.6}}>{truncateText(row.doctor.name,14)}</TableCell>
                                                <TableCell align="center" sx={{border:'none',px:0.6}}>{row.typeVisit}</TableCell>
                                                <TableCell align="center" sx={{border:'none',px:0.6}}>{row.department.name}</TableCell>
                                                <TableCell align="center" sx={{border:'none',px:0.6}}>{truncateText(row.tokenDate,13)}</TableCell>
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
                                        )) :
                                            <p>No appointments found.</p>
                                        }
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
                                        {totalPatients.length > 0 ? totalPatients.slice(0,5).map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } , backgroundColor: '#EEF8F1'
                                                }}
                                            >
                                                <TableCell component="th" scope="row" sx={{color: '#25307f',border: 'none',padding: '14px 14px'}}>
                                                    {truncateText(row.name,13)}
                                                </TableCell>
                                                <TableCell component="th" scope="row" sx={{border:'none',padding: '14px 14px'}}>
                                                    {truncateText(row.doctors[0].name,13)}
                                                </TableCell>
                                                <TableCell align="left" sx={{border:'none',padding: '14px 14px'}}>{truncateText(row.role,14)}</TableCell>
                                                <TableCell align="left" sx={{border:'none',padding: '14px 14px'}}>{row.gender}</TableCell>
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
                                        )) :
                                            <p>No patients found.</p>
                                        }
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
                        <h3>Appointment Requests ({totalAppointmentRequests.length})</h3>
                    </div>

                    {
                        totalAppointmentRequests.map((req, index) => (
                            <div key={index} className={styles.items}>
                                <div className={styles.circle}></div>
                                <div>
                                    <h4>{req.patient.name}</h4>
                                    <p>{req.note}</p>
                                    {/*<p>Appointment for ENT, 28 September</p>*/}
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div>
                    <div className={styles.heading2}>
                        <h3>Canceled ({totalRejectedAppointments.length})</h3>
                    </div>

                    {
                        totalRejectedAppointments.map((req, index) => (
                            <div key={index} className={styles.items}>
                                <div className={styles.circle}></div>
                                <div>
                                    <h4>{req.patient.name}</h4>
                                    <p>Appointment for {req.doctor.specialization},DATE</p>
                                    {/*<p>Appointment for ENT, 28 September</p>*/}
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
