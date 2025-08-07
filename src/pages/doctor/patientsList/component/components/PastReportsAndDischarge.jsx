import { useEffect, useState } from "react";
import styles from "./PastReportsAndDischarge.module.scss";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getPatientHistory } from "../../../../../components/State/Doctor/Action";
import { Modal, Box } from "@mui/material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const formatValue = (value) => {
  if (!value) return "N/A";
  if (typeof value === "string") return value;
  if (typeof value === "number") return value;
  if (dayjs(value).isValid() && typeof value === "string") {
    return dayjs(value).format("DD MMM YYYY");
  }
  if (typeof value === "object") {
    return (
      <ul style={{ paddingLeft: "1rem", margin: 0 }}>
        {Object.entries(value).map(([k, v]) => (
          <li key={k}>
            <strong>{k}:</strong> {formatValue(v)}
          </li>
        ))}
      </ul>
    );
  }
  return JSON.stringify(value);
};

const PastReportsAndDischarge = ({ patientId }) => {
  const dispatch = useDispatch();
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    dispatch(getPatientHistory(patientId));
  }, [dispatch, patientId]);

  const closeModal = () => setActiveModal(null);
  const patientHistory = useSelector((store) => store.doctor.patientHistory);
  const capitalize = (str) =>
    typeof str === "string" ? str.charAt(0).toUpperCase() + str.slice(1) : str;

  return (
    <div className={styles.container}>
      <header>
        <p>Past Reports And Discharges</p>
      </header>
      <Modal open={!!activeModal} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxWidth: 600,
            width: "90%",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          {activeModal && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <h2 style={{ marginBottom: "8px", fontSize: "22px" }}>
                Consultation Details
              </h2>

              {/* Top-level fields (excluding _id & consultationData) */}
              {Object.entries(activeModal).map(([key, value]) => {
                if (key === "_id" || key === "consultationData") return null;

                const displayValue =
                  value === null || value === undefined ? (
                    <span style={{ color: "#888" }}>—</span>
                  ) : key === "date" ? (
                    dayjs(value).format("DD MMM YYYY, hh:mm A")
                  ) : (
                    value
                  );

                return (
                  <div key={key} style={{ fontSize: "15px" }}>
                    <strong>{capitalize(key)}:</strong> {displayValue}
                  </div>
                );
              })}

              {/* Expandable Consultation Data Section */}
              {activeModal.consultationData && (
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: 600 }}>
                      Consultation Data
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      {Object.entries(activeModal.consultationData).map(
                        ([key, value]) => {
                          if (typeof value === "object" && value !== null) {
                            return (
                              <div key={key}>
                                <div
                                  style={{
                                    fontWeight: 600,
                                    marginBottom: "4px",
                                    color: "#666",
                                  }}
                                >
                                  {capitalize(key)}:
                                </div>
                                {Object.entries(value).map(
                                  ([subKey, subValue]) => (
                                    <div
                                      key={`${key}-${subKey}`}
                                      style={{
                                        marginLeft: "10px",
                                        fontSize: "15px",
                                      }}
                                    >
                                      <strong>{capitalize(subKey)}:</strong>{" "}
                                      {subValue === null ||
                                      subValue === undefined ? (
                                        <span style={{ color: "#888" }}>—</span>
                                      ) : (
                                        subValue
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            );
                          } else {
                            return (
                              <div key={key} style={{ fontSize: "15px" }}>
                                <strong>{capitalize(key)}:</strong>{" "}
                                {value === null || value === undefined ? (
                                  <span style={{ color: "#888" }}>—</span>
                                ) : (
                                  value
                                )}
                              </div>
                            );
                          }
                        }
                      )}
                    </div>
                  </AccordionDetails>
                </Accordion>
              )}
            </div>
          )}
        </Box>
      </Modal>
      {/* Card List */}
      <div className={styles.cardWrapper}>
        {patientHistory?.length > 0 ? (
          patientHistory.map((entry, index) => (
            <div
              key={index}
              className={styles.card}
              onClick={() => setActiveModal(entry)}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.top}>
                <div className={styles.left}>
                  <img src="/assets/labIcon.svg" alt="icon" />
                  <div className={styles.meta}>
                    <h3>
                      Consultation with {entry.doctor || "Doctor not specified"}
                    </h3>
                    <p>
                      {entry.date
                        ? dayjs(entry.date).format("DD MMM YYYY, hh:mm A")
                        : "Date not available"}
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.details}>
                <p>
                  <strong>Department:</strong> {entry.department || "N/A"}
                </p>
                <p>
                  <strong>Diagnosis:</strong>{" "}
                  {entry.consultationData?.diagnosis || "Not specified"}
                </p>
                <p>
                  <strong>Complaints:</strong>{" "}
                  {entry.consultationData?.complaints || "Not specified"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noData}>No consultation history found.</p>
        )}
      </div>
    </div>
  );
};

export default PastReportsAndDischarge;
