import { useEffect, useState } from "react";
import styles from "./MedAdminRecord.module.scss";
import {
  Plus,
  Clock,
  Pill,
  NotepadText,
  Calendar,
  Printer,
} from "lucide-react";
import UpdateMAR from "./form/UpdateMAR";
import ManageMedication from "./form/ManageMedication";
import { useDispatch, useSelector } from "react-redux";
import { getPatientMedicalRecords } from "../../../../components/State/Doctor/Action";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import printJS from "print-js";
import PrintMAR from "./printMAR/PrintMAR";
export const combineDateAndTime = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) return null;

  try {
    const datePart = new Date(dateStr);

    // Normalize time string
    const cleanTime = timeStr.trim().toUpperCase(); // "04:23 pm" → "04:23 PM"
    const [time, modifier] = cleanTime.split(" ");

    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const combined = new Date(datePart);
    combined.setHours(hours, minutes || 0, 0, 0);

    return combined;
  } catch {
    return null;
  }
};

const MedAdminRecord = ({ patientId, caseId, patientInfo }) => {
  const dispatch = useDispatch();
  const [selectedRecordId, setSelectedRecordId] = useState(null);

  useEffect(() => {
    dispatch(getPatientMedicalRecords(patientId));
  }, [dispatch, patientId]);

  const medicalRecords = useSelector(
    (store) => store.doctor.patientMedicalRecords
  );
  const isLoading = useSelector(
    (store) => store.doctor.isLoadingGetPatientMedicalRecords
  );
  // console.log("PATIENT MEDICAL RECODS", medicalRecords);

  // Transform medicalRecords to unified format
  const medicationData = (medicalRecords || []).map((record) => {
    let timeStr = record.time || "";
    const dateTime = combineDateAndTime(record.date, timeStr);

    return {
      _id: record._id,
      time: timeStr,
      dateTime: dateTime,
      date: record.date || "-",
      medication: record.medication || "-",
      dose: record.dose || "-",
      route: record.route || "-",
      givenBy: record.givenBy || "—",
      notes: record.notes ?? "—",
      status: record.status || "Scheduled",
    };
  });

  medicationData.sort((a, b) => {
    if (!a.dateTime || !b.dateTime) return 0;
    return a.dateTime - b.dateTime;
  });

  const getNextUpcomingIndex = (data) => {
    const now = new Date();
    let nextIndex = -1;
    let minDiff = Infinity;

    data.forEach((item, index) => {
      if (!item.dateTime) return;

      const diff = item.dateTime.getTime() - now.getTime();

      // ONLY future medicines
      if (diff > 0 && diff < minDiff) {
        minDiff = diff;
        nextIndex = index;
      }
    });

    return nextIndex;
  };

  const nextUpcomingIndex = getNextUpcomingIndex(medicationData);

  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeModal]);

  const openUpdate = () => setActiveModal("Update");
  const openAction = (id) => {
    setSelectedRecordId(id);
    setActiveModal("Action");
  };

  const closeModal = () => setActiveModal(null);
  // console.log("NOW →", new Date().toString());

  // medicationData.forEach((m, i) => {
  //   console.log(i, m.time, m.dateTime?.toString(), m.dateTime - new Date());
  // });

  // console.log("MEDICATION DATA", medicationData);
  const MAX_WORDS = 4;

  const getWordInfo = (text = "") => {
    const words = text.trim().split(/\s+/);
    return {
      isLong: words.length > MAX_WORDS,
      text,
    };
  };

  const [activeNote, setActiveNote] = useState(null);

  const handlePrint = () => {
    printJS({
      printable: "print-mar",
      type: "html",
      targetStyles: ["*"],
      documentTitle: "MAR Sheet",
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.row1}>
        <p>Medical Record</p>
        <div className={styles.buttons}>
          <>
            <button className={styles.printBtn} onClick={handlePrint}>
              <Printer size={"2vh"} />
              <span>Print MAR</span>
            </button>

            {/* Hidden printable section */}
            <div style={{ display: "none" }}>
              <PrintMAR patient={patientInfo} records={medicationData} />
            </div>
          </>

          <button className={styles.updateBtn} onClick={openUpdate}>
            <Plus className={styles.plusIcon} />
            Add
          </button>
        </div>
      </div>
      {activeModal === "Update" && (
        <>
          <div className={styles.backdropOverlay} onClick={closeModal} />
          <div className={styles.updateModal}>
            <UpdateMAR
              onClose={closeModal}
              caseId={caseId}
              patientId={patientId}
            />
          </div>
        </>
      )}
      {activeModal === "Action" && (
        <>
          <div className={styles.backdropOverlay} onClick={closeModal} />
          <div className={styles.actionModal}>
            <ManageMedication
              onClose={closeModal}
              recordId={selectedRecordId}
              patientId={patientId}
              caseId={caseId}
            />
          </div>
        </>
      )}
      {activeNote && (
        <>
          <div
            className={styles.backdropOverlay}
            onClick={() => setActiveNote(null)}
          />
          <div className={styles.notesModal}>
            <h3>Special Instructions</h3>
            <p>{activeNote}</p>
            <button
              className={styles.closeBtn}
              onClick={() => setActiveNote(null)}
            >
              Close
            </button>
          </div>
        </>
      )}

      <div className={styles.tableContainer}>
        <div className={styles.table}>
          <div className={styles.thead}>
            <div className={styles.th}>
              <Clock strokeWidth={2} className={styles.icon} />
              <span>Date & Time</span>
            </div>
            <div className={styles.th}>
              <img src="/assets/medicineIcon.svg" className={styles.icon} />
              <span>Medications</span>
            </div>
            <div className={styles.th}>
              <img src="/assets/pills.svg" className={styles.icon} />
              <span>Dose</span>
            </div>
            <div className={styles.th}>
              <img src="/assets/mdi_oxygen-tank.svg" className={styles.icon} />
              <span>Route</span>
            </div>
            <div className={styles.th}>
              <img src="/assets/medic.svg" className={styles.icon} />
              <span>Given by</span>
            </div>
            <div className={styles.th}>
              <NotepadText className={styles.icon} />
              <span>Special Instructions</span>
            </div>
            <div className={styles.th}>
              <Calendar className={styles.icon} />
              <span>Status</span>
            </div>
            <div className={styles.th}>
              <img src="/assets/tapAction.svg" className={styles.icon} />
              <span>Action</span>
            </div>
          </div>
          <div className={styles.tbody}>
            {isLoading ? (
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
            ) : !Array.isArray(medicationData) ||
              medicationData.length === 0 ? (
              <p className={styles.noData}>No medical records available.</p>
            ) : (
              medicationData.map((item, idx) => {
                const now = new Date();
                const isPast = item.dateTime ? item.dateTime < now : false;

                const rowClass =
                  item.status === "Given"
                    ? "past"
                    : idx === nextUpcomingIndex
                    ? "next"
                    : "future";

                return (
                  <div
                    key={idx}
                    className={`${styles.row} ${styles[rowClass]}`}
                  >
                    <div className={styles.rowContent}>
                      <div className={styles.td}>
                        <span>
                          {new Date(item.date).toLocaleDateString()}{" "}
                          {item.time ?? "—"}
                        </span>
                      </div>
                      <div className={styles.td}>
                        <span>{item.medication ?? "—"}</span>
                      </div>
                      <div className={styles.td}>
                        <span>{item.dose ?? "—"}</span>
                      </div>
                      <div className={styles.td}>
                        <span>{item.route ?? "—"}</span>
                      </div>
                      <div className={styles.td}>
                        <span>{item.givenBy ?? "—"}</span>
                      </div>
                      <div className={styles.td}>
                        <div className={styles.notesCell}>
                          {(() => {
                            const { isLong, text } = getWordInfo(item.notes);

                            if (!text || text === "—") {
                              return <span>—</span>;
                            }

                            // Long instructions → ONLY View
                            if (isLong) {
                              return (
                                <button
                                  className={styles.viewBtn}
                                  onClick={() => setActiveNote(text)}
                                >
                                  View
                                </button>
                              );
                            }

                            // Short instructions → show directly
                            return (
                              <span className={styles.notesPreview}>
                                {text}
                              </span>
                            );
                          })()}
                        </div>
                      </div>

                      <div
                        className={`${styles.td} ${
                          rowClass === "past"
                            ? styles.givenStatus
                            : rowClass === "next"
                            ? styles.nextStatus
                            : styles.scheduledStatus
                        }`}
                      >
                        <span>
                          {rowClass === "past"
                            ? "Given"
                            : rowClass === "next"
                            ? "Next"
                            : "Scheduled"}
                        </span>
                      </div>
                    </div>
                    <div className={`${styles.actionWrapper} ${styles.t}`}>
                      <img
                        onClick={() => openAction(item._id)}
                        className={`${styles.actionTap} ${
                          rowClass === "past" ? styles.givenAction : ""
                        }`}
                        src="/assets/tapAction.svg"
                        alt=""
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedAdminRecord;
