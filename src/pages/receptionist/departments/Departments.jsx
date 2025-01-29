import React, {useEffect, useState} from 'react'
import styles from "../styles.module.scss";
import ayu from './departments.module.scss'
import Grid from "@mui/material/Grid2";
import Card from "../../../components/Card/index.jsx";
import {Button} from "@mui/material";
import EntityBasedTable from "../EntityBasedTable/index.jsx";
import DepartCard from "./DepartCard.jsx";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CommonPanel from "../components/CommonPanel.jsx";
import accountCircle from '../../../assets/account_circle.svg';
import billingDetails from "../../../assets/payments.svg";
import addAppointments from "../../../assets/plus.svg";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllDepartments,
    getDoctors,
    getPatients,
    getRooms,
    getStaffs
} from "../../../components/State/Receptionist/Action.js";

const Departments = (props) => {
    const [tableIndex, setTableIndex] = useState(null);
    useEffect(() => {
        props?.setIsSignUpOrLogin(false);
    }, []);
    const handleCalendar = () => {
        console.log("handleCalendar");
    }
    const handleAppointmentRequests = () => {
        console.log("handleAppointmentRequests");
    }
    const handleBilling = () => {
        console.log("handleBilling");
    }
    const handleBookAppointment = () => {
        console.log("handleBookAppointment");
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllDepartments());
    }, [dispatch]);

    const receptionist = useSelector(store => store.receptionist)


    const allDepartments = receptionist.departments;

    return (
        <>
            <div style={{minWidth:'1160px'}}>
                <div className={styles.receptionist}>
                    <CommonPanel/>

                    {!props.entity ? <>
                        <div className={styles.appointmentBlock}>
                            <Grid container spacing={2} justifyContent="space-between" alignItems="center" flexDirection={{ md: 'row' }} size={12} sx={{margin: '0 0 20px 0'}}>
                                <Grid size={3}>
                                    <Button variant="text" sx={{fontSize: "22px", color: "#0150EA", textTransform: "capitalize", padding: "0px"}} onClick={handleCalendar}>Today</Button>
                                </Grid>
                                <Grid size={9} sx={{display: "flex", justifyContent: "flex-end"}}>
                                    <Button variant="contained" sx={{
                                        fontSize: "20px",
                                        color: "#878787",
                                        textTransform: "capitalize",
                                        padding: "0px 14px",
                                        backgroundColor: "#fff",
                                        marginRight: "22px"
                                    }} onClick={handleAppointmentRequests}><img src={accountCircle}
                                                                                className={styles.appointmentBlock__accountIcon}/>Appointment
                                        Requests</Button>
                                    <Button variant="contained" sx={{
                                        fontSize: "20px",
                                        color: "#878787",
                                        textTransform: "capitalize",
                                        padding: "0px 14px",
                                        backgroundColor: "#fff",
                                        marginRight: "22px"
                                    }} onClick={handleBilling}><img src={billingDetails}
                                                                    className={styles.appointmentBlock__paymentIcon}/>Billing</Button>
                                    <Button variant="contained" sx={{
                                        fontSize: "20px",
                                        color: "#ffffff",
                                        textTransform: "capitalize",
                                        padding: "0px 14px",
                                        backgroundColor: "#25307F"
                                    }} onClick={handleBookAppointment}><img src={addAppointments}
                                                                            className={styles.appointmentBlock__plusIcon}/>Book
                                        Appointment</Button>
                                </Grid>
                            </Grid>
                        </div>

                        <div className={ayu.headerContainer}>
                            <button className={ayu.backButton}>
                                <ArrowBackIosIcon/>
                            </button>
                            <h2 className={ayu.departmentTitle}>Department</h2>
                        </div>

                        {/* Horizontal line */}
                        <hr style={{border: '1px solid #d3d3d3', margin: '20px 0'}} />

                        {/* Cards */}

                        <div className={ayu.superCardContainer}>
                            {
                                allDepartments.map((department,index) => (
                                    <DepartCard key={index} department={department}/>
                                ))
                            }

                            {/*<DepartCard/>*/}
                            {/*<DepartCard/>*/}
                            {/*<DepartCard/>*/}
                            {/*<DepartCard/>*/}
                            {/*<DepartCard/>*/}
                        </div>

                    </> : <EntityBasedTable entity={props?.entity} tableIndex={tableIndex}/>}
                </div>
            </div>
        </>
    )
}
export default Departments
