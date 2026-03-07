import { X } from "lucide-react";
import React, { useRef } from "react";
import styles from "./ViewBill.module.scss";
import printJS from "print-js";
import { useSelector } from "react-redux";
import { formatToDDMMYYYY } from "../../../../../../utils/dateFormatter";

const ViewBill = ({ record, onClose, estimatedBill }) => {
  const billRef = useRef(null);
  const hospital = useSelector((state) => state.authentication?.hospital);

  const hospitalName =
    hospital?.name || hospital?.hospitalName || "Your Hospital Name";

  const hospitalAddress = hospital?.address || "Hospital Address Not Available";

  const hospitalPhone = hospital?.phone || hospital?.contactNumber || "N/A";

  const hospitalEmail = hospital?.email || "N/A";
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(Number(amount || 0));
  };

  // console.log("Estimated Bill Data: ", estimatedBill);
  const handlePrint = () => {
    printJS({
      printable: "printable-bill",
      type: "html",
      scanStyles: false,
      style: `
      @page {
        size: A4;
        margin: 10mm;
      }

      body {
        margin: 0;
        font-family: Arial, sans-serif;
      }

      .invoice-wrapper {
        width: 190mm;
        margin: 0 auto;
        border: 2px solid #000;
        padding: 15px;
        font-size: 11px;
        color: #000;
        height: 277mm;
        box-sizing: border-box;
      }


    .invoice-header {
      text-align: center;
      margin-bottom: 15px;
    }

    .invoice-header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: bold;
      text-transform: uppercase;
    }

    .invoice-header .subtitle {
      font-size: 11px;
      margin-top: 3px;
    }

    .invoice-title {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      margin: 10px 0 15px;
    }

    .info-section {
      display: flex;
      gap: 15px;
      margin-bottom: 15px;
    }

    .info-box {
      flex: 1;
      border: 1px solid #000;
      padding: 10px;
    }

    .info-box h3 {
      margin: 0 0 6px 0;
      font-size: 12px;
      font-weight: bold;
    }

    .info-box p {
      margin: 3px 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }

    table th, table td {
      border: 1px solid #000;
      padding: 6px;
      font-size: 11px;
    }

 table th {
  background: #fff;
  text-align: left;
  font-weight: bold;
}

.category-row td {
  font-weight: bold;
  text-align: left !important;
}

    table th:last-child,
    table td:last-child {
      text-align: right;
    }



    .subtotal-row td {
      font-weight: bold;
    }

    .summary-section {
      margin-top: 15px;
      display: flex;
      justify-content: flex-end;
    }

    .summary-box {
      width: 40%;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin: 4px 0;
    }

    .summary-row.total {
      font-weight: bold;
      font-size: 13px;
      border-top: 2px solid #000;
      padding-top: 5px;
      margin-top: 8px;
    }

    .amount-words {
      margin-top: 15px;
      padding: 8px;
      border: 1px dashed #000;
      font-style: italic;
    }

    .signature-section {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      gap: 15px;
    }

    .signature-box {
      flex: 1;
      border: 1px solid #000;
      padding: 20px;
      text-align: center;
    }

    .footer-note {
      text-align: center;
      font-size: 10px;
      margin-top: 15px;
    }
    `,
    });
  };

  const hasCategories = Boolean(estimatedBill?.categories?.length);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const numberToWords = (num) => {
    const a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    if (num === 0) return "Zero";

    if (num < 20) return a[num];

    if (num < 100) return b[Math.floor(num / 10)] + " " + a[num % 10];

    if (num < 1000)
      return a[Math.floor(num / 100)] + " Hundred " + numberToWords(num % 100);

    if (num < 100000)
      return (
        numberToWords(Math.floor(num / 1000)) +
        " Thousand " +
        numberToWords(num % 1000)
      );

    if (num < 10000000)
      return (
        numberToWords(Math.floor(num / 100000)) +
        " Lakh " +
        numberToWords(num % 100000)
      );

    return "";
  };

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
            <button className={styles.viewBillBtn} onClick={handlePrint}>
              Print
            </button>
          </div>
        </div>
        {/* SCREEN VERSION - Original UI (unchanged) */}
        <div className={`${styles.table} no-print`}>
          <div className={styles.tableHead}>
            <div>
              <span>Category</span>
            </div>
            <div>
              <span>Name</span>
            </div>
            <div>
              <span>Type</span>
            </div>
            <div>
              <span>Rate</span>
            </div>
            <div>
              <span>Date</span>
            </div>
            <div>
              <span>Quantity</span>
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
                      <span>{item.category}</span>
                    </div>
                    <div>
                      <span>{item.name}</span>
                    </div>
                    <div>
                      <span>{item.type}</span>
                    </div>
                    <div>
                      <span>{item.rate}</span>
                    </div>
                    <div>
                      <span>
                        {" "}
                        {item.date ? formatToDDMMYYYY(item.date) : "N/A"}
                      </span>
                    </div>
                    <div>
                      <span>{item.quantity}</span>
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
        <div style={{ display: "none" }}>
          <div id="printable-bill">
            <div className="invoice-wrapper">
              {/* HEADER */}
              <div className="invoice-header">
                <h1>{hospitalName}</h1>
                <div className="subtitle">{hospitalAddress}</div>
                <div className="subtitle">
                  Phone: {hospitalPhone}
                  {hospitalEmail !== "N/A" && ` | Email: ${hospitalEmail}`}
                </div>
              </div>

              <div className="invoice-title">Estimated Bill</div>

              {/* INFO SECTION */}
              <div className="info-section">
                <div className="info-box">
                  <h3>Bill To</h3>
                  <p>
                    <strong>Patient:</strong> {record?.patient?.name || "N/A"}
                  </p>
                  <p>
                    <strong>Patient ID:</strong> {record?.patient?._id || "N/A"}
                  </p>
                  <p>
                    <strong>Phone:</strong> {record?.patient?.phone || "N/A"}
                  </p>
                </div>

                <div className="info-box">
                  <h3>Invoice Details</h3>
                  <p>
                    <strong>Invoice No:</strong>{" "}
                    {record?.billNumber ||
                      "EST-" + Date.now().toString().slice(-6)}
                  </p>
                  <p>
                    <strong>Invoice Date:</strong> {currentDate}
                  </p>
                  <p>
                    <strong>Doctor:</strong> {record?.doctor?.name || "N/A"}
                  </p>
                </div>
              </div>

              {/* TABLE */}
              <table>
                <thead>
                  <tr>
                    <th style={{ width: "5%" }}>#</th>
                    <th>Description</th>
                    <th style={{ width: "12%" }}>Type</th>
                    <th style={{ width: "12%" }}>Date</th>
                    <th style={{ width: "8%" }}>Qty</th>
                    <th style={{ width: "10%" }}>Rate</th>
                    <th style={{ width: "14%" }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {estimatedBill.categories.map((cat, catIndex) => (
                    <React.Fragment key={catIndex}>
                      <tr className="category-row">
                        <td colSpan="6" style={{ textAlign: "left" }}>
                          {cat.categoryName}
                        </td>
                      </tr>

                      {cat.items.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.type}</td>
                          <td>
                            {item.date ? formatToDDMMYYYY(item.date) : "-"}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.quantity}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            {formatCurrency(item.rate)}
                          </td>
                          <td>{formatCurrency(item.total)}</td>
                        </tr>
                      ))}

                      <tr className="subtotal-row">
                        <td colSpan="6" style={{ textAlign: "right" }}>
                          Subtotal ({cat.categoryName})
                        </td>
                        <td>{formatCurrency(cat.subtotal)}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>

              {/* SUMMARY */}
              <div className="summary-section">
                <div className="summary-box">
                  <div className="summary-row total">
                    <span>Grand Total</span>
                    <span>{formatCurrency(estimatedBill.grandTotal)}</span>
                  </div>
                </div>
              </div>

              {/* AMOUNT IN WORDS */}
              <div className="amount-words">
                <strong>Amount in words:</strong>
                {numberToWords(Math.floor(estimatedBill.grandTotal))} Rupees
                only
              </div>

              {/* SIGNATURES */}
              <div className="signature-section">
                <div className="signature-box">
                  Patient / Authorized Signatory
                </div>
                <div className="signature-box">
                  For {hospitalName}
                  <br />
                  Authorized Signatory
                </div>
              </div>

              <div className="footer-note">
                This is a computer-generated invoice. Subject to jurisdiction.
                Thank you for choosing {hospitalName}.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBill;
