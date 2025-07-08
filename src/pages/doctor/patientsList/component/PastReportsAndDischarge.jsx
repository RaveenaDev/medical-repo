import { useEffect, useState } from "react";
import styles from "./PastReportsAndDischarge.module.scss";
import { Plus } from "lucide-react";
import UpdatePRD from "./form/UpdatePRD";
const PastReportsAndDischarge = () => {
  const patientHistoryCards = [
    {
      id: 1,
      title: "Past Discharge Summary",
      subtitle: "Outcome & follow-up",
      icon: "/assets/exitIcon-green.svg",
      items: [
        "Outcome & follow-up",
        "Treatment outcome",
        "Follow-up instructions",
      ],
    },
    {
      id: 2,
      title: "Past Hospitals Reports",
      subtitle: "Reports and Tests",
      icon: "/assets/labIcon.svg",
      items: [
        "Previous admissions",
        "Previous investigations",
        "Past prescriptions",
      ],
    },
    {
      id: 3,
      title: "Past Hospitals Reports",
      subtitle: "Reports and Tests",
      icon: "/assets/labIcon.svg",
      items: [
        "Previous admissions",
        "Previous investigations",
        "Past prescriptions",
      ],
    },
    {
      id: 1,
      title: "Past Discharge Summary",
      subtitle: "Outcome & follow-up",
      icon: "/assets/exitIcon-green.svg",
      items: [
        "Outcome & follow-up",
        "Treatment outcome",
        "Follow-up instructions",
      ],
    },
    {
      id: 1,
      title: "Past Discharge Summary",
      subtitle: "Outcome & follow-up",
      icon: "/assets/exitIcon-green.svg",
      items: [
        "Outcome & follow-up",
        "Treatment outcome",
        "Follow-up instructions",
      ],
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
      <header>
        <p>Vitals Tracker</p>
        {/* <div className={styles.buttons}>
          <button className={styles.editBtn}>
            <img src="/assets/Pen.svg" alt="pen icon" width={14} />
          </button>
          <button className={styles.updateBtn} onClick={openUpdate}>
            <Plus size={18} />
            Update
          </button>
        </div> */}
      </header>

      {activeModal === "Update" && (
        <>
          <div className={styles.backdropOverlay} onClick={closeModal} />
          <div className={styles.updateModal}>
            <UpdatePRD onClose={closeModal} />
          </div>
        </>
      )}

      <div className={styles.cardWrapper}>
        {patientHistoryCards.map((card) => (
          <div key={card.id} className={styles.card}>
            <div className={styles.header}>
              <img src={card.icon} alt="icon" className={styles.icon} />
              <div className={styles.headerTitle}>
                <h3 className={styles.title}>{card.title}</h3>
                <p className={styles.subtitle}>{card.subtitle}</p>
              </div>
            </div>

            <ul className={styles.list}>
              {card.items.map((item, idx) => (
                <li key={idx}>
                  <strong>{item}</strong>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastReportsAndDischarge;
