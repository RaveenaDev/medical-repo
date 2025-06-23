import styles from "./PostSurgeryFollowUp.module.scss";
import { X } from "lucide-react";

const PostSurgeryFollowUp = ({ onClose }) => {
  return (
    <div>
      {" "}
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}></div>
    </div>
  );
};

export default PostSurgeryFollowUp;
