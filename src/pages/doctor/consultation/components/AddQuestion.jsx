import styles from "./AddQuestion.module.scss";
import { X } from "lucide-react";
import {useState} from "react";
// AddQuestion.jsx
const AddQuestion = ({ onClose, onAddSection }) => {
    const [sectionName, setSectionName] = useState("");

    const handleConfirm = () => {
        if (sectionName.trim()) {
            onAddSection(sectionName.trim());
            onClose();
        }
    };

    return (
        <div>
            <div className={styles.crossContainer}>
                <X size={20} onClick={onClose} />
            </div>
            <div className={styles.container}>
                <h4>Rename Section</h4>
                <input
                    type="text"
                    placeholder="Section Name"
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                />
                <div className={styles.buttonContainer}>
                    <button className={styles.confirmBtn} onClick={handleConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddQuestion;

