import { X } from "lucide-react";
import React, {useEffect, useState} from "react";
import styles from "./ViewBill.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {getEstimatedBill} from "../../../../../../components/State/Admin/Action.js";

const ViewBill = ({ record,onClose }) => {

  const dispatch = useDispatch()
  const dummyData = {
    grandTotal: 8000,
    categories: [
      {
        categoryName: "cons",
        subtotal: 2700,
        items: [
          {
            description: "des",
            ward: "war1",
            package: "option1",
            rate: 1200,
            unit: 2,
            total: 2400,
          },
          {
            description: "cons des",
            ward: "con war",
            package: "option2",
            rate: 100,
            unit: 3,
            total: 300,
          },
        ],
      },
      {
        categoryName: "meds",
        subtotal: 5300,
        items: [
          {
            description: "meds desc",
            ward: "med war",
            package: "option2",
            rate: 100,
            unit: 3,
            total: 300,
          },
          {
            description: "meds desc 2",
            ward: "med 2",
            package: "option3",
            rate: 1000,
            unit: 5,
            total: 5000,
          },
        ],
      },
    ],
  };

  useEffect(() => {
    dispatch(getEstimatedBill(record._id))
  }, [dispatch]);

  const estimatedBill = useSelector((store) => store.admin.estimatedBill)

  console.log("ES",estimatedBill)
  return (
    <div>
      <div className={styles.crossContainer}>
        <X size={20} onClick={onClose} />
      </div>
      <div className={styles.container}>
          <div style={{display: "flex", justifyContent: "space-between"}}>
              <h1 className={styles.title}>Patient Estimated Bill</h1>

              <div className={styles.viewBill}>
                  <button
                      className={styles.viewBillBtn}
                  >
                      Print
                  </button>
              </div>
          </div>

        <div className={styles.table}>
          {/* Table header */}
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
              <span>Unit</span>
            </div>
            <div>
              <span>Total</span>
            </div>
          </div>

          {/* Render categories and rows */}
          {estimatedBill === null ? (
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
            estimatedBill?.categories.map((cat, catIndex) => (
              <div key={catIndex} className={styles.categoryBlock}>
                <div className={styles.categoryHeader}>
                  <p className={styles.categoryName}>{cat.categoryName}</p>
                </div>

                {cat.items.map((item, itemIndex) => (
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

          {/* Grand total */}
          {estimatedBill?.categories.length > 0 && (
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
      </div>
    </div>
  );
};

export default ViewBill;
