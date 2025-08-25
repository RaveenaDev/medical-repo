import { X } from "lucide-react";
import React, { useRef } from "react";
import styles from "./ViewBill.module.scss";
import { useReactToPrint } from "react-to-print";

const ViewBill = ({ record, onClose, estimatedBill }) => {
  const billRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: billRef,              // ✅ v3+ API
    documentTitle: "Estimated Bill",
    removeAfterPrint: true,
    pageStyle: `
      @page { size: A4; margin: 16mm; }
      @media print {
        .no-print { display: none !important; }
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    `,
  });

  const hasCategories = Boolean(estimatedBill?.categories?.length);

  return (
      <div>
        <div className={`${styles.crossContainer} no-print`}>
          <X size={20} onClick={onClose} />
        </div>

        <div className={styles.container}>
          <div className="no-print" style={{ display: "flex", justifyContent: "space-between" }}>
            <h1 className={styles.title}>Patient Estimated Bill</h1>
            <div className={styles.viewBill}>
              <button
                  className={styles.viewBillBtn}
                  onClick={() => {
                    if (!billRef.current) {
                      console.warn("Printable area not mounted yet.");
                      return;
                    }
                    handlePrint();
                  }}
              >
                Print
              </button>
            </div>
          </div>

          {/* 👇 This must be mounted and not display:none at click time */}
          <div ref={billRef} className={styles.table}>
            {/* header */}
            <div className={styles.tableHead}>
              <div><span>Description</span></div>
              <div><span>Ward</span></div>
              <div><span>Package</span></div>
              <div><span>Rate</span></div>
              <div><span>Unit</span></div>
              <div><span>Total</span></div>
            </div>

            {/* body */}
            {!hasCategories ? (
                <div className={styles.tableRow}>
                  <div style={{ gridColumn: "1 / -1", color: "#666", fontStyle: "italic" }}>
                    No data available.
                  </div>
                </div>
            ) : (
                estimatedBill.categories.map((cat, catIndex) => (
                    <div key={catIndex} className={styles.categoryBlock}>
                      <div className={styles.categoryHeader}>
                        <p className={styles.categoryName}>{cat.categoryName}</p>
                      </div>

                      {cat.items?.map((item, itemIndex) => (
                          <div key={itemIndex} className={styles.tableRow}>
                            <div><span>{item.description}</span></div>
                            <div><span>{item.ward}</span></div>
                            <div><span>{item.package}</span></div>
                            <div><span>{item.rate}</span></div>
                            <div><span>{item.unit}</span></div>
                            <div><span>{item.total}</span></div>
                          </div>
                      ))}

                      <div className={styles.subtotalRow}>
                        <div style={{ gridColumn: "1 / 6", textAlign: "left" }}>
                          <p>Subtotal:</p>
                        </div>
                        <div><p>{cat.subtotal}</p></div>
                      </div>
                    </div>
                ))
            )}

            {hasCategories && (
                <div className={styles.grandTotalRow}>
                  <div style={{ gridColumn: "1 / 6", textAlign: "left" }}>
                    <p>Grand Total:</p>
                  </div>
                  <div><p>{estimatedBill.grandTotal}</p></div>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default ViewBill;
