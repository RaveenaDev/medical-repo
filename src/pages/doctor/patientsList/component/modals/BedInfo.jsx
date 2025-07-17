import { BedDouble, SquarePen, X } from "lucide-react";
import styles from "./BedInfo.module.scss";
import { useState } from "react";

const BedInfo = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("bedInfo");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

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
            <div className={styles.contentWrapper}>
              <div className={styles.contentContainer}>
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
                      <SquarePen
                        strokeWidth={1.75}
                        className={styles.editBtn}
                      />
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className={styles.amenities}>
                  <p className={styles.sectionHeading}>Amenities</p>
                  <div className={styles.amenitiesBtnWrapper}>
                    {[
                      {
                        label: "Private Bed",
                        icon: "/assets/inpatient/bed.svg",
                      },
                      {
                        label: "Attached Bathroom",
                        icon: "/assets/inpatient/bathroom.svg",
                      },
                      { label: "AC", icon: "/assets/inpatient/ac.svg" },
                      {
                        label: "Meals Included",
                        icon: "/assets/inpatient/meal.svg",
                      },
                    ].map(({ label, icon }) => (
                      <button
                        key={label}
                        onClick={() => toggleAmenity(label)}
                        className={`${styles.amenitiesBtn} ${
                          selectedAmenities.includes(label)
                            ? styles.activeAmenity
                            : ""
                        }`}
                      >
                        {label} <img src={icon} alt="" />
                      </button>
                    ))}
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
              </div>

              {/* Submit Button */}
              <div className={styles.submitBtnContainer1}>
                <button className={styles.blueBtn}>
                  Confirm and Apply Changes
                </button>
                <button className={styles.whiteBtn}>Cancel</button>
              </div>
            </div>
          </div>
        ) : activeTab === "transfer" ? (
          <div>
            {/* Room Transfer */}
            <h1>Room Transfer</h1>
            <div className={styles.contentWrapper}>
              <div className={styles.contentContainer}>
                <div className={styles.roomAndBed}>
                  <p className={styles.sectionHeading}>Current Room Details</p>
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
                      <SquarePen
                        strokeWidth={1.75}
                        className={styles.editBtn}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.changeBed}>
                  <p className={styles.sectionHeadingS}>Change Bed No. To</p>
                  <input type="text" />
                </div>
                <div className={styles.changeReason}>
                  <p className={styles.sectionHeadingS}>Reason For Change</p>
                  <textarea name="" rows={4} id=""></textarea>
                </div>
              </div>

              <div className={styles.submitBtnContainer2}>
                <button
                  className={styles.blueBtn}
                  onClick={() => setActiveTab("bedInfo")}
                >
                  Confirm Room Transfer
                </button>
                <button className={styles.whiteBtn}>Cancel</button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1>Request Attendent Bed</h1>{" "}
            <div className={styles.contentWrapper}>
              <div className={styles.contentContainer}>
                <div className={styles.dataRA}>
                  <p className={styles.labelRB}>
                    Current Bed:{" "}
                    <span className={styles.valueRB}>
                      B2 (Room 203B, 2nd Floor)
                    </span>
                  </p>
                  <p className={styles.labelRB}>
                    Ward:
                    <span className={styles.valueRB}> Observation Wing</span>
                  </p>
                  <p className={styles.labelRB}>
                    Room Type:
                    <span className={styles.valueRB}> Private Suite</span>
                  </p>
                </div>

                <div className={styles.selectBed}>
                  <p className={styles.selectBedHeading}>
                    Select New Bed{" "}
                    <img src="/assets/inpatient/bed2.svg" alt="" />
                  </p>
                </div>

                <div>
                  <p className={styles.sectionHeadingS}>Purpose of Request</p>
                  <input type="text" />
                </div>
              </div>
              <div className={styles.submitBtnContainer3}>
                <button
                  className={styles.blueBtn}
                  onClick={() => setActiveTab("bedInfo")}
                >
                  Submit Request
                </button>
                <button className={styles.whiteBtn}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BedInfo;
