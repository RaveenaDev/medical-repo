import React, { useEffect, useState } from "react";
import styles from "./Nursing.module.scss";
import {
  HeartPulse,
  Thermometer,
  Activity,
  Droplet,
  Stethoscope,
  Syringe,
  Calendar,
  AlertTriangle,
  Plus,
  Printer,
} from "lucide-react";
import UpdateNursing from "./form/UpdateNursing";
import { useDispatch, useSelector } from "react-redux";
import { getPatientVitals } from "../../../../components/State/Doctor/Action";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import printJS from "print-js";
import PrintVitals from "./printVitals/PrintVitals";

const Nursing = ({ patientId, patientDetails }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatientVitals(patientId));
  }, [dispatch, patientId]);
  const patientVitals = useSelector((store) => store.doctor.patientVitals);
  const isLoading = useSelector((store) => store.doctor.isLoadingPatientVitals);

  const formatDate = (isoString) => {
    const inputDate = new Date(isoString);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const inputDateOnly = new Date(inputDate);
    inputDateOnly.setHours(0, 0, 0, 0);

    if (inputDateOnly.getTime() === today.getTime()) {
      return "Today";
    } else if (inputDateOnly.getTime() === yesterday.getTime()) {
      return "Yesterday";
    } else {
      const day = String(inputDate.getDate()).padStart(2, "0");
      const month = String(inputDate.getMonth() + 1).padStart(2, "0");
      const year = inputDate.getFullYear();
      return `${day}-${month}-${year}`;
    }
  };

  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeModal]);

  const openUpdate = () => setActiveModal("Update");
  const closeModal = () => setActiveModal(null);
  const vitalIconMap = {
    heartRate: HeartPulse,
    temperature: Thermometer,
    bp: Activity,
    spo2: Droplet,
    respiratoryRate: Stethoscope,
    glucose: Syringe,
    painScore: AlertTriangle,
  };
  // Extract All Unique Vital Keys
  const allVitalKeys = Array.from(
    new Set(
      patientVitals?.flatMap((item) => Object.keys(item.vitals || {})) || []
    )
  );
  const getUnitForVital = (key) => {
    const units = {
      heartRate: "bpm",
      temperature: "°F",
      bp: "mmHg",
      spo2: "%",
      respiratoryRate: "rpm",
      glucose: "mg/dL",
    };
    return units[key] || "";
  };

  const handlePrintVitals = () => {
    printJS({
      printable: "print-vitals",
      type: "html",
      scanStyles: false,
      style: `
      @page { size: A4; margin: 6mm; }

      body {
        font-family: Arial, sans-serif;
        font-size: 11px;
        color: #000;
      }

      .pv-wrap {
        border: 1px solid #000;
        padding: 8px;
      }

      .pv-header h2 {
        text-align: center;
        font-size: 14px;
        margin: 0 0 6px;
      }

      .pv-info {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        border: 1px solid #000;
        padding: 6px;
        margin-bottom: 8px;
      }

      .pv-info span {
        font-size: 9px;
        color: #444;
      }

      .pv-table {
        width: 100%;
        border-collapse: collapse;
      }

      .pv-table th,
      .pv-table td {
        border: 1px solid #000;
        padding: 4px 6px;
        font-size: 10px;
        text-align: center;
      }

      .pv-table th {
        background: #f3f3f3;
        font-weight: 600;
      }
    `,
    });
  };

  return (
    <div className={styles.container}>
      <header>
        <p>Vitals Tracker</p>

        {/* Hidden print container */}
        <div style={{ display: "none" }}>
          <PrintVitals
            patient={patientDetails}
            vitals={patientVitals}
            vitalKeys={allVitalKeys}
          />
        </div>

        <div className={styles.buttons}>
          <button className={styles.printBtn} onClick={handlePrintVitals}>
            <Printer size={"2vh"} /> Print Vitals
          </button>
          <button className={styles.updateBtn} onClick={openUpdate}>
            <Plus style={{ height: "2.2vh" }} />
            Record New Vitals
          </button>
        </div>
      </header>

      {activeModal === "Update" && (
        <>
          <div className={styles.backdropOverlay} onClick={closeModal} />
          <div className={styles.updateModal}>
            <UpdateNursing
              onClose={closeModal}
              patientId={patientId}
              vitalDefinitions={allVitalKeys}
            />
          </div>
        </>
      )}

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
      ) : (
        <div className={styles.tableContainer}>
          <div className={styles.table}>
            <div className={styles.head}>
              {allVitalKeys.map((key) => {
                const Icon = vitalIconMap[key];
                const label = key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (s) => s.toUpperCase());

                return (
                  <div className={styles.th} key={key}>
                    {Icon && <Icon className={styles.icon} />}
                    <span>{label}</span>
                  </div>
                );
              })}

              {!Array.isArray(patientVitals) || patientVitals.length === 0 ? (
                <div className={styles.noData}></div>
              ) : (
                <div className={styles.th}>
                  <Calendar className={styles.icon} />
                  <span>Last Updated</span>
                </div>
              )}
            </div>

            <div className={styles.body}>
              {!Array.isArray(patientVitals) || patientVitals.length === 0 ? (
                <p className={styles.noData}>No vitals recorded.</p>
              ) : (
                [...patientVitals].map((item, idx) => {
                  const formattedDate = formatDate(item.recordedAt);
                  const isToday = formattedDate === "Today";
                  return (
                    <div
                      className={`${styles.tr} ${
                        isToday ? styles.todayRow : ""
                      }`}
                      key={item._id || idx}
                    >
                      {allVitalKeys.map((key) => (
                        <div className={styles.td} key={key}>
                          <span className={styles.value}>
                            {item?.vitals?.[key] ?? "—"}
                          </span>
                          <span className={styles.unit}>
                            {getUnitForVital(key)}
                          </span>
                        </div>
                      ))}
                      <div className={styles.td}>
                        <span className={styles.value}>{formattedDate}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nursing;
