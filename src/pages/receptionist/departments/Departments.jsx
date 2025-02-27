import React, { useEffect, useState } from "react";
import styles from "../styles.module.scss";
import ayu from "./departments.module.scss";
import Grid from "@mui/material/Grid2";
import Card from "../../../components/Card/index.jsx";
import { Button } from "@mui/material";
import EntityBasedTable from "../EntityBasedTable/index.jsx";
import DepartCard from "./DepartCard.jsx";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CommonPanel from "../components/CommonPanel.jsx";
import accountCircle from "../../../assets/account_circle.svg";
import billingDetails from "../../../assets/payments.svg";
import addAppointments from "../../../assets/plus.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDepartments,
  getRequestedAppointments,
} from "../../../components/State/Receptionist/Action.js";
import { useNavigate } from "react-router-dom";
import AppointmentRequestModal from "../Appointment/Requests/AppointmentRequest.jsx";
import BookAppointment from "../Appointment/Book/BookAppointment.jsx";
import { Box, Popper } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const Departments = (props) => {
  const [tableIndex, setTableIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookAppointment, setIsBookAppointment] = useState(false); // State to toggle between components
  const navigate = useNavigate();

  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const handleAppointmentRequests = () => {
    setIsModalOpen(true);
  };
  const handleBilling = () => {
    navigate("/receptionist/billing");
  };
  const handleBookAppointment = () => {
    setIsBookAppointment(true);
  };

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDepartments());
    dispatch(getRequestedAppointments());
  }, [dispatch]);

  const receptionist = useSelector((store) => store.receptionist);
  const appointmentRequests = useSelector(
    (store) => store.receptionist.appointmentRequests
  );

  const allDepartments = receptionist.departments;

  return (
    <>
      <div>
        <div className={styles.receptionist}>
          <CommonPanel />

          {!props.entity ? (
            <>
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
                  <Grid
                    size={9}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" }, // Smaller font on small screens
                        color: "#878787",
                        textTransform: "capitalize",
                        padding: {
                          xs: "0px 8px",
                          sm: "0px 10px",
                          md: "0px 10px",
                        }, // Adjust padding
                        backgroundColor: "#fff",
                        marginRight: { xs: "10px", sm: "15px", md: "20px" }, // Reduce margin for small screens
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: "4px", sm: "6px", md: "8px" }, // Adjust spacing between icon and text
                      }}
                      onClick={handleAppointmentRequests}
                    >
                      <img
                        src={accountCircle}
                        className={styles.appointmentBlock__accountIcon}
                      />
                      Appointment Requests
                    </Button>
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
                        fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" }, // Smaller font on small screens
                        color: "#878787",
                        textTransform: "capitalize",
                        padding: {
                          xs: "0px 8px",
                          sm: "0px 10px",
                          md: "0px 10px",
                        }, // Adjust padding
                        backgroundColor: "#fff",
                        marginRight: { xs: "10px", sm: "15px", md: "20px" }, // Reduce margin for small screens
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: "4px", sm: "6px", md: "8px" }, // Adjust spacing between icon and text
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
                        fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" }, // Smaller font on small screens
                        color: "#ffffff",
                        textTransform: "capitalize",
                        padding: {
                          xs: "0px 8px",
                          sm: "0px 10px",
                          md: "0px 10px",
                        }, // Adjust padding
                        backgroundColor: "#25307F",
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
              {/* Main Table */}

              {/* Conditionally render BookAppointment or Dashboard based on state */}
              {isBookAppointment ? (
                <BookAppointment
                  isOpen={isBookAppointment}
                  onClose={() => setIsBookAppointment(false)}
                />
              ) : (
                <div className="departments">
                  <div className={ayu.headerContainer}>
                    <button className={ayu.backButton}>
                      <ArrowBackIosIcon />
                    </button>
                    <h2 className={ayu.departmentTitle}>Department</h2>
                  </div>

                  {/* Horizontal line */}
                  <hr
                    style={{ border: "1px solid #d3d3d3", margin: "20px 0" }}
                  />

                  {/* Cards */}

                  <div className={ayu.superCardContainer}>
                    {allDepartments.map((department, index) => (
                      <DepartCard key={index} department={department} />
                    ))}

                    {/*<DepartCard />*/}
                    {/*<DepartCard />*/}
                    {/*<DepartCard />*/}
                    {/*<DepartCard />*/}
                    {/*<DepartCard />*/}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Render either EntityBasedTable or BookAppointment based on props.entity and isBookAppointment */}
              {isBookAppointment ? (
                <BookAppointment
                  isBookAppointment={isBookAppointment}
                  onClose={() => setIsBookAppointment(false)}
                />
              ) : (
                <EntityBasedTable
                  entity={props?.entity}
                  tableIndex={tableIndex}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Departments;
