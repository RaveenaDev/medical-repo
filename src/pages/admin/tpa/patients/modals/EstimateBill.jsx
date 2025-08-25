import { useEffect, useState } from "react";
import styles from "./EstimateBill.module.scss";
import { ChevronDown, ChevronUp, SquarePen, X, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEstimatedBill,
  getPackage,
} from "../../../../../components/State/Admin/Action.js";

const emptyRow = () => ({
  id: crypto.randomUUID(),
  description: "",
  ward: "",
  package: "",
  rate: "",
  unit: "",
});

const EstimateBill = ({ record, onClose, estimateOld }) => {
  console.log(estimateOld);

  const dispatch = useDispatch();
  const [activeModal, setActiveModal] = useState(null);

  // Table state: categories -> [{ id, name, rows: [{...}] }]
  const [categories, setCategories] = useState([]);

  // Draft state while creating/editing a category
  const [draftCategory, setDraftCategory] = useState({
    id: null, // null for new category, actual id for editing
    name: "",
    rows: [emptyRow()],
  });

  // Warning text state
  const [warningText, setWarningText] = useState("");

  // Package dropdown (per draft row, optional; here one global dropdown)
  const packageOptions = ["option1", "option2", "option3"];
  const [openPackageRowId, setOpenPackageRowId] = useState(null);

  useEffect(() => {
    dispatch(getPackage());
  }, [dispatch]);

  const packages = useSelector((store) => store.admin.packages);

  // console.log("pac:",packages)
  const openCreate = () => {
    setDraftCategory({ id: null, name: "", rows: [emptyRow()] });
    setWarningText(""); // Clear warning when opening
    setActiveModal("createCategory");
  };

  const openEdit = (categoryId) => {
    const categoryToEdit = categories.find((cat) => cat.id === categoryId);
    if (categoryToEdit) {
      // Remove from categories array
      setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));

      // Set as draft with existing data
      setDraftCategory({
        id: categoryToEdit.id,
        name: categoryToEdit.name,
        rows: categoryToEdit.rows.map((row) => ({
          ...row,
          id: row.id || crypto.randomUUID(), // Ensure each row has an ID
        })),
      });
      setWarningText(""); // Clear warning when opening edit
      setActiveModal("createCategory");
    }
  };

  const deleteCategory = (categoryId) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
  };

  const closeCreate = () => {
    setActiveModal(null);
    setOpenPackageRowId(null);
    setWarningText(""); // Clear warning when closing
  };

  const handleDraftName = (e) => {
    setDraftCategory((prev) => ({ ...prev, name: e.target.value }));
    // Clear warning when user starts typing
    if (warningText === "Please enter a category name.") {
      setWarningText("");
    }
  };

  const addDraftRow = () => {
    setDraftCategory((prev) => ({
      ...prev,
      rows: [...prev.rows, emptyRow()],
    }));
    setWarningText(""); // Clear warning when adding row
  };

  const removeDraftRow = (rowId) => {
    if (draftCategory.rows.length > 1) {
      setDraftCategory((prev) => ({
        ...prev,
        rows: prev.rows.filter((r) => r.id !== rowId),
      }));
      setWarningText(""); // Clear warning when successfully removing
    } else {
      setWarningText("Category must have at least one row.");
    }
  };

  const updateDraftRow = (rowId, key, value) => {
    setDraftCategory((prev) => ({
      ...prev,
      rows: prev.rows.map((r) => (r.id === rowId ? { ...r, [key]: value } : r)),
    }));
    // Clear warning when user starts editing rows
    if (warningText === "Please fill at least one row.") {
      setWarningText("");
    }
  };

  const handleSelectPackage = (rowId, value) => {
    updateDraftRow(rowId, "package", value);
    setOpenPackageRowId(null);
  };

  // Compute numeric total for a row
  const rowTotal = (row) => {
    const rate = Number(row.rate || 0);
    const unit = Number(row.unit || 0);
    if (Number.isNaN(rate) || Number.isNaN(unit)) return 0;
    return rate * unit;
  };

  const handleDone = () => {
    const name = draftCategory.name.trim();
    if (!name) {
      setWarningText("Please enter a category name.");
      return;
    }
    if (draftCategory.rows.length === 0) {
      setWarningText("Please add at least one row.");
      return;
    }

    // Optional: sanitize numeric fields
    const cleanRows = draftCategory.rows
      .map((r) => ({
        ...r,
        rate: r.rate === "" ? 0 : Number(r.rate),
        unit: r.unit === "" ? 0 : Number(r.unit),
      }))
      // Optional: filter out completely empty rows (if desired)
      .filter((r) => r.description || r.ward || r.package || r.rate || r.unit);

    if (cleanRows.length === 0) {
      setWarningText("Please fill at least one row.");
      return;
    }

    const categoryData = {
      id: draftCategory.id || crypto.randomUUID(), // Use existing ID if editing, or create new
      name,
      rows: cleanRows,
    };

    if (draftCategory.id) {
      // Editing existing category - replace it
      setCategories((prev) => [
        ...prev.filter((cat) => cat.id !== draftCategory.id),
        categoryData,
      ]);
    } else {
      // Creating new category - add it
      setCategories((prev) => [...prev, categoryData]);
    }

    // Reset and close modal
    setDraftCategory({ id: null, name: "", rows: [emptyRow()] });
    setActiveModal(null);
    setOpenPackageRowId(null);
    setWarningText(""); // Clear warning on success
  };

  const handleDeleteCurrentDraft = () => {
    // Reset and close modal without saving
    setDraftCategory({ id: null, name: "", rows: [emptyRow()] });
    setActiveModal(null);
    setOpenPackageRowId(null);
    setWarningText(""); // Clear warning when deleting
  };

  // Grand total
  const grandTotal = categories.reduce((acc, cat) => {
    const sub = cat.rows.reduce((s, r) => s + rowTotal(r), 0);
    return acc + sub;
  }, 0);

  let estimateBill = {
    admissionRequestId: record._id,
    grandTotal: grandTotal,
    categories: categories.map((cat) => ({
      categoryName: cat.name,
      subtotal: cat.rows.reduce((s, r) => s + rowTotal(r), 0),
      items: cat.rows.map((row) => ({
        description: row.description,
        ward: row.ward,
        package: row.package,
        rate: Number(row.rate || 0),
        unit: Number(row.unit || 0),
        total: rowTotal(row),
      })),
    })),
  };
  const handleSave = () => {
    if (categories.length === 0) {
      setWarningText("Please add at least one category before saving.");
      return;
    }

    // Prepare simplified data structure for backend
    console.log("=== ESTIMATE BILL DATA FOR BACKEND ===");
    console.log(JSON.stringify(estimateBill, null, 2));
    console.log("=== ESTIMATE BILL OBJECT ===");
    console.log(estimateBill);

    dispatch(addEstimatedBill(estimateBill));
  };

  return (
    <div>
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>

      <div className={styles.container}>
        <h1 className={styles.title}>Estimate Bill</h1>

        {/* Create Category */}
        <div className={styles.createCategory}>
          <div className={styles.createAndCancelBtn}>
            <button onClick={openCreate} className={styles.createBtn}>
              Create Category
            </button>
            {activeModal === "createCategory" && (
              <button onClick={closeCreate} className={styles.createBtn}>
                Cancel
              </button>
            )}
          </div>

          {activeModal === "createCategory" && (
            <div className={styles.modalCard}>
              <div className={styles.formRow}>
                <p>Category Name</p>
                <input
                  type="text"
                  value={draftCategory.name}
                  onChange={handleDraftName}
                  placeholder="e.g., Consultants"
                />
              </div>

              {/* Draft rows */}
              {draftCategory.rows.map((row) => (
                <div key={row.id} className={styles.categoryContent}>
                  <div>
                    <p>Description</p>
                    <input
                      type="text"
                      value={row.description}
                      onChange={(e) =>
                        updateDraftRow(row.id, "description", e.target.value)
                      }
                      placeholder=""
                    />
                  </div>

                  <div>
                    <p>Ward</p>
                    <input
                      type="text"
                      value={row.ward}
                      onChange={(e) =>
                        updateDraftRow(row.id, "ward", e.target.value)
                      }
                      placeholder=""
                    />
                  </div>

                  <div>
                    <p>Package</p>
                    <div className={styles.dropdown}>
                      <button
                        className={styles.trigger}
                        onClick={() =>
                          setOpenPackageRowId((prev) =>
                            prev === row.id ? null : row.id
                          )
                        }
                        type="button"
                      >
                        <p>{row.package || "Select Package"}</p>
                        <span className={styles.arrow}>
                          {openPackageRowId === row.id ? (
                            <ChevronUp />
                          ) : (
                            <ChevronDown />
                          )}
                        </span>
                      </button>
                      {openPackageRowId === row.id && (
                        <ul className={styles.menu}>
                          {packages.map((option) => (
                            <li
                              key={option}
                              className={`${styles.item} ${
                                row.package === option ? styles.active : ""
                              }`}
                              onClick={() =>
                                handleSelectPackage(
                                  row.id,
                                  option.subCategoryName
                                )
                              }
                            >
                              {option.subCategoryName}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div>
                    <p>Rate</p>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={row.rate}
                      onChange={(e) =>
                        updateDraftRow(row.id, "rate", e.target.value)
                      }
                      placeholder=""
                    />
                  </div>

                  <div>
                    <p>Unit</p>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={row.unit}
                      onChange={(e) =>
                        updateDraftRow(row.id, "unit", e.target.value)
                      }
                      placeholder=""
                    />
                  </div>

                  <div className={styles.cancelRow}>
                    <X
                      className={styles.crossBtn}
                      onClick={() => removeDraftRow(row.id)}
                    />
                  </div>
                </div>
              ))}

              {/* Warning Text */}
              <div className={styles.warningText}>
                <p style={{ color: "#c44545", fontSize: "14px" }}>
                  {warningText}
                </p>
              </div>

              <div className={styles.addMoreAndDoneBtns}>
                {draftCategory.id && (
                  <button
                    className={styles.deleteCategoryBtn}
                    onClick={handleDeleteCurrentDraft}
                  >
                    Delete Category
                  </button>
                )}
                <button
                  className={styles.addMoreBtn}
                  onClick={addDraftRow}
                  type="button"
                >
                  Add more
                </button>
                <button
                  className={styles.doneBtn}
                  onClick={handleDone}
                  type="button"
                >
                  {draftCategory.id ? "Update" : "Done"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className={styles.table}>
          {/* Table header */}
          <div className={styles.tableHead}>
            <div>
              <span>Description</span>
            </div>
            <div>
              <span>Ward</span>
            </div>
            <div>
              <span>Package</span>
            </div>
            <div>
              <span>Rate</span>
            </div>
            <div>
              <span>Unit</span>
            </div>
            <div>
              <span>Total</span>
            </div>
          </div>

          {/* Render categories and rows */}
          {categories.length === 0 ? (
            <div className={styles.tableRow}>
              <div
                style={{
                  gridColumn: "1 / -1",
                  color: "#666",
                  fontStyle: "italic",
                }}
              >
                No categories added yet. Click "Create Category".
              </div>
            </div>
          ) : (
            categories.map((cat) => {
              const sub = cat.rows.reduce((s, r) => s + rowTotal(r), 0);
              return (
                <div key={cat.id} className={styles.categoryBlock}>
                  <div className={styles.categoryHeader}>
                    <p className={styles.categoryName}>{cat.name}</p>
                    <div className={styles.categoryActions}>
                      <SquarePen
                        className={styles.editIcon}
                        onClick={() => openEdit(cat.id)}
                        title="Edit Category"
                      />
                      <Trash2
                        className={styles.deleteIcon}
                        onClick={() => deleteCategory(cat.id)}
                        title="Delete Category"
                      />
                    </div>
                  </div>

                  {cat.rows.map((r) => (
                    <div key={r.id} className={styles.tableRow}>
                      <div>
                        <span>{r.description}</span>
                      </div>
                      <div>
                        <span>{r.ward}</span>
                      </div>
                      <div>
                        <span>{r.package}</span>
                      </div>
                      <div>
                        <span>{Number(r.rate || 0)}</span>
                      </div>
                      <div>
                        <span>{Number(r.unit || 0)}</span>
                      </div>
                      <div>
                        <span>{rowTotal(r)}</span>
                      </div>
                    </div>
                  ))}

                  <div className={styles.subtotalRow}>
                    <div style={{ gridColumn: "1 / 6", textAlign: "left" }}>
                      <p>Subtotal:</p>
                    </div>
                    <div>
                      <p>{sub}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Grand total */}
          {categories.length > 0 && (
            <div className={styles.grandTotalRow}>
              <div style={{ gridColumn: "1 / 6", textAlign: "left" }}>
                <p>Grand Total:</p>
              </div>
              <div>
                <p>{grandTotal}</p>
              </div>
            </div>
          )}
        </div>

        <div className={styles.saveContainer}>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EstimateBill;
