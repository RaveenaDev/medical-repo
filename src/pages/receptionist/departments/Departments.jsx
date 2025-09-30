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
import CircularProgress from "@mui/material/CircularProgress";
import { Box, TablePagination } from "@mui/material";

const Departments = (props) => {
  const [tableIndex, setTableIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6); // Default per page
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
  const loading = useSelector((store) => store.receptionist.isLoading);

  const allDepartments = receptionist.departments;

  const paginatedDepartments = allDepartments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  return (
    <div className={styles.container}>
      <div className={styles.receptionist}>
        <div
          style={{
            position: "fixed",
            top: "0px",
            padding: "10px 10px 0px 10px",
            width: "77%",
            background: " #F1F1F1",
            zIndex: 100,
          }}
        >
          <CommonPanel setIsBookAppointment={setIsBookAppointment} />
        </div>
        <div style={{ marginTop: "150px" }}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh", // or full height you need
              }}
            >
              <CircularProgress sx={{ color: "#25307F" }} size={58} />
            </Box>
          ) : (
            <div>
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
                        style={{
                          border: "1px solid #d3d3d3",
                          margin: "10px 0 20px",
                        }}
                      />

                      {/* Cards */}

                      <div className={ayu.superCardContainer}>
                        {paginatedDepartments.length ? (
                          paginatedDepartments.map((department, index) => (
                            <DepartCard
                              key={index}
                              department={department}
                              index={index}
                            />
                          ))
                        ) : (
                          <div>No departments found.</div>
                        )}
                      </div>
                      <TablePagination
                        component="div"
                        count={allDepartments.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[6, 12, 24, 60, 120]}
                        sx={{
                          width: "100%",
                          backgroundColor: "#fff",
                          borderTop: "2px solid #ddd",
                          marginTop: 2,
                        }}
                      />
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
          )}
        </div>
      </div>
    </div>
  );
};
export default Departments;
