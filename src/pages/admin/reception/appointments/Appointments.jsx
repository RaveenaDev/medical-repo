import React, { useEffect, useState } from 'react';
import Dashboard from '../../dashboard.jsx';
import Card from '../../../../components/Card';
import styles from '../../styles.module.scss';
import Grid from '@mui/material/Grid2';
import EntityBasedTable from '../../EntityBasedTable';
import {Badge, Box, Button} from '@mui/material';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ayu from "../../departments/departments.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function Appointments(props) {
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

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const shapeStyles = { bgcolor: '#25307f', width: 30, height: 26 };
    const shapeCircleStyles = { borderRadius: '50%' };

    const circle = (
        <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles,color: "white",marginTop:"2px",paddingTop:"2px",paddingBottom:"2px",fontSize:"15px",paddingLeft:"1px"}} >20</Box>
    );
    const handleAppointmentRequests = () => {
        console.log("handleAppointmentRequests");
    }
    const handleBilling = () => {
        console.log("handleBilling");
    }
    const handleBookAppointment = () => {
        console.log("handleBookAppointment");
    }
    return (
        <>
            <div className={styles.receptionist}>
                <Grid container spacing={2} justifyContent="flex-end" alignItems="center" flexDirection={{ md: 'row' }} size={12} sx={{margin: '0 0 20px 0'}}>
                    <Grid size={3}>
                        <Card
                            title="Total Patient"
                            subtitle="200+"
                            handleClickCb={(e) => cardClickhandler(e, "patient")}
                        />
                    </Grid>
                    <Grid size={3}>
                        <Card
                            customStyle={{
                                backgroundColor: "#EAA000"
                            }}
                            title="Total Doctors"
                            subtitle="8"
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
                        <Grid container spacing={2} justifyContent="space-between" alignItems="center"
                              flexDirection={{md: 'row'}} size={12} sx={{margin: '0 0 20px 0'}}>
                            <Grid size={3}>
                                <Button variant="text" sx={{
                                    fontSize: "22px",
                                    color: "#0150EA",
                                    textTransform: "capitalize",
                                    padding: "0px"
                                }} onClick={handleCalendar}>Today</Button>
                            </Grid>
                            <Grid size={9} sx={{display: "flex", justifyContent: "flex-end"}}>
                                {/*<Button variant="contained" sx={{fontSize: "20px", color: "#878787", textTransform: "capitalize", padding: "0px 14px", backgroundColor: "#fff", marginRight: "22px"}} onClick={handleAppointmentRequests}><img src="src/assets/account_circle.svg" className={styles.appointmentBlock__accountIcon}/>Appointment Requests</Button>*/}
                                {/*<Button variant="contained" sx={{fontSize: "20px", color: "#878787", textTransform: "capitalize", padding: "0px 14px", backgroundColor: "#fff", marginRight: "22px"}} onClick={handleBilling}><img src="src/assets/payments.svg" className={styles.appointmentBlock__paymentIcon}/>Billing</Button>*/}
                                {/*<Button variant="contained" sx={{fontSize: "20px", color: "#ffffff", textTransform: "capitalize", padding: "0px 14px", backgroundColor: "#25307F"}} onClick={handleBookAppointment}><img src="src/assets/plus.svg" className={styles.appointmentBlock__plusIcon}/>Book Appointment</Button>*/}
                                <Button variant="contained" sx={{
                                    fontSize: "16px",
                                    color: "#878787",
                                    textTransform: "capitalize",
                                    padding: "0px 8px",
                                    backgroundColor: "#fff",
                                    marginRight: "22px"
                                }}><LocalAtmIcon sx={{color: "#25307f"}}/> <span style={{
                                    marginLeft: "14px",
                                    marginRight: "8px",
                                    marginTop: "2px"
                                }}>Billing</span></Button>
                                <Button variant="contained" sx={{
                                    fontSize: "16px",
                                    color: "#878787",
                                    textTransform: "capitalize",
                                    padding: "0px 8px",
                                    backgroundColor: "#fff",
                                    marginRight: "22px"
                                }}>
                                    <div style={{
                                        height: "8px",
                                        width: "8px",
                                        borderRadius: "50%",
                                        backgroundColor: "red",
                                        position: "absolute",
                                        left: "31px",
                                        top: "6px"
                                    }}></div>
                                    {circle}
                                    <span style={{
                                        marginLeft: "16px",
                                        marginRight: "8px",
                                        marginTop: "2px"
                                    }}>Request</span></Button>

                                <FormControl sx={{minWidth: 150, position: 'relative'}} size="small">
                                    <InputLabel
                                        id="demo-select-small-label"
                                        sx={{color: 'white', marginLeft: '22px'}} // White label text
                                    >
                                        All Branches
                                    </InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={age}
                                        label="All Branches is what it wants"
                                        onChange={handleChange}
                                        IconComponent={null} // Disable default icon
                                        sx={{
                                            backgroundColor: '#25307f', // Blue background
                                            color: 'white', // White text
                                            paddingLeft: '32px', // Add padding for custom arrow on the left
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                    {/* Custom Arrow Icon */}
                                    <KeyboardArrowDownIcon
                                        sx={{
                                            position: 'absolute',
                                            left: 8, // Position the arrow on the left
                                            top: '50%', // Center vertically
                                            transform: 'translateY(-50%)',
                                            pointerEvents: 'auto', // Ensure it's clickable
                                            color: 'white', // White arrow color
                                            cursor: 'pointer', // Show pointer cursor for interactivity
                                        }}
                                        onClick={(event) => {
                                            // Stop propagation to ensure Select handles the click
                                            event.stopPropagation();
                                            // Trigger the dropdown programmatically
                                            const selectElement = document.getElementById('demo-select-small');
                                            if (selectElement) {
                                                selectElement.dispatchEvent(new MouseEvent('mousedown', {bubbles: true}));
                                            }
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>

                    <div className={ayu.headerContainer} style={{position: "absolute",left:"315px"}}>
                        <button className={ayu.backButton}>
                            <ArrowBackIosIcon/>
                        </button>
                        <h2 className={ayu.departmentTitle}>Department</h2>
                    </div>

                    <Dashboard/>
                </> : <EntityBasedTable entity={props?.entity} tableIndex={tableIndex}/>}
            </div>
        </>
    );
}

export default Appointments;