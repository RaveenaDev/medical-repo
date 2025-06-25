import { useEffect, useState } from "react";
import styles from "./MedAdminRecord.module.scss";
import { Plus } from "lucide-react";
import UpdateMAR from "./form/UpdateMAR";

const MedAdminRecord = () => {
  const medicationSchedule = [
    {
      time: "08:00 AM",
      medication: "Ceftriaxone",
      dose: "500mg",
      route: "IV",
      givenBy: "Nurse Name",
      notes: "No side effects",
      status: "Given",
    },
    {
      time: "12:00 PM",
      medication: "Paracetamol",
      dose: "1g",
      route: "IV",
      givenBy: "Nurse Name",
      notes: "Improvement",
      status: "Scheduled",
    },
    {
      time: "04:00 PM",
      medication: "Paracetamol",
      dose: "1g",
      route: "Oral",
      givenBy: "Nurse Name",
      notes: "Improvement",
      status: "Scheduled",
    },
    {
      time: "08:00 AM",
      medication: "Ceftriaxone",
      dose: "500mg",
      route: "IV",
      givenBy: "Nurse Name",
      notes: "No side effects",
      status: "Given",
    },
    {
      time: "12:00 PM",
      medication: "Paracetamol",
      dose: "1g",
      route: "IV",
      givenBy: "Nurse Name",
      notes: "Improvement",
      status: "Scheduled",
    },
    {
      time: "04:00 PM",
      medication: "Paracetamol",
      dose: "1g",
      route: "Oral",
      givenBy: "Nurse Name",
      notes: "Improvement",
      status: "Scheduled",
    },
    {
      time: "08:00 AM",
      medication: "Ceftriaxone",
      dose: "500mg",
      route: "IV",
      givenBy: "Nurse Name",
      notes: "No side effects",
      status: "Given",
    },
    {
      time: "12:00 PM",
      medication: "Paracetamol",
      dose: "1g",
      route: "IV",
      givenBy: "Nurse Name",
      notes: "Improvement",
      status: "Scheduled",
    },
    {
      time: "04:00 PM",
      medication: "Paracetamol",
      dose: "1g",
      route: "Oral",
      givenBy: "Nurse Name",
      notes: "Improvement",
      status: "Scheduled",
    },
  ];

  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeModal]);

  const openUpdate = () => setActiveModal("Update");
  const closeModal = () => setActiveModal(null);

  return (
    <div className={styles.container}>
      <div className={styles.row1}>
        <p>Record</p>
        <div className={styles.buttons}>
          <button className={styles.editBtn}>
            <img src="/assets/Pen.svg" alt="pen icon" width={14} />
          </button>
          <button className={styles.updateBtn} onClick={openUpdate}>
            <Plus size={18} />
            Update
          </button>
        </div>
      </div>
      {activeModal === "Update" && (
        <>
          <div className={styles.backdropOverlay} onClick={closeModal} />
          <div className={styles.followUpModal}>
            <UpdateMAR onClose={closeModal} />
          </div>
        </>
      )}
      <section className={styles.section3}>
        <div className={styles.card1}>
          <p>Time</p>
          <hr className={styles.line} />
          <p className={styles.divider}>Medication</p>
          <hr className={styles.line} />
          <p className={styles.divider}>Dose</p>
          <hr className={styles.line} />
          <p className={styles.divider}>Route</p>
          <hr className={styles.line} />
          <p className={styles.divider}>Given by</p>
          <hr className={styles.line} />
          <p className={styles.divider}>Notes</p>
          <hr className={styles.line} />
          <p className={styles.status}>Status</p>
        </div>

        {medicationSchedule.map((item, index) => (
          <div key={index} className={styles.card2}>
            <p className={styles.time}>{item.time}</p>
            <hr className={styles.line2} />
            <p className={styles.medication}>{item.medication}</p>
            <hr className={styles.line2} />
            <p className={styles.dose}>{item.dose}</p>
            <hr className={styles.line2} />
            <p className={styles.route}>{item.route}</p>
            <hr className={styles.line2} />
            <p className={styles.givenBy}>{item.givenBy}</p>
            <hr className={styles.line2} />
            <p className={styles.notes}>{item.notes}</p>
            <hr className={styles.line2} />
            <p
              className={`${styles.status} ${
                item.status === "Given" ? styles.given : styles.scheduled
              }`}
            >
              {item.status}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MedAdminRecord;
