import { X } from "lucide-react";
import React, { useRef } from "react";
import styles from "./ViewBill.module.scss";
import { useReactToPrint } from "react-to-print";

const ViewBill = ({ record, onClose, estimatedBill }) => {
  const billRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: billRef,
    documentTitle: "Estimated Bill",
    removeAfterPrint: true,
    pageStyle: `
        @page { 
          size: A4; 
          margin: 15mm; 
        }
        
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          .no-print { 
            display: none !important; 
          }
          
          .print-only {
            display: block !important;
          }
        }
      `,
  });

  const hasCategories = Boolean(estimatedBill?.categories?.length);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div>
      <div className={`${styles.crossContainer} no-print`}>
        <X size={20} onClick={onClose} />
      </div>

      <div className={styles.container}>
        <div
          className="no-print"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
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

        {/* SCREEN VERSION - Original UI (unchanged) */}
        <div className={`${styles.table} no-print`}>
          <div className={styles.tableHead}>
            <div>
              <span>Description</span>
            </div>
            <div>
              <span>Ward</span>
            </div>
            <div>
              <span>Package</span>
            </div>
            <div>
              <span>Rate</span>
            </div>
            <div>
              <span>Date</span>
            </div>
            <div>
              <span>Unit</span>
            </div>
            <div>
              <span>Total</span>
            </div>
          </div>

          {!hasCategories ? (
            <div className={styles.tableRow}>
              <div
                style={{
                  gridColumn: "1 / -1",
                  color: "#666",
                  fontStyle: "italic",
                }}
              >
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
                    <div>
                      <span>{item.description}</span>
                    </div>
                    <div>
                      <span>{item.ward}</span>
                    </div>
                    <div>
                      <span>{item.package}</span>
                    </div>
                    <div>
                      <span>{item.rate}</span>
                    </div>
                    <div>
                      <span>
                        {" "}
                        {item.date
                          ? new Date(item.date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "N/A"}
                      </span>
                    </div>
                    <div>
                      <span>{item.unit}</span>
                    </div>
                    <div>
                      <span>{item.total}</span>
                    </div>
                  </div>
                ))}

                <div className={styles.subtotalRow}>
                  <div style={{ gridColumn: "1 / 6", textAlign: "left" }}>
                    <p>Subtotal:</p>
                  </div>
                  <div>
                    <p>{cat.subtotal}</p>
                  </div>
                </div>
              </div>
            ))
          )}

          {hasCategories && (
            <div className={styles.grandTotalRow}>
              <div style={{ gridColumn: "1 / 6", textAlign: "left" }}>
                <p>Grand Total:</p>
              </div>
              <div>
                <p>{estimatedBill.grandTotal}</p>
              </div>
            </div>
          )}
        </div>

        {/* PRINT VERSION - Refined Professional Layout */}
        <div ref={billRef} className="print-only" style={{ display: "none" }}>
          <style>{`
              .print-bill-container {
                font-family: 'Arial', sans-serif;
                color: #000;
                background: #fff;
                padding: 15px;
                margin: 0;
                font-size: 8.5pt;
                line-height: 1.5;
              }

              .bill-header {
                text-align: center;
                border-bottom: 1.5px solid #000;
                padding-bottom: 12px;
                margin-bottom: 20px;
              }

              .hospital-info {
                margin-bottom: 8px;
              }

              .hospital-info h1 {
                margin: 0;
                font-size: 20pt;
                font-weight: bold;
                text-transform: uppercase;
              }

              .hospital-info p {
                margin: 2px 0;
                font-size: 8pt;
                color: #333;
              }

              .bill-title {
                font-size: 14pt;
                font-weight: bold;
                margin: 8px 0 4px;
              }

              .bill-subtitle {
                font-size: 10pt;
                color: #555;
                margin: 0;
              }

              .bill-date {
                font-size: 8pt;
                color: #333;
                margin-top: 6px;
              }

              .bill-info-section {
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
                gap: 15px;
              }

              .bill-info-block {
                flex: 1;
              }

              .bill-info-block h3 {
                margin: 0 0 6px 0;
                font-size: 10pt;
                font-weight: bold;
                text-transform: uppercase;
                border-bottom: 1px solid #000;
                padding-bottom: 3px;
              }

              .bill-info-block p {
                margin: 4px 0;
                font-size: 8.5pt;
              }

              .bill-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
                border: 1px solid #000;
              }

              .bill-table thead {
                border-bottom: 1.5px solid #000;
              }

              .bill-table th {
                padding: 6px 8px;
                text-align: left;
                font-size: 9pt;
                font-weight: bold;
                border-right: 1px solid #000;
              }

              .bill-table th:last-child,
              .bill-table td:last-child {
                text-align: right;
                border-right: none;
              }

              .bill-table th:nth-child(4),
              .bill-table td:nth-child(4),
              .bill-table th:nth-child(6),
              .bill-table td:nth-child(6) {
                text-align: center;
              }

              .category-header-row td {
                padding: 6px 8px;
                font-weight: bold;
                font-size: 9.5pt;
                border-top: 1.5px solid #000;
                border-bottom: 1px solid #000;
              }

              .bill-table tbody td {
                padding: 5px 8px;
                font-size: 8.5pt;
                border-bottom: 1px solid #ccc;
                border-right: 1px solid #ccc;
              }

              .bill-table tbody td:last-child {
                border-right: none;
              }

              .bill-table tbody tr:last-child td {
                border-bottom: none;
              }

              .subtotal-row td {
                padding: 6px 8px;
                font-size: 9pt;
                font-weight: bold;
                border-top: 1.5px solid #000;
                border-bottom: 1px solid #000;
              }

              .grand-total-section {
                margin-top: 20px;
                padding: 10px 12px;
                border-top: 2px double #000;
                border-bottom: 2px double #000;
                display: flex;
                justify-content: flex-end;
              }

              .grand-total-row {
                display: flex;
                justify-content: space-between;
                width: 35%;
                font-size: 11pt;
                font-weight: bold;
                text-transform: uppercase;
              }

              .bill-notes {
                margin-top: 20px;
                padding: 10px;
                border: 1px solid #ccc;
                font-size: 8pt;
                color: #444;
              }

              .bill-notes h4 {
                margin: 0 0 5px 0;
                font-size: 9pt;
                font-weight: bold;
                text-transform: uppercase;
              }

              .bill-notes p {
                margin: 3px 0;
              }

              .bill-footer {
                margin-top: 30px;
                padding-top: 12px;
                border-top: 1px solid #000;
                display: flex;
                justify-content: space-between;
                font-size: 8pt;
              }

              .bill-footer-section {
                text-align: center;
                width: 45%;
              }

              .signature-line {
                width: 160px;
                border-top: 1px solid #000;
                margin: 30px auto 6px;
              }

              .bill-footer-section p {
                margin: 3px 0;
              }

              @media print {
                .print-bill-container {
                  page-break-after: avoid;
                }
                
                .bill-table {
                  page-break-inside: auto;
                }
                
                .category-header-row,
                .subtotal-row,
                .grand-total-section {
                  page-break-inside: avoid;
                  page-break-before: auto;
                }
                
                tr {
                  page-break-inside: avoid;
                  page-break-after: auto;
                }
              }
            `}</style>

          <div className="print-bill-container">
            <div className="bill-header">
              <div className="hospital-info">
                <h1>Your Hospital Name</h1>
                <p>123 Hospital Street, City, State, ZIP Code</p>
                <p>Phone: (123) 456-7890 | Email: billing@hospital.com</p>
              </div>
            </div>

            <div className="bill-info-section">
              <div className="bill-info-block">
                <h3>Patient Information</h3>
                <p>
                  <strong>Patient ID:</strong> {record?.patientId || "N/A"}
                </p>
                <p>
                  <strong>Name:</strong> {record?.patientName || "N/A"}
                </p>
                <p>
                  <strong>Admission Date:</strong>{" "}
                  {record?.admissionDate || "N/A"}
                </p>
              </div>
              <div className="bill-info-block">
                <h3>Bill Details</h3>
                <p>
                  <strong>Bill No:</strong>{" "}
                  {record?.billNumber ||
                    "EST-" + Date.now().toString().slice(-6)}
                </p>
                <p>
                  <strong>Ward:</strong> {record?.ward || "General"}
                </p>
                <p>
                  <strong>Package:</strong> {record?.package || "Standard"}
                </p>
              </div>
            </div>

            {!hasCategories ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "30px 0",
                  fontStyle: "italic",
                  color: "#666",
                  fontSize: "9pt",
                }}
              >
                No billing data available.
              </div>
            ) : (
              <>
                <table className="bill-table">
                  <thead>
                    <tr>
                      <th style={{ width: "40%" }}>Description</th>
                      <th style={{ width: "12%" }}>Ward</th>
                      <th style={{ width: "12%" }}>Package</th>
                      <th style={{ width: "10%" }}>Rate</th>
                      <th style={{ width: "10%" }}>Date</th>
                      <th style={{ width: "8%" }}>Unit</th>
                      <th style={{ width: "8%" }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estimatedBill.categories.map((cat, catIndex) => (
                      <React.Fragment key={catIndex}>
                        <tr className="category-header-row">
                          <td style={{ textAlign: "left" }} colSpan="7">
                            {cat.categoryName}
                          </td>
                        </tr>
                        {cat.items?.map((item, itemIndex) => (
                          <tr key={itemIndex}>
                            <td>{item.description}</td>
                            <td>{item.ward}</td>
                            <td>{item.package}</td>
                            <td style={{ textAlign: "center" }}>{item.rate}</td>
                            <td>
                              {item.date
                                ? new Date(item.date).toLocaleDateString(
                                    "en-GB",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )
                                : "N/A"}
                            </td>
                            <td style={{ textAlign: "center" }}>{item.unit}</td>
                            <td style={{ textAlign: "right" }}>{item.total}</td>
                          </tr>
                        ))}
                        <tr className="subtotal-row">
                          <td colSpan="6" style={{ textAlign: "right" }}>
                            Subtotal for {cat.categoryName}:
                          </td>
                          <td style={{ textAlign: "right" }}>{cat.subtotal}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>

                <div className="grand-total-section">
                  <div className="grand-total-row">
                    <span>Grand Total</span>
                    <span>{estimatedBill.grandTotal}</span>
                  </div>
                </div>

                <div className="bill-notes">
                  <h4>Important Notes</h4>
                  <p>
                    • This document represents an estimated bill based on
                    projected services. Actual charges may differ upon
                    finalization.
                  </p>
                </div>

                <div className="bill-footer">
                  <div className="bill-footer-section">
                    <div className="signature-line"></div>
                    <p>
                      <strong>Authorized By</strong>
                    </p>
                    <p>Billing Department Representative</p>
                    <p>Date: {currentDate}</p>
                  </div>
                  <div className="bill-footer-section">
                    <div className="signature-line"></div>
                    <p>
                      <strong>Received By</strong>
                    </p>
                    <p>Patient / Guardian</p>
                    <p>Date: __________</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBill;
