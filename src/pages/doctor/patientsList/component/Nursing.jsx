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
} from "lucide-react";
import UpdateNursing from "./form/UpdateNursing";

const Nursing = () => {
  const vitalsData = [
    {
      name: "Heart Rate",
      value: "110",
      unit: "bpm",
      time: "2:15 pm",
    },
    {
      name: "Temperature",
      value: "98.4",
      unit: "°F",
      time: "3:00 pm",
    },
    {
      name: "Blood Pressure",
      value: "122/80",
      unit: "mmHg",
      time: "4:00 pm",
    },
    {
      name: "SpO2",
      value: "88",
      unit: "%",
      time: "11:00 am",
    },
    {
      name: "Heart Rate",
      value: "110",
      unit: "bpm",
      time: "2:15 pm",
    },
    {
      name: "Temperature",
      value: "98.4",
      unit: "°F",
      time: "3:00 pm",
    },
    {
      name: "Blood Pressure",
      value: "70/80",
      unit: "mmHg",
      time: "4:00 pm",
    },
    {
      name: "SpO2",
      value: "98",
      unit: "%",
      time: "11:00 am",
    },
  ];

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
          <button className={styles.editBtn}>
            <img src="/assets/Pen.svg" alt="pen icon" width={14} />
          </button>
          <button className={styles.updateBtn} onClick={openUpdate}>
            <Plus size={18} />
            Update
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

      <div className={styles.vitalWrapper}>
        {vitalsData.map((vital, index) => {
          const value = vital.value;
          const numericValue =
            vital.name === "Blood Pressure" ? null : Number(value);

          let systolic = null;
          let diastolic = null;

          if (vital.name === "Blood Pressure") {
            [systolic, diastolic] = value.split("/").map(Number);
          }

          let statusLabel = "";
          let Icon = MoveRight;
          let statusClass = styles.normal;
          let containerClass = styles.normalContainer;
          let barClass = styles.normalBar;

          if (vital.name === "Heart Rate") {
            if (numericValue >= 100) {
              statusLabel = "Rising";
              Icon = MoveUp;
              statusClass = styles.rising;
              containerClass = styles.risingContainer;
              barClass = styles.risingBar;
            } else if (numericValue >= 60) {
              statusLabel = "Normal";
            } else {
              statusLabel = "Dropped";
              Icon = MoveDown;
              statusClass = styles.dropped;
              containerClass = styles.droppedContainer;
              barClass = styles.droppedBar;
            }
          } else if (vital.name === "Temperature") {
            if (numericValue >= 99.5) {
              statusLabel = "Rising";
              Icon = MoveUp;
              statusClass = styles.rising;
              containerClass = styles.risingContainer;
              barClass = styles.risingBar;
            } else if (numericValue >= 97) {
              statusLabel = "Normal";
            } else {
              statusLabel = "Dropped";
              Icon = MoveDown;
              statusClass = styles.dropped;
              containerClass = styles.droppedContainer;
              barClass = styles.droppedBar;
            }
          } else if (vital.name === "Blood Pressure") {
            if (systolic >= 130 || diastolic >= 90) {
              statusLabel = "Rising";
              Icon = MoveUp;
              statusClass = styles.rising;
              containerClass = styles.risingContainer;
              barClass = styles.risingBar;
            } else if (systolic >= 90 && diastolic >= 60) {
              statusLabel = "Normal";
            } else {
              statusLabel = "Dropped";
              Icon = MoveDown;
              statusClass = styles.dropped;
              containerClass = styles.droppedContainer;
              barClass = styles.droppedBar;
            }
          } else if (vital.name === "SpO2") {
            if (numericValue >= 95) {
              statusLabel = "Normal";
              statusClass = styles.normal;
              containerClass = styles.risingContainer;
              barClass = styles.spO2NormalBar;
            } else if (numericValue >= 90) {
              statusLabel = "Dropped";
              Icon = MoveDown;
              statusClass = styles.dropped;
              containerClass = styles.normalContainer;
              barClass = styles.spO2DroppedBar;
            } else {
              statusLabel = "Critical";
              Icon = MoveDown;
              statusClass = styles.rising;
              containerClass = styles.droppedContainer;
              barClass = styles.spO2CriticalBar;
            }
          }

          const VitalIcon =
            vital.name === "Heart Rate" ? (
              <Heart fill="#f14400" strokeWidth={0} />
            ) : vital.name === "Temperature" ? (
              <Thermometer fill="#ffa629" strokeWidth={0} />
            ) : vital.name === "Blood Pressure" ? (
              <HeartPulse strokeWidth={1} fill="#25307f" stroke="#f2f5ff" />
            ) : (
              <img src="/assets/mdi_oxygen-tank.svg" alt="SpO₂" />
            );

          return (
            <div key={index} className={styles.vital}>
              <div className={styles.vitalLeft}>
                <div className={styles.row1Left}>
                  {VitalIcon}
                  <h2>{vital.name}</h2>
                </div>
                <div className={styles.row2Left}>
                  <h1>{vital.value}</h1>
                  <p>{vital.unit}</p>
                </div>
              </div>
              <div className={styles.vitalRight}>
                <div className={`${styles.row1Right} ${statusClass}`}>
                  <Icon size={12} strokeWidth={3} />
                  <h3>{statusLabel}</h3>
                </div>
                <div className={styles.row2Right}>
                  <h4>{vital.time}</h4>
                  <div className={containerClass}>
                    <div className={`${styles.progressBar} ${barClass}`}></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Nursing;
