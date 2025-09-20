import React, { useEffect, useRef } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import "./RecordModal.scss";
import arrowBack from "/arrow_back.svg";
import { useDispatch, useSelector } from "react-redux";
import { getBillsByPatientId } from "../../../../../../components/State/Receptionist/Action.js"; // Import the SVG as a React component
import printJS from "print-js"; // Import print-js
import { ChevronLeft } from "lucide-react";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./RecordsModal.module.scss";
const RecordModal = ({ open, onClose, patient }) => {
  //  console.log("Patient ", patient);

  const dispatch = useDispatch();

  useEffect(() => {
    if (patient?._id) {
      dispatch(getBillsByPatientId(patient._id));
    }
  }, [patient?._id, dispatch]);

  const patientBills = useSelector(
    (state) => state.receptionist.patientBills || []
  );
  //  console.log("Patient Bills", patientBills);

  const loading = useSelector(
    (state) => state.receptionist.isLoadingPatientBills
  );
  const latestBill =
    Array.isArray(patientBills) && patientBills.length >= 1
      ? patientBills[patientBills.length - 1]
      : {};

  //  console.log("Latest Patient Bills", latestBill);

  useEffect(() => {
    // Disable scrolling on the body when the modal is open
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Clean up when the component is unmounted or modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  //  const billId = patient?.bills[patient.bills.length - 1]?._id;
  // console.log("Bill :",billId)

  const printRef = useRef(); // Reference for print container

  // useEffect(() => {
  //   if (billId) {
  //     dispatch(getBillById(billId));
  //   }
  // }, [dispatch, billId]);

  //  const billByID = useSelector((store) => store.receptionist.bill);

  //if (!bill) return null; // Avoid rendering if no bill is selected
  const handlePrint = () => {
    printJS({
      printable: "printable-bill",
      type: "html",
      scanStyles: false, // Prevents unwanted styles from affecting the print
      style: `
        body { font-family: Arial, sans-serif; font-size: 14px; margin: 0; padding: 20px; }
        .print-container { padding: 20px; border: 1px solid #ccc; width: 100%; max-width: 600px; margin: auto; }
        h2 { text-align: center; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid black; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .total { font-weight: bold; }
      `,
    });
  };

  const {
    invoiceNumber,
    invoiceDate,
    services,
    totalAmount,
    outstanding,
    paidAmount,
    status,
    mode,
  } = latestBill;

  const safeServices = Array.isArray(services) ? services : [];

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <ChevronLeft className={styles.backBtn} onClick={onClose} />
          <p>
            Billing Details: <span>{patient?.name || "N/A"}</span>
          </p>
        </header>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "36vh", // or full height you need
            }}
          >
            <CircularProgress sx={{ color: "#25307F" }} size={58} />
          </Box>
        ) : patientBills.length === 0 ? (
          <div className={styles.noBill}>
            <p>No Bill Found</p>
          </div>
        ) : (
          <div>
            {/* Section 1 */}
            <div className={styles.section1}>
              <div className={styles.s1row1}>
                <div className={styles.s1row1Child}>
                  <p className={styles.label}>Invoice Number</p>
                  <p className={styles.value}>{invoiceNumber || "N/A"}</p>
                </div>
                <div className={styles.s1row1Child}>
                  <p className={styles.label}>Invoice Date</p>
                  <p className={styles.value}>
                    {invoiceDate
                      ? new Date(invoiceDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className={styles.s1row2}>
                <div className={styles.s1row2Child}>
                  <p className={styles.label}>Description</p>
                  {safeServices.length > 0 ? (
                    safeServices.map((service, index) => (
                      <div key={index}>
                        {(Array.isArray(service.categories)
                          ? service.categories
                          : []
                        ).map((category, idx) => (
                          <p key={idx} className={styles.value}>
                            {category.subCategoryName || "N/A"}
                          </p>
                        ))}
                      </div>
                    ))
                  ) : (
                    <p className={styles.value}>N/A</p>
                  )}
                </div>
                <div className={styles.s1row2Child}>
                  <p className={`${styles.label2} `}>Quantity</p>
                  {safeServices.length > 0 ? (
                    safeServices.map((service, index) => (
                      <div key={index}>
                        {(Array.isArray(service.categories)
                          ? service.categories
                          : []
                        ).map((category, idx) => (
                          <p key={idx} className={styles.value2}>
                            {category.quantity || "N/A"}
                          </p>
                        ))}
                      </div>
                    ))
                  ) : (
                    <p className={styles.value2}>N/A</p>
                  )}
                </div>
                <div className={styles.s1row2Child}>
                  <p className={`${styles.label2} `}>Price</p>
                  {safeServices.length > 0 ? (
                    safeServices.map((service, index) => (
                      <div key={index}>
                        {(Array.isArray(service.categories)
                          ? service.categories
                          : []
                        ).map((category, idx) => (
                          <p key={idx} className={styles.value2}>
                            ₹{category.total || "N/A"}
                          </p>
                        ))}
                      </div>
                    ))
                  ) : (
                    <p className={styles.value2}>N/A</p>
                  )}
                </div>
              </div>

              <div className={styles.s1row3}>
                <div className={styles.s1row3Child}>
                  <p className={styles.label}>Total</p>
                </div>
                <div className={styles.s1row3Child}>
                  <p className={styles.label}>₹{totalAmount || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className={styles.section2}>
              {" "}
              <div className={styles.s2row1}>
                <div className={styles.s2row1Child}>
                  <p className={styles.label}>Total Amount</p>
                  <p className={styles.value}>₹{totalAmount || "N/A"}</p>
                </div>
                <div className={styles.s2row1Child}>
                  {" "}
                  <p className={`${styles.label2} `}>Paid</p>
                  <p className={`${styles.value2}`}>
                    ₹
                    {paidAmount !== undefined && paidAmount !== null
                      ? paidAmount
                      : "N/A"}
                  </p>
                </div>
                <div className={styles.s2row1Child}>
                  {" "}
                  <p className={`${styles.label2} `}>Outstanding</p>
                  <p className={`${styles.value2}`}>
                    ₹
                    {outstanding !== undefined && outstanding !== null
                      ? outstanding
                      : "N/A"}
                  </p>
                </div>{" "}
                <div className={styles.s2row1Child}>
                  {" "}
                  <p className={`${styles.label2} `}>Status</p>
                  <p
                    className={`${styles.status} ${
                      status === "Paid"
                        ? styles.paid
                        : status === "Pending"
                        ? styles.pending
                        : styles.unknown
                    }`}
                  >
                    {status || "N/A"}
                  </p>
                </div>
              </div>
              <div className={styles.s2row2}>
                <div className={styles.s2row2Child}>
                  <p className={styles.label}>Payment History</p>
                </div>
                <div className={styles.s2row2Child}>
                  <p className={styles.value}>
                    Amount Paid: ₹{" "}
                    {paidAmount !== undefined && paidAmount !== null
                      ? paidAmount
                      : "N/A"}
                  </p>
                  <p className={styles.value}>Mode: {mode || "N/A"}</p>
                  <p className={styles.value}>
                    Date:{" "}
                    {invoiceDate
                      ? new Date(invoiceDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Container */}
            <div className={styles.submitContainer}>
              <button onClick={handlePrint}>
                <img src="/assets/printWhite.svg" alt="" />
                Print Bill
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RecordModal;
