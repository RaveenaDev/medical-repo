import React, {useEffect, useState} from "react";
import {
    Box,
    Button, Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    TablePagination,
    TextField,
} from "@mui/material";
import styles from "./Companies.module.scss";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {addInsuranceCompany, getInsuranceCompanies} from "../../../../components/State/Admin/Action.js";
import Grid from "@mui/material/Grid2";
import CompanyRateModal from "./CompanyRateModal.jsx";

const Companies = () => {
    const [errors, setErrors] = useState({}); // Added error state


    const [formData, setFormData] = useState({
        companyID: "",
        companyName: "",
        services: [
            {
                serviceName: "",
                serviceCost: "",
                serviceDescription: ""
            }
        ]
    });

    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false); // State for modal

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getInsuranceCompanies())
    }, [dispatch]);

    const companies = useSelector((store) => store.admin.insuranceCompanies)

    // console.log("Comp: ",companies)

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const companyCount = companies.length;

  const handleViewClick = (company) => {
    navigate("/admin/tpa/single-company-details",{state: company});
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
          <Button
              style={{marginTop:'8px'}}
              variant="contained"
              sx={{
                  display:'flex',
                  gap:1.5,
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
                  <span className={styles.blue}>{company.id}</span>
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

        <CompanyRateModal open={modalOpen} handleClose={() => setModalOpen(false)}/>
    </div>
  );
};

export default Companies;
