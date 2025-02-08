import React, { useState } from "react";
import "./Ongoing.scss";
import RequestDetails from "./RequestDeatils/RequestDetails";

const OngoingRequests = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const ongoingRequests = [
    {
      id: 1,
      name: "Dr. John",
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
      id: 2,
      text: "Dr. Shetty (Head of Cardiology) has requested on Friday, 27 Sept at 10:00 AM.",
      lastupdate: "Today",
      status: "Order has been shipped from Chennai on Saturday, 28 Sept.",
    },
    {
      id: 4,
      text: "Dr. Shetty (Head of Cardiology) has requested on Friday, 27 Sept at 10:00 AM.",
      lastupdate: "Today",
      status: "Order has been shipped from Chennai on Saturday, 28 Sept.",
    },
    {
      id: 5,
      text: "Dr. Shetty (Head of Cardiology) has requested on Friday, 27 Sept at 10:00 AM.",
      lastupdate: "Today",
      status: "Order has been shipped from Chennai on Saturday, 28 Sept.",
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
  ];

  if (selectedRequest) {
    return (
      <RequestDetails
        request={selectedRequest}
        onBack={() => setSelectedRequest(null)}
      />
    );
  }

  return (
    <div className="ongoingRequests">
      {ongoingRequests.map((req) => (
        <div key={req.id} className="requestCard">
          <img src={req.img ?? "/img.svg"} alt="request" />
          <div className="requestDetails">
            <p>{req.text}</p>
            <div>{req.status}</div>
          </div>
          <div className="progress">
            <button onClick={() => setSelectedRequest(req)}>
              Update Progress
            </button>
            <p>
              Last updated: <span>{req.lastupdate}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OngoingRequests;
