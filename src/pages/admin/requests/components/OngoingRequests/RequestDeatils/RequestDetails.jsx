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

const RequestDetails = ({ request, onBack }) => {
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

  return (
    <div className={styles.requestInnerDetailsPage}>
      <div className={styles.details}>
        <div className={styles.about}>
          <div className={styles.heading}>
            <svg
              width="30"
              height="30"
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
          <div className={styles.info}>
            <p>
              <strong>Requested By:</strong> <span>{request.name}</span>
            </p>
            <p>
              <strong>Department:</strong> <span>{request.department}</span>
            </p>
            <p>
              <strong>Date Submitted:</strong> <span>{request.date}</span>
            </p>
            <p>
              <strong>Request:</strong> <span>{request.request}</span>
            </p>
          </div>
        </div>

        <div className={styles.medicineDetails}>
          {request.medicines && request.medicines.length > 0 && (
            <div>
              <p>
                <span>Request:</span> Please order the following medications
              </p>
              <ul>
                {request.medicines.map((med, index) => (
                  <li key={index}>{med}</li>
                ))}
              </ul>
            </div>
          )}
          {request.attachment && (
            <p>
              <span>Attachments: </span>
              <a href="/path-to-pdf.pdf" download>
                {request.attachment}
              </a>
            </p>
          )}
        </div>
      </div>

      {/* Request Progress Section */}
      <div className={styles.requestProgress}>
        <h4>Updates on the Request</h4>

        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {/* Input Field at the Top of Timeline */}
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="secondary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className={styles.addUpdateTimeline}>
                <input
                  type="text"
                  placeholder="Add Update"
                  value={newUpdate}
                  onChange={(e) => setNewUpdate(e.target.value)}
                  className={styles.updateInput}
                />
                <button className={styles.sendButton} onClick={handleAddUpdate}>
                  Send
                </button>
              </div>
            </TimelineContent>
          </TimelineItem>

          {/* Existing Updates */}
          {updates.map((update, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                {index !== updates.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>{update}</TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  );
};

export default RequestDetails;
