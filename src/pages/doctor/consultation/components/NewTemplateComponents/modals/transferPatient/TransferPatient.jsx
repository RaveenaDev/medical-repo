// TransferPatient.jsx
import { ChevronDown, ChevronUp, X } from "lucide-react";
import styles from "../../../ScheduleTreatment.module.scss"; // reuse same style file
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllDepartments,
    getDoctorsByDepartment, getDoctorsByDepartment1,
    removePrescriptionsWithAI,
    // transferPatient, // <-- action expected on your side
    // If you don't have transferPatient, you can wire to submitConsultation with a different payload key.
} from "../../../../../../../components/State/Doctor/Action.js";

const TransferPatient = ({
                             setCompleteData,
                             onClose,
                             setConfirmedSections,
                             setSelectedComponent,
                             modalData,
                             onSuccess,
                         }) => {
    const dispatch = useDispatch();

    const [openDeptDropdown, setOpenDeptDropdown] = useState(false);
    const [openDoctorDropdown, setOpenDoctorDropdown] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [transfer, setTransfer] = useState({
        departmentId: "",
        doctorId: "",
        note: "",
    });

    // Load departments initially
    useEffect(() => {
        dispatch(getAllDepartments());
    }, [dispatch]);

    // When department changes, fetch doctors for that department
    useEffect(() => {
        if (transfer.departmentId) {
            dispatch(getDoctorsByDepartment1(transfer.departmentId));
            // Reset doctor on department change
            setTransfer((p) => ({ ...p, doctorId: "" }));
        }
    }, [dispatch, transfer.departmentId]);

    // Selectors: adjust to your store shape if different
    const departments =
        useSelector((s) => s.doctor?.allDepartments) || [];

    const doctorsByDept =
        useSelector((s) => s.doctor?.doctorsByDepartment) ||
        [];

    console.log("Doctors: ",doctorsByDept)
    // console.log("Departments: ",)

    const handleSubmit = async () => {
        const payload = {
            ...modalData,
            transfer: {
                department: transfer.departmentId,
                doctor: transfer.doctorId,
                note: transfer.note?.trim() || "",
            },
        };

        try {
            setIsSubmitting(true);
            // await dispatch(transferPatient(payload, onSuccess, onClose));
            setConfirmedSections?.([]);
            setSelectedComponent?.("PatientInfo");
            dispatch(removePrescriptionsWithAI());
            setCompleteData?.({});
        } catch (err) {
            console.error("Transfer failed:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedDeptName =
        departments.find((d) => d.departmentId === transfer.departmentId)?.departmentName ||
        "";

    const selectedDoctorName =
        doctorsByDept.find((d) => d._id === transfer.doctorId)?.name ||
        "";

    return (
        <div>
            <div className={styles.crossContainer}>
                <X size={20} onClick={onClose} />
            </div>

            <header className={styles.header}>
                <p>Transfer Patient</p>
            </header>

            <div className={styles.container}>
                {/* Section: Department */}
                <div className={styles.section1}>
                    <div className={styles.treatmentType}>
                        <p className={styles.label}>Department</p>
                        <div className={styles.dropdown}>
                            <button
                                className={styles.trigger}
                                onClick={() => setOpenDeptDropdown((p) => !p)}
                            >
                                <p className={!selectedDeptName ? styles.placeholder : undefined}>
                                    {selectedDeptName || "Select Department"}
                                </p>
                                <span className={styles.arrow}>
                                  {openDeptDropdown ? <ChevronUp /> : <ChevronDown />}
                                </span>
                            </button>

                            {openDeptDropdown && (
                                <ul className={styles.menu1}>
                                    {departments.map((dept) => (
                                        <li
                                            key={dept.departmentId || dept.departmentId}
                                            className={`${styles.item} ${
                                                transfer.departmentId === (dept.departmentId)
                                                    ? styles.active
                                                    : ""
                                            }`}
                                            onClick={() => {
                                                setTransfer((p) => ({
                                                    ...p,
                                                    departmentId: dept.departmentId,
                                                }));
                                                setOpenDeptDropdown(false);
                                            }}
                                        >
                                            {dept.departmentName}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Section: Doctor */}
                    <div className={styles.treatmentType}>
                        <p className={styles.label}>Doctor</p>
                        <div className={styles.dropdown}>
                            <button
                                className={styles.trigger}
                                onClick={() => {
                                    if (!transfer.departmentId) return;
                                    setOpenDoctorDropdown((p) => !p);
                                }}
                                aria-disabled={!transfer.departmentId}
                                style={{
                                    opacity: transfer.departmentId ? 1 : 0.6,
                                    cursor: transfer.departmentId ? "pointer" : "not-allowed",
                                }}
                            >
                                <p className={!selectedDoctorName ? styles.placeholder : undefined}>
                                    {selectedDoctorName ||
                                        (transfer.departmentId
                                            ? "Select Doctor"
                                            : "Select Department first")}
                                </p>
                                <span className={styles.arrow}>
                                  {openDoctorDropdown ? <ChevronUp /> : <ChevronDown />}
                                </span>
                            </button>

                            {openDoctorDropdown && transfer.departmentId && (
                                <ul className={styles.menu1}>
                                    {doctorsByDept.map((doc) => (
                                        <li
                                            key={doc._id}
                                            className={`${styles.item} ${
                                                transfer.doctorId === (doc._id)
                                                    ? styles.active
                                                    : ""
                                            }`}
                                            onClick={() => {
                                                setTransfer((p) => ({
                                                    ...p,
                                                    doctorId: doc._id,
                                                }));
                                                setOpenDoctorDropdown(false);
                                            }}
                                        >
                                            {doc.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Section: Optional Note */}
                    <div className={styles.doctorNotes}>
                        <label htmlFor="tp-note" className={styles.label}>
                            Note <span style={{ fontWeight: 400, opacity: 0.7 }}>(optional)</span>
                        </label>
                        <textarea
                            id="tp-note"
                            placeholder="Any additional instruction"
                            rows={4}
                            value={transfer.note}
                            onChange={(e) =>
                                setTransfer((p) => ({ ...p, note: e.target.value }))
                            }
                        />
                    </div>
                </div>

                {/* Submit */}
                <div className={styles.submitContainer}>
                    <button
                        onClick={handleSubmit}
                        className={styles.primaryBtn}
                        disabled={
                            isSubmitting ||
                            !transfer.departmentId ||
                            !transfer.doctorId
                        }
                        aria-busy={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className={styles.spinner} aria-hidden="true" />
                                Processing…
                            </>
                        ) : (
                            "Confirm Transfer"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransferPatient;
