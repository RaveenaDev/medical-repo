import React, { useState } from "react";
import "./pastRequests.scss";

const PastRequests = () => {
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
      complete:
        "Request for Medicines by Dr. Shetty (Head of Cardiology) on Friday, 27 Sept at 10:00 AM has been completed on Friday, 29 Sept.",
    },
    {
      id: 2,
      text: "Dr. Shetty (Head of Cardiology) has requested on Friday, 27 Sept at 10:00 AM.",
      lastupdate: "Today",
      complete:
        "Request for Medicines by Dr. Shetty (Head of Cardiology) on Friday, 27 Sept at 10:00 AM has been completed on Friday, 29 Sept.",
      status: "Order has been shipped from Chennai on Saturday, 28 Sept.",
    },
    {
      id: 3,
      text: "Dr. Shetty (Head of Cardiology) has requested on Friday, 27 Sept at 10:00 AM.",
      lastupdate: "Today",
      complete:
        "Request for Medicines by Dr. Shetty (Head of Cardiology) on Friday, 27 Sept at 10:00 AM has been completed on Friday, 29 Sept.",
      status: "Order has been shipped from Chennai on Saturday, 28 Sept.",
    },
    {
      id: 4,
      text: "Dr. Shetty (Head of Cardiology) has requested on Friday, 27 Sept at 10:00 AM.",
      lastupdate: "Today",
      complete:
        "Request for Medicines by Dr. Shetty (Head of Cardiology) on Friday, 27 Sept at 10:00 AM has been completed on Friday, 29 Sept.",
      status: "Order has been shipped from Chennai on Saturday, 28 Sept.",
    },
    {
      id: 5,
      text: "Dr. Shetty (Head of Cardiology) has requested on Friday, 27 Sept at 10:00 AM.",
      lastupdate: "Today",
      complete:
        "Request for Medicines by Dr. Shetty (Head of Cardiology) on Friday, 27 Sept at 10:00 AM has been completed on Friday, 29 Sept.",
      status: "Order has been shipped from Chennai on Saturday, 28 Sept.",
    },
    {
      id: 6,
      text: "Dr. Shetty (Head of Cardiology) has requested on Friday, 27 Sept at 10:00 AM.",
      lastupdate: "Today",
      complete:
        "Request for Medicines by Dr. Shetty (Head of Cardiology) on Friday, 27 Sept at 10:00 AM has been completed on Friday, 29 Sept.",
      status: "Order has been shipped from Chennai on Saturday, 28 Sept.",
    },
    {
      id: 7,
      text: "Dr. Shetty (Head of Cardiology) has requested on Friday, 27 Sept at 10:00 AM.",
      lastupdate: "Today",
      complete:
        "Request for Medicines by Dr. Shetty (Head of Cardiology) on Friday, 27 Sept at 10:00 AM has been completed on Friday, 29 Sept.",
      status: "Order has been shipped from Chennai on Saturday, 28 Sept.",
    },
  ];

  return (
    <div className="ongoingRequests">
      {ongoingRequests.map((req) => (
        <div key={req.id} className="requestCard">
          <img src={req.img ?? "/img.svg"} alt="request" />
          <div className="requestDetails">{req.complete}</div>
          <div className="progress">
            <button onClick={() => setSelectedRequest(req)}>
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PastRequests;
