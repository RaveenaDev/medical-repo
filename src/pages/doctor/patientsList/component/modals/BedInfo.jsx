import {
  BedDouble,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  SquarePen,
  X,
} from "lucide-react";
import styles from "./BedInfo.module.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAvailableRooms,
  getPatientBedInfo,
  transferPatientToBed,
} from "../../../../../components/State/Doctor/Action";

const BedInfo = ({ onClose, patientId }) => {
  const dispatch = useDispatch();
  const comingSoon = true;
  useEffect(() => {
    dispatch(getPatientBedInfo(patientId));
    dispatch(getAvailableRooms());
  }, []);

  const bedInfo = useSelector((store) => store.doctor.patientBedInfo);
  // console.log("BED INFO", bedInfo);
  const { bedInfo: bed, roomInfo, patientInfo } = bedInfo || {};

  const [activeTab, setActiveTab] = useState("bedInfo");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const selectedBed2 = ["option 1", "option 2", "optioon 3"];
  const [openSelectedBed2, setOpenSelectedBed2] = useState(false);
  const [selectedSelectedBed2, setSelectedSelectedBed2] = useState("");
  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };
  const availableRooms = useSelector((state) => state.doctor.roomsAvailable);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedBed, setSelectedBed] = useState("");
  const [availableBeds, setAvailableBeds] = useState([]);
  const [bedsAvailable, setBedsAvailable] = useState(true);
  const handleRoomChange = (e) => {
    const roomId = e.target.value;
    setSelectedRoom(roomId);

    // If "Select a room" is chosen, clear bed selection and re-enable the bed dropdown
    if (roomId === "") {
      setAvailableBeds([]); // Clear the available beds
      setBedsAvailable(true); // Re-enable the bed dropdown
      setForm((prevForm) => ({ ...prevForm, bedNo: "" })); // Clear selected bed
    } else {
      // Find the selected room and its available beds
      const room = availableRooms.find((room) => room.roomID === roomId);
      if (room && room.beds.length > 0) {
        setBedsAvailable(true); // There are available beds
        setAvailableBeds(room.beds); // Set available beds
      } else {
        setBedsAvailable(false); // No available beds
        setAvailableBeds([]); // Clear available beds
      }
    }
  };

  const handleRoomAndBedChange = () => {
    // logic for handling room and bed change

    // console.log("prev Bed:", bed);
    // console.log("new Bed:", selectedBed);
    const payload = {
      currentBedId: bed?.bedNumber, // change to bed ID when backend updates
      targetBedId: selectedBed,
    };

    dispatch(transferPatientToBed(payload, patientId));
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
                          Room Type:{" "}
                          <span className={styles.valueRB}>
                            {roomInfo?.roomType || "N/A"}
                          </span>
                        </p>
                        <p className={styles.labelRB}>
                          Bed No.:{" "}
                          <span className={styles.valueRB}>
                            {bed?.bedNumber || "N/A"}
                          </span>
                        </p>

                        <p className={styles.labelRB}>
                          Ward:
                          <span className={styles.valueRB}>
                            {" "}
                            {roomInfo?.ward || "N/A"}
                          </span>
                        </p>
                        <p className={styles.labelRB}>
                          Room No.:{" "}
                          <span className={styles.valueRB}>
                            {roomInfo?.roomID || "N/A"}
                          </span>
                        </p>
                        <p className={styles.labelRB}>
                          Floor:{" "}
                          <span className={styles.valueRB}>
                            {roomInfo?.floor
                              ? `Floor ${roomInfo.floor}`
                              : "N/A"}
                          </span>
                        </p>
                      </div>
                      <div className={styles.dataChildRB}>
                        <p className={styles.labelRB}>
                          Assigned Nurse:{" "}
                          <span className={styles.valueRB}>
                            {roomInfo?.assignedNurse || "N/A"}
                          </span>
                        </p>
                        <p className={styles.labelRB}>
                          Shift:{" "}
                          <span className={styles.valueRB}>
                            {roomInfo?.shift || "N/A"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
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
              </div>
            </div>
          </div>
        ) : activeTab === "transfer" ? (
          <div>
            {/* Room Transfer */}
            <div className={styles.heading}>
              <ChevronLeft
                className={styles.backBtn}
                onClick={() => setActiveTab("bedInfo")}
              />
              <h1>Room Transfer</h1>
            </div>
            <div className={styles.contentWrapper}>
              <div className={styles.contentContainer}>
                <div className={styles.roomAndBed}>
                  <p className={styles.sectionHeading}>Current Room Details</p>
                  <div className={styles.contentRB}>
                    <div className={styles.dataRB}>
                      <div className={styles.dataChildRB}>
                        <p className={styles.labelRB}>
                          Room Type:
                          <span className={styles.valueRB}>
                            {roomInfo?.roomType || "N/A"}
                          </span>
                        </p>
                        <p className={styles.labelRB}>
                          Bed No.:
                          <span className={styles.valueRB}>
                            {bed?.bedNumber || "N/A"}
                          </span>
                        </p>
                        <p className={styles.labelRB}>
                          Ward:
                          <span className={styles.valueRB}>
                            {roomInfo?.ward || "N/A"}
                          </span>
                        </p>
                        <p className={styles.labelRB}>
                          Room No.:
                          <span className={styles.valueRB}>
                            {roomInfo?.roomID || "N/A"}
                          </span>
                        </p>
                        <p className={styles.labelRB}>
                          Floor:
                          <span className={styles.valueRB}>
                            {roomInfo?.floor
                              ? `Floor ${roomInfo.floor}`
                              : "N/A"}
                          </span>
                        </p>
                      </div>
                      <div className={styles.dataChildRB}>
                        <p className={styles.labelRB}>
                          Assigned Nurse:{" "}
                          <span className={styles.valueRB}>
                            {roomInfo?.assignedNurse || "N/A"}
                          </span>
                        </p>
                        <p className={styles.labelRB}>
                          Shift:{" "}
                          <span className={styles.valueRB}>
                            {roomInfo?.shift || "N/A"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.newRoomPref}>
                  <p className={styles.sectionHeading}>New Room Preference</p>
                  <div className={styles.newRoomPrefContain}>
                    <div className={styles.selectBed}>
                      <p className={styles.selectBedHeading}>
                        Select New Bed{" "}
                        <img src="/assets/inpatient/bed2.svg" alt="" />
                      </p>
                      <div
                        className={styles.dropdown}
                        style={{ marginTop: "1vh" }}
                      >
                        <select
                          className={styles.trigger}
                          value={selectedRoom}
                          onChange={handleRoomChange}
                          required
                        >
                          <option value="">Select a room</option>
                          {availableRooms.map((room) => (
                            <option key={room._id} value={room.roomID}>
                              {room.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div
                        className={styles.dropdown}
                        style={{ marginTop: "2vh" }}
                      >
                        <select
                          className={styles.trigger}
                          value={selectedBed}
                          onChange={(e) => setSelectedBed(e.target.value)}
                          disabled={!selectedRoom || !bedsAvailable}
                          required
                        >
                          <option value="">Select a bed</option>
                          {bedsAvailable ? (
                            availableBeds.map((bed) => (
                              <option key={bed._id} value={bed._id}>
                                {bed.bedNumber}
                              </option>
                            ))
                          ) : (
                            <option>No beds available</option>
                          )}
                        </select>
                      </div>
                    </div>

                    <div className={styles.changeReason}>
                      <p className={styles.sectionHeadingS}>
                        Reason For Change
                      </p>
                      <textarea name="" rows={4} id=""></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.submitBtnContainer2}>
                <button
                  className={styles.blueBtn}
                  onClick={() => {
                    handleRoomAndBedChange();
                    setActiveTab("bedInfo");
                  }}
                >
                  Confirm Room Transfer
                </button>
                <button className={styles.whiteBtn}>Cancel</button>
              </div>
            </div>
          </div>
        ) : comingSoon ? (
          <div className={styles.comingSoonContainer}>
            <h1
              className={styles.comingSoonHeading}
              style={{ fontSize: "4vh" }}
            >
              Coming Soon
            </h1>

            <button
              className={styles.whiteBtn}
              onClick={() => setActiveTab("bedInfo")}
            >
              Back
            </button>
          </div>
        ) : (
          <div>
            <div className={styles.heading}>
              <ChevronLeft
                className={styles.backBtn}
                onClick={() => setActiveTab("bedInfo")}
              />
              <h1>Request Attendent Bed</h1>{" "}
            </div>
            <div className={styles.contentWrapper}>
              <div className={styles.contentContainer}>
                <div className={styles.dataRA}>
                  <p className={styles.labelRB}>
                    Current Bed:{" "}
                    <span className={styles.valueRB}>
                      {bed?.bedNumber || "N/A"} (Room{" "}
                      {roomInfo?.roomID || "N/A"},{" "}
                      {roomInfo?.floor ? `Floor ${roomInfo.floor}` : "N/A"})
                    </span>
                  </p>
                  <p className={styles.labelRB}>
                    Ward:
                    <span className={styles.valueRB}>
                      {" "}
                      {roomInfo?.ward || "N/A"}
                    </span>
                  </p>
                  <p className={styles.labelRB}>
                    Room Type:
                    <span className={styles.valueRB}>
                      {roomInfo?.roomType || "N/A"}
                    </span>
                  </p>
                </div>

                <div className={styles.selectBed}>
                  <p className={styles.selectBedHeading}>
                    Select New Bed{" "}
                    <img src="/assets/inpatient/bed2.svg" alt="" />
                  </p>
                  <div className={styles.dropdown}>
                    <button
                      className={styles.trigger}
                      onClick={() => setOpenSelectedBed2((prev) => !prev)}
                    >
                      <p>{selectedSelectedBed2 || "Select"}</p>
                      <span className={styles.arrow}>
                        {openSelectedBed2 ? <ChevronUp /> : <ChevronDown />}
                      </span>
                    </button>
                    {openSelectedBed2 && (
                      <ul className={styles.menu}>
                        {selectedBed2.map((option) => (
                          <li
                            key={option}
                            className={`${styles.item} ${
                              selectedSelectedBed2 === option
                                ? styles.active
                                : ""
                            }`}
                            onClick={() => {
                              setSelectedSelectedBed2(option);
                              setOpenSelectedBed2(false);
                            }}
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div>
                  <p className={styles.sectionHeadingS}>Purpose of Request</p>
                  <input
                    type="text"
                    className={styles.inputText}
                    placeholder="Eg. Family Member, Overnight Stay, Patient Assistance"
                  />
                </div>
                <div>
                  <p className={styles.sectionHeadingS}>Expected Duration</p>
                  <input
                    type="text"
                    className={styles.inputText}
                    placeholder="Eg. 2 weeks"
                  />
                </div>
                <div>
                  <p className={styles.sectionHeadingS}>Additional Notes</p>
                  <input
                    type="text"
                    className={styles.inputText}
                    placeholder=""
                  />
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
