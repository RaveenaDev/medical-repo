import React, { useEffect } from "react";
import ayu from "../patients/patients.module.scss";
import Searchbar from "../../../components/Searchbar/index.jsx";
import Grid from "@mui/material/Grid2";
import Card from "../../../components/Card/index.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDoctors,
  getPatients,
  getRooms,
  getStaffs,
} from "../../../components/State/Receptionist/Action.js";
import Notifications from "../../../components/NotificationFunc/Notification.jsx";

const CommonPanel = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatients());
    dispatch(getDoctors());
    dispatch(getStaffs());
    dispatch(getRooms());
  }, [dispatch]);

  const receptionist = useSelector((store) => store.receptionist);

  const noOfPatients = receptionist.totalPatients;
  const patients = receptionist.patients;

  const noOfDoctors = receptionist.totalDoctors;
  const doctors = receptionist.doctors;

  const noOfStaffs = receptionist.totalStaffs;
  const staffs = receptionist.staffs;

  const noOfRooms = receptionist.totalRooms;
  const rooms = receptionist.rooms;

  return (
    <div className={ayu.patients}>
      <div className={ayu.patientHeader}>
        <Searchbar />
        <Notifications />
      </div>

      <div className={ayu.cardhandling}>
        <h3 className={ayu.heading}>Dashboard Overview</h3>
      </div>

      <Grid
        container
        spacing={2}
        justifyContent="flex-end"
        alignItems="center"
        flexDirection={{ md: "row" }}
        size={10}
        sx={{ margin: "0 0 18px 0" }}
      >
        <Grid size={3}>
          <Card
            title="Total Patient"
            subtitle={noOfPatients}
            handleClickCb={() => navigate(`/receptionist/patients`)}
          />
        </Grid>
        <Grid size={3}>
          <Card
            customStyle={{
              backgroundColor: "#EAA000",
            }}
            title="Total Doctors"
            subtitle={noOfDoctors}
            handleClickCb={() =>
              navigate(`/receptionist/doctors`, { state: { doctors } })
            }
          />
        </Grid>
        <Grid size={3}>
          <Card
            customStyle={{
              backgroundColor: "#2E823B",
            }}
            title="Total Staffs"
            subtitle={noOfStaffs}
            handleClickCb={() =>
              navigate(`/receptionist/staffs`, { state: { staffs } })
            }
          />
        </Grid>
        <Grid size={3}>
          <Card
            customStyle={{
              backgroundColor: "#66A7B4",
            }}
            title="Total Rooms"
            subtitle={noOfRooms}
            handleClickCb={() =>
              navigate(`/receptionist/rooms`, {
                state: { rooms: [...rooms], doctors: [...doctors] },
              })
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default CommonPanel;
