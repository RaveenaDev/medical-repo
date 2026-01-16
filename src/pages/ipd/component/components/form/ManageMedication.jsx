import { useEffect, useState } from "react";
import styles from "./ManageMedication.module.scss";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import {
  getAllStaff,
  getStaff,
  updateMedicationAdministration,
} from "../../../../../components/State/Doctor/Action";
import { useDispatch, useSelector } from "react-redux";
const ManageMedication = ({ onClose, recordId, patientId, caseId }) => {
  const [activeTab, setActiveTab] = useState(false); // true = reschedule, false = mark given

  const dispatch = useDispatch();
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [notes, setNotes] = useState("");
  const [givenBy, setGivenBy] = useState("");
  useEffect(() => {
    dispatch(getAllStaff());
  }, []);

  const staff = useSelector((state) => state.doctor.allStaff);
  // console.log("STAFF", staff);
  const handleAction = async (actionType) => {
    try {
      const body = {
        recordId,
        caseId: caseId,
        action: actionType,
      };

      if (actionType === "Given") {
        if (!givenBy.trim()) {
          toast.error("Please enter who gave the medication");
          return;
        }
        body.givenBy = givenBy.trim();
        if (notes.trim()) body.notes = notes.trim();
      } else if (actionType === "Reschedule") {
        if (!newDate || !newTime) {
          toast.error("Please select both new date and time");
          return;
        }
        body.newDate = newDate;
        body.newTime = newTime;
        if (notes.trim()) body.notes = notes.trim();
      }

      dispatch(updateMedicationAdministration(body, patientId));
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    }
  };

  const combineDateAndTimeString = (dateStr, timeStr) => {
    const date = new Date(dateStr);
    const [hours, minutes] = timeStr.split(":").map(Number);
    date.setHours(hours, minutes, 0, 0);
    return date.toISOString();
  };

  return (
    <div>
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}>
        <h1>Manage Medication</h1>

        {activeTab ? (
          <div className={styles.section1}>
            <div>
              <label className={styles.label}>New Date</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>
            <div>
              <label className={styles.label}>New Time</label>
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
            </div>
            <div>
              <label className={styles.label}>Reason for Reschedule</label>
              <input
                type="text"
                placeholder="Optional"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <button
              className={styles.givenBtn}
              onClick={() => handleAction("Reschedule")}
            >
              Submit Reschedule
            </button>
            <div className={styles.part3}>OR</div>
          </div>
        ) : (
          <div className={styles.section3}>
            <div className={styles.part1}>
              <div className={styles.part1Left}>
                <label className={styles.label2}>Given By</label>
                <label className={styles.label2}>Special Instructions</label>
              </div>
              <div className={styles.part1Right}>
                <select
                  value={givenBy}
                  onChange={(e) => setGivenBy(e.target.value)}
                  className={styles.selectInput}
                >
                  <option value="">Select Staff</option>
                  {staff?.map((person) => (
                    <option key={person._id} value={person.name}>
                      {person.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Optional notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.part2}>
              <button
                className={styles.givenBtn}
                onClick={() => handleAction("Given")}
              >
                Mark as Given
              </button>
              <button className={styles.cancelBtn} onClick={onClose}>
                Cancel
              </button>
            </div>
            <div className={styles.part3}>OR</div>
          </div>
        )}

        <div className={styles.section2}>
          <button onClick={() => setActiveTab((prev) => !prev)}>
            {activeTab ? "Switch to Mark as Given" : "Switch to Reschedule"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageMedication;
