import React, { useEffect, useState } from "react";
import ayu from "../patients/patients.module.scss";
import Searchbar from "../../../components/Searchbar/index.jsx";
import Grid from "@mui/material/Grid2";
import Card from "../../../components/Card/index.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDoctors,
  getPatients,
  getRooms,
  getStaffs,
} from "../../../components/State/Receptionist/Action.js";
import Notifications from "../../../components/NotificationFunc/Notification.jsx";
import AppointmentRequestModal from "../Appointment/Requests/AppointmentRequest.jsx";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import accountCircle from "../../../assets/account_circle.svg";
import billingDetails from "../../../assets/payments.svg";
import addAppointments from "../../../assets/plus.svg";

import styles from "../styles.module.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button } from "@mui/material";
import dayjs from "dayjs";
const CommonPanel = ({ setIsBookAppointment }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dummyRequests = [
    {
      id: 1,
      name: "Rahul Sharma",
      detail: "Appointment for ENT, 28 September",
      img: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Sneha Kapoor",
      detail: "Appointment for ENT, 28 September",
      img: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Amit Verma",
      detail: "Appointment for ENT, 28 September",
      img: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "Priya Singh",
      detail: "Appointment for ENT, 28 September",
      img: "https://randomuser.me/api/portraits/women/4.jpg",
    },
  ];
  useEffect(() => {
    dispatch(getPatients());
    dispatch(getDoctors());
    dispatch(getStaffs());
    dispatch(getRooms());
  }, [dispatch]);
  // Define the routes where you want to hide the div
  const excludedRoutes = [
    "/receptionist/doctors",
    "/receptionist/staffs",
    "/receptionist/rooms",
    "/receptionist/patients",
    "/receptionist/requests",
    "/receptionist/billings",
  ];

  const location = useLocation(); // Get the current route
  // Check if the current route is in the excluded routes list
  const shouldHideDiv = excludedRoutes.includes(location.pathname);

  const receptionist = useSelector((store) => store.receptionist);

  const noOfPatients = receptionist.totalPatients;
  const patients = receptionist.patients;

  const noOfDoctors = receptionist.totalDoctors;
  const doctors = receptionist.doctors;
  console.log(doctors);

  const noOfStaffs = receptionist.totalStaffs;
  const staffs = receptionist.staffs;

  const noOfRooms = receptionist.totalRooms;
  const rooms = receptionist.rooms;
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const handleAppointmentRequests = () => {
    // Any other logic before opening the modal
    setIsModalOpen(true);
  };
  const handleBilling = () => {
    navigate("/receptionist/billing");
  };
  const handleBookAppointment = () => {
    setIsBookAppointment(true); // Set the state to show BookAppointment component
  };

  const appointmentRequests = useSelector(
    (store) => store.receptionist.appointmentRequests
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
            <Grid size={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box
                  sx={{
                    backgroundColor: "white",
                    boxShadow: "0px 4px 4px 0px #C2C2C240",
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
            <Grid size={9} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                sx={{
                  fontSize: "16px",
                  color: "#878787",
                  textTransform: "capitalize",
                  padding: {
                    xs: "0px 8px",
                    sm: "0px 10px",
                    md: "6px 12px",
                  }, // Adjust padding
                  backgroundColor: "#fff",
                  marginRight: { xs: "10px", sm: "15px", md: "20px" }, // Reduce margin for small screens
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: "4px", sm: "6px", md: "8px" }, // Adjust spacing between icon and text
                  fontWeight: "500",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  boxShadow: "0px 4px 4px 0px #C2C2C240",
                }}
                onClick={handleAppointmentRequests}
              >
                <img
                  src={accountCircle}
                  className={styles.appointmentBlock__accountIcon}
                />
                Appointment Requests
              </Button>
              {/* Modal Component */}
              <AppointmentRequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                requests={dummyRequests}
                appointmentRequests={appointmentRequests}
              >
                <p>This is where appointment requests will appear.</p>
              </AppointmentRequestModal>
              <Button
                variant="contained"
                sx={{
                  fontSize: "16px",
                  color: "#878787",
                  textTransform: "capitalize",
                  padding: {
                    md: "0px 10px",
                  }, // Adjust padding
                  backgroundColor: "#fff",
                  marginRight: { md: "20px" }, // Reduce margin for small screens
                  display: "flex",
                  alignItems: "center",
                  gap: { md: "8px" }, // Adjust spacing between icon and text
                  fontWeight: "500",

                  lineHeight: "100%",
                  letterSpacing: "0%",
                  boxShadow: "0px 4px 4px 0px #C2C2C240",
                }}
                onClick={handleBilling}
              >
                <img
                  src={billingDetails}
                  className={styles.appointmentBlock__paymentIcon}
                />
                Billing
              </Button>
              <Button
                variant="contained"
                sx={{
                  fontSize: "16px",
                  color: "#ffffff",
                  textTransform: "capitalize",
                  padding: {
                    xs: "0px 8px",
                    sm: "0px 10px",
                    md: "0px 10px",
                  }, // Adjust padding
                  backgroundColor: "#25307F",
                  boxShadow: "0px 4px 4px 0px #C2C2C240",
                  "&:hover": {
                    background: "#AEC3FF",
                  },
                  "&:active": {
                    backgroundColor: "#181F52",
                  },
                }}
                onClick={handleBookAppointment}
              >
                <img
                  src={addAppointments}
                  className={styles.appointmentBlock__plusIcon}
                />
                Book Appointment
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};
export default CommonPanel;
