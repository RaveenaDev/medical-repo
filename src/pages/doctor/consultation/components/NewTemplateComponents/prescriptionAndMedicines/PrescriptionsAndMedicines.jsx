import React, {useEffect, useRef, useState} from "react";
import styles from "./PrescriptionAndMedicines.module.scss";
import PNMLoader from "../../PNMLoader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { generatePrescriptionsWithAI } from "../../../../../../components/State/Doctor/Action.js";
import ManualPrescriptionForm from "../../manual/ManualPrescriptionForm.jsx";
import {useReactToPrint} from "react-to-print";
import PrescriptionAndMedicinesPrint from "../../print/PrescriptionAndMedicinesPrint.jsx";
const PrescriptionAndMedicines = ({
                                    patient,
                                    completeData,
                                    generatedPrescriptions,
                                    onConfirm,
                                    selectedComponent,
                                    existingData,
                                }) => {
    const [loading, setLoading] = useState(true);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);
    const [isManualMode, setIsManualMode] = useState(() => {
        return localStorage.getItem("prescriptionMode") === "manual";
    });
    const dispatch = useDispatch();

    useEffect(() => {
        // If existingData is available, skip loading
        if (existingData && selectedComponent && existingData[selectedComponent]) {
            setLoading(false);
        } else if (
            generatedPrescriptions &&
            Object.keys(generatedPrescriptions).length > 0
        ) {
            setLoading(false);
        }
    }, [existingData, selectedComponent, generatedPrescriptions]);

    useEffect(() => {
        if (
            generatedPrescriptions &&
            Object.keys(generatedPrescriptions).length > 0
        ) {
            setLoading(false);
        }
    }, [generatedPrescriptions]);

    // console.log("Pat: ",patient)

    // if (loading) {
    //   return <PNMLoader patient={patient} />;
    // }

    const handleRegenerate = () => {
        const aidData = {
            ...completeData,
            patientId: patient._id,
        };
        dispatch(generatePrescriptionsWithAI(aidData));
        // console.log("Regenerate: ",aidData)
        setLoading(true);
    };

    const handleToggle = (manual) => {
        setIsManualMode(manual);
        localStorage.setItem("prescriptionMode", manual ? "manual" : "ai");
    };

    const printRef = useRef();
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: "Prescriptions And Medicines",
    });

    // console.log("Pres: ",generatedPrescriptions)

    //console.log("Pat: ",patient)

    const toggleMic = () => {
        const rec = recognitionRef.current;
        if (!rec) {
            console.error("Speech recognition not available");
            return;
        }
        if (isListening) {
            setIsListening(false);
            rec.stop();
        } else {
            setIsListening(true);
            try {
                rec.start();
            } catch (err) {
                console.error("Error starting recognition:", err);
                setIsListening(false);
            }
        }
    };
    return (
        <div>
            <div className={styles.container1}>
                {/* row1 */}
                <div className={styles.row1}>
                    <p>Prescription And Medicines</p>
                </div>

                {/* row2 */}
                <p className={styles.row2}>
                    {patient?.name} | Age: {patient?.age ?? "N/A"} |{" "}
                    {patient?.gender ?? "N/A"}
                </p>

                <div className={styles.toggleWrapper}>
            <span
                className={!isManualMode ? styles.activeToggle : ""}
                onClick={() => handleToggle(false)}
            >
              AI
            </span>
                    <span
                        className={isManualMode ? styles.activeToggle : ""}
                        onClick={() => handleToggle(true)}
                    >
              Manual
            </span>
                </div>

                {
                    isManualMode ? (
                        <ManualPrescriptionForm
                            patient={patient}
                            onConfirm={onConfirm}
                            existingData={existingData?.[selectedComponent]}
                        />
                    ) : (
                        !loading ? (
                                <>
                                    <img
                                        src="/assets/NOVA-on-border.svg"
                                        height={100}
                                        alt=""
                                        className={styles.nova}
                                    />

                                    <div className={styles.container2}>
                                        {/* row3 */}
                                        <div className={styles.row3}>
                                            <img src="/assets/mdi_magic.svg" alt="" height={30}/>
                                            <p>AI Clinical Darft Assistant</p>
                                        </div>

                                        {/* row4 */}
                                        <div className={styles.row4}>
                                            <p className={styles.value}>
                                                <span className={styles.key}>Problem Statement:</span>{" "}
                                                {generatedPrescriptions?.aiGeneratedText?.problemStatement}
                                            </p>
                                        </div>

                                        {/* row5 */}
                                        <div className={styles.row5}>
                                            <p className={styles.value}>
                                                <span className={styles.key}>ICD:</span>{" "}
                                                {generatedPrescriptions?.aiGeneratedText.icdCode}
                                            </p>
                                        </div>

                                        {/* row6 */}
                                        <div className={styles.row5}>
                                            <p className={styles.value}>
                                                <span className={styles.key}>Therapy Plan:</span>{" "}
                                                {generatedPrescriptions?.aiGeneratedText.therapyPlan}
                                            </p>
                                        </div>

                                        {/* row7 */}
                                        <div className={styles.row5}>
                                            <p className={styles.value}>
                                                <span className={styles.key}>Precautions:</span>{" "}
                                                {generatedPrescriptions?.aiGeneratedText.precautions}
                                            </p>
                                        </div>

                                        {/* row8 */}
                                        <div className={styles.row5}>
                                            <p className={styles.value}>
                                                <span className={styles.key}>Follow-Up:</span>{" "}
                                                {generatedPrescriptions?.aiGeneratedText.followUp}
                                            </p>
                                        </div>

                                        {/* row9 */}
                                        <div className={styles.row9}>
                                            {/*<button className={styles.row9Button}>Edit</button>*/}
                                            <button className={styles.row9Button} onClick={handleRegenerate}>
                                                Regenerate
                                            </button>
                                        </div>

                                        {/* Instruct */}
                                        <div className={styles.instruct}>
                                            {/* row10 */}
                                            <div className={styles.row10}>
                                                <p>Medications</p>
                                            </div>

                                            {/* row11 */}
                                            <div className={styles.row11}>
                                                <div>
                                                    {generatedPrescriptions?.aiGeneratedText.medications.map(
                                                        (medic, index) => (
                                                            <div
                                                                key={index}
                                                                style={{
                                                                    display: "flex",
                                                                    alignItems: "flex-start",
                                                                    marginBottom: "4px",
                                                                }}
                                                            >
                                                                <span style={{marginRight: "10px"}}>&#8226;</span>
                                                                <p style={{margin: 0}}>{medic}</p>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                                {/*<div className={styles.iconBtn}>*/}
                                                {/*  <button className={styles.leftArrowBtn}>*/}
                                                {/*    <img*/}
                                                {/*        src="/assets/Group.svg"*/}
                                                {/*        alt=""*/}
                                                {/*        className={styles.leftArrow}*/}
                                                {/*        width={18}*/}
                                                {/*    />*/}
                                                {/*  </button>*/}
                                                {/*  <button className={styles.rightArrowBtn}>*/}
                                                {/*    <img*/}
                                                {/*        src="/assets/ion_return-down-back-outline.svg"*/}
                                                {/*        width={30}*/}
                                                {/*        alt=""*/}
                                                {/*        className={styles.rightArrow}*/}
                                                {/*    />*/}
                                                {/*  </button>*/}
                                                {/*</div>*/}
                                            </div>

                                            <div className={styles.lineContainer}>
                                                <div className={styles.line}/>
                                            </div>
                                        </div>

                                        {/* Instruct */}
                                        <div className={styles.instruct}>
                                            {/* row10 */}
                                            <div className={styles.row10}>
                                                <p>Injection / Therapies</p>
                                            </div>

                                            {/* row11 */}
                                            <div className={styles.row11}>
                                                <div>
                                                    {generatedPrescriptions?.aiGeneratedText.injectionsTherapies.map(
                                                        (inject, index) => (
                                                            <div
                                                                key={index}
                                                                style={{
                                                                    display: "flex",
                                                                    alignItems: "flex-start",
                                                                    marginBottom: "4px",
                                                                }}
                                                            >
                                                                <span style={{marginRight: "10px"}}>&#8226;</span>
                                                                <p style={{margin: 0}}>{inject}</p>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                                {/*<div className={styles.iconBtn}>*/}
                                                {/*  <button className={styles.leftArrowBtn}>*/}
                                                {/*    <img*/}
                                                {/*        src="/assets/Group.svg"*/}
                                                {/*        alt=""*/}
                                                {/*        className={styles.leftArrow}*/}
                                                {/*        width={18}*/}
                                                {/*    />*/}
                                                {/*  </button>*/}
                                                {/*  <button className={styles.rightArrowBtn}>*/}
                                                {/*    <img*/}
                                                {/*        src="/assets/ion_return-down-back-outline.svg"*/}
                                                {/*        width={30}*/}
                                                {/*        alt=""*/}
                                                {/*        className={styles.rightArrow}*/}
                                                {/*    />*/}
                                                {/*  </button>*/}
                                                {/*</div>*/}
                                            </div>

                                            <div className={styles.lineContainer}>
                                                <div className={styles.line}/>
                                            </div>
                                        </div>

                                        {/* Instruct */}
                                        <div className={styles.instruct}>
                                            {/* row10 */}
                                            <div className={styles.row10}>
                                                <p>Non-Drug Recommendation</p>
                                            </div>

                                            {/* row11 */}
                                            <div className={styles.row11}>
                                                <div>
                                                    {generatedPrescriptions?.aiGeneratedText.nonDrugRecommendations.map(
                                                        (nonDrug, index) => (
                                                            <div key={index} style={{display: "flex"}}>
                                                                <span style={{marginRight: "10px"}}>&#8226;</span>
                                                                <p style={{margin: 0}}>{nonDrug}</p>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                                {/*<div className={styles.iconBtn}>*/}
                                                {/*  <button className={styles.leftArrowBtn}>*/}
                                                {/*    <img*/}
                                                {/*        src="/assets/Group.svg"*/}
                                                {/*        alt=""*/}
                                                {/*        className={styles.leftArrow}*/}
                                                {/*        width={18}*/}
                                                {/*    />*/}
                                                {/*  </button>*/}
                                                {/*  <button className={styles.rightArrowBtn}>*/}
                                                {/*    <img*/}
                                                {/*        src="/assets/ion_return-down-back-outline.svg"*/}
                                                {/*        width={30}*/}
                                                {/*        alt=""*/}
                                                {/*        className={styles.rightArrow}*/}
                                                {/*    />*/}
                                                {/*  </button>*/}
                                                {/*</div>*/}
                                            </div>

                                            <div className={styles.lineContainer}>
                                                <div className={styles.line}/>
                                            </div>
                                        </div>
                                        {/* Instruct */}
                                        <div className={styles.instruct}>
                                            {/* row10 */}
                                            <div className={styles.row10}>
                                                <p>Life Style & Diet</p>
                                            </div>

                                            {/* row11 */}
                                            <div className={styles.row11}>
                                                <div>
                                                    {generatedPrescriptions?.aiGeneratedText.lifestyle.map(
                                                        (life, index) => (
                                                            <div
                                                                key={index}
                                                                style={{
                                                                    display: "flex",
                                                                    alignItems: "flex-start",
                                                                    marginBottom: "4px",
                                                                }}
                                                            >
                                                                <span style={{marginRight: "10px"}}>&#8226;</span>
                                                                <p style={{margin: 0}}>{life}</p>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                                {/*<div className={styles.iconBtn}>*/}
                                                {/*  <button className={styles.leftArrowBtn}>*/}
                                                {/*    <img*/}
                                                {/*        src="/assets/Group.svg"*/}
                                                {/*        alt=""*/}
                                                {/*        className={styles.leftArrow}*/}
                                                {/*        width={18}*/}
                                                {/*    />*/}
                                                {/*  </button>*/}
                                                {/*  <button className={styles.rightArrowBtn}>*/}
                                                {/*    <img*/}
                                                {/*        src="/assets/ion_return-down-back-outline.svg"*/}
                                                {/*        width={30}*/}
                                                {/*        alt=""*/}
                                                {/*        className={styles.rightArrow}*/}
                                                {/*    />*/}
                                                {/*  </button>*/}
                                                {/*</div>*/}
                                            </div>

                                            <div className={styles.lineContainer}>
                                                <div className={styles.line}/>
                                            </div>
                                        </div>

                                        {/* Instruct */}
                                        <div className={styles.instruct1}>
                                            {/* row10 */}
                                            <div className={styles.row10}>
                                                <p>Follow-Up Instructions</p>
                                            </div>

                                            {/* row11 */}
                                            <div className={styles.row11}>
                                                <div>
                                                    <p>
                                                        <span>&#8226; </span>&nbsp; Review Date:{" "}
                                                        {
                                                            generatedPrescriptions?.aiGeneratedText.followUpInstructions
                                                                .reviewDate
                                                        }
                                                    </p>
                                                    <p>
                                                        <span>&#8226; </span>&nbsp; Notes:{" "}
                                                        {
                                                            generatedPrescriptions?.aiGeneratedText.followUpInstructions
                                                                .notes
                                                        }
                                                    </p>
                                                </div>
                                                {/*<div className={styles.iconBtn}>*/}
                                                {/*  <button className={styles.leftArrowBtn}>*/}
                                                {/*    <img*/}
                                                {/*        src="/assets/Group.svg"*/}
                                                {/*        alt=""*/}
                                                {/*        className={styles.leftArrow}*/}
                                                {/*        width={18}*/}
                                                {/*    />*/}
                                                {/*  </button>*/}
                                                {/*  <button className={styles.rightArrowBtn}>*/}
                                                {/*    <img*/}
                                                {/*        src="/assets/ion_return-down-back-outline.svg"*/}
                                                {/*        width={30}*/}
                                                {/*        alt=""*/}
                                                {/*        className={styles.rightArrow}*/}
                                                {/*    />*/}
                                                {/*  </button>*/}
                                                {/*</div>*/}
                                            </div>

                                        </div>

                                        {/* row10 */}
                                        {/*<div className={styles.blackText}>*/}
                                        {/*  <p>*/}
                                        {/*    AI Interaction Tracker: Used: Meds, Diet | Edited: Problem |*/}
                                        {/*    Regenerated: Lifestyle & Diet*/}
                                        {/*  </p>*/}
                                        {/*</div>*/}

                                        <div className={styles.search}>
                                            <div className={styles.searchSection}>
                                                <svg width="29" height="33" viewBox="0 0 29 33" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <ellipse cx="14.5" cy="14.5" rx="14.5" ry="14.5" fill="white"/>
                                                    <path
                                                        d="M20.1527 16.4986C20.1527 17.0061 19.7413 17.4175 19.2339 17.4175H16.3077C15.7554 17.4175 15.3077 17.8652 15.3077 18.4175V22.1233C15.3077 22.5693 14.9462 22.9308 14.5002 22.9308C14.0542 22.9308 13.6927 22.5693 13.6927 22.1233V18.4175C13.6927 17.8652 13.245 17.4175 12.6927 17.4175H9.76654C9.25906 17.4175 8.84766 17.0061 8.84766 16.4986C8.84766 15.9911 9.25906 15.5797 9.76654 15.5797H12.6927C13.245 15.5797 13.6927 15.132 13.6927 14.5797V10.8739C13.6927 10.4279 14.0542 10.0664 14.5002 10.0664C14.9462 10.0664 15.3077 10.4279 15.3077 10.8739V14.5797C15.3077 15.132 15.7554 15.5797 16.3077 15.5797H19.2339C19.7413 15.5797 20.1527 15.9911 20.1527 16.4986Z"
                                                        fill="#25307F"/>
                                                </svg>

                                                <input
                                                    type="text"
                                                    className={styles.searchInput}
                                                    placeholder="Search..."
                                                />

                                                <svg style={{marginLeft: '1rem'}} width="35" height="35" viewBox="0 0 40 40" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="0.5" y="0.5" width="39" height="39" rx="19.5"
                                                          fill="#25307F"/>
                                                    <rect x="0.5" y="0.5" width="39" height="39" rx="19.5"
                                                          stroke="#5C6EA7"/>
                                                    <g clipPath="url(#clip0_13234_12898)">
                                                        <path
                                                            d="M21.0649 12.1836V32.0783M21.0649 12.1836L27.1043 18.3051M21.0649 12.1836L15.0254 18.3051"
                                                            stroke="white" strokeWidth="3" strokeLinecap="round"
                                                            strokeLinejoin="round"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_13234_12898">
                                                            <rect width="27" height="27" fill="white"
                                                                  transform="translate(6.5 6.5)"/>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            {
                                                isListening ?
                                                    <button
                                                        className={`${styles.btn} ${styles.micBtn}`}
                                                        onClick={toggleMic}
                                                    >
                                                        Stop Mic
                                                    </button>
                                                    :
                                                    <div style={{
                                                        cursor: 'pointer',
                                                        padding: 0,
                                                        marginTop: 1,
                                                        height: '2rem'
                                                    }} onClick={toggleMic}>
                                                        <svg width="50" height="40" viewBox="0 0 60 56" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <rect y="0.199219" width="60" height="55.6077" rx="27.8038" fill="#25307F"/>
                                                            <path
                                                                d="M29.9994 31.1719C28.6799 31.1719 27.5584 30.7101 26.6348 29.7865C25.7112 28.8628 25.2494 27.7413 25.2494 26.4219V16.9219C25.2494 15.6024 25.7112 14.4809 26.6348 13.5573C27.5584 12.6337 28.6799 12.1719 29.9994 12.1719C31.3188 12.1719 32.4403 12.6337 33.3639 13.5573C34.2875 14.4809 34.7494 15.6024 34.7494 16.9219V26.4219C34.7494 27.7413 34.2875 28.8628 33.3639 29.7865C32.4403 30.7101 31.3188 31.1719 29.9994 31.1719ZM28.416 42.2552V37.3865C25.6716 37.017 23.4021 35.7899 21.6077 33.7052C19.8132 31.6205 18.916 29.1927 18.916 26.4219H22.0827C22.0827 28.6122 22.8548 30.4794 24.3991 32.0237C25.9434 33.568 27.8101 34.3396 29.9994 34.3385C32.1886 34.3375 34.0559 33.5653 35.6012 32.0221C37.1465 30.4789 37.9181 28.6122 37.916 26.4219H41.0827C41.0827 29.1927 40.1855 31.6205 38.391 33.7052C36.5966 35.7899 34.3271 37.017 31.5827 37.3865V42.2552H28.416Z"
                                                                fill="white"/>
                                                        </svg>
                                                    </div>
                                            }
                                        </div>
                                    </div>

                                    {/* row13 */}
                                    <div className={styles.row13}>
                                        <button className={styles.print} onClick={handlePrint}>
                                            <img src="/assets/Print-icon.svg" alt=""/>
                                            <p>Print</p>
                                        </button>
                                        <button
                                            className={styles.approve}
                                            onClick={() => onConfirm(generatedPrescriptions.aiGeneratedText)}
                                        >
                                            <img src="/assets/Tick.svg" alt="" height={12}/>
                                            <p>Approve</p>
                                        </button>
                                    </div>
                                </>
                            ) :
                            <PNMLoader patient={patient}/>
                    )
                }
            </div>

            <PrescriptionAndMedicinesPrint
                ref={printRef}
                prescriptions={generatedPrescriptions?.aiGeneratedText}
                patient={patient}
            />
        </div>
    );
};

export default PrescriptionAndMedicines;
