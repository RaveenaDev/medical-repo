import React, { useState } from "react";
import { Box, TablePagination } from "@mui/material";
import styles from "./Companies.module.scss";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const Companies = () => {
  const companies = [
    { _id: "1", companyID: 9897671212, name: "Apollo Healthcare" },
    { _id: "2", companyID: 9823456712, name: "Medicare Solutions" },
    { _id: "3", companyID: 9765432189, name: "Lifeline Hospitals" },
    { _id: "4", companyID: 9932145687, name: "CarePlus Clinics" },
    { _id: "5", companyID: 9876543210, name: "Global Health Partners" },
    { _id: "6", companyID: 9812345678, name: "Sunrise Medical Center" },
    { _id: "7", companyID: 9954321876, name: "Greenfield Health" },
    { _id: "8", companyID: 9776543219, name: "PrimeCare Hospital" },
    { _id: "9", companyID: 9867123450, name: "Wellness First" },
    { _id: "10", companyID: 9723456781, name: "Medicover India" },
    { _id: "11", companyID: 9898123456, name: "CureWell Clinics" },
    { _id: "12", companyID: 9745632187, name: "Nova Health Services" },
    { _id: "13", companyID: 9821675432, name: "CityCare Hospitals" },
    { _id: "14", companyID: 9912348765, name: "Unity Medical Group" },
    { _id: "15", companyID: 9786541230, name: "VitalCare Healthcare" },
    { _id: "16", companyID: 9832147654, name: "HealWell Medicals" },
    { _id: "17", companyID: 9923456711, name: "SilverLine Hospitals" },
    { _id: "18", companyID: 9756432189, name: "Optima Health" },
    { _id: "19", companyID: 9845671239, name: "Evergreen Medical Center" },
    { _id: "20", companyID: 9934567821, name: "MetroCare Hospitals" },
  ];

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const companyCount = companies.length;

  const handleViewClick = () => {
    navigate("/admin/tpa/single-company-details");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={styles.billingsContainer}>
      <div className={styles.header}>
        <button>
          <Plus className={styles.plusIcon} /> ADD
        </button>
      </div>
      <div className={styles.billingsTable} style={{ position: "relative" }}>
        {/* Table Header */}
        <div className={styles.tableHeader}>
          <span>Company ID</span>
          <span style={{ textAlign: "center" }}>Company Name</span>
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
          {companies.length > 0 ? (
            companies
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((company) => (
                <div className={styles.tableRow} key={company._id}>
                  <span className={styles.blue}>{company.companyID}</span>
                  <span style={{ textAlign: "center" }} className={styles.blue}>
                    {company.name}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginRight: "2vw",
                    }}
                  >
                    <button
                      onClick={() => handleViewClick()}
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
            zIndex: 11,
          }}
        >
          <TablePagination
            component="div"
            count={companyCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[2, 5, 10, 20, 50, 100]}
          />
        </Box>
      </div>
    </div>
  );
};

export default Companies;
