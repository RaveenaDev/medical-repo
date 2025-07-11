import styles from "./PatientNewForm.module.scss";
import {
  ChevronLeft,
  CircleDot,
  Plus,
  SquarePen,
  TextCursorInput,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PatientNewForm = ({ onBack }) => {
  const [formFields, setFormFields] = useState([]);
  const [formTitle, setFormTitle] = useState("");
  const [visibleDropdowns, setVisibleDropdowns] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [deletingOption, setDeletingOption] = useState(null);
  const [newlyAddedOptionKey, setNewlyAddedOptionKey] = useState(null);
  const handleAddTextField = (question = "") => {
    setFormFields([
      ...formFields,
      {
        id: Date.now(),
        type: "text",
        question,
        placeholder: "",
      },
    ]);
  };

  const handleAddMultilineField = () => {
    setFormFields([
      ...formFields,
      {
        id: Date.now(),
        type: "multiline",
        question: "",
        placeholder: "",
      },
    ]);
  };

  const handleAddDropdown = () => {
    setFormFields([
      ...formFields,
      {
        id: Date.now(),
        type: "dropdown",
        question: "",
        options: ["", ""],
      },
    ]);
  };

  useEffect(() => {
    const newDropdowns = formFields.map((f) => f.id);
    setTimeout(() => setVisibleDropdowns(newDropdowns), 50);
  }, [formFields]);

  const handleDeleteDropdown = (id) => {
    setDeletingId(id); // Mark for animation
    setTimeout(() => {
      setFormFields(formFields.filter((f) => f.id !== id));
      setDeletingId(null);
    }, 300); // Match with CSS transition duration
  };
  const handleAddRadio = () => {
    setFormFields([
      ...formFields,
      {
        id: Date.now(),
        type: "radio",
        question: "",
        options: ["", ""],
      },
    ]);
  };

  const handleAddChecklist = () => {
    setFormFields([
      ...formFields,
      {
        id: Date.now(),
        type: "checklist",
        question: "",
        options: ["", ""],
      },
    ]);
  };

  const handleSaveForm = async () => {
    if (!formTitle.trim()) {
      toast.error("Form title cannot be empty.");
      return;
    }

    for (let i = 0; i < formFields.length; i++) {
      const field = formFields[i];

      if (!field.question.trim()) {
        toast.error(`Question cannot be empty.`);
        return;
      }

      // Check options if field has them
      if (["radio", "dropdown", "checklist"].includes(field.type)) {
        const emptyOptionIndex = field.options.findIndex((opt) => !opt.trim());
        if (emptyOptionIndex !== -1) {
          toast.error(`Options cannot contain empty values.`);
          return;
        }
      }
    }

    const formTemplate = {
      title: formTitle,
      fields: formFields,
    };

    console.log(formTemplate);
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
          <div
            className={styles.row4}
            onClick={() => handleAddTextField("Symptoms")}
          >
            <p>Symptoms</p>
            <SquarePen size={21} />
          </div>

          {/* row 5 */}
          <div className={styles.row5}>
            <p>Cold, Fever, Headache</p>
          </div>

          {/* row 6 */}
          <div
            className={styles.row4}
            onClick={() => handleAddTextField("Diagnosis")}
          >
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
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </div>

            <div className={styles.mRow2}>
              {formFields.map((field) => (
                <>
                  {field.type === "text" && (
                    <div
                      key={field.id}
                      className={`${styles.dropdownField} ${
                        deletingId === field.id ? styles.fadeOut : ""
                      } ${
                        visibleDropdowns.includes(field.id) ? styles.show : ""
                      }`}
                    >
                      <div className={styles.inputTitle}>
                        <p>Text Field</p>
                      </div>

                      {/* Question input */}
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

                      {/* Placeholder input */}
                      <div className={styles.questionRow}>
                        <input
                          type="text"
                          className={styles.input3}
                          placeholder="Placeholder (optional)"
                          value={field.placeholder}
                          onChange={(e) => {
                            const updated = formFields.map((f) =>
                              f.id === field.id
                                ? { ...f, placeholder: e.target.value }
                                : f
                            );
                            setFormFields(updated);
                          }}
                        />
                      </div>

                      <div className={styles.questionBottomRow2}>
                        <Trash2
                          className={styles.trashIcon}
                          size={18}
                          onClick={() => handleDeleteDropdown(field.id)}
                        />
                      </div>
                    </div>
                  )}
                  {field.type === "multiline" && (
                    <div
                      key={field.id}
                      className={`${styles.dropdownField} ${
                        deletingId === field.id ? styles.fadeOut : ""
                      } ${
                        visibleDropdowns.includes(field.id) ? styles.show : ""
                      }`}
                    >
                      <div className={styles.inputTitle}>
                        <p>Multiline Text Field</p>
                      </div>

                      {/* Question input */}
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

                      {/* Placeholder input */}
                      <div className={styles.questionRow}>
                        <input
                          type="text"
                          className={styles.input3}
                          placeholder="Placeholder (optional)"
                          value={field.placeholder}
                          onChange={(e) => {
                            const updated = formFields.map((f) =>
                              f.id === field.id
                                ? { ...f, placeholder: e.target.value }
                                : f
                            );
                            setFormFields(updated);
                          }}
                        />
                      </div>

                      <div className={styles.questionBottomRow2}>
                        <Trash2
                          className={styles.trashIcon}
                          size={18}
                          onClick={() => handleDeleteDropdown(field.id)}
                        />
                      </div>
                    </div>
                  )}
                  {field.type === "radio" && (
                    <div
                      key={field.id}
                      className={`${styles.dropdownField} ${
                        deletingId === field.id ? styles.fadeOut : ""
                      } ${
                        visibleDropdowns.includes(field.id) ? styles.show : ""
                      }`}
                    >
                      <div className={styles.inputTitle}>
                        <p>Radio Options</p>
                      </div>

                      {/* Question input */}
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

                      {/* Radio options */}
                      {field.options.map((option, idx) => {
                        const key = `${field.id}-${idx}`;
                        return (
                          <div
                            key={key}
                            className={`${styles.optionWrapper} ${
                              newlyAddedOptionKey === key ? styles.fadeIn : ""
                            } ${deletingOption === key ? styles.fadeOut : ""}`}
                          >
                            <input type="radio" disabled />
                            <input
                              type="text"
                              className={styles.input3}
                              value={option}
                              placeholder={`Option ${idx + 1}`}
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
                            />
                            <X
                              className={styles.xIcon}
                              size={18}
                              onClick={() => {
                                setDeletingOption(key);
                                setTimeout(() => {
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
                                  setDeletingOption(null);
                                }, 300);
                              }}
                            />
                          </div>
                        );
                      })}

                      {/* Add option + delete radio group */}
                      <div className={styles.questionBottomRow}>
                        <div
                          className={styles.addOption}
                          onClick={() => {
                            const updated = formFields.map((f) =>
                              f.id === field.id
                                ? { ...f, options: [...f.options, ""] }
                                : f
                            );
                            setFormFields(updated);

                            const newKey = `${field.id}-${field.options.length}`;
                            setNewlyAddedOptionKey(newKey);
                            setTimeout(() => setNewlyAddedOptionKey(null), 500);
                          }}
                        >
                          <Plus className={styles.plusIcons} />
                          <span>Add option</span>
                        </div>

                        <Trash2
                          className={styles.trashIcon}
                          size={18}
                          onClick={() => handleDeleteDropdown(field.id)}
                        />
                      </div>
                    </div>
                  )}

                  {field.type === "dropdown" ? (
                    <div
                      key={field.id}
                      className={`${styles.dropdownField} ${
                        deletingId === field.id ? styles.fadeOut : ""
                      } ${
                        visibleDropdowns.includes(field.id) ? styles.show : ""
                      }`}
                    >
                      <div className={styles.inputTitle}>
                        <p>Dropdown Menu</p>
                      </div>
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
                        <div
                          key={idx}
                          className={`${styles.optionWrapper} ${
                            newlyAddedOptionKey === `${field.id}-${idx}`
                              ? styles.fadeIn
                              : ""
                          } ${
                            deletingOption === `${field.id}-${idx}`
                              ? styles.fadeOut
                              : ""
                          }`}
                        >
                          <span className={styles.optionNumber}>
                            {idx + 1}.
                          </span>
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
                              const key = `${field.id}-${idx}`;
                              setDeletingOption(key);
                              setTimeout(() => {
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
                                setDeletingOption(null);
                              }, 300); // must match CSS transition
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
                                    options: [...f.options, ""],
                                  }
                                : f
                            );
                            setFormFields(updated);

                            const newKey = `${field.id}-${field.options.length}`;
                            setNewlyAddedOptionKey(newKey);

                            setTimeout(() => {
                              setNewlyAddedOptionKey(null);
                            }, 500); // match SCSS animation
                          }}
                        >
                          <Plus className={styles.plusIcons} />
                          <span>Add option</span>
                        </div>{" "}
                        <Trash2
                          className={styles.trashIcon}
                          size={18}
                          onClick={() => handleDeleteDropdown(field.id)}
                        />
                      </div>
                    </div>
                  ) : null}
                  {field.type === "checklist" && (
                    <div
                      key={field.id}
                      className={`${styles.dropdownField} ${
                        deletingId === field.id ? styles.fadeOut : ""
                      } ${
                        visibleDropdowns.includes(field.id) ? styles.show : ""
                      }`}
                    >
                      <div className={styles.inputTitle}>
                        <p>Checklist</p>
                      </div>

                      {/* Question input */}
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

                      {/* Checklist items */}
                      {field.options.map((item, idx) => {
                        const key = `${field.id}-${idx}`;
                        return (
                          <div
                            key={key}
                            className={`${styles.optionWrapper} ${
                              newlyAddedOptionKey === key ? styles.fadeIn : ""
                            } ${deletingOption === key ? styles.fadeOut : ""}`}
                          >
                            <input type="checkbox" disabled />
                            <input
                              type="text"
                              className={styles.input3}
                              value={item}
                              placeholder={`Item ${idx + 1}`}
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
                            />
                            <X
                              className={styles.xIcon}
                              size={18}
                              onClick={() => {
                                setDeletingOption(key);
                                setTimeout(() => {
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
                                  setDeletingOption(null);
                                }, 300); // match CSS duration
                              }}
                            />
                          </div>
                        );
                      })}

                      {/* Add item + delete checklist */}
                      <div className={styles.questionBottomRow}>
                        <div
                          className={styles.addOption}
                          onClick={() => {
                            const updated = formFields.map((f) =>
                              f.id === field.id
                                ? {
                                    ...f,
                                    options: [...f.options, ""], // Empty new item
                                  }
                                : f
                            );
                            setFormFields(updated);

                            const newKey = `${field.id}-${field.options.length}`;
                            setNewlyAddedOptionKey(newKey);

                            setTimeout(() => setNewlyAddedOptionKey(null), 500); // match animation
                          }}
                        >
                          <Plus className={styles.plusIcons} />
                          <span>Add item</span>
                        </div>

                        <Trash2
                          className={styles.trashIcon}
                          size={18}
                          onClick={() => handleDeleteDropdown(field.id)}
                        />
                      </div>
                    </div>
                  )}
                </>
              ))}
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
              <button
                className={styles.cancelBtn}
                onClick={() => {
                  setFormFields([]);
                  setFormTitle("");
                }}
              >
                Cancel
              </button>
              <button className={styles.saveBtn} onClick={handleSaveForm}>
                Save Form
              </button>
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
            <button
              className={styles.rRow2}
              onClick={() => handleAddTextField("")}
            >
              <TextCursorInput className={styles.rightIcon} />
              <p>Text Field</p>
            </button>
            {/* row 3 */}
            <button className={styles.rRow2} onClick={handleAddMultilineField}>
              <img src="/assets/multilineIcon.svg" alt="" />
              <p>Multi-line Text Field</p>
            </button>{" "}
            {/* row 4 */}
            <button className={styles.rRow2} onClick={handleAddRadio}>
              <CircleDot className={styles.rightIcon} />
              <p>Radio</p>
            </button>
            {/* row 5 */}
            <button className={styles.rRow2} onClick={handleAddDropdown}>
              <img src="/assets/dropDownIcon.svg" alt="" />
              <p>Dropdown Menu</p>
            </button>
            {/* row 6 */}
            <button className={styles.rRow2} onClick={handleAddChecklist}>
              <img src="/assets/checklistIcon.svg" alt="" />
              <p>Checklist</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientNewForm;
