import React, {useEffect, useState} from 'react'
import styles from "../styles.module.scss";
import ayu from './departments.module.scss'
import Grid from "@mui/material/Grid2";
import Card from "../../../components/Card/index.jsx";
import {Button} from "@mui/material";
import EntityBasedTable from "../EntityBasedTable/index.jsx";
import DepartCard from "./DepartCard.jsx";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
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

    const cardClickhandler = (e, entity) => {
        console.log("jhgfcg", e, entity);
        if(entity === "patient") {
            setTableIndex(0);
        }
        if(entity === "doctor") {
            setTableIndex(1);
        }
        if(entity === "staff") {
            setTableIndex(2);
        }
        if(entity === "room") {
            setTableIndex(3);
        }
        props?.setEntity(entity);
    }
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
        dispatch(getPatients());
        dispatch(getDoctors());
        dispatch(getStaffs());
        dispatch(getRooms());
        dispatch(getAllDepartments());
    }, [dispatch]);

    const receptionist = useSelector(store => store.receptionist)

    const noOfPatients = receptionist.totalPatients;
    const patients = receptionist.patients;

    const noOfDoctors = receptionist.totalDoctors;
    const doctors = receptionist.doctors;

    const allDepartments = receptionist.departments;

    return (
        <>
            <div style={{minWidth:'1160px'}}>
                <div className={styles.receptionist}>
                    <Grid container spacing={2} justifyContent="flex-end" alignItems="center" flexDirection={{ md: 'row' }} size={12} sx={{margin: '0 0 20px 0'}}>
                        <Grid size={3}>
                            <Card
                                title="Total Patient"
                                subtitle={noOfPatients}
                                handleClickCb={(e) => cardClickhandler(e, "patient")}
                            />
                        </Grid>
                        <Grid size={3}>
                            <Card
                                customStyle={{
                                    backgroundColor: "#EAA000"
                                }}
                                title="Total Doctors"
                                subtitle={noOfDoctors}
                                handleClickCb={(e) => cardClickhandler(e, "doctor")}
                            />
                        </Grid>
                        <Grid size={3}>
                            <Card
                                customStyle={{
                                    backgroundColor: "#2E823B"
                                }}
                                title="Total Staffs"
                                subtitle="250"
                                handleClickCb={(e) => cardClickhandler(e, "staff")}
                            />
                        </Grid>
                        <Grid size={3}>
                            <Card
                                customStyle={{
                                    backgroundColor: "#66A7B4"
                                }}
                                title="Total Rooms"
                                subtitle="80"
                                handleClickCb={(e) => cardClickhandler(e, "room")}
                            />
                        </Grid>
                    </Grid>
                    {!props.entity ? <>
                        <div className={styles.appointmentBlock}>
                            <Grid container spacing={2} justifyContent="space-between" alignItems="center" flexDirection={{ md: 'row' }} size={12} sx={{margin: '0 0 20px 0'}}>
                                <Grid size={3}>
                                    <Button variant="text" sx={{fontSize: "22px", color: "#0150EA", textTransform: "capitalize", padding: "0px"}} onClick={handleCalendar}>Today</Button>
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
