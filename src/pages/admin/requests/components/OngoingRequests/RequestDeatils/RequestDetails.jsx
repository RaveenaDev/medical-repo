import React, { useState } from "react";
import styles from "./RequestInnerDetails.module.scss";
import {
  Timeline,
  TimelineItem,
  timelineItemClasses,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { ChevronDown, ChevronUp, Paperclip } from "lucide-react";
import { Avatar } from "@mui/material";

const RequestDetails = ({ request, onBack }) => {
  const timelineMessages = [
    {
      id: 1,
      sender: "ADMIN",
      time: "Sept 27 at 9:00 pm",
      type: "admin",
      message:
        "Your package of 12 medicines has been shipped and will arrive to you shortly.",
      profileImg: "https://i.pravatar.cc/40?img=43",
    },
    {
      id: 2,
      sender: "ADMIN",
      time: "Sept 27 at 9:05 pm",
      type: "admin",
      message: "Reminder: Patient follow-up is scheduled for tomorrow.",
      profileImg: "https://i.pravatar.cc/40?img=43",
    },
    {
      id: 3,
      sender: "Dr. Patil",
      time: "Sept 27 at 9:10 pm",
      type: "doctor",
      message:
        "Request placed for few medicines needed in cardiology department. List of medicines attached below.",
      attachment: {
        label: "List of new medicines",
        url: "#",
      },
      profileImg: "https://i.pravatar.cc/40?img=51",
    },
    {
      id: 4,
      sender: "ADMIN",
      time: "Sept 27 at 9:15 pm",
      type: "admin",
      message: "The patient's blood report has been reviewed.",
      profileImg: "https://i.pravatar.cc/40?img=43",
    },
  ];

  const [updates, setUpdates] = useState([
    "Updated on Wednesday, 2 Oct: Medicines are quality-checked and labeled.",
    "Updated on Monday, 29 Sept: Pharmacy places an order with the supplier for the required medicines.",
    "Request accepted by admin on Friday, 27 Sept.",
  ]);

  const [newUpdate, setNewUpdate] = useState("");

  const handleAddUpdate = () => {
    if (newUpdate.trim()) {
      setUpdates([
        `Updated on ${new Date().toDateString()}: ${newUpdate}`,
        ...updates,
      ]);
      setNewUpdate("");
    }
  };

  console.log("Request data: ", request);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Ongoing");
  const dropdownOptions = ["Completed", "Ongoing"]; // static options

  return (
    <div className={styles.requestInnerDetailsPage}>
      <div className={styles.about}>
        <div className={styles.heading}>
          <div className={styles.headingLeft}>
            <svg
              width="3.5vh"
              height="3.5vh"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={onBack}
              style={{ cursor: "pointer" }}
            >
              <path
                d="M20 27.5L7.5 15L20 2.5L22.2188 4.71875L11.9375 15L22.2188 25.2813L20 27.5Z"
                fill="black"
              />
            </svg>
            <p>Request Details</p>
          </div>
          <div className={styles.headingRight}>
            <p>{request.date}</p>
          </div>
        </div>
        <div className={styles.info}>
          <p>
            <strong>Requested By:</strong> <span>{request.name}</span>
          </p>

          <p>
            <strong>Request:</strong> <span>{request.request}</span>
          </p>
        </div>
      </div>

      {/* Request Progress Section */}
      <div className={styles.requestProgress}>
        {timelineMessages.map((msg) =>
          msg.type === "admin" ? (
            <div key={msg.id} className={styles.yourMessage}>
              <div className={styles.leftYM}>
                <Avatar
                  sx={{
                    bgcolor: "#e3e3e3",
                    color: "#25307F",
                    fontWeight: 500,
                  }}
                  className="patientAvatar"
                ></Avatar>
                <div className={styles.dottedLine}></div>
              </div>
              <div>
                <div className={styles.nameAndDateTime}>
                  <p>{msg.sender}</p>
                  <span>{msg.time}</span>
                </div>
                <div className={styles.adminMessage}>
                  <p>{msg.message}</p>
                </div>
              </div>
            </div>
          ) : (
            <div key={msg.id} className={styles.docRequestContainer}>
              <div className={styles.docProfile}>
                <Avatar
                  sx={{
                    bgcolor: "#e3e3e3",
                    color: "#25307F",
                    fontWeight: 500,
                  }}
                  className="patientAvatar"
                >
                  {msg.sender.charAt(0)}
                </Avatar>
                <p>{msg.sender} added a comment</p>
              </div>
              <div className={styles.docMessage}>
                <p className={styles.mess1}>{msg.message}</p>
                {msg.attachment && (
                  <div className={styles.mess2}>
                    <Paperclip
                      size={15}
                      style={{ transform: "rotate(270deg)" }}
                    />
                    <p>{msg.attachment.label}</p>
                  </div>
                )}
              </div>
              {/* Optional timestamp for doctor message */}
              <div className={styles.docDateTime}>
                {/* <p>{msg.time}</p> */}
              </div>
            </div>
          )
        )}
      </div>
      <div className={styles.submitContainer}>
        <div className={styles.dropdown}>
          <button
            className={`${styles.trigger} ${
              selectedOption === "Completed"
                ? styles.completedTrigger
                : selectedOption === "Ongoing"
                ? styles.ongoingTrigger
                : ""
            }`}
            onClick={() => setOpenDropdown((prev) => !prev)}
          >
            <p>{selectedOption || "Select option"}</p>
            <span className={styles.arrow}>
              <img
                src={
                  selectedOption === "Completed"
                    ? "/assets/admin/greenDownArrow.svg"
                    : "/assets/admin/downArrow.svg"
                }
                className={openDropdown ? styles.arrowUp : ""}
                alt="Dropdown arrow"
              />
            </span>
          </button>

          {openDropdown && (
            <ul className={styles.menu}>
              {dropdownOptions.map((option) => (
                <li
                  key={option}
                  className={`${styles.item} `}
                  onClick={() => {
                    setSelectedOption(option);
                    setOpenDropdown(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          className={styles.sendInput}
          type="text"
          placeholder="Add comments and request updates"
        />
        <button className={styles.sendBtn}>Send</button>
      </div>
    </div>
  );
};

export default RequestDetails;
