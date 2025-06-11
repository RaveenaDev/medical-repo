import { useNavigate } from "react-router-dom";
import CommonPanel from "../components/CommonPanel";
import styles from "./DoctorNewRequest.module.scss";
import { ChevronLeft, Paperclip } from "lucide-react";

const DoctorNewRequest = () => {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate("/doctor/doctor-request");
  };
  return (
    <div>
      <CommonPanel />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.header1}>
            <div className={styles.h1Left}>
              <ChevronLeft
                size={32}
                strokeWidth={1.6}
                onClick={handleBackButton}
                style={{ cursor: "pointer" }}
              />
              <span>Request Details</span>
            </div>
            <div className={styles.h1Right}>
              <span> Friday, 27 Sept at 10:00 AM</span>
            </div>
          </div>
          <div className={styles.header2}>
            <div className={styles.h2}>
              <p>Requested by:</p>
              <span>&nbsp;Dr. Patil ( Head of Cardiology )</span>
            </div>
            <div className={styles.h2}>
              <p>Request:</p>
              <span>&nbsp;Request for Medicines</span>
            </div>
          </div>
        </div>

        <div className={styles.yourRequestContainer}>
          <div className={styles.YRProfile}>
            <img src="https://i.pravatar.cc/30?img=41" alt="" width={38} />
            <p>YOU</p>
          </div>
          <div className={styles.YRMessage}>
            <p className={styles.mess1}>
              Request placed for few medicines needed in cardiology department.
              List of medicines attached below
            </p>
            <div className={styles.mess2}>
              <Paperclip size={15} style={{ transform: "rotate(270deg)" }} />
              <p>List of new medicines</p>
            </div>
          </div>
          <div className={styles.YRDateTime}>
            <p>Sept 27 at 10:00 am</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorNewRequest;
