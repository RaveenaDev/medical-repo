import { useLocation } from "react-router-dom";
import styles from "./BillingDetails.module.scss";
import { ChevronLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getBillsByPatientId } from "../../../../../components/State/Doctor/Action";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
const BillingDetails = ({ onClose }) => {
  const location = useLocation();
  const patientId = location.state?.patientId;
  const patientName = location.state?.patientName;

  //console.log("Patient Id", patientId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state?.patientId) {
      dispatch(getBillsByPatientId(location.state.patientId));
    }
  }, [patientId, location.state, dispatch]);

  const patientBills = useSelector((state) => state.doctor.patientBills || []);
  const loading = useSelector((state) => state.doctor.isLoadingPatientBills);
  // console.log("Patient Bills", patientBills);
  const latestBill =
    Array.isArray(patientBills) && patientBills.length >= 1
      ? patientBills[patientBills.length - 1]
      : {};
  // console.log("Latest Patient Bills", latestBill);
  const {
    invoiceNumber,
    invoiceDate,
    patient,
    services,
    totalAmount,
    outstanding,
    paidAmount,
    status,
    mode,
  } = latestBill;

  // Defensive: always use arrays for services and categories
  const safeServices = Array.isArray(services) ? services : [];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <ChevronLeft className={styles.backBtn} onClick={onClose} />
        <p>
          Billing Details: <span>{patientName || "N/A"}</span>
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
            <button>
              <img src="/assets/printWhite.svg" alt="" />
              Print Bill
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingDetails;
