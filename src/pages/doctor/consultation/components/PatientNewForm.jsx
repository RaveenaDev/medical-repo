import styles from "./PatientNewForm.module.scss";
import { ChevronLeft, Plus, SquarePen, Trash2, X } from "lucide-react";
import { useState } from "react";

const PatientNewForm = ({ onBack }) => {
  const [formFields, setFormFields] = useState([]);

  const handleAddDropdown = () => {
    setFormFields([
      ...formFields,
      {
        id: Date.now(),
        type: "dropdown",
        question: "",
        options: ["Option 1", "Option 2"],
      },
    ]);
  };

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
              <input
                type="text"
                placeholder="Enter Title"
                className={styles.input1}
              />
            </div>

            <div className={styles.mRow2}>
              {formFields.map((field) =>
                field.type === "dropdown" ? (
                  <div key={field.id} className={styles.dropdownField}>
                    {/* Question input + Trash icon */}
                    <div className={styles.questionRow}>
                      <input
                        type="text"
                        className={styles.input2}
                        placeholder="Question"
                        value={field.question}
                        onChange={(e) => {
                          const updated = formFields.map((f) =>
                            f.id === field.id
                              ? { ...f, question: e.target.value }
                              : f
                          );
                          setFormFields(updated);
                        }}
                      />
                    </div>
                    {/* Options */}
                    {field.options.map((option, idx) => (
                      <div key={idx} className={styles.optionWrapper}>
                        <span className={styles.optionNumber}>{idx + 1}.</span>
                        <input
                          type="text"
                          className={styles.input3}
                          value={option}
                          onChange={(e) => {
                            const updated = formFields.map((f) =>
                              f.id === field.id
                                ? {
                                    ...f,
                                    options: f.options.map((opt, i) =>
                                      i === idx ? e.target.value : opt
                                    ),
                                  }
                                : f
                            );
                            setFormFields(updated);
                          }}
                          placeholder={`Option ${idx + 1}`}
                        />
                        <X
                          className={styles.xIcon}
                          size={18}
                          onClick={() => {
                            const updated = formFields.map((f) =>
                              f.id === field.id
                                ? {
                                    ...f,
                                    options: f.options.filter(
                                      (_, i) => i !== idx
                                    ),
                                  }
                                : f
                            );
                            setFormFields(updated);
                          }}
                        />
                      </div>
                    ))}
                    <div className={styles.questionBottomRow}>
                      {/* Add option (on a new line) */}
                      <div
                        className={styles.addOption}
                        onClick={() => {
                          const updated = formFields.map((f) =>
                            f.id === field.id
                              ? {
                                  ...f,
                                  options: [
                                    ...f.options,
                                    `Option ${f.options.length + 1}`,
                                  ],
                                }
                              : f
                          );
                          setFormFields(updated);
                        }}
                      >
                        <Plus className={styles.plusIcons} />
                        <span>Add option</span>
                      </div>{" "}
                      <Trash2
                        className={styles.trashIcon}
                        size={18}
                        onClick={() => {
                          setFormFields(
                            formFields.filter((f) => f.id !== field.id)
                          );
                        }}
                      />
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>

          {/* section 2 */}
          {formFields.length === 0 && (
            <div className={styles.guideText}>
              <p>
                Drag fields here or
                <br /> click to add new
              </p>
            </div>
          )}

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
            <button className={styles.rRow2} onClick={handleAddDropdown}>
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
