import React from "react";
import styles from "./NextAppointment.module.scss";
import { X } from "lucide-react";
import {useDispatch} from "react-redux";
import {setOngoing, setReschedule} from "../../../../components/State/Doctor/Action.js";

const NextAppointment = ({ onClose,nextAppointment,allowance,onStart }) => {
    const dispatch = useDispatch()
    if (!nextAppointment) {
        return (
            <div className={styles.container1}>
                <div className={styles.crossContainer}>
                    <X size={20} onClick={onClose} />
                </div>
                <div style={{ height: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p style={{ fontWeight: 600, fontSize: '1rem' }}>No next appointments</p>
                </div>
            </div>
        );
    }
    // console.log("app: ",nextAppointment)
    const pat = {
        patientId: nextAppointment.patient._id
    };

    const appt = {
        appointmentId: nextAppointment._id
    }

    const handleStartConsultation = () => {
        dispatch(setOngoing(pat)).then(() => {
            onClose();
            onStart();
        })
            .catch((err) => {
                console.error("Start failed:", err);
            });
    }

    const handleRescheduleConsultation = () => {
        dispatch(setReschedule(appt)).then(() => {
            onClose();
            onStart();
        })
            .catch((err) => {
                console.error("Reschedule failed:", err);
            });
    }

  return (
    <div className={styles.container1}>
      <div className={styles.crossContainer}>
        <X
          size={20}
          onClick={() => {
            onClose();
          }}
        />
      </div>

      {
        !nextAppointment ? (
            <div style={{height:'20vh',display:'flex',justifyContent:'center',
            alignItems:'center'}}>
              <p style={{fontWeight:600,fontSize:'1rem'}}> No next appointments</p>
            </div>
        ) : (
            <>
              <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                  <p>Next Appointment Patient Info</p>
                </div>

                {/* Patient Info */}
                <div className={styles.patientInfoContainer}>
                  <div className={styles.img}>
                    <img src="https://i.pravatar.cc/40?img=43" alt=""/>
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
                      Date <br/>
                      <span>May 13th, 2025</span>
                    </p>
                    <p className={styles.rightRow}>
                      Token No. <br/>
                      <span>{nextAppointment.tokenNumber}</span>
                    </p>
                  </div>
                  <div className={styles.row1}>
                    <p className={styles.leftRow}>
                      Consultation Doctor <br/>
                      <span>{nextAppointment?.doctor.name}</span>
                    </p>
                    <p className={styles.rightRow}>
                      Department <br/>
                      <span>{nextAppointment?.department.name}</span>
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                  {
                      allowance && (
                          <div className={styles.buttons}>
                              <button onClick={handleStartConsultation} className={styles.startBtn}>Start Consultation</button>
                              <button onClick={handleRescheduleConsultation} className={styles.rescheduleBtn}>Reschedule</button>
                          </div>
                      )
                  }
              </div>
            </>
        )
      }
    </div>
  );
};

export default NextAppointment;
