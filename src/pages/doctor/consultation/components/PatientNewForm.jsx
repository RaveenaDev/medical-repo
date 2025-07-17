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

const PatientNewForm = ({ onBack }) => {
  const [formTitle, setFormTitle] = useState("");
  const [visibleDropdowns, setVisibleDropdowns] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [deletingOption, setDeletingOption] = useState(null);
  const [newlyAddedOptionKey, setNewlyAddedOptionKey] = useState(null);
  const [showAddSection, setShowAddSection] = useState(false);
  const addSectionRef = useRef(null);
  const [newSectionName, setNewSectionName] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState("static-1"); // default to first static section
  const [sections, setSections] = useState([
    {
      id: "static-1",
      name: "Medical History",
      isStatic: true,
      fields: [
        {
          id: "mh-1",
          type: "text",
          question: "Please describe the reason for your visit",
          placeholder: "",
          isReadOnly: true,
        },
        {
          id: "mh-2",
          type: "text",
          question:
            "Have you had heart surgery or procedures? (e.g., stents, bypass surgery)",
          placeholder: "If yes, (Please specify):",
          isReadOnly: true,
        },
        {
          id: "mh-3",
          type: "text",
          question:
            "Have you had any diagnostic tests related to your current condition?",
          placeholder: "If yes, (Please specify):",
          isReadOnly: true,
        },
        {
          id: "mh-4",
          type: "text",
          question: "Do you have any allergies?",
          placeholder: "If yes, (Please specify):",
          isReadOnly: true,
        },
        {
          id: "mh-5",
          type: "radio",
          question: "Do you smoke?",
          options: ["Yes", "No"],
          isReadOnly: true,
        },
        {
          id: "mh-6",
          type: "radio",
          question: "Do you drink alcohol?",
          options: ["Yes", "No"],
          isReadOnly: true,
        },
        {
          id: "mh-7",
          type: "checklist",
          question:
            "Do you have a history of any of the following conditions? (Check all that apply)",
          options: [
            "Hypertension",
            "Heart failure",
            "Irregular heartbeat",
            "Asthma",
            "Diabetes",
            "Peripheral Artery Disease",
            "Heart attack",
            "Other (Please specify):",
          ],
          isReadOnly: true,
        },
      ],
    },
    {
      id: "static-2",
      name: "Prescription & Medicines",
      isStatic: true,
      fields: [],
    },
  ]);

  const handleAddCustomSection = (name) => {
    const newSection = {
      id: uuidv4(),
      name,
      isStatic: false,
      fields: [],
    };
    setSections((prev) => [...prev, newSection]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        addSectionRef.current &&
        !addSectionRef.current.contains(event.target)
      ) {
        setShowAddSection(false);
      }
    };

    if (showAddSection) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAddSection]);

  const handleAddTextField = () => {
    if (!selectedSectionId) return;

    const updatedSections = sections.map((section) => {
      if (section.id === selectedSectionId) {
        return {
          ...section,
          fields: [
            ...section.fields,
            { id: uuidv4(), type: "text", question: "", placeholder: "" },
          ],
        };
      }
      return section;
    });

    setSections(updatedSections);
  };

  const handleAddMultilineField = () => {
    const updatedSections = sections.map((section) =>
      section.id === selectedSectionId
        ? {
            ...section,
            fields: [
              ...section.fields,
              {
                id: uuidv4(),
                type: "multiline",
                question: "",
                placeholder: "",
              },
            ],
          }
        : section
    );
    setSections(updatedSections);
  };

  const handleAddDropdown = () => {
    const updatedSections = sections.map((section) =>
      section.id === selectedSectionId
        ? {
            ...section,
            fields: [
              ...section.fields,
              {
                id: uuidv4(),
                type: "dropdown",
                question: "",
                options: ["", ""],
              },
            ],
          }
        : section
    );
    setSections(updatedSections);
  };

  const handleAddRadio = () => {
    const updatedSections = sections.map((section) =>
      section.id === selectedSectionId
        ? {
            ...section,
            fields: [
              ...section.fields,
              {
                id: uuidv4(),
                type: "radio",
                question: "",
                options: ["", ""],
              },
            ],
          }
        : section
    );
    setSections(updatedSections);
  };

  const handleAddChecklist = () => {
    const updatedSections = sections.map((section) =>
      section.id === selectedSectionId
        ? {
            ...section,
            fields: [
              ...section.fields,
              {
                id: uuidv4(),
                type: "checklist",
                question: "",
                options: ["", ""],
              },
            ],
          }
        : section
    );
    setSections(updatedSections);
  };

  const handleDeleteSection = (id) => {
    setSections((prev) => prev.filter((section) => section.id !== id));

    // Optional: Reset selected section if the deleted one was selected
    if (selectedSectionId === id) {
      setSelectedSectionId("static-1"); // fallback to default static section
    }
  };

  const handleDeleteDropdown = (id) => {
    setDeletingId(id); // Mark for animation

    setTimeout(() => {
      const updatedSections = sections.map((section) =>
        section.id === selectedSectionId
          ? {
              ...section,
              fields: section.fields.filter((f) => f.id !== id),
            }
          : section
      );
      setSections(updatedSections);
      setDeletingId(null);
    }, 300);
  };

  useEffect(() => {
    const currentSection = sections.find(
      (section) => section.id === selectedSectionId
    );
    const newDropdowns = currentSection?.fields.map((f) => f.id) || [];
    setTimeout(() => setVisibleDropdowns(newDropdowns), 50);
  }, [sections, selectedSectionId]);

  const handleSaveForm = async () => {
    if (!formTitle.trim()) {
      toast.error("Form title cannot be empty.");
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
        isStatic: section.isStatic,
        fields: section.fields,
      })),
    };

    console.log(formTemplate);
    toast.success("Form saved successfully!");
  };

  const currentSection = sections.find(
    (section) => section.id === selectedSectionId
  );

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

  const updateFieldInCurrentSection = (fieldId, updatedField) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === selectedSectionId
          ? {
              ...section,
              fields: section.fields.map((f) =>
                f.id === fieldId ? { ...f, ...updatedField } : f
              ),
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
            ? {
                ...section,
                fields: section.fields.filter((f) => f.id !== fieldId),
              }
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
  }) => {
    const ref = useRef(null);

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

    return (
      <div
        ref={ref}
        key={section.id}
        className={`${styles.row4} `}
        onClick={() => setSelectedSectionId(section.id)}
        style={{
          backgroundColor:
            selectedSectionId === section.id ? "#eef8f1" : "transparent",
          border:
            selectedSectionId === section.id
              ? "1px solid #2e823b"
              : "1px solid #cfcfcf",

          // cursor: "move",
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        <div className={styles.sectionTitleRow1}>
          <p>{section.name}</p>

          <div className={styles.sectionTitleRow1Right}>
            <SquarePen className={styles.editIcon} />
            {!section.isStatic && (
              <Trash2
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteSection(section.id);
                }}
                className={styles.sectionDeleteIcon}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

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
              />
            ))}
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
              {currentSection?.fields.map((field) => (
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
                          disabled={field.isReadOnly}
                          onChange={(e) => {
                            updateFieldInCurrentSection(field.id, {
                              question: e.target.value,
                            });
                          }}
                        />
                      </div>

                      {/* Placeholder input */}
                      <div className={styles.questionRow}>
                        <input
                          type="text"
                          className={styles.input3}
                          disabled={field.isReadOnly}
                          placeholder="Placeholder (optional)"
                          value={field.placeholder}
                          onChange={(e) => {
                            updateFieldInCurrentSection(field.id, {
                              placeholder: e.target.value,
                            });
                          }}
                        />
                      </div>
                      {!field.isReadOnly && (
                        <div className={styles.questionBottomRow2}>
                          <Trash2
                            className={styles.trashIcon}
                            size={18}
                            onClick={() => handleDeleteField(field.id)}
                          />
                        </div>
                      )}
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

                      <div className={styles.questionRow}>
                        <input
                          type="text"
                          className={styles.input2}
                          placeholder="Question"
                          value={field.question}
                          disabled={field.isReadOnly}
                          onChange={(e) =>
                            updateFieldInCurrentSection(field.id, {
                              question: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className={styles.questionRow}>
                        <input
                          type="text"
                          className={styles.input3}
                          placeholder="Placeholder (optional)"
                          value={field.placeholder}
                          disabled={field.isReadOnly}
                          onChange={(e) =>
                            updateFieldInCurrentSection(field.id, {
                              placeholder: e.target.value,
                            })
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
                          disabled={field.isReadOnly}
                          onChange={(e) =>
                            updateFieldInCurrentSection(field.id, {
                              question: e.target.value,
                            })
                          }
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
                              disabled={field.isReadOnly}
                              placeholder={`Option ${idx + 1}`}
                              onChange={(e) => {
                                const updatedOptions = [...field.options];
                                updatedOptions[idx] = e.target.value;
                                updateFieldInCurrentSection(field.id, {
                                  options: updatedOptions,
                                });
                              }}
                            />
                            {!field.isReadOnly && (
                              <X
                                className={styles.xIcon}
                                size={18}
                                onClick={() => {
                                  setDeletingOption(key);
                                  setTimeout(() => {
                                    const updatedOptions = field.options.filter(
                                      (_, i) => i !== idx
                                    );
                                    updateFieldInCurrentSection(field.id, {
                                      options: updatedOptions,
                                    });
                                    setDeletingOption(null);
                                  }, 300);
                                }}
                              />
                            )}
                          </div>
                        );
                      })}

                      {/* Add option + delete field */}
                      {!field.isReadOnly && (
                        <div className={styles.questionBottomRow}>
                          <div
                            className={styles.addOption}
                            onClick={() => {
                              const newOptions = [...field.options, ""];
                              updateFieldInCurrentSection(field.id, {
                                options: newOptions,
                              });

                              const newKey = `${field.id}-${field.options.length}`;
                              setNewlyAddedOptionKey(newKey);
                              setTimeout(
                                () => setNewlyAddedOptionKey(null),
                                500
                              );
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
                      )}
                    </div>
                  )}

                  {field.type === "dropdown" && (
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

                      {/* Question input */}
                      <div className={styles.questionRow}>
                        <input
                          type="text"
                          className={styles.input2}
                          placeholder="Question"
                          value={field.question}
                          disabled={field.isReadOnly}
                          onChange={(e) =>
                            updateFieldInCurrentSection(field.id, {
                              question: e.target.value,
                            })
                          }
                        />
                      </div>

                      {/* Options */}
                      {field.options.map((option, idx) => {
                        const key = `${field.id}-${idx}`;
                        return (
                          <div
                            key={key}
                            className={`${styles.optionWrapper} ${
                              newlyAddedOptionKey === key ? styles.fadeIn : ""
                            } ${deletingOption === key ? styles.fadeOut : ""}`}
                          >
                            <span className={styles.optionNumber}>
                              {idx + 1}.
                            </span>
                            <input
                              type="text"
                              className={styles.input3}
                              value={option}
                              placeholder={`Option ${idx + 1}`}
                              disabled={field.isReadOnly}
                              onChange={(e) => {
                                const updatedOptions = [...field.options];
                                updatedOptions[idx] = e.target.value;
                                updateFieldInCurrentSection(field.id, {
                                  options: updatedOptions,
                                });
                              }}
                            />
                            {!field.isReadOnly && (
                              <X
                                className={styles.xIcon}
                                size={18}
                                onClick={() => {
                                  setDeletingOption(key);
                                  setTimeout(() => {
                                    const updatedOptions = field.options.filter(
                                      (_, i) => i !== idx
                                    );
                                    updateFieldInCurrentSection(field.id, {
                                      options: updatedOptions,
                                    });
                                    setDeletingOption(null);
                                  }, 300);
                                }}
                              />
                            )}
                          </div>
                        );
                      })}

                      {/* Add option + Delete entire dropdown */}
                      {!field.isReadOnly && (
                        <div className={styles.questionBottomRow}>
                          <div
                            className={styles.addOption}
                            onClick={() => {
                              const newOptions = [...field.options, ""];
                              updateFieldInCurrentSection(field.id, {
                                options: newOptions,
                              });

                              const newKey = `${field.id}-${field.options.length}`;
                              setNewlyAddedOptionKey(newKey);
                              setTimeout(
                                () => setNewlyAddedOptionKey(null),
                                500
                              );
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
                      )}
                    </div>
                  )}

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
                          disabled={field.isReadOnly}
                          value={field.question}
                          onChange={(e) =>
                            updateFieldInCurrentSection(field.id, {
                              question: e.target.value,
                            })
                          }
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
                              disabled={field.isReadOnly}
                              onChange={(e) => {
                                const updatedOptions = [...field.options];
                                updatedOptions[idx] = e.target.value;
                                updateFieldInCurrentSection(field.id, {
                                  options: updatedOptions,
                                });
                              }}
                            />
                            {!field.isReadOnly && (
                              <X
                                className={styles.xIcon}
                                size={18}
                                onClick={() => {
                                  setDeletingOption(key);
                                  setTimeout(() => {
                                    const updatedOptions = field.options.filter(
                                      (_, i) => i !== idx
                                    );
                                    updateFieldInCurrentSection(field.id, {
                                      options: updatedOptions,
                                    });
                                    setDeletingOption(null);
                                  }, 300);
                                }}
                              />
                            )}
                          </div>
                        );
                      })}

                      {/* Add item + delete checklist field */}
                      {!field.isReadOnly && (
                        <div className={styles.questionBottomRow}>
                          <div
                            className={styles.addOption}
                            onClick={() => {
                              updateFieldInCurrentSection(field.id, {
                                options: [...field.options, ""],
                              });

                              const newKey = `${field.id}-${field.options.length}`;
                              setNewlyAddedOptionKey(newKey);
                              setTimeout(
                                () => setNewlyAddedOptionKey(null),
                                500
                              );
                            }}
                          >
                            <Plus className={styles.plusIcons} />
                            <span>Add item</span>
                          </div>

                          {!field.options.some((opt) =>
                            opt.trim().toLowerCase().startsWith("other")
                          ) && (
                            <div
                              className={styles.addOption}
                              onClick={() => {
                                updateFieldInCurrentSection(field.id, {
                                  options: [
                                    ...field.options,
                                    "Other (Please specify):",
                                  ],
                                });

                                const newKey = `${field.id}-${field.options.length}`;
                                setNewlyAddedOptionKey(newKey);
                                setTimeout(
                                  () => setNewlyAddedOptionKey(null),
                                  500
                                );
                              }}
                            >
                              <Plus className={styles.plusIcons} />
                              <span>Add Other</span>
                            </div>
                          )}

                          <Trash2
                            className={styles.trashIcon}
                            size={18}
                            onClick={() => handleDeleteField(field.id)}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* section 2 */}
              {currentSection?.fields.length === 0 && (
                <div className={styles.guideText}>
                  {currentSection?.id === "static-2" ? (
                    <p>
                      This section will be auto-filled based on AI
                      recommendations.
                    </p>
                  ) : (
                    <p>
                      Drag fields here or
                      <br /> click to add new
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Section 3*/}
          <div className={styles.section3}>
            {/* last row */}
            <div className={styles.mLastRow}>
              {!currentSection?.isStatic && (
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
                    setFormTitle(""); // Optional: reset form title too
                  }}
                >
                  Cancel
                </button>
              )}
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
          {!currentSection?.isStatic && (
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
          )}
        </div>
      </div>
    </>
  );
};

export default PatientNewForm;
