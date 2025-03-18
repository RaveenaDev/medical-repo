import React, { useEffect, useState } from "react";
import styles from "../styles.module.scss";
import ayu from "./departments.module.scss";
import EntityBasedTable from "../EntityBasedTable/index.jsx";
import DepartCard from "./DepartCard.jsx";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CommonPanel from "../components/CommonPanel.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDepartments,
  getRequestedAppointments,
} from "../../../components/State/Receptionist/Action.js";
import { useNavigate } from "react-router-dom";
import BookAppointment from "../Appointment/Book/BookAppointment.jsx";
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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDepartments());
    dispatch(getRequestedAppointments());
  }, [dispatch]);

  const receptionist = useSelector((store) => store.receptionist);

  const allDepartments = receptionist.departments;

  return (
    <div
      style={{
        background: "#f1f1f1",
        height: "96dvh", // Make the entire div take up the full viewport height
        overflow: "hidden", // Prevent scrolling on the rest of the page
      }}
    >
      <div className={styles.receptionist}>
        <div
          style={{
            position: "fixed",
            top: "0px",
            padding: "10px",
            width: "77%",
            background: " #F1F1F1",
            zIndex: 100,
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
                    <div className={ayu.backButton}>
                      <ArrowBackIosIcon />
                    </div>
                    <h2 className={ayu.departmentTitle}>Department</h2>
                  </div>

                  {/* Horizontal line */}
                  <hr
                    style={{ border: "1px solid #d3d3d3", margin: "20px 0" }}
                  />

                  {/* Cards */}

                  <div className={ayu.superCardContainer}>
                    {allDepartments.map((department, index) => (
                      <DepartCard
                        key={index}
                        department={department}
                        index={index}
                      />
                    ))}
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
  );
};
export default Departments;
