import { useNavigate } from "react-router-dom";
import CommonPanelMini from "../components/CommonPanelMini";
import styles from "./DoctorRequestDetail.module.scss";
import { ChevronLeft, Paperclip } from "lucide-react";

const DoctorNewRequest = () => {
  const messages = [
    {
      id: 1,
      text: "Your package of 12 medicines has been shipped and will arrive to you shortly.",
      avatarUrl: "https://i.pravatar.cc/40?img=1",
      sender: "ADMIN",
      timestamp: "Sept 27 at 9:00 pm",
    },
    {
      id: 2,
      text: "The medicines have been packed and ready to ship.",
      avatarUrl: "https://i.pravatar.cc/40?img=1",
      sender: "ADMIN",
      timestamp: "Sept 27 at 9:00 pm",
    },
    {
      id: 3,
      text: "The medicines have been packed and ready to ship.",
      avatarUrl: "https://i.pravatar.cc/40?img=1",
      sender: "ADMIN",
      timestamp: "Sept 27 at 9:00 pm",
    },
    {
      id: 4,
      text: "The medicines have been packed and ready to ship.",
      avatarUrl: "https://i.pravatar.cc/40?img=1",
      sender: "ADMIN",
      timestamp: "Sept 27 at 9:00 pm",
    },
  ];

  const navigate = useNavigate();
  const comingSoon = true;
  const handleBackButton = () => {
    navigate("/doctor/doctor-request");
  };
  return (
    <div>
      <CommonPanelMini />
      {comingSoon ? (
        <div className={styles.comingSoonContainer}>
          <p className={styles.comingSoonHeading}>Coming Soon</p>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.header1}>
              <div className={styles.h1Left}>
                <ChevronLeft
                  size={32}
                  strokeWidth={1.6}
                  onClick={handleBackButton}
                  style={{ cursor: "pointer" }}
                />
                <span>Request Details</span>
              </div>
              <div className={styles.h1Right}>
                <span> Friday, 27 Sept at 10:00 AM</span>
              </div>
            </div>
            <div className={styles.header2}>
              <div className={styles.h2}>
                <p>Requested by:</p>
                <span>&nbsp;Dr. Patil ( Head of Cardiology )</span>
              </div>
              <div className={styles.h2}>
                <p>Request:</p>
                <span>&nbsp;Request for Medicines</span>
              </div>
            </div>
          </div>

          <div className={styles.yourRequestContainer}>
            <div className={styles.YRProfile}>
              <img src="https://i.pravatar.cc/30?img=41" alt="" width={38} />
              <p>YOU</p>
            </div>
            <div className={styles.YRMessage}>
              <p className={styles.mess1}>
                Request placed for few medicines needed in cardiology
                department. List of medicines attached below
              </p>
              <div className={styles.mess2}>
                <Paperclip size={15} style={{ transform: "rotate(270deg)" }} />
                <p>List of new medicines</p>
              </div>
            </div>
            <div className={styles.YRDateTime}>
              <p>Sept 27 at 10:00 am</p>
            </div>
          </div>

          <div className={styles.content}>
            {messages.map((msg, index) => (
              <div key={msg.id} className={styles.messageRow}>
                <div className={styles.avatarContainer}>
                  <img
                    src={msg.avatarUrl}
                    alt="avatar"
                    className={styles.avatar}
                  />
                  {index !== messages.length - 1 && (
                    <div className={styles.verticalLine}></div>
                  )}
                </div>
                <div className={styles.messageContainer}>
                  <div className={styles.messageContent}>
                    <div className={styles.row1}>
                      <p className={styles.messageText}>{msg.text}</p>
                      <span className={styles.sender}>{msg.sender}</span>
                    </div>

                    <div className={styles.messageMeta}>
                      <span className={styles.timestamp}>{msg.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.submitContainer}>
            <input type="text" placeholder="Add comments and request updates" />
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorNewRequest;
