import "./PatientsListDoctor.scss";
import Searchbar from "../../../components/Searchbar/index.jsx";
import Notifications from "../../../components/NotificationFunc/Notification.jsx";
import { ChevronLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PatientCard from "./component/modals/PatientCard.jsx";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  admitPatient,
  getAdmissionRequests,
  getAdmittedPatients,
  getAppointmentsOfToday,
} from "../../../components/State/Doctor/Action.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dayjs from "dayjs";
import { Avatar, TablePagination, Tooltip } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import AddPatientForm from "./component/form/AddPatient/AddPatientForm.jsx";
import { GET_PATIENT_DETAILS_BY_PAT_ID } from "../../../components/State/Doctor/ActionType.js";

const PatientsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [admittingPatientId, setAdmittingPatientId] = useState(null);

  useEffect(() => {
    dispatch(getAdmissionRequests());
    dispatch(getAdmittedPatients());
  }, [dispatch]);

  const patientsAdmitted = useSelector(
    (store) => store.doctor.admittedPatients
  );

  const admissionRequests = useSelector(
    (store) => store.doctor.admissionRequests
  );

  const isLoadingGetAdmissionRequests = useSelector(
    (store) => store.doctor.isLoadingGetAdmissionRequests
  );

  const isLoadingGetAdmittedPatients = useSelector(
    (store) => store.doctor.isLoadingGetAdmittedPatients
  );
  // replace your current page/rowsPerPage/filter state with this:
  const [filter, setFilter] = useState(() => {
    const saved = sessionStorage.getItem("pld_pagination");
    return saved ? JSON.parse(saved).filter || "Total" : "Total";
  });

  const filteredPatients = patientsAdmitted.filter((patient) => {
    if (filter === "Total") return true;
    if (filter === "Follow-Up") {
      return patient.type?.toLowerCase() === "followup";
    }
    if (filter === "Admitted") {
      return (
        (patient.type?.toLowerCase() === "admitted+followup" ||
          patient.type?.toLowerCase() === "admitted") &&
        patient.healthStatus?.toLowerCase() !== "critical"
      );
    }
    if (filter === "Critical") {
      return patient.healthStatus?.toLowerCase() === "critical";
    }
    return patient.type === filter;
  });

  // FORM
  const [showForm, setShowForm] = useState(false);

  const handleAddPatientClick = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    dispatch({ type: GET_PATIENT_DETAILS_BY_PAT_ID, payload: {} });
  };

  const handleAdmitPatientClick = (patientId) => {
    setAdmittingPatientId(patientId);
    // console.log(patientId);

    dispatch(admitPatient(patientId))
      .then(() => {
        // ✅ success
        setAdmittingPatientId(null); // stop loader
      })
      .catch((error) => {
        console.error("Failed to admit patient:", error);
        setAdmittingPatientId(null); // stop loader even if failed
      });
  };

  const filteredAdmissions = admissionRequests
    .filter((req) => req.status !== "Admitted" && req.status !== "discharged") // remove both
    .sort((a, b) => {
      if (a.status === "Approved" && b.status !== "Approved") return -1;
      if (a.status !== "Approved" && b.status === "Approved") return 1;
      return 0; // maintain order for others
    });

  // console.log("Addmitted Patiemts", patientsAdmitted);
  // console.log("Admission Requests", filteredAdmissions);
  const sliderSettings = {
    dots: false,
    infinite: false,
    swipeToSlide: true,
    speed: 500,
    slidesToShow: 4,
    arrows: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3.5,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1.5,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  useEffect(() => {
    const startDate = dayjs(selectedDate).startOf("day").toISOString();
    const endDate = dayjs(selectedDate).endOf("day").toISOString();

    if (selectedDate) {
      dispatch(getAppointmentsOfToday(startDate, endDate));
    }
  }, [dispatch, selectedDate]);

  const appointments = useSelector((store) => store.doctor.appointmentsOfToday);
  const todayAppointments = appointments ? appointments.length : 0;
  const doctorName =
    useSelector((state) => state.authentication.userName) ||
    localStorage.getItem("username");

  const [page, setPage] = useState(() => {
    const saved = sessionStorage.getItem("pld_pagination");
    return saved ? JSON.parse(saved).page || 0 : 0;
  });
  const [rowsPerPage, setRowsPerPage] = useState(() => {
    const saved = sessionStorage.getItem("pld_pagination");
    return saved ? JSON.parse(saved).rowsPerPage || 6 : 6;
  });

  useEffect(() => {
    sessionStorage.setItem(
        "pld_pagination",
        JSON.stringify({ page, rowsPerPage, filter })
    );
  }, [page, rowsPerPage, filter]);

  useEffect(() => {
    const total = filteredPatients.length;
    const lastPage = Math.max(0, Math.ceil(total / rowsPerPage) - 1);
    if (page > lastPage) setPage(lastPage);
  }, [filteredPatients.length, rowsPerPage]);

  const currentPatients = filteredPatients.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  return (
    <div className="patientsListDoctorContainer">
      {/*<div className="listHeader">*/}
      {/*  <Searchbar />*/}
      {/*  <Notifications />*/}
      {/*</div>*/}

      <div className="greeting">
        <h4 className="heading">Hello, Dr. {doctorName}</h4>
        <p>
          I hope you are in good mood because there are {todayAppointments}{" "}
          patients waiting for you.
        </p>
      </div>

      <div className="listHeading">
        <div className="headingContainer">
          <ChevronLeft
            size={25}
            strokeWidth={1.7}
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/doctor");
            }}
          />

          <div className="heading">Patients List</div>
        </div>
        <div className="buttonsContainer">
          <div className="addButton" onClick={handleAddPatientClick}>
            <Plus size={20} />
            ADD PATIENT
          </div>
          <div
            className="addButton"
            onClick={() => navigate("admission-forms")}
          >
            Addmission Forms
          </div>
        </div>
      </div>

      <section className="toAdmit">
        <div className="description">
          To be admitted:{" "}
          <span className="count">{filteredAdmissions.length}</span>
        </div>

        {isLoadingGetAdmissionRequests ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "36vh", // or full height you need
            }}
          >
            <CircularProgress sx={{ color: "#25307F" }} size={58} />
          </Box>
        ) : (
          <div className=" toAdmitSliderWrapper">
            <Slider {...sliderSettings}>
              {filteredAdmissions.map((patient, index) => (
                <div key={index} className="slick-slide-card">
                  <div className="patientCard">
                    <div className="card_upper">
                      <div className="patientInfo">
                        <div className="card_top_row">
                          <div className="patientDetailsContainer">
                            <Avatar
                              sx={{
                                bgcolor: "#e3e3e3",
                                color: "#25307F",
                                fontWeight: 500,
                              }}
                              className="patientAvatar"
                            >
                              {patient.admissionDetails.name[0].toUpperCase()}
                            </Avatar>
                            <div>
                              <h5 className="patientName">
                                {patient.admissionDetails.name}
                              </h5>
                              <p className="patientAge">
                                {patient.admissionDetails.gender || "N/A"}{" "}
                                {patient.admissionDetails.age} Y
                              </p>
                            </div>
                          </div>
                          <div className="actionButtons">
                            <div className="iconWrapper">
                              <Tooltip
                                title={
                                  patient?.admissionDetails?.contact ||
                                  "No contact available"
                                } // Tooltip content
                                arrow
                              >
                                <svg
                                  width="21"
                                  height="21"
                                  viewBox="0 0 21 21"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width="21"
                                    height="21"
                                    rx="5"
                                    fill="#DAE4FF"
                                  />
                                  <path
                                    d="M15.3583 16C14.0852 16 12.8273 15.7226 11.5847 15.1677C10.3421 14.6128 9.21157 13.8259 8.19306 12.8069C7.17454 11.788 6.38783 10.6575 5.83294 9.41528C5.27806 8.17309 5.00041 6.91522 5 5.64167C5 5.45833 5.06111 5.30556 5.18333 5.18333C5.30556 5.06111 5.45833 5 5.64167 5H8.11667C8.25926 5 8.38657 5.04848 8.49861 5.14544C8.61065 5.24241 8.67685 5.35689 8.69722 5.48889L9.09444 7.62778C9.11481 7.79074 9.10972 7.92824 9.07917 8.04028C9.04861 8.15231 8.99259 8.24907 8.91111 8.33056L7.42917 9.82778C7.63287 10.2046 7.87467 10.5686 8.15456 10.9198C8.43444 11.271 8.74265 11.6098 9.07917 11.9361C9.39491 12.2519 9.72593 12.5448 10.0722 12.8149C10.4185 13.085 10.7852 13.3319 11.1722 13.5556L12.6083 12.1194C12.7 12.0278 12.8198 11.9591 12.9677 11.9135C13.1156 11.8679 13.2606 11.855 13.4028 11.875L15.5111 12.3028C15.6537 12.3435 15.7708 12.4175 15.8625 12.5246C15.9542 12.6318 16 12.7513 16 12.8833V15.3583C16 15.5417 15.9389 15.6944 15.8167 15.8167C15.6944 15.9389 15.5417 16 15.3583 16Z"
                                    fill="#333333"
                                  />
                                </svg>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                        <div className="patientDetails">
                          <div className="detail-row">
                            <span className="label">Admission date:</span>
                            <span className="value">
                              {
                                new Date(patient.admissionDetails.date)
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </span>
                          </div>
                          <div className="detail-row">
                            <span className="label">Reason:</span>
                            <span
                              className="value reason-truncate"
                              title={patient.admissionDetails.medicalNote}
                            >
                              {patient.admissionDetails.medicalNote}
                            </span>
                          </div>
                          <div className="detail-row">
                            <span className="label">Status:</span>
                            <span className="value">{patient.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="admit_btn_container">
                      {patient.status === "Approved" ? (
                        <button
                          className="admit_btn"
                          onClick={() => handleAdmitPatientClick(patient._id)}
                          disabled={admittingPatientId === patient._id}
                        >
                          {admittingPatientId === patient._id ? (
                            <CircularProgress
                              size={10}
                              thickness={5}
                              sx={{
                                color: "white",
                              }}
                            />
                          ) : (
                            "Admit"
                          )}
                        </button>
                      ) : (
                        (() => {
                          // normalize sendTo -> set of lowercased tokens
                          const raw = patient?.sendTo ?? "";
                          const tokens = Array.isArray(raw)
                            ? raw
                            : String(raw).split(","); // supports "Doctor,Admin"
                          const sendToSet = new Set(
                            tokens
                              .map((t) => t.trim().toLowerCase())
                              .filter(Boolean)
                          );

                          const showDoctor =
                            sendToSet.has("doctor") || sendToSet.has("both"); // show doctor row if Doctor or Both
                          const showAdmin =
                            sendToSet.has("admin") || sendToSet.has("both"); // show admin row if Admin or Both
                          const hasBoth = showDoctor && showAdmin; // check if both are shown
                          return (
                            <div
                              className={`approval-status ${
                                hasBoth ? "two-status" : ""
                              }`}
                            >
                              {showDoctor && (
                                <div>
                                  Doctor:{" "}
                                  <span
                                    className={
                                      patient?.approval?.doctor?.approved
                                        ? "approved-text"
                                        : "pending-text"
                                    }
                                  >
                                    {patient?.approval?.doctor?.approved
                                      ? "Approved"
                                      : "Pending"}
                                  </span>
                                </div>
                              )}

                              {showAdmin && (
                                <div>
                                  Admin:{" "}
                                  <span
                                    className={
                                      patient?.approval?.admin?.approved
                                        ? "approved-text"
                                        : "pending-text"
                                    }
                                  >
                                    {patient?.approval?.admin?.approved
                                      ? "Approved"
                                      : "Pending"}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })()
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </section>
      <section className="admittedPatients">
        <div className="admittedHeader">
          {["Total", "Critical", "Admitted", "Follow-Up"].map((item) => (
            <div
              key={item}
              className={`headerItem ${item} ${
                filter === item ? "active" : ""
              }`}
              onClick={() => {
                setFilter(item);
                setPage(0); // Reset to first page when changing filter
              }}
              style={{ cursor: "pointer" }}
            >
              {item}
            </div>
          ))}
          {/* <div className="filterButton">
            <FiFilter fill="#25307F" />
            <span>Filter</span>
          </div>   */}
        </div>

        {isLoadingGetAdmittedPatients ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "36vh", // or full height you need
            }}
          >
            <CircularProgress sx={{ color: "#25307F" }} size={58} />
          </Box>
        ) : (
          <div className="admittedList">
            {currentPatients.length > 0 ? (
              currentPatients.map((patient, index) => (
                <PatientCard key={index} patient={patient} />
              ))
            ) : (
              <div
                style={{
                  paddingLeft: "1rem",
                  paddingTop: "1rem",
                  color: "#3A3A3A",
                  fontStyle: "italic",
                }}
              >
                No patients found
              </div>
            )}
          </div>
        )}
        <div className="pagination">
          <TablePagination
            component="div"
            count={filteredPatients.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[6, 12, 24, 60, 120]}
            sx={{
              width: "100%",
              backgroundColor: "#fff",
              borderTop: "2px solid #ddd",
              zIndex: 11,
            }}
          />
        </div>
      </section>
      {/* Conditionally Render Form */}
      {showForm && <AddPatientForm onClose={handleCloseForm} />}
    </div>
  );
};

export default PatientsList;
