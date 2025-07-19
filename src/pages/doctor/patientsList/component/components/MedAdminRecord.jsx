import { useEffect, useState } from "react";
import styles from "./MedAdminRecord.module.scss";
import { Plus, Clock, Pill, NotepadText, Calendar } from "lucide-react";
import UpdateMAR from "./form/UpdateMAR";
import ManageMedication from "./form/ManageMedication";
import { useDispatch, useSelector } from "react-redux";
import { getPatientMedicalRecords } from "../../../../../components/State/Doctor/Action";
export const combineDateAndTime = (dateStr, timeStr) => {
  try {
    const datePart = new Date(dateStr);
    const [time, modifier] = timeStr.includes(" ")
      ? timeStr.trim().split(" ")
      : [timeStr, null];
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const combined = new Date(datePart);
    combined.setHours(hours, minutes || 0, 0, 0);
    return combined;
  } catch (error) {
    console.error("Error combining date and time:", error);
    return null;
  }
};
const MedAdminRecord = ({ patientId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatientMedicalRecords(patientId));
  }, []);

  const medicalRecords = useSelector(
    (store) => store.doctor.patientMedicalRecords
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
      medication: record.medication || "-",
      dose: record.dose || "-",
      route: record.route || "-",
      givenBy: record.givenBy || "—",
      notes: record.notes || "—",
      status: record.status || "Scheduled",
    };
  });

  medicationData.sort((a, b) => {
    if (!a.dateTime || !b.dateTime) return 0;
    return a.dateTime - b.dateTime;
  });

  const getNextUpcomingIndex = (data) => {
    const now = new Date();
    let closestDiff = Infinity;
    let nextIndex = -1;

    data.forEach((item, index) => {
      if (!item.dateTime) return;
      const diff = item.dateTime.getTime() - now.getTime();

      // Accept range within 1 minute before/after now
      if (diff >= -60000 && diff < closestDiff) {
        closestDiff = diff;
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
  const openAction = () => setActiveModal("Action");

  const closeModal = () => setActiveModal(null);

  return (
    <div className={styles.container}>
      <div className={styles.row1}>
        <p>Medical Record</p>
        <div className={styles.buttons}>
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
            <UpdateMAR onClose={closeModal} patientId={patientId} />
          </div>
        </>
      )}
      {activeModal === "Action" && (
        <>
          <div className={styles.backdropOverlay} onClick={closeModal} />
          <div className={styles.actionModal}>
            <ManageMedication onClose={closeModal} />
          </div>
        </>
      )}

      <div className={styles.tableContainer}>
        <div className={styles.table}>
          <div className={styles.thead}>
            <div className={styles.th}>
              <Clock strokeWidth={2} className={styles.icon} />
              <span>Time</span>
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
              <span>Notes</span>
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
            {/* {medicationData.map((item, idx) => {
              const [time, modifier] = item.time.split(" ");
              let [hours, minutes] = time.split(":").map(Number);
              if (modifier === "PM" && hours < 12) hours += 12;
              if (modifier === "AM" && hours === 12) hours = 0;

              const medTime = new Date();
              medTime.setHours(hours, minutes, 0, 0);

              const now = new Date();
              const isPast = medTime < now;

              const rowClass = isPast
                ? "past"
                : idx === nextUpcomingIndex
                ? "next"
                : "future"; */}
            {medicationData.map((item, idx) => {
              const now = new Date();
              const isPast = item.dateTime ? item.dateTime < now : false;

              const rowClass =
                item.status === "Given"
                  ? "past"
                  : idx === nextUpcomingIndex
                  ? "next"
                  : "future";
              return (
                <div key={idx} className={`${styles.row} ${styles[rowClass]}`}>
                  {/* Wrap 7 cells in .rowContent */}
                  <div className={styles.rowContent}>
                    <div className={styles.td}>
                      <span>{item.time}</span>
                    </div>
                    <div className={styles.td}>
                      <span>{item.medication}</span>
                    </div>
                    <div className={styles.td}>
                      <span>{item.dose}</span>
                    </div>
                    <div className={styles.td}>
                      <span>{item.route}</span>
                    </div>
                    <div className={styles.td}>
                      <span>{item.givenBy}</span>
                    </div>
                    <div className={styles.td}>
                      <span>{item.notes}</span>
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
                  {/* Action column */}
                  <div className={`${styles.actionWrapper} ${styles.t}`}>
                    <img
                      onClick={openAction}
                      className={`${styles.actionTap} ${
                        rowClass === "past" ? styles.givenAction : ""
                      }`}
                      src="/assets/tapAction.svg"
                      alt=""
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedAdminRecord;
