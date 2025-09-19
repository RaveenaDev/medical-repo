import {useEffect, useRef, useState} from "react";
import styles from "./ManualPrescriptionForm.module.scss";
import {useReactToPrint} from "react-to-print";
import PrescriptionAndMedicinesPrint from "../print/PrescriptionAndMedicinesPrint.jsx";

const ManualPrescriptionForm = ({ patient, existingData, onConfirm }) => {
    const [form, setForm] = useState({
        problemStatement: existingData?.problemStatement || "",
        icdCode: existingData?.icdCode || "",
        therapyPlan: existingData?.therapyPlan || "",
        precautions: existingData?.precautions || "",
        followUp: existingData?.followUp || "",
        medications: Array.isArray(existingData?.medications)
            ? existingData.medications.join("\n")
            : existingData?.medications || "",
        lifestyle: Array.isArray(existingData?.lifestyle)
            ? existingData.lifestyle.join("\n")
            : existingData?.lifestyle || "",
        injectionsTherapies: Array.isArray(existingData?.injectionsTherapies)
            ? existingData.injectionsTherapies.join("\n")
            : existingData?.injectionsTherapies || "",
        nonDrugRecommendations: Array.isArray(existingData?.nonDrugRecommendations)
            ? existingData.nonDrugRecommendations.join("\n")
            : existingData?.nonDrugRecommendations || "",
        followUpInstructions: {
            notes: existingData?.followUpInstructions?.notes || "",
            reviewDate: existingData?.followUpInstructions?.reviewDate || "",
        },
    });

    const [submissionData, setSubmissionData] = useState(null);



    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "followUpNotes" || name === "reviewDate") {
            setForm((prev) => ({
                ...prev,
                followUpInstructions: {
                    ...prev.followUpInstructions,
                    [name === "followUpNotes" ? "notes" : "reviewDate"]: value,
                },
            }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = () => {
        const submissionData = {
            problemStatement: form.problemStatement,
            icdCode: form.icdCode,
            therapyPlan: form.therapyPlan,
            precautions: form.precautions,
            followUp: form.followUp,
            medications: form.medications.split("\n").filter(Boolean),
            injectionsTherapies: form.injectionsTherapies.split("\n").filter(Boolean),
            lifestyle: form.lifestyle.split("\n").filter(Boolean),
            nonDrugRecommendations: form.nonDrugRecommendations.split("\n").filter(Boolean),
            followUpInstructions: {
                notes: form.followUpInstructions.notes,
                reviewDate: form.followUpInstructions.reviewDate,
            },
        };

        onConfirm(submissionData);
        setSubmissionData(submissionData); // Storing submission data for printing

        // console.log("Submitted data:", submissionData);
    };

    // Trigger the print only when submissionData is updated
    useEffect(() => {
        if (submissionData) {
            handleReactPrint(); // Trigger print after submissionData is available
        }
    }, [submissionData]);

    const handlePrint = () => {
        const submissionData = {
            problemStatement: form.problemStatement,
            icdCode: form.icdCode,
            therapyPlan: form.therapyPlan,
            precautions: form.precautions,
            followUp: form.followUp,
            medications: form.medications.split("\n").filter(Boolean),
            injectionsTherapies: form.injectionsTherapies.split("\n").filter(Boolean),
            lifestyle: form.lifestyle.split("\n").filter(Boolean),
            nonDrugRecommendations: form.nonDrugRecommendations.split("\n").filter(Boolean),
            followUpInstructions: {
                notes: form.followUpInstructions.notes,
                reviewDate: form.followUpInstructions.reviewDate,
            },
        };

        setSubmissionData(submissionData);
    }

    const printRef = useRef();
    const handleReactPrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: "Prescriptions And Medicines",
    });

    return (
        <div className={styles.manualWrapper1}>
            <div className={styles.formGrid1}>
                <div className={styles.field1}>
                    <label>Problem Statement</label>
                    <textarea
                        name="problemStatement"
                        value={form.problemStatement}
                        onChange={handleChange}
                        rows={2}
                    />
                </div>

                <div className={styles.field1}>
                    <label>ICD Code</label>
                    <input
                        type="text"
                        name="icdCode"
                        value={form.icdCode}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.field1}>
                    <label>Therapy Plan</label>
                    <textarea
                        name="therapyPlan"
                        value={form.therapyPlan}
                        onChange={handleChange}
                        rows={2}
                    />
                </div>

                <div className={styles.field1}>
                    <label>Precautions</label>
                    <textarea
                        name="precautions"
                        value={form.precautions}
                        onChange={handleChange}
                        rows={2}
                    />
                </div>

                <div className={styles.field1}>
                    <label>Follow-Up</label>
                    <textarea
                        name="followUp"
                        value={form.followUp}
                        onChange={handleChange}
                        rows={2}
                    />
                </div>

                <div className={styles.field1}>
                    <label>Medications (one per line)</label>
                    <textarea
                        name="medications"
                        value={form.medications}
                        onChange={handleChange}
                        rows={3}
                    />
                </div>

                <div className={styles.field1}>
                    <label>Injections / Therapies (one per line)</label>
                    <textarea
                        name="injectionsTherapies"
                        value={form.injectionsTherapies}
                        onChange={handleChange}
                        rows={3}
                    />
                </div>

                <div className={styles.field1}>
                    <label>Lifestyle & Diet (one per line)</label>
                    <textarea
                        name="lifestyle"
                        value={form.lifestyle}
                        onChange={handleChange}
                        rows={3}
                    />
                </div>

                <div className={styles.field1}>
                    <label>Non-Drug Recommendations (one per line)</label>
                    <textarea
                        name="nonDrugRecommendations"
                        value={form.nonDrugRecommendations}
                        onChange={handleChange}
                        rows={3}
                    />
                </div>

                <div className={styles.field1}>
                    <label>Follow-Up Notes</label>
                    <textarea
                        name="followUpNotes"
                        value={form.followUpInstructions.notes}
                        onChange={handleChange}
                        rows={3}
                    />
                </div>

                <div className={styles.field1}>
                    <label>Review Date</label>
                    <input
                        type="date"
                        name="reviewDate"
                        value={form.followUpInstructions.reviewDate}
                        onChange={handleChange}
                    />
                </div>

            </div>

            {/*<div className={styles.footer1}>*/}
            {/*    <button className={styles.submitBtn1} onClick={handleSubmit}>*/}
            {/*        Approve*/}
            {/*    </button>*/}
            {/*</div>*/}

            <div className={styles.row13}>
                <button className={styles.print} onClick={handlePrint}>
                    <img src="/assets/Print-icon.svg" alt=""/>
                    <p>Print</p>
                </button>
                <button
                    className={styles.approve}
                    onClick={handleSubmit}
                >
                    <img src="/assets/Tick.svg" alt="" height={12}/>
                    <p>Approve</p>
                </button>
            </div>

            {/* Only pass submissionData to the print component when the print button is clicked */}
            {submissionData && (
                <PrescriptionAndMedicinesPrint
                    ref={printRef}
                    prescriptions={submissionData}
                    patient={patient}
                />
            )}
        </div>
    );
};

export default ManualPrescriptionForm;
