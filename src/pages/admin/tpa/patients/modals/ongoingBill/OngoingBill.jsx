import { X } from "lucide-react";
import React, { useEffect } from "react";
import styles from "./ViewBill.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getBillDetails } from "../../../../../../components/State/Admin/Action";

/* -------- helper: group services by category -------- */
const groupByCategory = (services = []) => {
  const map = {};

  services.forEach((s) => {
    if (!map[s.category]) {
      map[s.category] = {
        categoryName: s.category,
        items: [],
        subtotal: 0,
      };
    }

    map[s.category].items.push({
      name: s.service,
      type: s.details?.doctorName || "—",
      date: s.details?.visitDate || "",
      quantity: s.quantity,
      price: s.total,
    });

    map[s.category].subtotal += s.total;
  });

  return Object.values(map);
};

const ViewBill = ({ record, onClose }) => {
  const dispatch = useDispatch();

  // console.log("Bill details:", record);
  const billId = record?.latestLiveBillId;
  if (!billId) {
    return (
      <div>
        <div className={styles.crossContainer}>
          <X size={20} onClick={onClose} />
        </div>

        <div className={styles.container}>
          <h1 className={styles.title}>Patient Bill</h1>

          <div className={styles.emptyContent}>
            <p>No ongoing bill available for this patient.</p>
          </div>
        </div>
      </div>
    );
  }
  useEffect(() => {
    if (billId) dispatch(getBillDetails(billId));
  }, [dispatch, billId]);

  const bill = useSelector((s) => s.admin?.billingRecord);
  if (!bill) return null;

  const categories = groupByCategory(bill.services);

  return (
    <div>
      {/* Close */}
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>

      <div className={styles.container}>
        <h1 className={styles.title}>Patient Bill</h1>

        {/* Header info (simple like screenshot) */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <p>
              <strong>Patient Name</strong>
            </p>
            <p>{bill.patient?.name}</p>

            <p>
              <strong>Invoice Number</strong>
            </p>
            <p>{bill.invoiceNumber}</p>
          </div>

          <div>
            <p>
              <strong>Patient Number</strong>
            </p>
            <p>{bill.patient?.phone}</p>

            <p>
              <strong>Invoice Date</strong>
            </p>
            <p>{new Date(bill.invoiceDate).toLocaleDateString("en-GB")}</p>
          </div>
        </div>

        {/* TABLE */}
        <div className={styles.table}>
          {/* Table Head (7 columns – matches your grid) */}
          <div className={styles.tableHead}>
            <div>Category</div>
            <div>Type</div>
            <div>Name</div>
            <div>Date</div>
            <div>Quantity</div>
            <div></div>
            <div>Price</div>
          </div>

          {categories.map((cat, idx) => (
            <div key={idx}>
              {/* Category Header */}
              <div className={styles.categoryHeader}>
                <p className={styles.categoryName}>{cat.categoryName}</p>
              </div>

              {/* Rows */}
              {cat.items.map((item, i) => (
                <div key={i} className={styles.tableRow}>
                  <div>{cat.categoryName}</div>
                  <div>{item.name}</div>
                  <div>{item.type}</div>
                  <div>
                    {item.date
                      ? new Date(item.date).toLocaleDateString("en-GB")
                      : "—"}
                  </div>
                  <div>{item.quantity}</div>
                  <div></div>
                  <div>₹{item.price.toLocaleString("en-IN")}</div>
                </div>
              ))}

              {/* Subtotal */}
              <div className={styles.subtotalRow}>
                <div style={{ marginLeft: "auto" }}>Total</div>
                <div>₹{cat.subtotal.toLocaleString("en-IN")}</div>
              </div>
            </div>
          ))}

          {/* Grand Total */}
          <div className={styles.grandTotalRow}>
            <div style={{ marginLeft: "auto" }}>Total</div>
            <div>₹{bill.totalAmount.toLocaleString("en-IN")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBill;
