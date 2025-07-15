import styles from "./BillingDetails.module.scss";
import { ChevronLeft } from "lucide-react";
const BillingDetails = ({ onClose }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <ChevronLeft className={styles.backBtn} onClick={onClose} />
        <p>
          Billing Details: <span>Jasmine Kaur</span>
        </p>
      </header>

      {/* Section 1 */}
      <div className={styles.section1}>
        <div className={styles.s1row1}>
          <div className={styles.s1row1Child}>
            <p className={styles.label}>Invoice Number</p>
            <p className={styles.value}>INV20240919-VC-73</p>
          </div>
          <div className={styles.s1row1Child}>
            <p className={styles.label}>Invoice Date</p>
            <p className={styles.value}>08-07-2025</p>
          </div>
        </div>

        <div className={styles.s1row2}>
          <div className={styles.s1row2Child}>
            <p className={styles.label}>Description</p>
            <p className={styles.value}>Therapy Session</p>
          </div>
          <div className={styles.s1row2Child}>
            {" "}
            <p className={`${styles.label2} `}>Quantity</p>
            <p className={`${styles.value2} `}>1</p>
          </div>
          <div className={styles.s1row2Child}>
            {" "}
            <p className={`${styles.label2} `}>Price</p>
            <p className={styles.value2}>₹40000</p>
          </div>
        </div>

        <div className={styles.s1row3}>
          <div className={styles.s1row3Child}>
            <p className={styles.label}>Total</p>
          </div>
          <div className={styles.s1row3Child}>
            <p className={styles.label}>₹40000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;
