import styles from "./PatientNewForm.module.scss";
import { ChevronLeft, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

const PatientNewForm = ({ onBack }) => {
  return (
    <div>
      {" "}
      {/* row 1 */}
      <div className={styles.row1}>
        <div className={styles.r1Left}>
          <ChevronLeft
            size={26}
            className={styles.arrowLeftIcon}
            onClick={() => {
              onBack();
            }}
          />
          <p>Patient New Form</p>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          {/* row 2 */}
          <div className={styles.row2}>
            <div className={styles.imgContainer}>
              <img src="https://i.pravatar.cc/30?img=20" alt="" />
            </div>
            <div className={styles.patientInfo}>
              <p className={styles.pName}>Patient Name</p>
              <p className={styles.pType}>patient type</p>
            </div>
          </div>
        </div>
        <div className={styles.middlePanel}></div>
        <div className={styles.rightPanel}></div>
      </div>
    </div>
  );
};

export default PatientNewForm;
