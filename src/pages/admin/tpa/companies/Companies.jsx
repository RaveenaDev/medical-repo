import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TablePagination,
  TextField,
} from "@mui/material";
import styles from "./Companies.module.scss";
import { useNavigate } from "react-router-dom";
import { Plus, Upload } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInsuranceCompanies,
  uploadInsuranceCompaniesExcel,
} from "../../../../components/State/Admin/Action.js";

import CompanyRateModal from "./CompanyRateModal.jsx";

const Companies = () => {
  const [modalOpen, setModalOpen] = useState(false); // State for modal
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInsuranceCompanies());
  }, [dispatch]);

  const companies = useSelector((store) => store.admin.insuranceCompanies);
  const loading = useSelector(
    (store) => store.admin.isLoadingInsuranceCompanies,
  );
  // console.log("Comp: ", companies);

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const companyCount = companies.length;

  const handleViewClick = (company) => {
    navigate("/admin/tpa/single-company-details", { state: company });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExcelUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);

      const result = await dispatch(uploadInsuranceCompaniesExcel(file));
      dispatch(getInsuranceCompanies());
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
      e.target.value = ""; //  allows re-uploading same file
    }
  };
  return (
    <div className={styles.billingsContainer}>
      <div className={styles.header}>
        <Button
          variant="contained"
          className={styles.btnHeader}
          sx={{
            textTransform: "none",
            backgroundColor: "#25307F",
            color: "white",
            "&:hover": { background: "#AEC3FF" },
          }}
          onClick={() => setModalOpen(true)}
        >
          <Plus className={styles.plusIcon} />
          ADD COMPANY
        </Button>

        <Button
          variant="contained"
          component="label"
          className={styles.btnHeader}
          sx={{
            textTransform: "none",
            backgroundColor: "#25307F",
            color: "white",
            marginLeft: "1vw",
            "&:hover": { background: "#AEC3FF" },
          }}
          disabled={uploading}
        >
          {uploading ? (
            <CircularProgress size={20} sx={{ color: "#25307F" }} />
          ) : (
            <>
              <Upload className={styles.plusIcon} />
              Upload Excel
            </>
          )}

          <input
            type="file"
            accept=".xlsx, .xls"
            hidden
            onChange={handleExcelUpload}
          />
        </Button>
      </div>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "75vh", // or full height you need
            bgcolor: "#F1F1F1",
          }}
        >
          <CircularProgress sx={{ color: "#25307F" }} size={55} />
        </Box>
      ) : (
        <div className={styles.billingsTable} style={{ position: "relative" }}>
          {/* Table Header */}
          <div className={styles.tableHeader}>
            <span>Company ID</span>
            <span style={{ textAlign: "center" }}>Company Name</span>
            <span style={{ textAlign: "center" }}>TPA</span>
            <span style={{ textAlign: "center" }}>Tie-up</span>
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
              height: "63vh",
              overflowY: "auto",
            }}
          >
            {companies.length > 0 ? (
              companies
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((company) => (
                  <div className={styles.tableRow} key={company._id}>
                    <span className={styles.blue}>{company.id}</span>

                    <span
                      style={{ textAlign: "center" }}
                      className={styles.blue}
                    >
                      {company.name}
                    </span>

                    <span
                      style={{ textAlign: "center" }}
                      className={styles.grey}
                    >
                      {company.TPA || "-"}
                    </span>

                    <span
                      style={{ textAlign: "center" }}
                      className={styles.grey}
                    >
                      {company.tieup || "-"}
                    </span>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginRight: "2vw",
                      }}
                    >
                      <button
                        onClick={() => handleViewClick(company)}
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
              bottom: 10,
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
      )}

      <CompanyRateModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Companies;
