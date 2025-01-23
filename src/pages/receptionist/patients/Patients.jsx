import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./patients.module.scss";
import Searchbar from '../../../components/Searchbar';
import NotificationIcon from '../../../components/Notification';
import Grid from "@mui/material/Grid2";
import Card from "../../../components/Card/index.jsx";
import EntityBasedTable from "../EntityBasedTable/index.jsx";
import PatientList from './PatientList.jsx';
import {useDispatch, useSelector} from "react-redux";
import {getDoctors, getPatients, getRooms, getStaffs} from "../../../components/State/Receptionist/Action.js";



const Patients = (props) => {
  const [tableIndex, setTableIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const cardClickhandler = (e, entity) => {
    console.log("jhgfcg", e, entity);
    if (entity === "patient") {
      setTableIndex(0);
    }
    if (entity === "doctor") {
      setTableIndex(1);
    }
    if (entity === "staff") {
      setTableIndex(2);
    }
    if (entity === "room") {
      setTableIndex(3);
    }
    props?.setEntity(entity);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatients());
    dispatch(getDoctors());
    dispatch(getStaffs());
    dispatch(getRooms());
  }, [dispatch]);

  const receptionist = useSelector(store => store.receptionist)

  const noOfPatients = receptionist.totalPatients;
  const patients = receptionist.patients;

  const noOfDoctors = receptionist.totalDoctors;
  const doctors = receptionist.doctors;

  return (
    <div className={styles.patients}>
      <div className={styles.patientHeader}>
        <Searchbar />
        <NotificationIcon />
      </div>

      <div className={styles.cardhandling}>
        <h3 className={styles.heading}>
          Dashboard Overview
        </h3>
        <Grid container spacing={2} justifyContent="flex-end" alignItems="center" flexDirection={{ md: 'row' }} size={12} sx={{ margin: '0 0 20px 0' }}>
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
      </div>

      {!props.entity ? (
        <div className={styles.section}>
          <p className={styles.title}>
            Patient List
          </p>

          <PatientList allPatients={{noOfPatients,patients}}/>


          {/* <button onClick={() => navigate('/profile')} style={{backgroundColor: "white"}}>
            Click here to view the profile
          </button> */}
        </div>
      ) : (
        <EntityBasedTable entity={props?.entity} tableIndex={tableIndex} />
      )}
    </div>
  );
};

export default Patients;
