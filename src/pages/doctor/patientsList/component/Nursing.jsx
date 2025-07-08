import React, { useEffect, useState } from "react";
import styles from "./Nursing.module.scss";
import {
  Plus,
  Heart,
  MoveUp,
  MoveDown,
  MoveRight,
  Thermometer,
  HeartPulse,
  Calendar,
} from "lucide-react";
import UpdateNursing from "./form/UpdateNursing";

const Nursing = () => {
  const vitalsData = [
    {
      heartRate: "85",
      temperature: "98.4",
      bloodPressure: "122/80",
      spO2: "96",
      lastUpdated: new Date().toISOString(), // Today
    },
    {
      heartRate: "85",
      temperature: "98.4",
      bloodPressure: "122/80",
      spO2: "96",
      lastUpdated: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    },
    {
      heartRate: "85",
      temperature: "98.4",
      bloodPressure: "122/80",
      spO2: "96",
      lastUpdated: "2026-05-23T08:00:00.000Z",
    },
    {
      heartRate: "85",
      temperature: "98.4",
      bloodPressure: "122/80",
      spO2: "96",
      lastUpdated: "2026-05-23T08:00:00.000Z",
    },
    {
      heartRate: "85",
      temperature: "98.4",
      bloodPressure: "122/80",
      spO2: "96",
      lastUpdated: "2026-05-23T08:00:00.000Z",
    },
  ];

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

  return (
    <div className={styles.container}>
      <header>
        <p>Vitals Tracker</p>
        <div className={styles.buttons}>
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
            <UpdateNursing onClose={closeModal} />
          </div>
        </>
      )}

      <div className={styles.tableContainer}>
        <div className={styles.table}>
          <div className={styles.head}>
            <div className={styles.th}>
              <Heart fill="#f14400" color="#f14400" className={styles.icon} />
              <span>Heart Rate</span>
            </div>
            <div className={styles.th}>
              <Thermometer
                color="#ffa629"
                fill="#ffa629"
                className={styles.icon}
              />
              <span>Temperature</span>
            </div>
            <div className={styles.th}>
              <HeartPulse
                fill="#25307f"
                color="white"
                className={styles.heartPluse}
              />
              <span>Blood Plessure</span>
            </div>
            <div className={styles.th}>
              <img
                src="/assets/mdi_oxygen-tank.svg"
                alt=""
                className={styles.icon}
              />
              <span>Sp02</span>
            </div>
            <div className={styles.th}>
              <Calendar color="#25307f" className={styles.icon} />
              <span>Last Updated</span>
            </div>
          </div>
          <div className={styles.body}>
            {vitalsData.map((item, idx) => {
              const formattedDate = formatDate(item.lastUpdated);
              const isToday = formattedDate === "Today";
              return (
                <div
                  className={`${styles.tr} ${isToday ? styles.todayRow : ""}`}
                  key={idx}
                >
                  <div className={styles.td}>
                    <span className={styles.value}>{item.heartRate}</span>
                    <span className={styles.unit}>bpm</span>
                  </div>

                  <div className={styles.td}>
                    <span className={styles.value}>{item.temperature}</span>
                    <span className={styles.unit}>°F</span>
                  </div>
                  <div className={styles.td}>
                    <span className={styles.value}>{item.bloodPressure}</span>
                    <span className={styles.unit}>mmHg</span>
                  </div>
                  <div className={styles.td}>
                    <span className={styles.value}>{item.spO2}</span>
                    <span className={styles.unit}>%</span>
                  </div>

                  <div className={styles.td}>
                    <span className={styles.value}>{formattedDate}</span>
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

export default Nursing;
