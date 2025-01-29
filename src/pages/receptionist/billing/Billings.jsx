import React, { useEffect, useState } from "react";
import "./billings.scss";
import Searchbar from "../../../components/Searchbar";
import NotificationIcon from "../../../components/Notification";
import { Button, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Three-dot menu icon

import arrowBack from "../../../assets/arrow_back.svg"; // Import the SVG
import BillingModal from "./modal/BillingModal";

const dummyData = [
  {
    id: "C001231",
    name: "John Doe",
    phone: "9876543210",
    date: "11-12-2024",
    amount: "$250",
    status: "Paid",
  },
  {
    id: "C002123",
    name: "Jane Smith",
    phone: "8765432109",
    date: "11-10-2024",
    amount: "$400",
    status: "Unpaid",
  },
  {
    id: "C003302",
    name: "Aiditi",
    phone: "7654321098",
    date: "11-08-2024",
    amount: "$150",
    status: "Paid",
  },
  {
    id: "C004456",
    name: "Amit verma",
    phone: "6543210987",
    date: "21-01-2025",
    amount: "$1300",
    status: "Unpaid",
  },
  {
    id: "C005567",
    name: "Aditya Soni",
    phone: "5432109876",
    date: "11-01-2025",
    amount: "$1200",
    status: "Paid",
  },
];

const Billings = (props) => {
  const [selectedBill, setSelectedBill] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const handleViewClick = (bill) => {
    setSelectedBill(bill);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBill(null);
  };

  return (
    <div className="billings-container">
      <div className="header">
        <Searchbar />
        <NotificationIcon />
      </div>

      <div className="billings-header">
        <button className="back-btn">
          <img src={arrowBack} alt="Back" />
        </button>
        <h2>Billings</h2>
      </div>

      <div className="divider"></div>

      <div className="billings-table">
        <div className="table-header">
          <span>Case ID</span>
          <span>Name</span>
          <span>Phone Number</span>
          <span>Date</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {dummyData.map((item) => (
          <div className="table-row" key={item.id}>
            <span className="blue">{item.id}</span>
            <span className="blue">{item.name}</span>
            <span className="grey">{item.phone}</span>
            <span className="grey">{item.date}</span>
            <span className="grey"> {item.amount}</span>
            <span className={`status ${item.status.toLowerCase()}`}>
              {item.status}
            </span>
            <Button onClick={() => handleViewClick(item)} className="view-btn">
              View
            </Button>

            <IconButton className="menu-btn">
              <MoreVertIcon />
            </IconButton>
          </div>
        ))}
      </div>
      {/* Use the separate BillingModal Component */}
      <BillingModal
        open={openModal}
        bill={selectedBill}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Billings;
