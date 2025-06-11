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
  getAllDepartments,
  getBillingRecords,
  getDoctors,
  getPatients,
  getStaffs,
} from "../../../components/State/Admin/Action.js";
import {getRooms} from "../../../components/State/Doctor/Action.js";


const CommonPanel = ({
  setSelectedDate,
  selectedDate,
  setSelectedDepartment,
  selectedDepartment,
}) => {
  const navigate = useNavigate();

  const location = useLocation(); // Get the current route
  const dispatch = useDispatch();

  const [department, setDepartment] = useState("");

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
    dispatch(getDoctors());
    dispatch(getStaffs());
    dispatch(getRooms());
    dispatch(getAllDepartments());
    dispatch(getBillingRecords());
  }, [dispatch]);

  const doctor = useSelector((store) => store.admin);

  const noOfDoctors = doctor.totalDoctors;
  const doctors = doctor.doctors;

  const noOfStaffs = doctor.totalStaffs;
  const staffs = doctor.staffs;

  const noOfRooms = doctor.totalRooms;
  const rooms = doctor.rooms;

  const departments = useSelector((state) => state.admin.departments);

  const handleRoomsClick = (rooms) => {
    navigate(`/doctor/rooms`, { state: { rooms } });
  };
  const handleInpatientsClick = (doctors) => {
    navigate(`/doctor/inpatients`, { state: { doctors } });
  };
  const handleSurgeriesClick = (staffs) => {
    navigate(`/doctor/surgeries`, { state: { staffs } });
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
              subtitle="250+"
              handleClickCb={() => navigate(`/doctor/patient`)}
            />
          </Grid>
          <Grid size={3}>
            <Card
              customStyle={{
                backgroundColor: "#EAA000",
              }}
              title="Total Inpatients"
              subtitle="20"
              handleClickCb={() => handleInpatientsClick(doctors)}
            />
          </Grid>
          <Grid size={3}>
            <Card
              customStyle={{
                backgroundColor: "#2E823B",
              }}
              title="Total Surgeries"
              subtitle="250"
              handleClickCb={() => handleSurgeriesClick(staffs)}
            />
          </Grid>
          <Grid size={3}>
            <Card
              customStyle={{
                backgroundColor: "#66A7B4",
              }}
              title="Total Rooms"
              subtitle="80"
              handleClickCb={() => handleRoomsClick(rooms)}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default CommonPanel;
