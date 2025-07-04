import styles from "./AddCategoryModal.module.scss";
import { X } from "lucide-react";

const AddCategoryModal = ({ onClose }) => {
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
            <input placeholder="Anesthesia Supplies" />
          </div>
          <div className={styles.field}>
            <label>Minimum stock Threshold</label>
            <input type="number" />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Description</label>
            <textarea
              className={styles.desc}
              placeholder="Optional Short Description"
            />
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.primary}>Add Category</button>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
