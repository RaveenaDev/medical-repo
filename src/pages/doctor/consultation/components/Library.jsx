import { useEffect, useState } from "react";
import styles from "./Library.module.scss";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUserConsultationForms,
  removePrescriptionsWithAI,
} from "../../../../components/State/Doctor/Action.js";

export default function Library({
  onClose,
  onApply,
  setSelectedComponent,
  setCompleteData,
    setConfirmedSections,
    setCustomSections
}) {
  const prebuilt = [
    {
      title: "Step Care Default Template",
      description:
          "Sections: Medical History,Current Medications,Diagnosis & Vitals,Prescriptions & Medicines,Treatment & Tests",
    },
    {
      title: "Step Care Default Template1",
      description:
        "Sections: Medical History,Current Medications,Diagnosis & Vitals,Prescriptions & Medicines,Treatment & Tests",
    },
  ];

  const [activeTab, setActiveTab] = useState("prebuilt");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserConsultationForms());
  }, [dispatch]);

  const getAllUserForms = useSelector(
    (store) => store.doctor.userConsultationForms
  );

  //console.log("Saved Forms: ", getAllUserForms);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.head}>
        <div className={styles.crossContainer}>
          <X
            size={20}
            onClick={() => {
              onClose();
            }}
          />
        </div>

        {/* Tab Buttons */}
        <div className={styles.row1}>
          <button
            onClick={() => setActiveTab("prebuilt")}
            className={`${styles.tabButton} ${
              activeTab === "prebuilt" ? "" : styles.activeTab
            }`}
          >
            Prebuilt Forms
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`${styles.tabButton} ${
              activeTab === "saved" ? "" : styles.activeTab
            }`}
          >
            My Saved Forms
          </button>
        </div>
      </div>

      {/* Forms Container */}
      <div className={styles.formsContainer}>
        {/* Prebuilt Forms */}
        {activeTab === "prebuilt" ? (
          prebuilt.map((form, index) => (
            <div className={styles.row2} key={index}>
              <h4>{form.title}</h4>
              <p>{form.description}</p>
              <div className={styles.btnContainer}>
                <button className={styles.previewBtn}>
                  <img src="/assets/filterIcon.svg" alt="" width={20} />
                  Preview
                </button>
                <button
                  className={styles.applyBtn}
                  onClick={() => {
                    if (index === 0) {
                      onApply(null);
                    } else {
                      onApply(`custom${index}`); // custom1, custom2, ...
                    } // send data to parent
                    setSelectedComponent("PatientInfo");
                    setCompleteData({});
                    setConfirmedSections([]);
                    setCustomSections([]);
                    dispatch(removePrescriptionsWithAI());
                    onClose(); // close modal
                  }}
                >
                  <img src="/assets/clipboardIcon.svg" alt="" width={20} />
                  Apply
                </button>
              </div>
            </div>
          ))
        ) : getAllUserForms && getAllUserForms.length > 0 ? (
          getAllUserForms.map((form, index) => (
            <div className={styles.row2} key={index}>
              <h4>{form.title}</h4>
              <p>
                Sections:{" "}
                {form.sections?.map((field) => field.name).join(", ") ||
                  "No sections"}
              </p>
              <div className={styles.btnContainer}>
                <button className={styles.previewBtn}>
                  <img src="/assets/filterIcon.svg" alt="" width={20} />
                  Preview
                </button>
                <button
                  className={styles.applyBtn}
                  onClick={() => {
                    onApply(form); // send data to parent
                    setSelectedComponent("PatientInfo");
                    setCompleteData({});
                    setConfirmedSections([]);
                    setCustomSections([]);
                    dispatch(removePrescriptionsWithAI());
                    onClose(); // close modal
                  }}
                >
                  <img src="/assets/clipboardIcon.svg" alt="" width={20} />
                  Apply
                </button>
              </div>
            </div>
          ))
        ) : (
          <p
            style={{
              textAlign: "center",
              marginTop: "1rem",
              color: "gray",
              fontStyle: "italic",
            }}
          >
            No forms found
          </p>
        )}
      </div>
    </div>
  );
}
