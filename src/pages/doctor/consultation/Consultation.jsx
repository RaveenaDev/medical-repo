import React, { useState, useEffect } from "react";
import CommonPanelMini from "../components/CommonPanelMini";
import styles from "./Consultation.module.scss";
import dayjs from "dayjs";
import { CalendarToday } from "@mui/icons-material";
import { ClockFading, LibraryBig, Plus } from "lucide-react";
import Library from "./components/Library";
import ConsultBody from "./components/ConsultBody";
import AppointmentHistory from "./components/AppointmentHistory";
import PatientNewForm from "./components/PatientNewForm";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentByDate } from "../../../components/State/Doctor/Action.js";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
export const Consultation = () => {
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeModal]);

  const openLibrary = () => setActiveModal("library");
  const closeModal = () => setActiveModal(null);

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  const handleChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const [loading, setLoading] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState("PatientInfo");
  const [completeData, setCompleteData] = useState({});
  const [confirmedSections, setConfirmedSections] = useState([]);
  const [customSections, setCustomSections] = useState([]);

  const [activeView, setActiveView] = useState("consult");
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [shouldRefetch1, setShouldRefetch1] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const startDate = dayjs(selectedDate).startOf("day").toISOString();
    const endDate = dayjs(selectedDate).endOf("day").toISOString();

    if (selectedDate || shouldRefetch1) {
      setLoading(true); // Show loader before dispatch
      dispatch(getAppointmentByDate(startDate, endDate)).finally(() => {
        setLoading(false); // Hide loader after fetch completes
        setShouldRefetch1(false);
      });
    }
  }, [dispatch, selectedDate, shouldRefetch1]);

  useEffect(() => {
    const startDate = dayjs(selectedDate).startOf("day").toISOString();
    const endDate = dayjs(selectedDate).endOf("day").toISOString();

    if (shouldRefetch) {
      // console.log("Again dispatched...")
      dispatch(getAppointmentByDate(startDate, endDate));
      if (shouldRefetch) setShouldRefetch(false);
    }
  }, [shouldRefetch]);

  const appointments = useSelector((store) => store.doctor.appointmentsByDate);
  const isLoadingAppointmentsByDate = useSelector(
    (store) => store.doctor.isLoadingAppointmentsByDate
  );

  // console.log("Appointments: ",appointments)

  const ongoingAppointment = appointments.find(
    (app) => app.status === "Ongoing"
  );

  const handleApplyForm = (form) => {
    console.log("Selected Form:", form);
    setSelectedForm(form);
  };

  return (
    <div>
      <div>
        <CommonPanelMini />

        {/* Header 1 */}
        <div className={styles["header-1"]}>
          <div className={styles["header-left"]}>
            <div className={styles["date-selections"]}>
              <div className={styles.text}>
                <span className={styles.label}>
                  {selectedDate === dayjs().format("YYYY-MM-DD")
                    ? "Today"
                    : "Date"}
                </span>
                <span className={styles.date}>
                  {dayjs(selectedDate).format("DD-MM-YYYY")}
                </span>
              </div>

              <div className={styles["calendar-wrapper"]}>
                <label htmlFor="datePicker">
                  <CalendarToday className={styles["calendar-icon"]} />
                </label>
                <input
                  type="date"
                  id="datePicker"
                  value={selectedDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {activeModal === "library" && (
              <>
                <div
                  className={styles["backdrop-overlay"]}
                  onClick={closeModal}
                />
                <div className={styles["library-modal"]}>
                  <Library
                    onClose={closeModal}
                    onApply={handleApplyForm}
                    setCompleteData={setCompleteData}
                    setSelectedComponent={setSelectedComponent}
                    setConfirmedSections={setConfirmedSections}
                    setCustomSections={setCustomSections}
                  />
                </div>
              </>
            )}
          </div>
          <div className={styles["header-right"]}>
            {ongoingAppointment && (
              <button className={styles["from-library"]} onClick={openLibrary}>
                <LibraryBig />
                <p>Form Library</p>
              </button>
            )}
            <button
              className={styles["appointment-container"]}
              onClick={() => setActiveView("appointmentHistory")}
            >
              <ClockFading className={styles["clock-icon"]} size={16} />
              <p>Appointment History</p>
            </button>
            <button
              className={styles["new-form-container"]}
              onClick={() => setActiveView("patientNewForm")}
            >
              <Plus className={styles["plus-icon"]} size={16} />
              <p>Create New Form</p>
            </button>
          </div>
        </div>

        {activeView === "appointmentHistory" && (
          <AppointmentHistory onBack={() => setActiveView("consult")} />
        )}
        {activeView === "patientNewForm" && (
          <DndProvider backend={HTML5Backend}>
            <PatientNewForm onBack={() => setActiveView("consult")} />
          </DndProvider>
        )}
        {activeView === "consult" &&
          (isLoadingAppointmentsByDate ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh", // or full height you need
              }}
            >
              <CircularProgress sx={{ color: "#00a378" }} size={58} />
            </Box>
          ) : (
            <ConsultBody
              selectedForm={selectedForm}
              selectedComponent={selectedComponent}
              setSelectedComponent={setSelectedComponent}
              completeData={completeData}
              setCompleteData={setCompleteData}
              confirmedSections={confirmedSections}
              setConfirmedSections={setConfirmedSections}
              customSections={customSections}
              setCustomSections={setCustomSections}
              appointments={appointments}
              onSuccess={() => setShouldRefetch(true)}
              onStart={() => setShouldRefetch1(true)}
            />
          ))}
      </div>
    </div>
  );
};
