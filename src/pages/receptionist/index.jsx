import React, { useEffect, useState } from 'react';
import Dashboard from './dashboard';
import Card from '../../components/Card';
import styles from './styles.module.scss';
import Grid from '@mui/material/Grid2';
import EntityBasedTable from './EntityBasedTable';
import { Button } from '@mui/material';

function Receptionist(props) {
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
            <Grid container spacing={2} justifyContent="space-between" alignItems="center" flexDirection={{ md: 'row' }} size={12} sx={{margin: '0 0 20px 0'}}>
              <Grid size={3}>
                <Button variant="text" sx={{fontSize: "22px", color: "#0150EA", textTransform: "capitalize", padding: "0px"}} onClick={handleCalendar}>Today</Button>
              </Grid>
              <Grid size={9} sx={{display: "flex", justifyContent: "flex-end"}}>
                <Button variant="contained" sx={{fontSize: "20px", color: "#878787", textTransform: "capitalize", padding: "0px 14px", backgroundColor: "#fff", marginRight: "22px"}} onClick={handleAppointmentRequests}><img src="src/assets/account_circle.svg" className={styles.appointmentBlock__accountIcon}/>Appointment Requests</Button>
                <Button variant="contained" sx={{fontSize: "20px", color: "#878787", textTransform: "capitalize", padding: "0px 14px", backgroundColor: "#fff", marginRight: "22px"}} onClick={handleBilling}><img src="src/assets/payments.svg" className={styles.appointmentBlock__paymentIcon}/>Billing</Button>
                <Button variant="contained" sx={{fontSize: "20px", color: "#ffffff", textTransform: "capitalize", padding: "0px 14px", backgroundColor: "#25307F"}} onClick={handleBookAppointment}><img src="src/assets/plus.svg" className={styles.appointmentBlock__plusIcon}/>Book Appointment</Button>
              </Grid>
            </Grid>
          </div>
          <Dashboard/>
        </> : <EntityBasedTable entity={props?.entity} tableIndex={tableIndex}/>}
			</div>
    </>
  );
}

export default Receptionist;