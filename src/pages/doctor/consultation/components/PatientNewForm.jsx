import styles from "./PatientNewForm.module.scss";
import { ChevronLeft, SquarePen } from "lucide-react";
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

          {/* row 3 */}
          <div className={styles.row3}>
            <p>Pre Definable Fields</p>
          </div>

          {/* row 4 */}
          <div className={styles.row4}>
            <p>Symptoms</p>
            <SquarePen size={21} />
          </div>

          {/* row 5 */}
          <div className={styles.row5}>
            <p>Cold, Fever, Headache</p>
          </div>

          {/* row 6 */}
          <div className={styles.row4}>
            <p>Diagnosis</p>
            <SquarePen size={21} />
          </div>

          {/* row 7 */}
          <div className={styles.row5}>
            <p>Common Cold</p>
          </div>
        </div>

        {/* Middle Panel */}
        <div className={styles.middlePanel}>
          {/* Section 1*/}
          <div className={styles.section1}>
            {/* row1 */}
            <div className={styles.mRow1}>
              <p>Form Title</p>
              <input type="text" className={styles.input1} />
            </div>

            {/* row2 */}
            <div className={styles.mRow2}>
              <p className={styles.question}>Sample question</p>
              <input
                type="text"
                placeholder="Answer Text Holder"
                className={styles.input1}
              />
            </div>
          </div>

          {/* Section 2*/}
          <div className={styles.section2}>
            {/* guide text */}
            <div className={styles.guideText}>
              <p>
                Drag fields here or
                <br /> click to add new
              </p>
            </div>
          </div>

          {/* Section 3*/}
          <div className={styles.section3}>
            {/* last row */}
            <div className={styles.mLastRow}>
              <button className={styles.cancelBtn}>Cancel</button>
              <button className={styles.saveBtn}>Save Form</button>
            </div>
          </div>
        </div>
        <div className={styles.rightPanel}>
          {/* row 1*/}
          <div className={styles.rRow1}>
            <p>Add Custom Fields</p>
          </div>

          {/* Right Panel Buttons*/}
          <div className={styles.rightPanelButtons}>
            {/* row 2 */}
            <button className={styles.rRow2}>
              <img src="/assets/dropDownIcon.svg" alt="" />
              <p>Dropdown Menu</p>
            </button>
            {/* row 3 */}
            <button className={styles.rRow2}>
              <img src="/assets/checklistIcon.svg" alt="" />
              <p>Checklist</p>
            </button>
            {/* row 4 */}
            <button className={styles.rRow2}>
              <img src="/assets/multilineIcon.svg" alt="" />
              <p>Multiline Text Field</p>
            </button>
            {/* row 5 */}
            <button className={styles.rRow2}>
              <img src="/assets/uploadIcon.svg" alt="" />
              <p>Multiline Text Field</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientNewForm;
