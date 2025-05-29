import React, { useEffect, useState } from "react";
import ayu from "./CommonPanel.module.scss";
import Searchbar from "../../../components/Searchbar/index.jsx";
import Grid from "@mui/material/Grid2";
import Card from "../../../components/Card/index.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import Notifications from "../../../components/NotificationFunc/Notification.jsx";
import { Box} from "@mui/material";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDepartments,
  getBillingRecords,
  getDoctors,
  getPatients,
  getRooms,
  getStaffs,
} from "../../../components/State/Admin/Action.js";


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

  const admin = useSelector((store) => store.admin);

  const noOfDoctors = admin.totalDoctors;
  const doctors = admin.doctors;

  const noOfStaffs = admin.totalStaffs;
  const staffs = admin.staffs;

  const noOfRooms = admin.totalRooms;
  const rooms = admin.rooms;

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

  // Define the routes where you want to hide the div
  const excludedRoutes = [
    "/admin/doctors",
    "/admin/staffs",
    "/admin/rooms",
    "/admin/requests",
    "/admin/billings",
    "/admin/reception/patients",
    "/admin/departments",
    "/admin/reception",
    // "/admin/reception/appointments",
  ];

  // Check if the current route is in the excluded routes list
  const shouldHideDiv = excludedRoutes.includes(location.pathname);

  const handleDepartmentChange = (event) => {
    const selectedValue = event.target.value;
    setDepartment(selectedValue);
  };

  const departmentOptions = [
    { label: "All Branches", value: "all" }, // default option
    ...departments.map((dept) => ({
      label: dept.departmentName,
      value: dept.departmentId,
    })),
  ];
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
              handleClickCb={() => navigate(`/admin/earnings`)}
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
