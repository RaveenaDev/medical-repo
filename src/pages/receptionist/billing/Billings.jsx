import React, { useEffect, useState } from "react";
import "./billings.scss";
import Searchbar from "../../../components/Searchbar";
import NotificationIcon from "../../../components/Notification";
import { Box, Button, IconButton, TablePagination } from "@mui/material";
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

  const [page, setPage] = useState(0); // page number
  const [rowsPerPage, setRowsPerPage] = useState(10); // You can change this default
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

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
    dispatch(getBills(page, rowsPerPage));
  }, [dispatch, page, rowsPerPage]);

  const allBills = useSelector((store) => store.receptionist.allBills);
  const billsCount = useSelector((store) => store.receptionist.allBillsCount);
  return (
    <div className="billings-container">
      <div
        style={{
          position: "fixed",
          top: "0px",
          padding: "20px 10px 0 0",
          width: "75%",
          background: " #F1F1F1",
          zIndex: 100,
        }}
      >
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
      </div>
      <div className="billings-table" style={{ position: "relative" }}>
        <div className="table-header">
          <span>Case ID</span>
          <span>Name</span>
          <span>Phone Number</span>
          <span>Date</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        <div style={{ paddingBottom: "2rem" }}>
          {allBills.length > 0 ? (
            allBills.map((item) => (
              <div className="table-row" key={item._id}>
                <span className="blue">{item.caseId}</span>
                <span className="blue">{item.patient.name}</span>
                <span className="grey">{item.patient.phone}</span>
                <span className="grey">
                  {new Date(item.updatedAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
                <span className="grey"> {item.totalAmount}</span>
                <span className={`status ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
                <Button
                  onClick={() => handleViewClick(item)}
                  className="view-btn"
                >
                  View
                </Button>

                <IconButton
                  disableRipple
                  className="menu-btn"
                  sx={{
                    height: "42px",
                    width: "42px",
                    "&:focus": {
                      outline: "none",
                      boxShadow: "none",
                    },
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
              </div>
            ))
          ) : (
            <div
              className="table-row blue"
              style={{
                gridTemplateColumns: "1fr",
                textAlign: "center",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              No Bills found!
            </div>
          )}
        </div>
        <Box
          sx={{
            width: "100%",

            position: "sticky",
            bottom: 0,
            backgroundColor: "#fff",
            borderTop: "2px solid #ddd",
            zIndex: 11,
          }}
        >
          <TablePagination
            component="div"
            count={billsCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[2, 5, 10, 20, 50, 100]}
            sx={{}}
          />
        </Box>
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
