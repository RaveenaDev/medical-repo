import { ChevronDown, ChevronUp, X } from "lucide-react";
import styles from "./ScheduleTreatment.module.scss";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllDoctors, submitConsultation} from "../../../../components/State/Doctor/Action.js";

const ScheduleTreatment = ({ onClose,modalData,onSuccess }) => {
  // Dropdown 1: Date Range
  const treatmentOptions = [
    "Consultation",
    "Diagnostic Test",
    "Surgical Procedure",
  ];

  const [openDoctorDropdown, setOpenDoctorDropdown] = useState(false);

  const [treatment, setTreatment] = useState({
    patientName: "",
    age: "",
    assignedDoctor: "",
    admissionRecommendation: "false",
    treatmentType: "",
    treatmentDate: "",
    availableSlot: "",
    note: ""
  });

  const [openTreatment, setOpenTreatment] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState("");
  console.log("Modal Data: ",modalData)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllDoctors())
  }, [dispatch]);

  const doctors = useSelector((store) => store.doctor.allDoctors)

  const handleSubmit = () => {
    const finalData = {
      ...modalData,
      treatment: treatment
    }
    // console.log("Final Schedule Treatment Data: ", finalData);
    dispatch(submitConsultation(finalData,onSuccess,onClose))
  };

  const formatTo12Hour = (time24) => {
    if (!time24) return "";
    const [hour, minute] = time24.split(":");
    const hourNum = parseInt(hour, 10);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  const convert12To24 = (time12) => {
    if (!time12) return "";
    const [time, modifier] = time12.split(" ");     // e.g. ["11:30", "AM"]
    let [hours, minutes] = time.split(":");         // e.g. ["11", "30"]

    if (modifier === "PM" && hours !== "12") {
      hours = String(parseInt(hours, 10) + 12);
    }
    if (modifier === "AM" && hours === "12") {
      hours = "00";
    }

    return `${hours.padStart(2, "0")}:${minutes}`;  // e.g. "11:30"
  };

  return (
    <div>
      {" "}
      <div className={styles.crossContainer}>
        <X
          size={20}
          onClick={() => {
            onClose();
          }}
        />
      </div>
      <header className={styles.header}>
        <p>Schedule Treatment</p>
      </header>
      <div className={styles.container}>
        {/* Patient Information */}
        <div className={styles.patientInformation}>
          <p className={styles.piHeader}>Patient Information</p>
          <div className={styles.piSection1}>
            <div className={styles.piLabel}>
              <p>Patient Information</p>
              <p>Age</p>
            </div>
            <div className={styles.piValue}>
              <input
                  type="text"
                  value={treatment.patientName}
                  onChange={(e) => setTreatment({...treatment, patientName: e.target.value})}
              />
              <input
                  type="number"
                  value={treatment.age}
                  onChange={(e) => setTreatment({...treatment, age: e.target.value})}
              />
            </div>
          </div>
          <div className={styles.piSection2}>
            {" "}
            <div className={styles.piLabel}>
              <p>Doctor Assigned</p>
              <p>Admit Patient</p>
            </div>
            <div className={styles.piValue}>
              <div className={styles.dropdown}>
                <button
                    className={styles.trigger}
                    onClick={() => setOpenDoctorDropdown((prev) => !prev)}
                >
                  <p>
                    {treatment.assignedDoctor
                        ? doctors.find((d) => d._id === treatment.assignedDoctor)?.name
                        : "Select Doctor"}
                  </p>
                  <span className={styles.arrow}>
      {openDoctorDropdown ? <ChevronUp/> : <ChevronDown/>}
    </span>
                </button>

                {openDoctorDropdown && (
                    <ul className={styles.menu}>
                      {doctors.map((doc) => (
                          <li
                              key={doc._id}
                              className={styles.item}
                              onClick={() => {
                                setTreatment({...treatment, assignedDoctor: doc._id});
                                setOpenDoctorDropdown(false);
                              }}
                          >
                            {doc.name}
                          </li>
                      ))}
                    </ul>
                )}
              </div>
              <div className={styles.radioGroup}>
                <label>
                  <input
                      type="radio"
                      name="admit"
                      value="true"
                      checked={treatment.admissionRecommendation === "true"}
                      onChange={(e) => setTreatment({...treatment, admissionRecommendation: e.target.value})}
                  />
                  Yes
                </label>
                <label>
                  <input
                      type="radio"
                      name="admit"
                      value="false"
                      checked={treatment.admissionRecommendation === "false"}
                      onChange={(e) => setTreatment({...treatment, admissionRecommendation: e.target.value})}
                  />
                  No
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Section 1 */}
        <div className={styles.section1}>
          <div className={styles.treatmentType}>
          <p className={styles.label}>Treatment Type</p>{" "}
            <div className={styles.dropdown}>
              <button
                className={styles.trigger}
                onClick={() => setOpenTreatment((prev) => !prev)}
              >
                <p
                  className={
                    selectedTreatment === "" ? styles.placeholder : null
                  }
                >
                  {selectedTreatment || "Select Treatment Type"}
                </p>
                <span className={styles.arrow}>
                  {openTreatment ? <ChevronUp /> : <ChevronDown />}
                </span>
              </button>
              {openTreatment && (
                <ul className={styles.menu}>
                  {treatmentOptions.map((option) => (
                    <li
                      key={option}
                      className={`${styles.item} ${
                        selectedTreatment === option ? styles.active : ""
                      }`}
                      onClick={() => {
                        setTreatment({ ...treatment, treatmentType: option });
                        setSelectedTreatment(option); // optional for display
                        setOpenTreatment(false);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className={styles.dateAndTime}>
            <div className={styles.date}>
              <p className={styles.label}>Date</p>
              <input
                  className={styles.input2}
                  type="date"
                  value={treatment.treatmentDate}
                  onChange={(e) => setTreatment({...treatment, treatmentDate: e.target.value})}
              />
            </div>
            <div className={styles.time}>
              <p className={styles.label}>Time</p>
              <input
                  type="time"
                  className={styles.input2}
                  value={
                    treatment.availableSlot
                        ? convert12To24(treatment.availableSlot)
                        : ""
                  }
                  onChange={(e) => {
                    const formattedTime = formatTo12Hour(e.target.value); // e.g., "11:30 AM"
                    setTreatment({...treatment, availableSlot: formattedTime});
                  }}
              />
            </div>
          </div>

          <div className={styles.doctorNotes}>
            <label htmlFor="notes" className={styles.label}>
              Doctor Notes
            </label>
            <textarea
                name="notes"
                id="notes"
                placeholder="Additional Instruction or Notes"
                rows={4}
                value={treatment.note}
                onChange={(e) => setTreatment({...treatment, note: e.target.value})}
            />
          </div>
        </div>

        {/* Submit Container */}
        <div className={styles.submitContainer}>
          <button onClick={handleSubmit}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTreatment;
