// MedicalInfo.jsx
import React from "react";
import PropTypes from "prop-types";
import styles from "../profile.module.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const MedicalInfo = ({
  patient,
  medicalHistory = [],
  currentMedications = [],
  patDetails = {},
  symptoms = [],
  history = [],
  showButton = true,
}) => {
  const navigate = useNavigate();
  // -------------------------
  //  EVENT-BASED LOADING LOGIC
  // -------------------------
  // detect if user switched to different patient
  const isSwitchingPatient = patDetails?._id !== patient?._id;

  //  detect incomplete event data
  const consultations = patDetails?.consultations;
  const admissions = patDetails?.admissionRequests;

  const isLoadingEvents =
    isSwitchingPatient ||
    consultations === undefined ||
    admissions === undefined;

  if (isLoadingEvents) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={32} sx={{ color: "#25307F" }} />
      </div>
    );
  }

  // Once loaded, ensure arrays
  const safeConsultations = Array.isArray(consultations) ? consultations : [];
  const safeAdmissions = Array.isArray(admissions) ? admissions : [];

  // Build unified history items. Keep minimal info for the list view.
  const events = [
    ...safeConsultations.map((c) => ({
      id: `consult-${c?._id || c?.date}`,
      type: "consultation",
      label: "Consulted at",
      at: c?.date,
      doctor: c?.doctor?.name,
      department: c?.department?.name,
      raw: c,
    })),
    ...safeAdmissions.map((a) => ({
      id: `admission-${a?._id || a?.createdAt}`,
      type: "admission",
      label: "Admitted at",
      at: a?.createdAt,
      status: a?.status,
      doctor: a?.doctor?.name,
      raw: a,
    })),
  ]
    .filter((e) => e.at)
    .sort((a, b) => new Date(b.at) - new Date(a.at));

  const haveAny = events.length > 0;

  if (!haveAny) {
    return (
      <>
        <h3 style={{ color: "#25307F", fontWeight: 500 }}>Medical Info</h3>
        <div
          style={{
            width: "100%",
            height: "60%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ fontStyle: "italic", color: "gray" }}>
            No medical history found
          </p>
        </div>
      </>
    );
  }

  const handleMoreClick = () => {
    navigate("/doctor/patients/profile/more-info", {
      state: {
        patDetails,
        consultations,
        admissions,
        medicalHistory,
        currentMedications,
        symptoms,
        history,
        patient,
      },
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div style={{ padding: "1px 15px" }}>
          <h4 className={styles.title}>Medical Info</h4>

          {/* Unified history list */}
          <ul
            style={{
              margin: 0,
              paddingLeft: 18,
              height: "30vh",
              overflowY: "auto",
            }}
          >
            {events.map((e) => {
              const d = new Date(e.at);
              const date = d.toLocaleDateString();
              const time = d.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <li
                  key={e.id}
                  style={{
                    marginBottom: 12,
                    padding: "8px 10px",
                    border: "1px solid #D8D8D8",
                    borderRadius: "6px",
                    background: "#F9FAFF",
                    listStyle: "none",
                    fontSize: 13,
                  }}
                >
                  <div style={{ fontWeight: 600, color: "#25307F" }}>
                    {e.type === "consultation" ? "Consulted At" : "Admitted At"}
                  </div>

                  <div>
                    <strong>Date:</strong> {date}
                  </div>
                  <div>
                    <strong>Time:</strong> {time}
                  </div>

                  {e.doctor && (
                    <div>
                      <strong>Doctor:</strong> Dr. {e.doctor.trim()}
                    </div>
                  )}
                  {e.department && (
                    <div>
                      <strong>Department:</strong> {e.department}
                    </div>
                  )}
                  {e.status && (
                    <div>
                      <strong>Status:</strong> {e.status}
                    </div>
                  )}

                  <div>
                    <strong>Type:</strong>{" "}
                    {e.type === "consultation" ? "Consultation" : "Admission"}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {showButton && (
          <div>
            <Button
              variant="outlined"
              endIcon={
                <ArrowForwardIosIcon
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "50%",
                    padding: "1px",
                    color: "#25307F",
                  }}
                />
              }
              onClick={handleMoreClick}
              sx={{
                padding: "6px 15px",
                gap: "28px",
                borderColor: "#25307F",
                borderRadius: "20px",
                textTransform: "none",
                backgroundColor: "#25307F",
                fontSize: "12px",
                color: "#ffffff",
              }}
            >
              More
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

MedicalInfo.propTypes = {
  patient: PropTypes.object,
  medicalHistory: PropTypes.array,
  currentMedications: PropTypes.array,
  patDetails: PropTypes.object, // object, not array
  symptoms: PropTypes.array,
  history: PropTypes.array,
  showButton: PropTypes.bool,
};

export default MedicalInfo;
