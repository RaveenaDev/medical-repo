import React, { useEffect, useState } from "react";
import ayu from "./CommonPanel.module.scss";
import Searchbar from "../../../components/Searchbar/index.jsx";
import Grid from "@mui/material/Grid2";
import Card from "../../../components/Card/index.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import Notifications from "../../../components/NotificationFunc/Notification.jsx";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppointmentsOfToday,
  getInpatients,
  getPatients,
  getRooms,
  getSurgeries,
} from "../../../components/State/Doctor/Action.js";

const CommonPanel = ({ setSelectedDepartment, selectedDepartment }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isActive = (path) => location.pathname.startsWith(path);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD"),
  );

  useEffect(() => {
    const startDate = dayjs(selectedDate).startOf("day").toISOString();
    const endDate = dayjs(selectedDate).endOf("day").toISOString();

    if (selectedDate) {
      dispatch(getAppointmentsOfToday(startDate, endDate));
    }

    dispatch(getPatients());
    dispatch(getInpatients());
    dispatch(getSurgeries());
    dispatch(getRooms());
  }, [dispatch]);

  const doctor = useSelector((store) => store.doctor);

  const appointments = useSelector((store) => store.doctor.appointmentsOfToday);
  const todayAppointments = appointments ? appointments.length : 0;

  const noOfPatients = doctor.totalPatients ? doctor.totalPatients : 0;
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
    navigate(`/doctor/patient`, { state: { patients } });
  };
  const handleInpatientsClick = (inPatients) => {
    navigate(`/doctor/inpatients`, { state: { inPatients } });
  };
  const handleSurgeriesClick = (surgeries) => {
    navigate(`/doctor/surgeries`, { state: { surgeries } });
  };

  const doctorName =
    useSelector((state) => state.authentication.userName) ||
    localStorage.getItem("username");
  return (
    <>
      <div className={ayu.patients}>
        {/*<div className={ayu.patientHeader}>*/}
        {/*  <Searchbar />*/}
        {/*  <Notifications />*/}
        {/*</div>*/}

        <div className={ayu.cardhandling}>
          <h4 className={ayu.heading}>Hello, Dr. {doctorName}</h4>
          <p>
            I hope you are in good mood because there are {todayAppointments}{" "}
            patients waiting for you.
          </p>
        </div>

        <Grid
          container
          spacing={2}
          justifyContent="flex-end"
          alignItems="center"
          flexDirection={{ md: "row" }}
          size={12}
          sx={{
            margin: "0 0 10px 0",
          }}
        >
          <Grid
            size={3}
            sx={{
              borderBottom: isActive("/doctor/patient")
                ? "3px solid #00a378"
                : "none",
            }}
          >
            <Card
              title="Patients"
              subtitle={noOfPatients}
              handleClickCb={() => handlePatientsClick(patients)}
            />
          </Grid>
          <Grid
            size={3}
            sx={{
              borderBottom: isActive("/doctor/inpatients")
                ? "3px solid #00a378"
                : "none",
            }}
          >
            <Card
              customStyle={{
                backgroundColor: "#EAA000",
              }}
              title="Inpatients"
              subtitle={noOfInpatients}
              handleClickCb={() => handleInpatientsClick(inPatients)}
            />
          </Grid>
          <Grid
            size={3}
            sx={{
              borderBottom: isActive("/doctor/surgeries")
                ? "3px solid #00a378"
                : "none",
            }}
          >
            <Card
              customStyle={{
                backgroundColor: "#2E823B",
              }}
              title="Surgeries"
              subtitle={noOfSurgeries}
              handleClickCb={() => handleSurgeriesClick(surgeries)}
            />
          </Grid>
          <Grid
            size={3}
            sx={{
              borderBottom: isActive("/doctor/rooms")
                ? "3px solid #00a378"
                : "none",
            }}
          >
            <Card
              customStyle={{
                backgroundColor: "#66A7B4",
              }}
              title="Rooms"
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
