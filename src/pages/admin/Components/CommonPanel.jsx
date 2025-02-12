import React, { useEffect, useState } from "react";
import ayu from "../../receptionist/patients/patients.module.scss";
import Searchbar from "../../../components/Searchbar/index.jsx";
import Grid from "@mui/material/Grid2";
import Card from "../../../components/Card/index.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import Notifications from "../../../components/NotificationFunc/Notification.jsx";
import styles from "../../receptionist/styles.module.scss";
import { Box, Button } from "@mui/material";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Select1 from "../../../components/Select/index.jsx";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  getDoctors,
  getPatients,
  getRooms,
  getStaffs,
} from "../../../components/State/Admin/Action.js";

const CommonPanel = () => {
  const navigate = useNavigate();
  const [branches, setBranches] = useState(["All Branches", "Cardiology","Physiology"]);

  const location = useLocation(); // Get the current route
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatients());
    dispatch(getDoctors());
    dispatch(getStaffs());
    dispatch(getRooms());
  }, [dispatch]);

  const admin = useSelector((store) => store.admin);

  const noOfDoctors = admin.totalDoctors;
  const doctors = admin.doctors;

  const noOfStaffs = admin.totalStaffs;
  const staffs = admin.staffs;

  const noOfRooms = admin.totalRooms;
  const rooms = admin.rooms;

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
  ];

  // Check if the current route is in the excluded routes list
  const shouldHideDiv = excludedRoutes.includes(location.pathname);

  const [selectedDate, setSelectedDate] = useState(dayjs());


  const shapeStyles = { bgcolor: "#25307f", width: 30, height: 26 };
  const shapeCircleStyles = { borderRadius: "50%" };

  const circle = (
    <Box
      component="span"
      sx={{
        ...shapeStyles,
        ...shapeCircleStyles,
        color: "white",
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
          sx={{ margin: "0 0 20px 0" }}
        >
          <Grid size={3}>
            <Card
              title="Total Earnings"
              subtitle="80000"
              handleClickCb={() => navigate(`/admin/earnings`)}
            />
          </Grid>
          <Grid size={3}>
            <Card
              customStyle={{
                backgroundColor: "#EAA000",
              }}
              title="Total Doctors"
              subtitle={noOfDoctors}
              handleClickCb={() => handleDocClick(doctors)}
            />
          </Grid>
          <Grid size={3}>
            <Card
              customStyle={{
                backgroundColor: "#2E823B",
              }}
              title="Total Staffs"
              subtitle={noOfStaffs}
              handleClickCb={() => handleStaffClick(staffs)}
            />
          </Grid>
          <Grid size={3}>
            <Card
              customStyle={{
                backgroundColor: "#66A7B4",
              }}
              title="Total Rooms"
              subtitle={noOfRooms}
              handleClickCb={() => handleRoomClick(rooms)}
            />
          </Grid>
        </Grid>
      </div>

      {!shouldHideDiv && (
        <div className={styles.appointmentBlock}>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            flexDirection={{ md: "row" }}
            size={12}
            sx={{ margin: "0 0 20px 0" }}
          >
            <Grid size={4} sx={{ display: "flex", alignItems: "center" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box
                  sx={{
                    backgroundColor: "white",
                    boxShadow: 3,
                    borderRadius: 1,
                    width: 180, // Adjust width here
                    textAlign: "center",
                    // padding: "4px", // Reduce padding to make the container smaller
                  }}
                >
                  <DatePicker
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    sx={{
                      width: "100%", // Ensure the date picker takes up 100% of the container's width
                      fontSize: "24px", // Adjust font size inside the date picker
                      input: {
                        fontSize: "14px", // Adjust input field font size if needed
                        padding: "10px", // Adjust input field padding to make it smaller
                      },
                    }}
                  />
                </Box>
              </LocalizationProvider>
            </Grid>
            <Grid size={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={() => navigate(`/admin/billings`)}
                sx={{
                  fontSize: "16px",
                  color: "#878787",
                  textTransform: "capitalize",
                  padding: "0px 8px",
                  backgroundColor: "#fff",
                  marginRight: "22px",
                }}
              >
                <LocalAtmIcon sx={{ color: "#25307f" }} />{" "}
                <span
                  style={{
                    marginLeft: "14px",
                    marginRight: "8px",
                    marginTop: "2px",
                  }}
                >
                  Billing
                </span>
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate(`/admin/requests`)}
                sx={{
                  fontSize: "16px",
                  color: "#878787",
                  textTransform: "capitalize",
                  padding: "0px 8px",
                  backgroundColor: "#fff",
                  marginRight: "22px",
                }}
              >
                <div
                  style={{
                    height: "8px",
                    width: "8px",
                    borderRadius: "50%",
                    backgroundColor: "red",
                    position: "absolute",
                    left: "31px",
                    top: "6px",
                  }}
                ></div>
                {circle}
                <span
                  style={{
                    marginLeft: "16px",
                    marginRight: "8px",
                    marginTop: "2px",
                  }}
                >
                  Request
                </span>
              </Button>

              <div style={{backgroundColor:'#25307F',color:'white !important',borderRadius: "5px",}}>
                {branches.length && (
                        <Select1
                            inputId="input-department"
                            selectId="select-department"
                            label="Department"
                            list={branches}
                            size="small"
                            color='white'
                        />
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};
export default CommonPanel;
