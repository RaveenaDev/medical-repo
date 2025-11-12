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
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { createNewConsultationForm } from "../../../../components/State/Doctor/Action.js";

const PatientNewForm = ({ onBack }) => {
  const [formTitle, setFormTitle] = useState("");
  const [visibleDropdowns, setVisibleDropdowns] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [deletingOption, setDeletingOption] = useState(null);
  const [newlyAddedOptionKey, setNewlyAddedOptionKey] = useState(null);
  const [showAddSection, setShowAddSection] = useState(false);
  const addSectionRef = useRef(null);
  const [newSectionName, setNewSectionName] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [sections, setSections] = useState([]);

  const handleAddCustomSection = (name) => {
    const id = uuidv4();
    const newSection = {
      id,
      name,
      isStatic: false,
      fields: [],
    };
    setSections((prev) => [...prev, newSection]);
    setSelectedSectionId(id);
  };

  const handleEditSectionName = (id, newName) => {
    setSections((prev) =>
        prev.map((section) =>
            section.id === id ? { ...section, name: newName } : section
        )
    );
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addSectionRef.current && !addSectionRef.current.contains(event.target)) {
        setShowAddSection(false);
      }
    };
    if (showAddSection) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAddSection]);

  const handleAddTextField = () => {
    if (!selectedSectionId) return;
    setSections((prev) =>
        prev.map((section) =>
            section.id === selectedSectionId
                ? {
                  ...section,
                  fields: [
                    ...section.fields,
                    { id: uuidv4(), type: "text", question: "", placeholder: "" },
                  ],
                }
                : section
        )
    );
  };

  const handleAddMultilineField = () => {
    if (!selectedSectionId) return;
    setSections((prev) =>
        prev.map((section) =>
            section.id === selectedSectionId
                ? {
                  ...section,
                  fields: [
                    ...section.fields,
                    { id: uuidv4(), type: "multiline", question: "", placeholder: "" },
                  ],
                }
                : section
        )
    );
  };

  const handleAddDropdown = () => {
    if (!selectedSectionId) return;
    setSections((prev) =>
        prev.map((section) =>
            section.id === selectedSectionId
                ? {
                  ...section,
                  fields: [
                    ...section.fields,
                    { id: uuidv4(), type: "dropdown", question: "", options: ["", ""] },
                  ],
                }
                : section
        )
    );
  };

  const handleAddRadio = () => {
    if (!selectedSectionId) return;
    setSections((prev) =>
        prev.map((section) =>
            section.id === selectedSectionId
                ? {
                  ...section,
                  fields: [
                    ...section.fields,
                    { id: uuidv4(), type: "radio", question: "", options: ["", ""] },
                  ],
                }
                : section
        )
    );
  };

  const handleAddChecklist = () => {
    if (!selectedSectionId) return;
    setSections((prev) =>
        prev.map((section) =>
            section.id === selectedSectionId
                ? {
                  ...section,
                  fields: [
                    ...section.fields,
                    { id: uuidv4(), type: "checklist", question: "", options: ["", ""] },
                  ],
                }
                : section
        )
    );
  };

  const handleDeleteSection = (id) => {
    setSections((prev) => prev.filter((section) => section.id !== id));
    if (selectedSectionId === id) {
      const remaining = sections.filter((s) => s.id !== id);
      setSelectedSectionId(remaining[0]?.id ?? null);
    }
  };

  const handleDeleteDropdown = (id) => {
    setDeletingId(id);
    setTimeout(() => {
      setSections((prev) =>
          prev.map((section) =>
              section.id === selectedSectionId
                  ? { ...section, fields: section.fields.filter((f) => f.id !== id) }
                  : section
          )
      );
      setDeletingId(null);
    }, 300);
  };

  useEffect(() => {
    const currentSection = sections.find((section) => section.id === selectedSectionId);
    const newDropdowns = currentSection?.fields.map((f) => f.id) || [];
    setTimeout(() => setVisibleDropdowns(newDropdowns), 50);
  }, [sections, selectedSectionId]);

  const handleSaveForm = async () => {
    if (!formTitle.trim()) {
      toast.error("Form title cannot be empty.");
      return;
    }
    if (sections.length === 0) {
      toast.error("Create at least one section.");
      return;
    }

    for (const section of sections) {
      for (const field of section.fields) {
        if (!field.question?.trim()) {
          toast.error(`Question cannot be empty in section "${section.name}".`);
          return;
        }
        if (["radio", "dropdown", "checklist"].includes(field.type)) {
          const hasEmptyOption = field.options?.some((opt) => !opt.trim());
          if (hasEmptyOption) {
            toast.error(
                `Options cannot be empty in "${field.question}" under "${section.name}".`
            );
            return;
          }
        }
      }
    }

    const formTemplate = {
      title: formTitle,
      sections: sections.map((section) => ({
        id: section.id,
        name: section.name,
        isStatic: false,
        fields: section.fields,
      })),
    };

    dispatch(createNewConsultationForm(formTemplate));
    onBack();
  };

  const currentSection = sections.find((section) => section.id === selectedSectionId);

  const FIELD = "FIELD";

  const DraggableButton = ({ type, icon, label, onClick, disabled }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: FIELD,
      item: { fieldType: type },
      canDrag: !disabled,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));
    return (
        <button
            ref={drag}
            className={styles.rRow2}
            style={{ opacity: disabled ? 0.4 : isDragging ? 0.5 : 1, pointerEvents: disabled ? "none" : "auto" }}
            onClick={onClick}
            type="button"
        >
          {icon}
          <p>{label}</p>
        </button>
    );
  };

  const updateFieldInCurrentSection = (fieldId, updatedField) => {
    setSections((prev) =>
        prev.map((section) =>
            section.id === selectedSectionId
                ? {
                  ...section,
                  fields: section.fields.map((f) => (f.id === fieldId ? { ...f, ...updatedField } : f)),
                }
                : section
        )
    );
  };

  const handleDeleteField = (fieldId) => {
    setDeletingId(fieldId);
    setTimeout(() => {
      setSections((prev) =>
          prev.map((section) =>
              section.id === selectedSectionId
                  ? { ...section, fields: section.fields.filter((f) => f.id !== fieldId) }
                  : section
          )
      );
      setDeletingId(null);
    }, 300);
  };

  const selectedSectionIdRef = useRef(selectedSectionId);
  useEffect(() => {
    selectedSectionIdRef.current = selectedSectionId;
  }, [selectedSectionId]);

  const [, drop] = useDrop(() => ({
    accept: FIELD,
    drop: (item) => {
      if (!selectedSectionIdRef.current) return;
      const newField = {
        id: uuidv4(),
        type: item.fieldType,
        question: "",
        ...(item.fieldType === "text" || item.fieldType === "multiline"
            ? { placeholder: "" }
            : { options: ["", ""] }),
      };
      setSections((prev) =>
          prev.map((section) =>
              section.id === selectedSectionIdRef.current
                  ? { ...section, fields: [...section.fields, newField] }
                  : section
          )
      );
    },
  }));

  const moveSection = (fromIndex, toIndex) => {
    const updatedSections = [...sections];
    const [moved] = updatedSections.splice(fromIndex, 1);
    updatedSections.splice(toIndex, 0, moved);
    setSections(updatedSections);
  };

  const SECTION = "SECTION";

  const DraggableSection = ({
                              section,
                              index,
                              selectedSectionId,
                              setSelectedSectionId,
                              handleDeleteSection,
                              moveSection,
                              handleEditSectionName,
                            }) => {
    const ref = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(section.name);

    const [, drop] = useDrop({
      accept: SECTION,
      hover: (item) => {
        if (!ref.current || item.index === index) return;
        moveSection(item.index, index);
        item.index = index;
      },
    });

    const [{ isDragging }, drag] = useDrag({
      type: SECTION,
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    drag(drop(ref));

    const handleSaveName = () => {
      handleEditSectionName(section.id, newName);
      setIsEditing(false);
    };

    return (
        <div
            ref={ref}
            key={section.id}
            className={`${styles.row4}`}
            onClick={() => setSelectedSectionId(section.id)}
            style={{
              backgroundColor: selectedSectionId === section.id ? "#eef8f1" : "transparent",
              border: selectedSectionId === section.id ? "1px solid #2e823b" : "1px solid #cfcfcf",
              opacity: isDragging ? 0.5 : 1,
            }}
        >
          <div className={styles.sectionTitleRow1}>
            {isEditing ? (
                <>
                  <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className={styles.editSectionInput}
                  />
                  <button onClick={handleSaveName} className={styles.saveNameBtn}>
                    Save
                  </button>
                </>
            ) : (
                <>
                  <p>{section.name}</p>
                  <div className={styles.sectionTitleRow1Right}>
                    <SquarePen
                        className={styles.editIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsEditing(true);
                        }}
                    />
                    <Trash2
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSection(section.id);
                        }}
                        className={styles.sectionDeleteIcon}
                    />
                  </div>
                </>
            )}
          </div>
        </div>
    );
  };

  return (
      <>
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
          {/* Left Panel */}
          <div className={styles.leftPanel}>
            {/* row 2 */}
            <div className={styles.row2}>
              <div className={styles.imgContainer}>
                <img src="https://i.pravatar.cc/30?img=20" alt="" />
              </div>
              <div className={styles.patientInfo}>
                <p className={styles.pName}>Patient Name</p>
                <p className={styles.pType}>Patient type</p>
              </div>
            </div>

            {/* row 3 */}
            <div className={styles.row3}>
              <p>Add Sections</p>
              <button onClick={() => setShowAddSection(true)}>
                <Plus className={styles.plusIcons} /> Add
              </button>
            </div>

            {showAddSection && (
                <div className={styles.addSectionContainer} ref={addSectionRef}>
                  <input
                      type="text"
                      placeholder="Enter Section Name"
                      value={newSectionName}
                      onChange={(e) => setNewSectionName(e.target.value)}
                  />
                  <div className={styles.sectionBtn}>
                    <button
                        onClick={() => setShowAddSection(false)}
                        className={styles.cancelSectionBtn}
                        type="button"
                    >
                      Cancel
                    </button>
                    <button
                        onClick={() => {
                          if (newSectionName.trim()) {
                            handleAddCustomSection(newSectionName.trim());
                            setNewSectionName("");
                            setShowAddSection(false);
                          } else {
                            toast.error("Section name cannot be empty.");
                          }
                        }}
                        className={styles.saveSectionBtn}
                        type="button"
                    >
                      Create
                    </button>
                  </div>
                </div>
            )}

            <div className={styles.SectionTitle}>
              {sections.map((section, index) => (
                  <DraggableSection
                      key={section.id}
                      section={section}
                      index={index}
                      selectedSectionId={selectedSectionId}
                      setSelectedSectionId={setSelectedSectionId}
                      handleDeleteSection={handleDeleteSection}
                      moveSection={moveSection}
                      handleEditSectionName={handleEditSectionName}
                  />
              ))}
            </div>
          </div>

          {/* Middle Panel */}
          <div className={styles.middlePanel}>
            {/* Section 1 */}
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
                {!currentSection && (
                    <div className={styles.guideText}>
                      <p>Create a section on the left to add fields.</p>
                    </div>
                )}

                {currentSection &&
                    currentSection.fields.map((field) => (
                        <div key={field.id}>
                          {field.type === "text" && (
                              <div
                                  className={`${styles.dropdownField} ${
                                      deletingId === field.id ? styles.fadeOut : ""
                                  } ${visibleDropdowns.includes(field.id) ? styles.show : ""}`}
                              >
                                <div className={styles.inputTitle}>
                                  <p>Text Field</p>
                                </div>
                                <div className={styles.questionRow}>
                                  <input
                                      type="text"
                                      className={styles.input2}
                                      placeholder="Question"
                                      value={field.question}
                                      onChange={(e) =>
                                          updateFieldInCurrentSection(field.id, { question: e.target.value })
                                      }
                                  />
                                </div>
                                <div className={styles.questionRow}>
                                  <input
                                      type="text"
                                      className={styles.input3}
                                      placeholder="Placeholder (optional)"
                                      value={field.placeholder}
                                      onChange={(e) =>
                                          updateFieldInCurrentSection(field.id, { placeholder: e.target.value })
                                      }
                                  />
                                </div>
                                <div className={styles.questionBottomRow2}>
                                  <Trash2
                                      className={styles.trashIcon}
                                      size={18}
                                      onClick={() => handleDeleteField(field.id)}
                                  />
                                </div>
                              </div>
                          )}

                          {field.type === "multiline" && (
                              <div
                                  className={`${styles.dropdownField} ${
                                      deletingId === field.id ? styles.fadeOut : ""
                                  } ${visibleDropdowns.includes(field.id) ? styles.show : ""}`}
                              >
                                <div className={styles.inputTitle}>
                                  <p>Multiline Text Field</p>
                                </div>
                                <div className={styles.questionRow}>
                                  <input
                                      type="text"
                                      className={styles.input2}
                                      placeholder="Question"
                                      value={field.question}
                                      onChange={(e) =>
                                          updateFieldInCurrentSection(field.id, { question: e.target.value })
                                      }
                                  />
                                </div>
                                <div className={styles.questionRow}>
                                  <input
                                      type="text"
                                      className={styles.input3}
                                      placeholder="Placeholder (optional)"
                                      value={field.placeholder}
                                      onChange={(e) =>
                                          updateFieldInCurrentSection(field.id, { placeholder: e.target.value })
                                      }
                                  />
                                </div>
                                <div className={styles.questionBottomRow2}>
                                  <Trash2
                                      className={styles.trashIcon}
                                      size={18}
                                      onClick={() => handleDeleteField(field.id)}
                                  />
                                </div>
                              </div>
                          )}

                          {field.type === "radio" && (
                              <div
                                  className={`${styles.dropdownField} ${
                                      deletingId === field.id ? styles.fadeOut : ""
                                  } ${visibleDropdowns.includes(field.id) ? styles.show : ""}`}
                              >
                                <div className={styles.inputTitle}>
                                  <p>Radio Options</p>
                                </div>
                                <div className={styles.questionRow}>
                                  <input
                                      type="text"
                                      className={styles.input2}
                                      placeholder="Question"
                                      value={field.question}
                                      onChange={(e) =>
                                          updateFieldInCurrentSection(field.id, { question: e.target.value })
                                      }
                                  />
                                </div>

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
                                              const updatedOptions = [...field.options];
                                              updatedOptions[idx] = e.target.value;
                                              updateFieldInCurrentSection(field.id, { options: updatedOptions });
                                            }}
                                        />
                                        <X
                                            className={styles.xIcon}
                                            size={18}
                                            onClick={() => {
                                              setDeletingOption(key);
                                              setTimeout(() => {
                                                const updatedOptions = field.options.filter((_, i) => i !== idx);
                                                updateFieldInCurrentSection(field.id, { options: updatedOptions });
                                                setDeletingOption(null);
                                              }, 300);
                                            }}
                                        />
                                      </div>
                                  );
                                })}

                                <div className={styles.questionBottomRow}>
                                  <div
                                      className={styles.addOption}
                                      onClick={() => {
                                        const newOptions = [...field.options, ""];
                                        updateFieldInCurrentSection(field.id, { options: newOptions });
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
                                      onClick={() => handleDeleteField(field.id)}
                                  />
                                </div>
                              </div>
                          )}

                          {field.type === "dropdown" && (
                              <div
                                  className={`${styles.dropdownField} ${
                                      deletingId === field.id ? styles.fadeOut : ""
                                  } ${visibleDropdowns.includes(field.id) ? styles.show : ""}`}
                              >
                                <div className={styles.inputTitle}>
                                  <p>Dropdown Menu</p>
                                </div>
                                <div className={styles.questionRow}>
                                  <input
                                      type="text"
                                      className={styles.input2}
                                      placeholder="Question"
                                      value={field.question}
                                      onChange={(e) =>
                                          updateFieldInCurrentSection(field.id, { question: e.target.value })
                                      }
                                  />
                                </div>

                                {field.options.map((option, idx) => {
                                  const key = `${field.id}-${idx}`;
                                  return (
                                      <div
                                          key={key}
                                          className={`${styles.optionWrapper} ${
                                              newlyAddedOptionKey === key ? styles.fadeIn : ""
                                          } ${deletingOption === key ? styles.fadeOut : ""}`}
                                      >
                                        <span className={styles.optionNumber}>{idx + 1}.</span>
                                        <input
                                            type="text"
                                            className={styles.input3}
                                            value={option}
                                            placeholder={`Option ${idx + 1}`}
                                            onChange={(e) => {
                                              const updatedOptions = [...field.options];
                                              updatedOptions[idx] = e.target.value;
                                              updateFieldInCurrentSection(field.id, { options: updatedOptions });
                                            }}
                                        />
                                        <X
                                            className={styles.xIcon}
                                            size={18}
                                            onClick={() => {
                                              setDeletingOption(key);
                                              setTimeout(() => {
                                                const updatedOptions = field.options.filter((_, i) => i !== idx);
                                                updateFieldInCurrentSection(field.id, { options: updatedOptions });
                                                setDeletingOption(null);
                                              }, 300);
                                            }}
                                        />
                                      </div>
                                  );
                                })}

                                <div className={styles.questionBottomRow}>
                                  <div
                                      className={styles.addOption}
                                      onClick={() => {
                                        const newOptions = [...field.options, ""];
                                        updateFieldInCurrentSection(field.id, { options: newOptions });
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
                                      onClick={() => handleDeleteField(field.id)}
                                  />
                                </div>
                              </div>
                          )}

                          {field.type === "checklist" && (
                              <div
                                  className={`${styles.dropdownField} ${
                                      deletingId === field.id ? styles.fadeOut : ""
                                  } ${visibleDropdowns.includes(field.id) ? styles.show : ""}`}
                              >
                                <div className={styles.inputTitle}>
                                  <p>Checklist</p>
                                </div>
                                <div className={styles.questionRow}>
                                  <input
                                      type="text"
                                      className={styles.input2}
                                      placeholder="Question"
                                      value={field.question}
                                      onChange={(e) =>
                                          updateFieldInCurrentSection(field.id, { question: e.target.value })
                                      }
                                  />
                                </div>

                                {field.options.map((option, idx) => {
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
                                            value={option}
                                            placeholder={`Option ${idx + 1}`}
                                            onChange={(e) => {
                                              const updatedOptions = [...field.options];
                                              updatedOptions[idx] = e.target.value;
                                              updateFieldInCurrentSection(field.id, { options: updatedOptions });
                                            }}
                                        />
                                        <X
                                            className={styles.xIcon}
                                            size={18}
                                            onClick={() => {
                                              setDeletingOption(key);
                                              setTimeout(() => {
                                                const updatedOptions = field.options.filter((_, i) => i !== idx);
                                                updateFieldInCurrentSection(field.id, { options: updatedOptions });
                                                setDeletingOption(null);
                                              }, 300);
                                            }}
                                        />
                                      </div>
                                  );
                                })}

                                <div className={styles.questionBottomRow}>
                                  <div
                                      className={styles.addOption}
                                      onClick={() => {
                                        const newOptions = [...field.options, ""];
                                        updateFieldInCurrentSection(field.id, { options: newOptions });
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
                                      onClick={() => handleDeleteField(field.id)}
                                  />
                                </div>
                              </div>
                          )}
                        </div>
                    ))}

                {currentSection && currentSection.fields.length === 0 && (
                    <div className={styles.guideText}>
                      <p>Drag fields here or<br />click to add new</p>
                    </div>
                )}
              </div>
            </div>

            {/* Section 3 */}
            <div className={styles.section3}>
              <div className={styles.mLastRow}>
                {currentSection && (
                    <button
                        className={styles.cancelBtn}
                        onClick={() => {
                          setSections((prev) =>
                              prev.map((section) =>
                                  section.id === selectedSectionId
                                      ? { ...section, fields: [] }
                                      : section
                              )
                          );
                          setFormTitle("");
                        }}
                        type="button"
                    >
                      Cancel
                    </button>
                )}
                <button className={styles.saveBtn} onClick={handleSaveForm} type="button">
                  Save Form
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className={styles.rightPanel}>
            <div className={styles.rRow1}>
              <p>Add Custom Fields</p>
            </div>

            <div className={styles.rightPanelButtons}>
              <DraggableButton
                  type="text"
                  onClick={handleAddTextField}
                  icon={<TextCursorInput className={styles.rightIcon} />}
                  label="Text Field"
              />
              <DraggableButton
                  type="multiline"
                  onClick={handleAddMultilineField}
                  icon={<img src="/assets/multilineIcon.svg" alt="" />}
                  label="Multi-line Text Field"
              />
              <DraggableButton
                  type="radio"
                  onClick={handleAddRadio}
                  icon={<CircleDot className={styles.rightIcon} />}
                  label="Radio"
              />
              <DraggableButton
                  type="dropdown"
                  onClick={handleAddDropdown}
                  icon={<img src="/assets/dropDownIcon.svg" alt="" />}
                  label="Dropdown Menu"
              />
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