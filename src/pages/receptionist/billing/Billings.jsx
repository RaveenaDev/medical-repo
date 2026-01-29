import React, { useCallback, useEffect, useState } from "react";
import styles from "./billingsReception.module.scss"; // updated import
import {
  Box,
  Button,
  CircularProgress,
  TablePagination,
  useMediaQuery,
} from "@mui/material";

import arrowBack from "../../../assets/arrow_back.svg";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBills } from "../../../components/State/Receptionist/Action.js";
import { Search } from "lucide-react";
import useDebounce from "../../../hooks/useDebounce.js";

const Billings = (props) => {
  const [selectedBill, setSelectedBill] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
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

  // const handleViewClick = (bill) => {
  //   setSelectedBill(bill);
  //   setOpenModal(true);
  // };

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
    dispatch(getBills(page, rowsPerPage, debouncedSearch));
  }, [dispatch, page, rowsPerPage, debouncedSearch]);

  const allBills = useSelector((store) => store.receptionist.allBills);
  const billsCount = useSelector((store) => store.receptionist.allBillsCount);
  const isLoadingAllBills = useSelector(
    (store) => store.receptionist.isLoadingAllBills,
  );
  const handleViewClick = useCallback(
    (billId) => {
      // dispatch(getBillDetails(billId));
      navigate(`${billId}`);
    },
    [dispatch, navigate],
  );
  // console.log("allBills", allBills);
  const [expandedBillId, setExpandedBillId] = useState(null);

  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <div className={styles["billingsReception-container"]}>
      <div
        style={{
          position: "fixed",
          top: "0px",
          padding: "15px 10px 0 0",
          width: isMobile ? "90%" : "75%",
          background: " #F1F1F1",
          zIndex: 100,
        }}
      >
        <div className={styles["billings-header"]}>
          <div className={styles["title-wrapper"]}>
            <button
              onClick={() => handleClose()}
              className={styles["back-btn"]}
            >
              <img src={arrowBack} alt="Back" />
            </button>
            <h2>Bills</h2>
          </div>
          <div className={styles["search-wrapper"]}>
            <Search size={18} className={styles["search-icon"]} />
            <input
              type="text"
              placeholder="Search bills..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(0);
              }}
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
        {!isMobile && (
          <div className={styles["table-header"]}>
            <span>Case ID</span>
            <span>Name</span>
            <span>Phone Number</span>
            <span>Date</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
        )}

        {isLoadingAllBills ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "65vh", // or full height you need
            }}
          >
            <CircularProgress sx={{ color: "#25307F" }} size={55} />
          </Box>
        ) : (
          <>
            <div style={{ paddingBottom: "2rem" }}>
              {!isMobile ? (
                /* ================= DESKTOP TABLE ================= */
                allBills.length > 0 ? (
                  allBills.map((item) => (
                    <div className={styles["table-row"]} key={item._id}>
                      <span className={styles["blue"]}>{item.caseId}</span>
                      <span className={styles["blue"]}>
                        {item.patient.name}
                      </span>
                      <span className={styles["grey"]}>
                        {item.patient.phone}
                      </span>
                      <span className={styles["grey"]}>
                        {new Date(item.updatedAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                      <span className={styles["grey"]}>
                        ₹{item.totalAmount.toLocaleString("en-IN")}
                      </span>
                      <span
                        className={`${styles["status"]} ${
                          styles[item.status.toLowerCase()]
                        }`}
                      >
                        {item.status}
                      </span>
                      <Button
                        onClick={() => handleViewClick(item._id)}
                        className={styles["view-btn"]}
                      >
                        View
                      </Button>
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
                )
              ) : /* ================= MOBILE CARDS ================= */
              allBills.length > 0 ? (
                allBills.map((item) => {
                  const isOpen = expandedBillId === item._id;

                  return (
                    <div
                      key={item._id}
                      className={`${styles["bill-card"]} ${
                        isOpen ? styles["open"] : ""
                      }`}
                    >
                      {/* COLLAPSED HEADER */}
                      <div
                        className={styles["bill-card-header"]}
                        onClick={() =>
                          setExpandedBillId(isOpen ? null : item._id)
                        }
                      >
                        <div className={styles["bill-main"]}>
                          <div className={styles["bill-name"]}>
                            {item.patient.name}
                          </div>
                          <div className={styles["bill-amount"]}>
                            ₹{item.totalAmount.toLocaleString("en-IN")}
                          </div>
                        </div>

                        <div
                          className={`${styles["status"]} ${
                            styles[item.status.toLowerCase()]
                          }`}
                        >
                          {item.status}
                        </div>
                      </div>

                      {/* EXPANDED DETAILS */}
                      {isOpen && (
                        <div className={styles["bill-card-details"]}>
                          <div>
                            <span>Case ID</span>
                            <span>{item.caseId}</span>
                          </div>

                          <div>
                            <span>Phone</span>
                            <span>{item.patient.phone}</span>
                          </div>

                          <div>
                            <span>Date</span>
                            <span>
                              {new Date(item.updatedAt).toLocaleDateString(
                                "en-IN",
                              )}
                            </span>
                          </div>

                          <Button
                            onClick={() => handleViewClick(item._id)}
                            className={styles["view-btn"]}
                          >
                            View Bill
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className={styles["no-records"]}>No Bills found!</div>
              )}
            </div>

            {!isMobile ? (
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
                  count={billsCount ?? 0}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[2, 5, 10, 20, 50, 100]}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  position: "fixed",
                  bottom: 60, // height of BottomNavigation
                  left: 0,
                  right: 0,
                  backgroundColor: "#fff",
                  borderTop: "1px solid #ddd",
                  zIndex: 1200,
                }}
              >
                <TablePagination
                  component="div"
                  count={billsCount ?? 0}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[]} //  removes rows-per-page
                  labelRowsPerPage="" //  removes label space
                  onRowsPerPageChange={() => {}}
                />
              </Box>
            )}
          </>
        )}
      </div>
      {/* <BillingModal
        open={openModal}
        bill={selectedBill}
        onClose={handleCloseModal}
        billId={selectedBill?._id}
      /> */}
    </div>
  );
};

export default Billings;
