import { BedDouble, SquarePen, X } from "lucide-react";
import styles from "./BedInfo.module.scss";
import { useState } from "react";

const BedInfo = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("bedInfo");
  return (
    <div>
      {" "}
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}>
        {activeTab === "bedInfo" ? (
          <div>
            <h1>Bed Info</h1>
            <div className={styles.pageContainer}>
              {/* Rooms And Bed Info */}

              <div className={styles.roomAndBed}>
                <p className={styles.sectionHeading}>Rooms & Bed Info</p>
                <div className={styles.contentRB}>
                  <div className={styles.dataRB}>
                    <div className={styles.dataChildRB}>
                      <p className={styles.labelRB}>
                        Room Type:
                        <span className={styles.valueRB}> Private Suite</span>
                      </p>
                      <p className={styles.labelRB}>
                        Bed No.:
                        <span className={styles.valueRB}> B2</span>
                      </p>
                      <p className={styles.labelRB}>
                        Ward:
                        <span className={styles.valueRB}>
                          {" "}
                          Observation Wing
                        </span>
                      </p>
                      <p className={styles.labelRB}>
                        Room No.:
                        <span className={styles.valueRB}> 203B</span>
                      </p>
                      <p className={styles.labelRB}>
                        Floor:
                        <span className={styles.valueRB}> {"2nd Floor"}</span>
                      </p>
                    </div>
                    <div className={styles.dataChildRB}>
                      <p className={styles.labelRB}>
                        Assigned Nurse:{" "}
                        <span className={styles.valueRB}>Priya Sharma</span>
                      </p>
                      <p className={styles.labelRB}>
                        Shift:{" "}
                        <span className={styles.valueRB}>
                          Morning (8AM-4PM)
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <SquarePen strokeWidth={1.75} className={styles.editBtn} />
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className={styles.amenities}>
                <p className={styles.sectionHeading}>Amenities</p>
                <div>
                  <button>
                    Private Bed <BedDouble />
                  </button>
                  <button>Attached Bathroom</button>
                  <button>AC</button>
                  <button>Meals Included</button>
                </div>
              </div>

              {/* Actions */}
              <div className={styles.actions}>
                <p className={styles.sectionHeading}>Actions</p>
                <div className={styles.actionBtns}>
                  <button onClick={() => setActiveTab("transfer")}>
                    Room Transfer Request{" "}
                    <img src="/assets/transfer-line.svg" alt="" />
                  </button>
                  <button onClick={() => setActiveTab("attendent")}>
                    Request Attendent Bed
                    <img src="/assets/man.svg" alt="" />
                  </button>
                </div>
              </div>
              <div className={styles.submitBtnContainer}>
                <button className={styles.blueBtn}>Submit Request</button>
                <button className={styles.whiteBtn}>Cancel</button>
              </div>
            </div>
          </div>
        ) : activeTab === "transfer" ? (
          <div>
            <h1>Room Transfer</h1>
            <div className={styles.submitBtnContainer}>
              <button
                className={styles.blueBtn}
                onClick={() => setActiveTab("bedInfo")}
              >
                Confirm Room Transfer
              </button>
              <button className={styles.whiteBtn}>Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            <h1>Request Attendent Bed</h1>{" "}
            <div className={styles.submitBtnContainer}>
              <button
                className={styles.blueBtn}
                onClick={() => setActiveTab("bedInfo")}
              >
                Submit Request
              </button>
              <button className={styles.whiteBtn}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BedInfo;
