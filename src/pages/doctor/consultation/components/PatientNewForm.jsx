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
import { DndProvider, useDrag, useDrop } from "react-dnd";

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

  const FIELD = "FIELD";

  const DraggableButton = ({ type, icon, label, onClick }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: FIELD,
      item: { fieldType: type },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <button
        ref={drag}
        className={styles.rRow2}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        onClick={onClick}
      >
        {icon}
        <p>{label}</p>
      </button>
    );
  };

  const [, drop] = useDrop(() => ({
    accept: FIELD,
    drop: (item) => {
      const id = Date.now(); // generate a unique ID
      switch (item.fieldType) {
        case "text":
          setFormFields((prev) => [
            ...prev,
            { id, type: "text", question: "", placeholder: "" },
          ]);
          break;
        case "multiline":
          setFormFields((prev) => [
            ...prev,
            { id, type: "multiline", question: "", placeholder: "" },
          ]);
          break;
        case "radio":
          setFormFields((prev) => [
            ...prev,
            { id, type: "radio", question: "", options: ["", ""] },
          ]);
          break;
        case "dropdown":
          setFormFields((prev) => [
            ...prev,
            { id, type: "dropdown", question: "", options: ["", ""] },
          ]);
          break;
        case "checklist":
          setFormFields((prev) => [
            ...prev,
            { id, type: "checklist", question: "", options: ["", ""] },
          ]);
          break;
        default:
          break;
      }
    },
  }));

  return (
    <>
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

            <div className={styles.mRow2} ref={drop}>
              {formFields.map((field) => (
                <div key={field.id}>
                  {field.type === "text" && (
                    <div
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
                </div>
              ))}

              {/* section 2 */}
              {formFields.length === 0 && (
                <div className={styles.guideText}>
                  <p>
                    Drag fields here or
                    <br /> click to add new
                  </p>
                </div>
              )}
            </div>
          </div>

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
            <DraggableButton
              type="text"
              onClick={() => handleAddTextField("")}
              icon={<TextCursorInput className={styles.rightIcon} />}
              label="Text Field"
            />
            {/* row 3 */}
            <DraggableButton
              type="multiline"
              onClick={handleAddMultilineField}
              icon={<img src="/assets/multilineIcon.svg" alt="" />}
              label="Multi-line Text Field"
            />

            {/* row 4 */}
            <DraggableButton
              type="radio"
              onClick={handleAddRadio}
              icon={<CircleDot className={styles.rightIcon} />}
              label="Radio"
            />

            {/* row 5 */}
            <DraggableButton
              type="dropdown"
              onClick={handleAddDropdown}
              icon={<img src="/assets/dropDownIcon.svg" alt="" />}
              label="Dropdown Menu"
            />

            {/* row 6 */}
            <DraggableButton
              type="checklist"
              onClick={handleAddChecklist}
              icon={<img src="/assets/checklistIcon.svg" alt="" />}
              label="Checklist"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientNewForm;
