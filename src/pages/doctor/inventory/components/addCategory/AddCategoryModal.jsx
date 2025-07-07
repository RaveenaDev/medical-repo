import styles from "./AddCategoryModal.module.scss";
import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "../../../../../components/State/Doctor/Action";

const AddCategoryModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [minimumStockThreshold, setMinimumStockThreshold] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) {
      setFormError("Category name is required.");
      return;
    }

    if (
      minimumStockThreshold === "" ||
      isNaN(minimumStockThreshold) ||
      Number(minimumStockThreshold) <= 0
    ) {
      setFormError("Minimum stock threshold must be a positive number.");
      return;
    }

    setFormError(""); // Clear error

    const categoryData = {
      name,
      description,
      minimumStockThreshold: Number(minimumStockThreshold),
    };

    dispatch(createCategory(categoryData));
    onClose(); // Optionally close modal
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Add New Inventory Category</h3>
          <X size={24} onClick={onClose} className={styles.close} />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Category Name</label>
            <input
              className={
                formError.includes("Category name") ? styles.errorInput : ""
              }
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label>Minimum stock Threshold</label>
            <input
              type="number"
              className={
                formError.includes("Minimum stock") ? styles.errorInput : ""
              }
              placeholder="e.g. 10"
              value={minimumStockThreshold}
              onChange={(e) => setMinimumStockThreshold(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Description</label>
            <textarea
              className={styles.desc}
              placeholder="Optional Short Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {formError && <p className={styles.errorText}>{formError}</p>}

        <div className={styles.footer}>
          <button className={styles.primary} onClick={handleSubmit}>
            Add Category
          </button>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
