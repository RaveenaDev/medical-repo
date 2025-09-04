import { useEffect, useState } from "react";
import { Button, Box, TablePagination } from "@mui/material";
import styles from "./Patients.module.scss";
import ViewModal from "./modals/ViewModal";
import {useDispatch, useSelector} from "react-redux";
import {getInsuredPatients} from "../../../../components/State/Admin/Action.js";
const Patients = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const dispatch = useDispatch();

  const closeModal = () => {
    setActiveModal(null);
    setSelectedRecord(null);
  };

  const handleViewClick = (record) => {
    // console.log("View details for:", record);
    setSelectedRecord(record); // store full record data
    setActiveModal("view");
  };

  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeModal]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(getInsuredPatients());
  }, [dispatch]);

  const insuredPatients = useSelector((store) => store.admin.insuredPatients)

  // console.log("Ins: ",insuredPatients)

  const insurancePatientsCount = insuredPatients?.length;

  return (
    <div className={styles.billingsContainer}>
      <div className={styles.billingsTable} style={{ position: "relative" }}>
        {/* Table Header */}
        <div className={styles.tableHeader}>
          <span>PAT ID</span>
          <span>Name</span>
          <span>Phone No.</span>
          <span>Policy No.</span>
          <span>Company</span>

          <span>Status</span>
          <span></span>
        </div>

        {/* Table Body */}
        <div
          className={styles.tableBody}
          style={{
            paddingBottom: "1vh",
            display: "flex",
            flexDirection: "column",
            gap: "1.4vh",
            background: "#f1f1f1",

            height: "70vh",
            overflowY: "auto",
          }}
        >
          {insuredPatients.length > 0 ? (
            insuredPatients
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <div className={styles.tableRow} key={item._id}>
                  {/*<span className={styles.blue}>{item.patient?.insuranceDetails?.insuranceIdNumber}</span>*/}
                  <span className={styles.blue}>{item.patient?.patId}</span>
                  <span
                    className={styles.blue}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <span>{item.patient?.name}</span>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "#555",
                        maxWidth: "150px", // Adjust as needed
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                      title={item.patient.email} // Show full email on hover
                    >
                      {item.patient.email}
                    </span>
                  </span>
                  <span className={styles.grey}>{item.patient.phone}</span>
                  <span className={styles.grey}>{item.admissionDetails.insurance?.policyNumber}</span>
                  <span className={styles.grey}>{item.admissionDetails.insurance?.insuranceCompany}</span>

                  <span
                    className={`${styles.status} ${
                        item.admissionDetails.insurance.insuranceApproved.toLowerCase() === "approved"
                        ? styles.ongoing
                        : item.admissionDetails.insurance.insuranceApproved.toLowerCase() === "pending"
                        ? styles.pending
                        : styles.rejected
                    }`}
                  >
                    {item.admissionDetails.insurance.insuranceApproved.charAt(0).toUpperCase() +
                        item.admissionDetails.insurance.insuranceApproved.slice(1)}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      //marginRight: "2vw",
                    }}
                  >
                    <button
                      onClick={() => handleViewClick(item)} // pass entire record
                      className={styles.viewBtn}
                    >
                      View
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <div
              className={`${styles.tableRow} ${styles.blue}`}
              style={{
                gridTemplateColumns: "1fr",
                textAlign: "center",
                fontSize: "2.3vh",
                fontWeight: "500",
              }}
            >
              No Records Found
            </div>
          )}
        </div>

        {/* Pagination */}
        <Box
          sx={{
            width: "100%",
            position: "sticky",
            bottom: 0,
            backgroundColor: "#fff",
            borderTop: "2px solid #ddd",
            zIndex: 2,
          }}
        >
          <TablePagination
            component="div"
            count={insurancePatientsCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[2, 5, 10, 20, 50, 100]}
          />
        </Box>
      </div>

      {/* Modal */}
      {activeModal === "view" && (
        <>
          <div className={styles.backdropOverlay} onClick={closeModal} />
          <div className={styles.viewModal}>
            <ViewModal onClose={closeModal} record={selectedRecord} />
          </div>
        </>
      )}
    </div>
  );
};

export default Patients;
