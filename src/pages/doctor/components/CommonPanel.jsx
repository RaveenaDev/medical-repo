import React, { useEffect, useState } from "react";
import ayu from "./CommonPanel.module.scss";
import Searchbar from "../../../components/Searchbar/index.jsx";
import Grid from "@mui/material/Grid2";
import Card from "../../../components/Card/index.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import Notifications from "../../../components/NotificationFunc/Notification.jsx";
import { Box, Button, MenuItem, Select } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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

import { Dropdown } from "primereact/dropdown";

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

  const handleRoomClick = (rooms) => {
    navigate(`/admin/rooms`, { state: { rooms } });
  };
  const handleDocClick = (doctors) => {
    navigate(`/admin/doctors`, { state: { doctors } });
  };
  const handleStaffClick = (staffs) => {
    navigate(`/admin/staffs`, { state: { staffs } });
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

  // const [selectedDate, setSelectedDate] = useState(dayjs());

  const shapeStyles = { bgcolor: "#25307f", width: 30, height: 26 };
  const shapeCircleStyles = { borderRadius: "50%" };

  const circle = (
    <Box
      component="span"
      sx={{
        ...shapeStyles,
        ...shapeCircleStyles,
        color: "#ffffff",
        marginTop: "2px",
        paddingTop: "2px",
        paddingBottom: "2px",
        fontSize: "15px",
        paddingLeft: "1px",
      }}
    >
      20
    </Box>
  );
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
          <h3 className={ayu.heading}>Dashboard Overview</h3>
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
              subtitle="200+"
              handleClickCb={() => navigate(`/admin/earnings`)}
            />
          </Grid>
          <Grid size={3}>
            <Card
              customStyle={{
                backgroundColor: "#EAA000",
              }}
              title="Total Doctors"
              subtitle="20"
              handleClickCb={() => handleDocClick(doctors)}
            />
          </Grid>
          <Grid size={3}>
            <Card
              customStyle={{
                backgroundColor: "#2E823B",
              }}
              title="Total Staffs"
              subtitle="250"
              handleClickCb={() => handleStaffClick(staffs)}
            />
          </Grid>
          <Grid size={3}>
            <Card
              customStyle={{
                backgroundColor: "#66A7B4",
              }}
              title="Total Rooms"
              subtitle="80"
              handleClickCb={() => handleRoomClick(rooms)}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default CommonPanel;
