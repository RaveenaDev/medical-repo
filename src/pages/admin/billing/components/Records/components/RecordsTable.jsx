import React from "react";
import {
  Box,
  CircularProgress,
  TablePagination,
  Typography,
  Button,
} from "@mui/material";
import styles from "../Records.module.scss";
/* ----------------- constants & helpers ----------------- */

const stickyPaginationSx = {
  width: "100%",
  position: "sticky",
  bottom: 0,
  backgroundColor: "#fff",
  borderTop: "2px solid #ddd",
  zIndex: 11,
};
const ROWS_PER_PAGE_OPTIONS = [5, 10, 20, 50, 100];
const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "N/A";

/* ----------------- micro components ----------------- */
const RecordRow = React.memo(({ item, onView }) => (
  <div className={styles["table-row"]} key={item?._id}>
    <span className={styles["blue"]}>{item?.caseId || "N/A"}</span>
    <span className={styles["blue"]}>{item.patient?.name || "N/A"}</span>
    <span className={styles["grey"]}>{item.patient?.phone || "N/A"}</span>
    <span className={styles["grey"]}>{formatDate(item.createdAt)}</span>
    <span className={styles["grey"]}>{item.totalAmount ?? "0"}</span>
    <span
      className={`${styles["status"]} ${styles[item.status?.toLowerCase()]}`}
    >
      {item.status ?? "N/A"}
    </span>
    <Button
      onClick={() => onView(item._id)}
      className={styles["view-btn"]}
      sx={{ outline: "none", boxShadow: "none" }}
      aria-label={`View bill ${item?.caseId ?? item?._id ?? ""}`}
    >
      View
    </Button>
  </div>
));
const RecordsTable = ({
  rowsList,
  loading,
  error,
  onView,
  billsCount,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => (
  <div className={styles["billings-table"]} style={{ position: "relative" }}>
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
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress size={28} aria-label="loading records" />
        </Box>
      ) : error ? (
        <Box sx={{ textAlign: "center", p: 4 }}>
          <Typography color="error">
            Failed to load records. Try again.
          </Typography>
        </Box>
      ) : rowsList.length > 0 ? (
        rowsList.map((item) => (
          <RecordRow key={item._id} item={item} onView={onView} />
        ))
      ) : (
        <div
          className={`${styles["table-row"]} ${styles["blue"]}`}
          style={{
            gridTemplateColumns: "1fr",
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          No Records Found
        </div>
      )}
    </div>

    {/* Pagination */}
    <Box sx={stickyPaginationSx}>
      <TablePagination
        component="div"
        count={billsCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
      />
    </Box>
  </div>
);

export default RecordsTable;
