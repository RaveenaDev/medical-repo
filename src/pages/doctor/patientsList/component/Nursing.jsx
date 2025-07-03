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
    </div>
  );
};

export default Nursing;
