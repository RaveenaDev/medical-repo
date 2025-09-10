import React, { useEffect, useState } from "react";
import styles from "./billingsReception.module.scss"; // updated import
import Searchbar from "../../../components/Searchbar";
import NotificationIcon from "../../../components/Notification";
import { Box, Button, IconButton, TablePagination } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import arrowBack from "../../../assets/arrow_back.svg";
import BillingModal from "./modal/BillingModal";
import { useNavigate } from "react-router-dom";
import Notifications from "../../../components/NotificationFunc/Notification";
import { useDispatch, useSelector } from "react-redux";
import { getBills } from "../../../components/State/Receptionist/Action.js";
import { Search } from "lucide-react";

const Billings = (props) => {
  const [selectedBill, setSelectedBill] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
    <div className={styles["billingsReception-container"]}>
      <div
        style={{
          position: "fixed",
          top: "0px",
          padding: "15px 10px 0 0",
          width: "75%",
          background: " #F1F1F1",
          zIndex: 100,
        }}
      >
        <div className={styles["header-Reception"]}>
          {/* <Searchbar /> */}
          <Notifications />
        </div>

        <div className={styles["billings-header"]}>
          <button onClick={() => handleClose()} className={styles["back-btn"]}>
            <img src={arrowBack} alt="Back" />
          </button>
          <h2>Billings</h2>

          <div className={styles["search-wrapper"]}>
            <Search size={18} className={styles["search-icon"]} />
            <input
              type="text"
              placeholder="Search bills..."
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              className={styles["search-input"]}
            />
          </div>
        </div>

        <div className={styles["divider"]}></div>
      </div>

      <div
        className={styles["billings-table"]}
        style={{ position: "relative" }}
      >
        <div className={styles["table-header"]}>
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
              <div className={styles["table-row"]} key={item._id}>
                <span className={styles["blue"]}>{item.caseId}</span>
                <span className={styles["blue"]}>{item.patient.name}</span>
                <span className={styles["grey"]}>{item.patient.phone}</span>
                <span className={styles["grey"]}>
                  {new Date(item.updatedAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
                <span className={styles["grey"]}> {item.totalAmount}</span>
                <span
                  className={`${styles["status"]} ${
                    styles[item.status.toLowerCase()]
                  }`}
                >
                  {item.status}
                </span>
                <Button
                  onClick={() => handleViewClick(item)}
                  className={styles["view-btn"]}
                >
                  View
                </Button>

                <IconButton
                  disableRipple
                  className={styles["menu-btn"]}
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
              className={`${styles["table-row"]} ${styles["blue"]}`}
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
          />
        </Box>
      </div>

      <BillingModal
        open={openModal}
        bill={selectedBill}
        onClose={handleCloseModal}
        billId={selectedBill?._id}
      />
    </div>
  );
};

export default Billings;
