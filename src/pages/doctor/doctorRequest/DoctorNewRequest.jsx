import CommonPanel from "../components/CommonPanel";
import styles from "./DoctorNewRequest.module.scss";
import { ChevronLeft } from "lucide-react";
const DoctorNewRequest = () => {
  return (
    <div>
      <CommonPanel />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.header1}>
            <div className={styles.h1Left}>
              <ChevronLeft />
              <span>Request Details</span>
            </div>
            <div className={styles.h1Right}>
              <span> Friday, 27 Sept at 10:00 AM</span>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default DoctorNewRequest;
