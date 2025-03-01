import React, { useEffect, useState } from "react";
import "./billings.scss";
import Searchbar from "../../../components/Searchbar";
import NotificationIcon from "../../../components/Notification";
import { Button, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Three-dot menu icon

import arrowBack from "../../../assets/arrow_back.svg"; // Import the SVG
import BillingModal from "./modal/BillingModal";
import { useNavigate } from "react-router-dom";
import Notifications from "../../../components/NotificationFunc/Notification";
import { useDispatch, useSelector } from "react-redux";
import { getBills } from "../../../components/State/Receptionist/Action.js";

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
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/receptionist");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBills());
  }, [dispatch]);

  const allBills = useSelector((store) => store.receptionist.allBills);

  return (
    <div className="billings-container">
      <div className="header">
        <Searchbar />
        <Notifications />
      </div>

      <div className="billings-header">
        <button onClick={() => handleClose()} className="back-btn">
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

        {allBills.map((item) => (
          <div className="table-row" key={item._id}>
            <span className="blue">{item.caseId}</span>
            <span className="blue">{item.patient.name}</span>
            <span className="grey">{item.patient.phone}</span>
            <span className="grey">
              {new Date(item.updatedAt).toLocaleDateString()}
            </span>
            <span className="grey"> {item.totalAmount}</span>
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
