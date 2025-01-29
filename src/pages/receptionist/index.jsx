import React, { useEffect, useState } from "react";
import Dashboard from "./dashboard";
import styles from "./styles.module.scss";
import ayu from "./patients/patients.module.scss";
import Grid from "@mui/material/Grid2";
import EntityBasedTable from "./EntityBasedTable";
import { Button } from "@mui/material";
import CommonPanel from "./components/CommonPanel.jsx";
import AppointmentRequestModal from "./Appointment/Requests/AppointmentRequest.jsx";

function Receptionist(props) {
  const [tableIndex, setTableIndex] = useState(null);

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
    props?.setIsSignUpOrLogin(false);
  }, []);

  const handleCalendar = () => {
    console.log("handleCalendar");
  };
  const handleAppointmentRequests = () => {
    console.log("handleAppointmentRequests");
    // Any other logic before opening the modal
    setIsModalOpen(true);
  };
  const handleBilling = () => {
    console.log("handleBilling");
  };
  const handleBookAppointment = () => {
    console.log("handleBookAppointment");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className={ayu.patients}>
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
                  <Button
                    variant="text"
                    sx={{
                      fontSize: "22px",
                      color: "#0150EA",
                      textTransform: "capitalize",
                      padding: "0px",
                    }}
                    onClick={handleCalendar}
                  >
                    Today
                  </Button>
                </Grid>
                <Grid
                  size={9}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      fontSize: "20px",
                      color: "#878787",
                      textTransform: "capitalize",
                      padding: "0px 14px",
                      backgroundColor: "#fff",
                      marginRight: "22px",
                    }}
                    onClick={handleAppointmentRequests}
                  >
                    <img
                      src="src/assets/account_circle.svg"
                      className={styles.appointmentBlock__accountIcon}
                    />
                    Appointment Requests
                  </Button>
                  {/* Modal Component */}
                  <AppointmentRequestModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    requests={dummyRequests}
                  >
                    <p>This is where appointment requests will appear.</p>
                  </AppointmentRequestModal>
                  <Button
                    variant="contained"
                    sx={{
                      fontSize: "20px",
                      color: "#878787",
                      textTransform: "capitalize",
                      padding: "0px 14px",
                      backgroundColor: "#fff",
                      marginRight: "22px",
                    }}
                    onClick={handleBilling}
                  >
                    <img
                      src="src/assets/payments.svg"
                      className={styles.appointmentBlock__paymentIcon}
                    />
                    Billing
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      fontSize: "20px",
                      color: "#ffffff",
                      textTransform: "capitalize",
                      padding: "0px 14px",
                      backgroundColor: "#25307F",
                    }}
                    onClick={handleBookAppointment}
                  >
                    <img
                      src="src/assets/plus.svg"
                      className={styles.appointmentBlock__plusIcon}
                    />
                    Book Appointment
                  </Button>
                </Grid>
              </Grid>
            </div>
            <Dashboard />
          </>
        ) : (
          <EntityBasedTable entity={props?.entity} tableIndex={tableIndex} />
        )}
      </div>
    </>
  );
}

export default Receptionist;
