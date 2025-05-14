import React, { useState } from "react";
import "./NewRequests.scss";

export default function NewRequests() {
  const [expanded, setExpanded] = useState(null); // Track which request is expanded

  const requests = [
    {
      id: 1,
      text: "Dr. Shetty (Head of Cardiology) has requested on Friday, 27 Sept at 10:00 AM.",
      img: "/img.svg",
      medicines: [
        "Paracetamol 500mg tablets (1000 units)",
        "Ibuprofen 400mg tablets (500 units)",
      ],
      attachment: "Medication list.pdf",
    },
    {
      id: 2,
      text: "Dr. Shetty (Head of Cardiology) has requested on Friday, 27 Sept at 10:00 AM.",
      medicines: [],
    },
    {
      id: 3,
      name: "Dr. Shrama",
      department: "Head of General Medicine",
      date: "Friday, 27 Sept at 100:00 AM",
      request: "Request for Medicine",
      text: "Dr. Shetty (Head of Cardiology) has requested on Friday, 27 Sept at 10:00 AM.",
      status: "Order has been shipped from Chennai on Saturday, 28 Sept.",
      img: "/img.svg",
      medicines: [
        "Paracetamol 500mg tablets (1000 units)",
        "Ibuprofen 400mg tablets (500 units)",
      ],
      attachment: "Medication list.pdf",
      lastupdate: "Yesterday",
    },
    {
      id: 4,
      name: "Dr. Shrama",
      department: "Head of General Medicine",
      date: "Friday, 27 Sept at 100:00 AM",
      request: "Request for Medicine",
      text: "Dr. Shetty (Head of Cardiology) has requested on Friday, 27 Sept at 10:00 AM.",
      status: "Order has been shipped from Chennai on Saturday, 28 Sept.",
      img: "/img.svg",
      medicines: [
        "Paracetamol 500mg tablets (1000 units)",
        "Ibuprofen 400mg tablets (500 units)",
      ],
      attachment: "Medication list.pdf",
      lastupdate: "Yesterday",
    },
    {
      id: 5,
      name: "Dr. Shrama",
      department: "Head of General Medicine",
      date: "Friday, 27 Sept at 100:00 AM",
      request: "Request for Medicine",
      text: "Dr. Shetty (Head of Cardiology) has requested on Friday, 27 Sept at 10:00 AM.",
      status: "Order has been shipped from Chennai on Saturday, 28 Sept.",
      img: "/img.svg",
      medicines: [
        "Paracetamol 500mg tablets (1000 units)",
        "Ibuprofen 400mg tablets (500 units)",
      ],
      attachment: "Medication list.pdf",
      lastupdate: "Yesterday",
    },
  ];

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="newRequests">
      {requests.map((req) => (
        <div key={req.id} className="requestCard">
          <img src={req.img ?? "/img.svg"} alt="request" />
          <div className="requestDetails">
            <p>{req.text}</p>
            <div className="details">
              <div className="request">
                <div
                  className="medicineReq"
                  onClick={() => toggleExpand(req.id)}
                >
                  <p>Request for Medicines</p>
                  <svg
                    width="31"
                    height="30"
                    viewBox="0 0 31 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d={
                        expanded === req.id
                          ? "M27.7278 20L15.1416 7.5L2.5553 20L4.78936 22.2187L15.1416 11.9375L25.4938 22.2187L27.7278 20Z"
                          : "M27.7278 10L15.1416 22.5L2.5553 10L4.78936 7.78125L15.1416 18.0625L25.4938 7.78125L27.7278 10Z"
                      }
                      fill="black"
                    />
                  </svg>
                </div>
                {expanded === req.id && (
                  <div className="medicineDetails">
                    <p>
                      <span>Request:</span> Please order the following
                      medications
                    </p>
                    <ul>
                      {req.medicines.length > 0 ? (
                        req.medicines.map((med, index) => (
                          <li key={index}>{med}</li>
                        ))
                      ) : (
                        <li>No medications specified</li>
                      )}
                    </ul>
                    {req.attachment && (
                      <p>
                        <span>Attachments: </span>
                        <a href="/path-to-pdf.pdf" download>
                          {req.attachment}
                        </a>
                      </p>
                    )}
                  </div>
                )}
              </div>
              <div className="response">
                <input
                  type="text"
                  placeholder="Enter your response"
                  className="border p-2 rounded w-full my-2"
                />
                <div className="buttons">
                  <button className="accept">Accept</button>
                  <button className="remind">Remind me later</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
