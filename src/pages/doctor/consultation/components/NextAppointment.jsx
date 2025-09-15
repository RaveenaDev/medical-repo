import React, { useState } from "react";
import styles from "./NextAppointment.module.scss";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { setOngoing, setReschedule } from "../../../../components/State/Doctor/Action.js";
import Avatar from "@mui/material/Avatar";

const NextAppointment = ({ onClose, nextAppointment, allowance, onStart }) => {
    const dispatch = useDispatch();

    const [isStarting, setIsStarting] = useState(false);
    const [isRescheduling, setIsRescheduling] = useState(false);

    if (!nextAppointment) {
        return (
            <div className={styles.container1}>
                <div className={styles.crossContainer}>
                    <X size={20} onClick={onClose} />
                </div>
                <div style={{ height: "20vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <p style={{ fontWeight: 600, fontSize: "1rem" }}>No next appointments</p>
                </div>
            </div>
        );
    }

    const pat = { patientId: nextAppointment.patient._id };
    const appt = { appointmentId: nextAppointment._id };

    const handleStartConsultation = async () => {
        try {
            setIsStarting(true);
            await dispatch(setOngoing(pat));
            // ⬇️ This promise never resolves, so the loader stays on forever.
            // await new Promise(r => setTimeout(r, 3000)); // test delay
            onClose();
            onStart();
        } catch (err) {
            console.error("Start failed:", err);
            // TODO: toast/error UI if needed
        } finally {
            setIsStarting(false);
        }
    };

    const handleRescheduleConsultation = async () => {
        try {
            setIsRescheduling(true);
            await dispatch(setReschedule(appt));
            // ⬇️ This promise never resolves, so the loader stays on forever.
            // await new Promise(r => setTimeout(r, 3000)); // test delay
            onClose();
            onStart();
        } catch (err) {
            console.error("Reschedule failed:", err);
            // TODO: toast/error UI if needed
        } finally {
            setIsRescheduling(false);
        }
    };

    const buttonsDisabled = isStarting || isRescheduling;

    return (
        <div className={styles.container1}>
            <div className={styles.crossContainer}>
                <X size={20} onClick={onClose} />
            </div>

            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <p>Next Appointment Patient Info</p>
                </div>

                {/* Patient Info */}
                <div className={styles.patientInfoContainer}>
                    <div className={styles.img}>
                        <Avatar
                            sx={{ width: 64, height: 64, fontSize: 26, fontWeight: "bold" }}
                            className={styles.avatar}
                        >
                            {nextAppointment?.patient.name[0].toUpperCase()}
                        </Avatar>
                    </div>
                    <div className={styles.patientInfo}>
                        <p className={styles.name}>{nextAppointment?.patient.name}</p>
                        <p>Age: 39&nbsp; |&nbsp; Male</p>
                        <p>Patient ID: {nextAppointment.patient._id}</p>
                    </div>
                </div>

                {/* Content */}
                <div className={styles.content}>
                    <div className={styles.row1}>
                        <p className={styles.leftRow}>
                            Date <br />
                            <span>May 13th, 2025</span>
                        </p>
                        <p className={styles.rightRow}>
                            Token No. <br />
                            <span>{nextAppointment.tokenNumber}</span>
                        </p>
                    </div>
                    <div className={styles.row1}>
                        <p className={styles.leftRow}>
                            Consultation Doctor <br />
                            <span>{nextAppointment?.doctor.name}</span>
                        </p>
                        <p className={styles.rightRow}>
                            Department <br />
                            <span>{nextAppointment?.department.name}</span>
                        </p>
                    </div>
                </div>

                {/* Buttons */}
                {allowance && (
                    <div className={styles.buttons}>
                        <button
                            onClick={handleStartConsultation}
                            className={`${styles.startBtn} ${styles.btnLoading}`}
                            disabled={buttonsDisabled}
                            aria-busy={isStarting}
                            type="button"
                        >
                            {isStarting ? (
                                <>
                                    <span className={styles.spinner} aria-hidden="true" />
                                    Starting…
                                </>
                            ) : (
                                "Start Consultation"
                            )}
                        </button>

                        <button
                            onClick={handleRescheduleConsultation}
                            className={`${styles.rescheduleBtn} ${styles.btnLoading}`}
                            disabled={buttonsDisabled}
                            aria-busy={isRescheduling}
                            type="button"
                        >
                            {isRescheduling ? (
                                <>
                                    <span className={styles.spinner} aria-hidden="true" />
                                    Rescheduling…
                                </>
                            ) : (
                                "Reschedule"
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NextAppointment;
