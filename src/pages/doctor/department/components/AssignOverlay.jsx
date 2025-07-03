import { useEffect, useState } from "react";
import { X } from "lucide-react";
import styles from "./AssignOverlay.module.scss";
import {
  Select,
  MenuItem,
  FormControl,
  ListItemText,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { assignPatient } from "../../../../components/State/Doctor/Action";

const doctorRoles = [
  "Primary Doctor",
  "Consultant",
  "Observation Only",
  "On-call Support",
];

const staffRoles = [
  "Primary Nurse",
  "Ward In-charge",
  "Assistant Nurse",
  "Support Staff",
];

const AssignOverlay = ({
  selectedDoctors: initialDoctors,
  onClose,
  assignmentType,
}) => {
  const [localDoctors, setLocalDoctors] = useState(initialDoctors);
  const [search, setSearch] = useState("");
  const [selectedShift, setSelectedShift] = useState("Morning");
  const [assignmentDuration, setAssignmentDuration] =
    useState("One Time Visit");

  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");
  const removeDoctor = (id) => {
    setLocalDoctors((prev) => prev.filter((doc) => doc._id !== id));
  }; //  Auto-close overlay if all doctors are removed
  useEffect(() => {
    if (localDoctors.length === 0) {
      onClose();
    }
  }, [localDoctors, onClose]);

  const patients = useSelector((state) => state.doctor.patients);

  console.log(patients);
  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const roleOptions = assignmentType === "staff" ? staffRoles : doctorRoles;

  const [selectedPatients, setSelectedPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>

        <h2 className={styles.heading}>Assigning Doctor/Staff to Patient</h2>

        <div className={styles.tags}>
          {localDoctors.map((doc) => (
            <div className={styles.tag} key={doc._id}>
              <span
                className={styles.close}
                onClick={() => removeDoctor(doc._id)}
              >
                <X size={16} strokeWidth={3} />
              </span>
              {doc.name}
            </div>
          ))}
        </div>

        <div className={styles.grid}>
          {/* LEFT – Patient Table */}
          <div className={styles.left}>
            <div className={styles.subheading}>
              <label className={styles.label}>
                Select Patient/Name/ Room No{" "}
              </label>
              <svg
                width="9"
                height="18"
                viewBox="0 0 9 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.2954 0.833647L8.5957 8.99995L1.2954 17.1663L-0.000409126 15.7167L6.00409 8.99995L-0.000409126 2.28317L1.2954 0.833647Z"
                  fill="#25307F"
                />
              </svg>
            </div>

            <div className={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
              />
              <svg
                className={styles.searchIcon}
                width="20"
                height="20"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.1333 28L17.7333 19.6C17.0667 20.1333 16.3 20.5556 15.4333 20.8667C14.5667 21.1778 13.6444 21.3333 12.6667 21.3333C10.2444 21.3333 8.19467 20.4942 6.51733 18.816C4.84 17.1378 4.00089 15.088 4 12.6667C3.99911 10.2453 4.83822 8.19556 6.51733 6.51733C8.19645 4.83911 10.2462 4 12.6667 4C15.0871 4 17.1373 4.83911 18.8173 6.51733C20.4973 8.19556 21.336 10.2453 21.3333 12.6667C21.3333 13.6444 21.1778 14.5667 20.8667 15.4333C20.5556 16.3 20.1333 17.0667 19.6 17.7333L28 26.1333L26.1333 28ZM12.6667 18.6667C14.3333 18.6667 15.7502 18.0836 16.9173 16.9173C18.0844 15.7511 18.6676 14.3342 18.6667 12.6667C18.6658 10.9991 18.0827 9.58267 16.9173 8.41733C15.752 7.252 14.3351 6.66844 12.6667 6.66667C10.9982 6.66489 9.58178 7.24844 8.41733 8.41733C7.25289 9.58622 6.66933 11.0027 6.66667 12.6667C6.664 14.3307 7.24756 15.7476 8.41733 16.9173C9.58711 18.0871 11.0036 18.6702 12.6667 18.6667Z"
                  fill="#878787"
                />
              </svg>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Case Id</th>
                    <th>Name</th>
                    <th>Room</th>
                    <th>Diagnosis</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((p, i) => {
                    const isSelected = selectedPatients.includes(p.caseId);
                    return (
                      <tr
                        key={i}
                        onClick={() => {
                          setSelectedPatients((prev) =>
                            isSelected
                              ? prev.filter((id) => id !== p.caseId)
                              : [...prev, p.caseId]
                          );
                        }}
                        className={isSelected ? styles.selectedRow : ""}
                        style={{ cursor: "pointer" }}
                      >
                        <td style={{ color: "#25307f" }}>
                          {p.caseId || "N/A"}
                        </td>
                        <td style={{ color: "#25307f" }}>{p.name || "N/A"}</td>
                        <td>{p.room || "N/A"}</td>
                        <td>{p.diagnosis || "N/A"}</td>
                        <td>{p.realStatus || "N/A"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT – Assignment Fields */}
          <div className={styles.right}>
            <FormControl fullWidth>
              <label className={styles.label}> Roles & Responsibility </label>
              <Select
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
                displayEmpty
                renderValue={(selected) =>
                  selected ? (
                    selected
                  ) : (
                    <span style={{ color: "#C7C7C7" }}>
                      Ex. Consultant / Observation only
                    </span>
                  )
                }
                sx={{
                  backgroundColor: "#fff",
                  color: selectedValue ? "#000" : "#333",
                  borderRadius: "4px",
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      mt: 1,
                      "& .MuiMenuItem-root": {
                        pl: "10px",
                      },
                      "& .Mui-selected": {
                        backgroundColor: "transparent !important",
                      },
                    },
                  },
                }}
              >
                {roleOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    <Box
                      sx={{
                        borderLeft:
                          selectedValue === opt
                            ? "3px solid #25307F"
                            : "3px solid transparent",
                        paddingLeft: "12px",
                      }}
                    >
                      <ListItemText
                        primary={opt}
                        primaryTypographyProps={{
                          style: {
                            color: selectedValue === opt ? "#25307F" : "#333",
                            fontWeight: selectedValue === opt ? 600 : 400,
                          },
                        }}
                      />
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div className={styles.formGroup}>
              <label className={styles.label}>Shift/Timing</label>
              <div className={styles.buttonRow}>
                {["Morning", "Evening", "Night"].map((s) => (
                  <button
                    key={s}
                    className={`${styles.toggleBtn} ${
                      selectedShift === s ? styles.active : ""
                    }`}
                    onClick={() => setSelectedShift(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Duration of Assignment</label>
              <div className={styles.buttonRow}>
                {["One Time Visit", "Till Discharge"].map((d) => (
                  <button
                    key={d}
                    className={`${styles.toggleBtn} ${
                      assignmentDuration === d ? styles.active : ""
                    }`}
                    onClick={() => setAssignmentDuration(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <button
              className={styles.assignBtn}
              onClick={async () => {
                if (
                  localDoctors.length === 0 ||
                  selectedPatients.length === 0 ||
                  !selectedValue ||
                  !selectedShift ||
                  !assignmentDuration
                ) {
                  toast.error(
                    "Please fill all required fields before assigning.",
                    {
                      position: "bottom-right",
                      autoClose: 2000,
                    }
                  );
                  return;
                }

                const payload = {
                  assignmentType,
                  patientIds: selectedPatients,
                  role: selectedValue,
                  shift: selectedShift,
                  duration: assignmentDuration,
                };

                if (assignmentType === "doctor") {
                  payload.doctorIds = localDoctors.map((doc) => doc._id);
                } else if (assignmentType === "staff") {
                  payload.staffIds = localDoctors.map((doc) => doc._id);
                }

                try {
                  setIsLoading(true);
                  await dispatch(assignPatient(payload));
                  onClose();
                } finally {
                  setIsLoading(false);
                }
              }}
              disabled={isLoading}
            >
              {isLoading ? "Assigning..." : "Assign"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignOverlay;
