import styles from "./AddItemModal.module.scss";
import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addInventoryItem } from "../../../../../components/State/Doctor/Action";

const AddItemModal = ({ onClose, categoryId, categoryName, onItemAdded }) => {
  const dispatch = useDispatch();

  const [itemName, setItemName] = useState("");
  const [restockDate, setRestockDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [formError, setFormError] = useState("");
  const [minimumStockThreshold, setMinimumStockThreshold] = useState("");

  const handleSubmit = async () => {
    if (!itemName.trim()) {
      setFormError("Item name is required.");
      return;
    }

    if (!restockDate.trim()) {
      setFormError("Last restocked date is required.");
      return;
    }

    if (!quantity || Number(quantity) <= 0) {
      setFormError("Quantity must be a positive number.");
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

    setFormError("");

    const itemData = {
      name: itemName,
      lastRestockedDate: restockDate,
      quantity: Number(quantity),
      categoryId: categoryId,
      minimumStockThreshold: Number(minimumStockThreshold),
    };

    try {
      const res = await dispatch(addInventoryItem(itemData));

      onItemAdded();
    } catch (err) {
      setFormError("Something went wrong.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Add New Inventory Item</h3>
          <X size={20} onClick={onClose} className={styles.close} />
        </div>

        <div className={styles.row}>
          <label>Category:</label>
          <span>{categoryName}</span>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Item Name</label>
            <input
              placeholder="Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className={
                formError.includes("Item name") ? styles.errorInput : ""
              }
            />
          </div>
          <div className={styles.field}>
            <label>Last Restocked Date</label>
            <input
              type="date"
              value={restockDate}
              onChange={(e) => setRestockDate(e.target.value)}
              className={
                formError.includes("restocked date") ? styles.errorInput : ""
              }
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className={
                formError.includes("Quantity") ? styles.errorInput : ""
              }
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

        {formError && <p className={styles.errorText}>{formError}</p>}

        <div className={styles.footer}>
          <button className={styles.primary} onClick={handleSubmit}>
            Add Item
          </button>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
