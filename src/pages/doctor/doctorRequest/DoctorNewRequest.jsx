import styles from "./DoctorNewRequest.module.scss";
import { X } from "lucide-react";
const DoctorNewRequest = ({ onClose }) => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.row1}>
          <div>
            {" "}
            <h3>New Request Thread</h3>
          </div>
          <div className={styles.crossContainer}>
            <X
              size={20}
              className={styles.cross}
              onClick={() => {
                onClose();
              }}
            />
          </div>
        </div>

        {/* To Whom */}
        <div className={styles.toWhom}>
          <div className={styles.toBox}>TO</div>
          <div className={styles.adminBox}>Admin</div>
        </div>

        <div className={styles.content}>
          <div>
            <h4>Order</h4>
            <input placeholder="Place an Order"></input>
          </div>
          <div>
            <h4>Quantity</h4>
            <input type="text" placeholder="Net Quantity"></input>
          </div>
          <div>
            <h4>Timeline</h4>
            <input type="text" placeholder="Duration of the Order" />
          </div>
          <div>
            <h4>Purpose</h4>
            <input type="text" placeholder="Purpose of Order" />
          </div>
        </div>
        <button className={styles.reqBtn}>Request</button>
      </div>
    </div>
  );
};

export default DoctorNewRequest;
