import styles from "./AppointmentHistory.module.scss";
import { ChevronLeft, ChevronUp, ChevronDown } from "lucide-react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAppointmentHistory} from "../../../../components/State/Doctor/Action.js";
import {TablePagination} from "@mui/material";

const AppointmentHistory = ({ onBack }) => {
  // Dropdown 1: Date Range
  const dateOptions = ["Last 7 days", "Last 30 days", "All"];
  const dateRangeMap = {
    "Last 7 days": 7,
    "Last 30 days": 30,
    "All": "",
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openDate, setOpenDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredDays, setFilteredDays] = useState(""); // default empty = no filter


  const dispatch = useDispatch()

  useEffect(() => {
    console.log("Page: ",page)
    console.log("Rows: ",rowsPerPage)
    dispatch(getAppointmentHistory(page, rowsPerPage,filteredDays));
  }, [dispatch,page, rowsPerPage,filteredDays]);

  const doctor = useSelector((store) => store.doctor)
  const totalAppointmentHistory = doctor.totalAppointmentHistory
  const appointmentHistory = doctor.appointmentHistory

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  return (
    <div>
      {/* row 1 */}
      <div className={styles.row1}>
        <div className={styles.r1Left}>
          <ChevronLeft
            size={26}
            className={styles.arrowLeftIcon}
            onClick={() => {
              onBack();
            }}
          />
          <p>Appointment History</p>
        </div>
        <div className={styles.r1Right} style={{ display: "flex", gap: "1vw" }}>
          {/* Date Range Dropdown */}
          <div className={styles.dropdown}>
            <button
              className={styles.trigger}
              onClick={() => setOpenDate((prev) => !prev)}
            >
              <p>{selectedDate || "Date range"}</p>
              <span className={styles.arrow}>
                {openDate ? <ChevronUp /> : <ChevronDown />}
              </span>
            </button>
            {openDate && (
              <ul className={styles.menu}>
                {dateOptions.map((option) => (
                  <li
                    key={option}
                    className={`${styles.item} ${
                      selectedDate === option ? styles.active : ""
                    }`}
                    onClick={() => {
                      setSelectedDate(option);
                      setOpenDate(false);
                      const days = dateRangeMap[option];
                      setFilteredDays(days);
                      setPage(0);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <div>Case Id</div>
          <div>Name</div>
          <div>Appointment With</div>
          <div>Type Visit</div>
          <div>Token</div>
          <div>Date</div>
          <div>Status</div>
        </div>
        <div className={styles.dataContainer}>
          {appointmentHistory.map((item, idx) => (
            <div key={idx} className={styles.row}>
              <div className={styles.blueText}>{item.caseId}</div>
              <div className={styles.blueText}>{item.name}</div>
              <div>+91 {item.phone}</div>
              <div>{item.typeVisit}</div>
              <div>{item.token}</div>
              <div>{item.date}</div>
              <div>
                <button className={styles.viewBtn}>{item.status}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TablePagination
          component="div"
          count={totalAppointmentHistory}
          page={page} // current page
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage} // items per page
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20, 50, 100]} // 👈 Custom options
          sx={{
            width: '100%',
            backgroundColor: "#fff",
            borderTop: "2px solid #ddd",
            zIndex: 11,
          }}
      />
    </div>
  );
};

export default AppointmentHistory;
