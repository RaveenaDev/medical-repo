import { useEffect, useState } from "react";
import { X, ChevronUp, ChevronDown, PencilLine } from "lucide-react";
import styles from "./Refer.module.scss";
import { Box, TextField } from "@mui/material";
import { fontSize, styled } from "@mui/system";
import {
  getAllDepartments,
  getAllDoctors,
  submitConsultation,
} from "../../../../components/State/Doctor/Action.js";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-toastify";
import Complete from "./Complete.jsx";

const Refer = ({ setCompleteData, onClose, modalData, patient, onSuccess,openNextAppointment}) => {
  //console.log("Modal Data: ", modalData);

  const dispatch = useDispatch();
  const [primaryDiagnosis, setPrimaryDiagnosis] = useState("");
  const [referralId, setReferralId] = useState("");
  const [newFacility, setNewFacility] = useState("");
  const [referredSpecialist, setReferredSpecialist] = useState("");
  const [supportingDocument, setSupportingDocument] = useState(null);

  const [selectedTab, setSelectedTab] = useState("internal");
  const [activeModal, setActiveModal] = useState(null);

  const departmentOptions = ["dep option 1", "dep option 2", " dep option 3"];
  const [openDepartment, setOpenDepartment] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const doctorOptions = ["doc option 1", "doc option 2", "doc option 3"];
  const [openDoctor, setOpenDoctor] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const statusOptions = ["option 1", "option 2", "option 3"];
  const [openStatus, setOpenStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const exFacilityOptions = ["option 1", "option 2", "option 3"];
  const [openExFacility, setOpenExFacility] = useState(false);
  const [selectedExFacility, setSelectedExFacility] = useState("");

  const spAreaOptions = ["SA option 1", "SA option 2", "SA option 3"];
  const [openSpArea, setOpenSpArea] = useState(false);
  const [selectedSpArea, setSelectedSpArea] = useState("");

  const [reasonForReferral, setReasonForReferral] = useState("");

  const [referralType, setReferralType] = useState("");

  useEffect(() => {
    dispatch(getAllDoctors());
    dispatch(getAllDepartments());
  }, [dispatch]);

  const doctors = useSelector((store) => store.doctor.allDoctors);
  const departments = useSelector((store) => store.doctor.allDepartments);
  const closeModal = () => setActiveModal(null);

  const handleChange = (value) => {
    setReferralType((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };
  const handleReasonChange = (event) => {
    setReasonForReferral(event.target.value);
  };

  const StyledInput = styled(TextField)({
    "& .MuiInputBase-root": {
      backgroundColor: "#f5f8ff", // Light gray background
      borderRadius: "4px",
      height: "5.4vh",
    },
    "& input": {
      padding: "1vh 2vh",
      fontSize: "2vh",
    },
    "& input::placeholder": {
      color: "#999",
      opacity: 0.5,
    },
  });

  const StyledInput2 = styled(TextField)({
    "& .MuiInputBase-root": {
      backgroundColor: "#ffff", // Light gray background
      borderRadius: "4px",
      height: "4.8vh",
      //width: "8vw",
    },
    "& input": {
      padding: "1vh 2vh",
      fontSize: "2vh",
    },
    "& input::placeholder": {
      color: "#999",
      opacity: 0.5,
    },
  });

  const handleReferralBtn = () => {
    if (!modalData || Object.keys(modalData).length === 0) {
      toast.error("Kindly fill the details of consultation!", {
        position: "bottom-right", // Use string for position
        autoClose: 2000,
      });
      return;
    }
    setActiveModal("complete");
  }

  const handleSubmit = () => {
    const formData = {
      tab: selectedTab,
      referralUrgency:
        document.querySelector('input[name="urgency"]:checked')?.value || "",
      referredToDepartment: selectedDepartment?.departmentId,
      referredToDoctor: selectedDoctor?._id,
      referralReason: reasonForReferral,
      referralTracking: {
        referralId,
        status: selectedStatus,
        followUpDate:
          document.querySelectorAll('input[type="date"]')[1]?.value || "",
      },
      referredSpecialist,
      newFacilityName: newFacility,
      preferredDate: document.querySelector('input[type="date"]')?.value || "",
      preferredTime: document.querySelector('input[type="time"]')?.value || "",
      externalFacility: selectedExFacility,
      referralType,
      specialtyArea: selectedSpArea,
      supportingDocument,
      primaryDiagnosis,
    };

    // console.log("Form Data: ", formData);

    const finalData = {
      ...modalData,
      ...formData, // this spreads all fields of formData directly
    };

    // console.log("Final: ", finalData);
    dispatch(submitConsultation(finalData, onSuccess));

    setCompleteData({});
    onSuccess();
    openNextAppointment(true);
  };

  return (
      <>
        {activeModal === "complete" ? (
            <>
              <div className={styles["backdrop-overlay"]} onClick={closeModal} />
              <div className={styles["complete-modal"]}>
                <Complete onClose={closeModal} onComplete={handleSubmit} nextAppointment={openNextAppointment}/>
              </div>
            </>
        ) : (
            <div>
              <div className={styles.crossContainer}>
                <X
                    size={20}
                    onClick={() => {
                      onClose();
                    }}
                />
              </div>
              <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                  <div className={styles.head}>
                    <p>Patient Referral Form</p>
                  </div>

                  <div className={styles.patientInfo}>
                    <p>Patient: {patient.name}</p>
                    <p>ID: {patient?.patId}</p>
                    <div className={styles.primaryDiagnosisInput}>
                      <label htmlFor="primaryDiagnosis">Primary Diagnosis:</label>
                      <input
                          type="text"
                          id="primaryDiagnosis"
                          placeholder="Enter diagnosis"
                          value={primaryDiagnosis}
                          onChange={(e) => setPrimaryDiagnosis(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Referral Urgency */}
                  <div className={styles.referralUrgency}>
                    <h4>Referral Urgency</h4>
                    <div className={styles.referralUrgencyIn}>
                      <label className={styles.radioLabel}>
                        <input type="radio" name="urgency" value="routine"/>
                        <span className={styles.customRadio}></span>
                        <span className={styles.routineText}>Routine</span>
                      </label>

                      <label className={styles.radioLabel}>
                        <input type="radio" name="urgency" value="urgent"/>
                        <span className={styles.customRadio}></span>
                        <span className={styles.urgentText}>Urgent</span>
                      </label>

                      <label className={styles.radioLabel}>
                        <input type="radio" name="urgency" value="emergency"/>
                        <span className={styles.customRadio}></span>
                        <span className={styles.emergencyText}>Emergency</span>
                      </label>
                    </div>
                  </div>

                  {/* Selection Refferal */}
                  <div className={styles.selectionRef}>
                    <div className={styles.selection}>
                      <div
                          className={selectedTab === "internal" ? styles.activeTab : ""}
                      >
                        <p onClick={() => setSelectedTab("internal")}>
                          Internal Referral
                        </p>
                      </div>
                      <div
                          className={selectedTab === "external" ? styles.activeTab : ""}
                      >
                        <p onClick={() => setSelectedTab("external")}>
                          External Referral
                        </p>
                      </div>
                    </div>

                    <div className={styles.selectionContent}>
                      {/* Internal Referral */}
                      {selectedTab === "internal" && (
                          <div className={styles.internalReferral}>
                            {/* row1 */}
                            <div className={styles.row1}>
                              <div className={styles.r1Dropdown}>
                                <p className={styles.label}>Select Department</p>
                                <div className={styles.dropdown}>
                                  <button
                                      className={styles.trigger}
                                      onClick={() => setOpenDepartment((prev) => !prev)}
                                  >
                                    <p>
                                      {!selectedDepartment ? (
                                          <p className={styles.placeholderDropdown}>
                                            Department
                                          </p>
                                      ) : (
                                          selectedDepartment.departmentName
                                      )}
                                    </p>
                                    <span className={styles.arrow}>
                            {openDepartment ? <ChevronUp/> : <ChevronDown/>}
                          </span>
                                  </button>
                                  {openDepartment && (
                                      <ul className={styles.menu}>
                                        {departments.map((option) => (
                                            <li
                                                key={option.departmentId}
                                                className={`${styles.item} ${
                                                    selectedDepartment === option
                                                        ? styles.active
                                                        : ""
                                                }`}
                                                onClick={() => {
                                                  setSelectedDepartment(option);
                                                  setOpenDepartment(false);
                                                }}
                                            >
                                              {option.departmentName}
                                            </li>
                                        ))}
                                      </ul>
                                  )}
                                </div>
                              </div>
                              <div className={styles.r1Dropdown}>
                                <p className={styles.label}>Referred Doctor</p>
                                <div className={styles.dropdown}>
                                  <button
                                      className={styles.trigger}
                                      onClick={() => setOpenDoctor((prev) => !prev)}
                                  >
                                    <p>
                                      {!selectedDoctor ? (
                                          <p className={styles.placeholderDropdown}>
                                            Doctor
                                          </p>
                                      ) : (
                                          selectedDoctor.name
                                      )}
                                    </p>
                                    <span className={styles.arrow}>
                            {openDoctor ? <ChevronUp/> : <ChevronDown/>}
                          </span>
                                  </button>
                                  {openDoctor && (
                                      <ul className={styles.menu}>
                                        {doctors.map((option) => (
                                            <li
                                                key={option._id}
                                                className={`${styles.item} ${
                                                    selectedDoctor === option ? styles.active : ""
                                                }`}
                                                onClick={() => {
                                                  setSelectedDoctor(option);
                                                  setOpenDoctor(false);
                                                }}
                                            >
                                              {option.name}
                                            </li>
                                        ))}
                                      </ul>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* row 2 */}
                            <div className={styles.row2}>
                              <p className={styles.label}>Reason for Referral</p>
                              <div className={styles.inputRFR}>
                                {!reasonForReferral ? (
                                    <PencilLine className={styles.pencilLine} size={16}/>
                                ) : (
                                    ""
                                )}

                                <input
                                    type="text"
                                    placeholder="Reason for Referral"
                                    value={reasonForReferral}
                                    onChange={handleReasonChange}
                                ></input>
                              </div>
                            </div>

                            {/* row 3 */}
                            <div className={styles.row3}>
                              <Box
                                  display="flex"
                                  gap={2}
                                  justifyContent={"space-between"}
                              >
                                <Box width={"46%"}>
                                  <h5>Preferred Appointment Date</h5>
                                  <StyledInput
                                      type="date"
                                      fullWidth
                                      size="small"
                                      InputLabelProps={{shrink: true}}
                                  />
                                </Box>
                                <Box width={"46%"}>
                                  <h5>Preferred Time</h5>
                                  <StyledInput
                                      type="time"
                                      fullWidth
                                      size="small"
                                      InputLabelProps={{shrink: true}}
                                  />
                                </Box>
                              </Box>
                            </div>

                            {/* referral tracking */}
                            <div className={styles.referralTracking}>
                              <h4>Referral Tracking</h4>
                              <div className={styles.referralTrackingIn}>
                                <div className={styles.refId}>
                                  <p>Referral ID</p>
                                  <input
                                      type="text"
                                      className={styles.refIDInput}
                                      value={referralId}
                                      onChange={(e) => setReferralId(e.target.value)}
                                  />
                                </div>
                                <div className={styles.status}>
                                  <p>Status</p>
                                  <div className={styles.dropdown3}>
                                    <button
                                        className={styles.triggerStatus}
                                        onClick={() => setOpenStatus((prev) => !prev)}
                                    >
                                      <p>
                                        {!selectedStatus ? (
                                            <p className={styles.placeholderDropdown}>
                                              Pending
                                            </p>
                                        ) : (
                                            selectedStatus
                                        )}
                                      </p>
                                      <span className={styles.arrow}>
                              {openStatus ? <ChevronUp/> : <ChevronDown/>}
                            </span>
                                    </button>
                                    {openStatus && (
                                        <ul className={styles.menu}>
                                          {statusOptions.map((option) => (
                                              <li
                                                  key={option}
                                                  className={`${styles.item} ${
                                                      selectedStatus === option
                                                          ? styles.active
                                                          : ""
                                                  }`}
                                                  onClick={() => {
                                                    setSelectedStatus(option);
                                                    setOpenStatus(false);
                                                  }}
                                              >
                                                {option}
                                              </li>
                                          ))}
                                        </ul>
                                    )}
                                  </div>
                                </div>
                                <div className={styles.followUpDate}>
                                  <Box backgroundColor={"#f5f8fd"}>
                                    <p>Follow-up Date</p>
                                    <StyledInput2
                                        type="date"
                                        fullWidth
                                        size="small"
                                        backgroundColor="white"
                                        InputLabelProps={{shrink: true}}
                                    />
                                  </Box>
                                </div>
                              </div>
                            </div>

                            {/* Submit */}
                            <div className={styles.submitBtn} onClick={handleReferralBtn}>
                              <button>Submit</button>
                            </div>
                          </div>
                      )}
                      {selectedTab === "external" && (
                          <div className={styles.externalReferral}>
                            {" "}
                            {/* row1  of EX-R*/}
                            <div className={styles.row1}>
                              <div className={styles.r1Dropdown}>
                                <p className={styles.label}>External Facility</p>
                                <div className={styles.dropdown}>
                                  <button
                                      className={styles.trigger}
                                      onClick={() => setOpenExFacility((prev) => !prev)}
                                  >
                                    <p>
                                      {!selectedExFacility ? (
                                          <p className={styles.placeholderDropdown}>
                                            Select & Search Facility
                                          </p>
                                      ) : (
                                          selectedExFacility
                                      )}
                                    </p>
                                    <span className={styles.arrow}>
                            {openExFacility ? <ChevronUp/> : <ChevronDown/>}
                          </span>
                                  </button>
                                  {openExFacility && (
                                      <ul className={styles.menu}>
                                        {exFacilityOptions.map((option) => (
                                            <li
                                                key={option}
                                                className={`${styles.item} ${
                                                    selectedExFacility === option
                                                        ? styles.active
                                                        : ""
                                                }`}
                                                onClick={() => {
                                                  setSelectedExFacility(option);
                                                  setOpenExFacility(false);
                                                }}
                                            >
                                              {option}
                                            </li>
                                        ))}
                                      </ul>
                                  )}
                                </div>
                              </div>
                              <div className={styles.rightRow}>
                                <p className={styles.label}>Or Add New Facility</p>
                                <input
                                    type="text"
                                    placeholder="Enter Facility Name"
                                    value={newFacility}
                                    onChange={(e) => setNewFacility(e.target.value)}
                                />
                              </div>
                            </div>
                            {/* row2  of EX-Ref*/}
                            <div className={styles.row1}>
                              <div className={styles.rightRow}>
                                <p className={styles.label}>Referred Specialist</p>
                                <input
                                    type="text"
                                    placeholder="Search Specialist Name"
                                    value={referredSpecialist}
                                    onChange={(e) => setReferredSpecialist(e.target.value)}
                                />
                              </div>
                              <div className={styles.r1Dropdown}>
                                <p className={styles.label}>Specialty Area</p>
                                <div className={styles.dropdown}>
                                  <button
                                      className={styles.trigger}
                                      onClick={() => setOpenSpArea((prev) => !prev)}
                                  >
                                    <p>
                                      {!selectedSpArea ? (
                                          <p className={styles.placeholderDropdown}>
                                            Select Specialist
                                          </p>
                                      ) : (
                                          selectedSpArea
                                      )}
                                    </p>
                                    <span className={styles.arrow}>
                            {openSpArea ? <ChevronUp/> : <ChevronDown/>}
                          </span>
                                  </button>
                                  {openSpArea && (
                                      <ul className={styles.menu}>
                                        {spAreaOptions.map((option) => (
                                            <li
                                                key={option}
                                                className={`${styles.item} ${
                                                    selectedSpArea === option ? styles.active : ""
                                                }`}
                                                onClick={() => {
                                                  setSelectedSpArea(option);
                                                  setOpenSpArea(false);
                                                }}
                                            >
                                              {option}
                                            </li>
                                        ))}
                                      </ul>
                                  )}
                                </div>
                              </div>
                            </div>
                            {/* row 3 of EX-Ref */}
                            <div className={styles.referralTypeContainer}>
                              <label className={styles.label}>Referral Type</label>
                              <div className={styles.grid}>
                                <label
                                    className={`${styles.card} ${
                                        referralType.includes("consultation")
                                            ? styles.selected
                                            : ""
                                    }`}
                                >
                        <span className={styles.radioStyle}>
                          <input
                              type="checkbox"
                              value="consultation"
                              checked={referralType.includes("consultation")}
                              onChange={() => handleChange("consultation")}
                          />
                          <span className={styles.fakeRadio}></span>
                        </span>
                                  Consultation
                                </label>

                                <label
                                    className={`${styles.card} ${
                                        referralType.includes("surgery")
                                            ? styles.selected
                                            : ""
                                    }`}
                                >
                        <span className={styles.radioStyle}>
                          <input
                              type="checkbox"
                              value="surgery"
                              checked={referralType.includes("surgery")}
                              onChange={() => handleChange("surgery")}
                          />
                          <span className={styles.fakeRadio}></span>
                        </span>
                                  Surgery
                                </label>

                                <label
                                    className={`${styles.card} ${
                                        referralType.includes("therapy")
                                            ? styles.selected
                                            : ""
                                    }`}
                                >
                        <span className={styles.radioStyle}>
                          <input
                              type="checkbox"
                              value="therapy"
                              checked={referralType.includes("therapy")}
                              onChange={() => handleChange("therapy")}
                          />
                          <span className={styles.fakeRadio}></span>
                        </span>
                                  Therapy
                                </label>

                                <label
                                    className={`${styles.card} ${
                                        referralType.includes("diagnostic")
                                            ? styles.selected
                                            : ""
                                    }`}
                                >
                        <span className={styles.radioStyle}>
                          <input
                              type="checkbox"
                              value="diagnostic"
                              checked={referralType.includes("diagnostic")}
                              onChange={() => handleChange("diagnostic")}
                          />
                          <span className={styles.fakeRadio}></span>
                        </span>
                                  Diagnostic Tests
                                </label>
                              </div>
                            </div>
                            {/* row 4 of Ex-Ref */}
                            <div className={styles.supportingDocument}>
                              <h4>Supporting Document</h4>
                              <div>
                                <input
                                    type="file"
                                    style={{display: "none"}}
                                    onChange={(e) =>
                                        setSupportingDocument(e.target.files[0])
                                    }
                                    id="upload-doc"
                                />
                                <label
                                    htmlFor="upload-doc"
                                    className={styles.DragAndDropContainer}
                                >
                                  <img src="/assets/uploadCloudIcon.svg" alt=""/>
                                  <span>Drag and drop files here or click to browse</span>
                                </label>
                              </div>
                            </div>
                            {/* Submit */}
                            <div className={styles.submitBtn2} onClick={handleReferralBtn}>
                              <button>Submit</button>
                            </div>
                          </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
        }
      </>
  )
  ;
};

export default Refer;
