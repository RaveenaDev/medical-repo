// Library.js
import styles from "./Library.module.scss";
import { X } from "lucide-react";
export default function Library({ onClose }) {
  return (
    <div className={styles.container}>
      <div className={styles.crossContainer}>
        <X
          size={20}
          onClick={() => {
            onClose();
          }}
        />
      </div>
      {/* row 1 */}
      <div className={styles.row1}>
        <button>Prebuilt Forms</button>
        <button>My Saved Forms</button>
      </div>
    </div>
  );
}
