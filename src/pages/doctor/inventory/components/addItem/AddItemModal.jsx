import styles from "./AddItemModal.module.scss";
import { X } from "lucide-react";

const AddItemModal = ({ onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Add New Inventory Item</h3>
          <X size={20} onClick={onClose} className={styles.close} />
        </div>

        <div className={styles.row}>
          <label>Category:</label>
          <span>PPE kits</span>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Item Name</label>
            <input placeholder="Name" />
          </div>
          <div className={styles.field}>
            <label>Last Restocked Date</label>
            <input placeholder="DD/MM/YYYY" />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Quantity</label>
            <input type="number" />
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.primary}>Add Item</button>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
