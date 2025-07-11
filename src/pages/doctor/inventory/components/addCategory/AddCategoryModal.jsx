import styles from "./AddCategoryModal.module.scss";
import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "../../../../../components/State/Doctor/Action";

const AddCategoryModal = ({ onClose, onItemAdded }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) {
      setFormError("Category name is required.");
      return;
    }

    setFormError(""); // Clear error

    const categoryData = {
      name,
      description,
    };

    try {
      const res = await dispatch(createCategory(categoryData));

      onItemAdded();
    } catch (err) {
      setFormError("Something went wrong.");
    }
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
