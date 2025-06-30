import React, { useEffect, useState } from "react";
import ayu from "./CommonPanel.module.scss";
import Searchbar from "../../../components/Searchbar/index.jsx";
import Grid from "@mui/material/Grid2";
import Card from "../../../components/Card/index.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import Notifications from "../../../components/NotificationFunc/Notification.jsx";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {getInpatients, getPatients, getRooms, getSurgeries} from "../../../components/State/Doctor/Action.js";


const CommonPanel = ({
  setSelectedDate,
  selectedDate,
  setSelectedDepartment,
  selectedDepartment,
}) => {
  const navigate = useNavigate();

  const location = useLocation(); // Get the current route
  const dispatch = useDispatch();

  // Default to today's date if props are not provided
  const [internalSelectedDate, setInternalSelectedDate] = useState(dayjs());

  const handleDateChange = (newValue) => {
    if (setSelectedDate) {
      setSelectedDate(newValue);
    } else {
      setInternalSelectedDate(newValue);
    }
  };

  useEffect(() => {
    dispatch(getPatients());
    dispatch(getInpatients());
    dispatch(getSurgeries());
    dispatch(getRooms());
  }, [dispatch]);

  const doctor = useSelector((store) => store.doctor);

  const noOfPatients = doctor.totalPatients;
  const patients = doctor.patients;

  const noOfInpatients = doctor.totalInpatients;
  const inPatients = doctor.inPatients;

  const noOfSurgeries = doctor.totalSurgeries;
  const surgeries = doctor.surgeries;

  const noOfRooms = doctor.totalRooms;
  const rooms = doctor.rooms;

  const handleRoomsClick = (rooms) => {
    navigate(`/doctor/rooms`, { state: { rooms } });
  };

  const handlePatientsClick = (patients) => {
    navigate(`/doctor/patient`, {state: {patients}})
  }
  const handleInpatientsClick = (inPatients) => {
    navigate(`/doctor/inpatients`, { state: { inPatients } });
  };
  const handleSurgeriesClick = (surgeries) => {
    navigate(`/doctor/surgeries`, { state: { surgeries } });
  };

  return (
    <>
      <div className={ayu.patients}>
        <div className={ayu.patientHeader}>
          <Searchbar />
          <Notifications />
        </div>

        <div className={ayu.cardhandling}>
          <h4 className={ayu.heading}>Good Morning, Dr. Amit Patil</h4>
          <p>I hope you are in good mood because there are 45 patients waiting for you.</p>
        </div>

        <Grid
          container
          spacing={2}
          justifyContent="flex-end"
          alignItems="center"
          flexDirection={{ md: "row" }}
          size={12}
          sx={{ margin: "0 0 10px 0" }}
        >
          <Grid size={3}>
            <Card
              title="Total Patients"
              subtitle={noOfPatients}
              handleClickCb={() => handlePatientsClick(patients)}
            />
          </Grid>
          <Grid size={3}>
            <Card
              customStyle={{
                backgroundColor: "#EAA000",
              }}
              title="Total Inpatients"
              subtitle={noOfInpatients}
              handleClickCb={() => handleInpatientsClick(inPatients)}
            />
          </Grid>
          <Grid size={3}>
            <Card
              customStyle={{
                backgroundColor: "#2E823B",
              }}
              title="Total Surgeries"
              subtitle={noOfSurgeries}
              handleClickCb={() => handleSurgeriesClick(surgeries)}
            />
          </Grid>
          <Grid size={3}>
            <Card
              customStyle={{
                backgroundColor: "#66A7B4",
              }}
              title="Total Rooms"
              subtitle={noOfRooms}
              handleClickCb={() => handleRoomsClick(rooms)}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default CommonPanel;
