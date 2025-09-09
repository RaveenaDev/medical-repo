import { useRef, useEffect } from "react";
import { X, Calendar, ChevronRight, Plus, Dot } from "lucide-react";
import "./EventDetails.scss";
import dayjs from "dayjs";
import Avatar from "@mui/material/Avatar";

const EventDetails = ({ event, onClose }) => {
  const dummyEvent = {
    title: "Meeting Title: Cardiology Follow-up Consultation",
    date: "April 4, 2025",
    startTime: dayjs().hour(22).minute(30), // 10:30 PM
    endTime: dayjs().hour(23).minute(0), // 11:00 PM
    participants: [
      {
        name: "Dr. Ayesha Mehta",
        role: "Cardiologist",
        profileUrl: "https://i.pravatar.cc/30?img=10",
      },
      {
        name: "Mr. Ramesh Kulkarni",
        role: "Patient",
        profileUrl: "https://i.pravatar.cc/30?img=11",
      },
      {
        name: "Priya Kulkarni",
        role: "Family Member",
        profileUrl: "https://i.pravatar.cc/30?img=12",
      },
    ],
    description:
      "Follow-up consultation to review the patient’s recent ECG and blood pressure reports. Discussion will include medication adjustments, lifestyle recommendations, and scheduling of the next in-person visit.",
    link: "https://teams.microsoft.com/l/meetup--_link%40thread.v2/",
    profileUrl: "https://i.pravatar.cc/80?img=4",
    name: "Ramesh Kulkarni",
  };

  // console.log("Event: ",event)

  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!event) return null;

  return (
    <div ref={panelRef} className="event-details-panel slide-in">
      <div className="top-bar">
        <button onClick={onClose} className="close-button">
          <X size={22} />
        </button>
      </div>
      <div className="event-header">
        <div className="event-details-header">
          <p className="event-details-title">Event Details</p>
        </div>
        <p className="event-title">Meeting Title: {event.title}</p>
        <div className="event-date-time">
          <span className="event-date">
            <Calendar size={13} />
            <p>{event.date},</p>
          </span>
          <span className="event-time">
            {event.allDay ? "All Day" : event.duration}
          </span>
        </div>
        <div className="event-buttons">
          <button className="start-meeting-button">
            <p>Start a Meeting</p>
            <ChevronRight size={15} />
          </button>
          <button className="edit-button">Edit</button>
        </div>
      </div>
      <div className="content">
        <div className="participants">
          <p>Participants:</p>
          <p className="add-participants">
            <Plus size={14} />
            <p className="add-participant-text">Add participant</p>
          </p>
        </div>
        <div className="participants-name">
          {event.participants.map((participant, index) => (
            <p key={index} className="participant-item">
              <span>
                <Dot className="participant-dot" size={14} />
              </span>
              <p>
                {participant.name} ({participant.role || "No role found"})
              </p>
            </p>
          ))}

          <div className="participants-row">
            {dummyEvent.participants.map((participant, index) => (
              <>
                {/* // <img
              //   key={index}
              //   src={participant.profileUrl}
              //   alt={`${participant.name}'s profile`}
              //   className="participant-avatar"
              // /> */}

                <Avatar
                  sx={{
                    bgcolor: "#e3e3e3",
                    color: "#25307F",
                    fontWeight: 500,
                  }}
                  className="patientAvatar"
                >
                  {participant?.name[0].toUpperCase() || ""}
                </Avatar>
              </>
            ))}
          </div>
        </div>
        <p className="description-header">Description</p>
        <p className="event-description">{event.note}</p>
        <p className="meeting-link-header">Meeting Link</p>
        <a
          href={dummyEvent.link}
          target="_blank"
          rel="noopener noreferrer"
          className="meeting-link"
        >
          {dummyEvent.link}
        </a>
      </div>
    </div>
  );
};

export default EventDetails;
