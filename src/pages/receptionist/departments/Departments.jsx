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
          <div
            style={{
              position: "fixed",
              top: "0px",
              padding: "10px",
              width: "77%",
              background: " #F1F1F1",
              zIndex: 10000,
            }}
          >
            <CommonPanel setIsBookAppointment={setIsBookAppointment} />
          </div>
          <div style={{ marginTop: "210px" }}>
            {!props.entity ? (
              <>
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

                      {/* <DepartCard /> */}
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
      </div>
    </>
  );
};
export default Departments;
