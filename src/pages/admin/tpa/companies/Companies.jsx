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

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getInsuranceCompanies())
    }, [dispatch]);

    const companies = useSelector((store) => store.admin.insuranceCompanies)

    // console.log("Comp: ",companies)

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const companyCount = companies.length;

    const handleAddDialogOpen = () => setAddDialogOpen(true);

    const handleAddDialogClose = () => {
        setAddDialogOpen(false);
    };

  const handleViewClick = (company) => {
    navigate("/admin/tpa/single-company-details",{state: company});
  };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleServiceChange = (index, key, value) => {
        const updatedServices = [...formData.services];
        updatedServices[index][key] = value;
        setFormData({ ...formData, services: updatedServices });
    };

    const handleAddService = () => {
        setFormData({
            ...formData,
            services: [...formData.services, { serviceName: "", serviceCost: "",serviceDescription: "" }],
        });
    };

    const handleRemoveService = (index) => {
        const updatedServices = [...formData.services];
        updatedServices.splice(index, 1);
        setFormData({ ...formData, services: updatedServices });
    };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

    const handleSubmit = () => {
        let newErrors = {};

        Object.keys(formData).forEach((key) => {
            if (key !== "beds" && !formData[key]) {
                newErrors[key] = "This field is required";
            }
        });

        const finalData = {
            id: formData.companyID,
            name: formData.companyName,
            services: formData.services.map(service => ({
                serviceName: service.serviceName,
                serviceDescription: service.serviceDescription,
                pricingDetails: service.serviceCost // renamed field
            }))
        };

        // console.log("Testing : ",formData)
        // console.log("Testing1 : ",finalData)
        dispatch(addInsuranceCompany(finalData))
        setErrors({});
        setAddDialogOpen(false);
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
              onClick={handleAddDialogOpen} // Open modal on click
          >
              <Plus className={styles.plusIcon} />
              ADD COMPANY
          </Button>
      </div>

        <Dialog
            open={addDialogOpen}
            onClose={handleAddDialogClose}
            maxWidth="md"
            fullWidth
            sx={{
                "& .MuiDialog-paper": {
                    maxWidth: "65%", // This will reduce the max width between md and lg.
                },
            }}
        >
            <DialogTitle>Add Company</DialogTitle>
            <DialogContent>
                <Box sx={{ width: "100%" }}>
                    {" "}
                    {/* Fix width issue */}
                    <Grid container spacing={2}>
                        <Grid xs={3}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Company ID"
                                name="companyID"
                                value={formData.companyID}
                                onChange={handleChange}
                                type="text"
                                fullWidth
                                variant="outlined"
                                error={!!errors.companyID}
                                helperText={errors.companyID}
                                required
                            />
                        </Grid>

                        <Grid xs={3}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Company Name"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                type="text"
                                fullWidth
                                variant="outlined"
                                error={!!errors.companyName}
                                helperText={errors.companyName}
                                required
                            />
                        </Grid>

                        {formData.services.map((service, index) => (
                            <Grid  container sx={{width:'100vw'}} spacing={2} key={index}>
                                <Grid xs={3}>
                                    <TextField
                                        label="Service Name"
                                        name={`serviceName-${index}`}
                                        value={service.serviceName}
                                        onChange={(e) =>
                                            handleServiceChange(index, "serviceName", e.target.value)
                                        }
                                        fullWidth
                                        margin="dense"
                                        variant="outlined"
                                        required
                                        error={!!errors[`serviceName-${index}`]}
                                        helperText={errors[`serviceName-${index}`]}
                                    />
                                </Grid>
                                <Grid xs={3}>
                                    <TextField
                                        label="Cost"
                                        name={`serviceCost-${index}`}
                                        type="number"
                                        value={service.serviceCost}
                                        onChange={(e) =>
                                            handleServiceChange(index, "serviceCost", e.target.value)
                                        }
                                        fullWidth
                                        margin="dense"
                                        variant="outlined"
                                        required
                                        error={!!errors[`serviceCost-${index}`]}
                                        helperText={errors[`serviceCost-${index}`]}
                                    />
                                </Grid>
                                <Grid xs={3}>
                                    <TextField
                                        label="Description"
                                        name={`serviceDescription-${index}`}
                                        value={service.serviceDescription}
                                        onChange={(e) =>
                                            handleServiceChange(index, "serviceDescription", e.target.value)
                                        }
                                        fullWidth
                                        margin="dense"
                                        variant="outlined"
                                        required
                                        error={!!errors[`serviceDescription-${index}`]}
                                        helperText={errors[`serviceDescription-${index}`]}
                                    />
                                </Grid>
                                <Grid xs={3} sx={{ display: "flex", alignItems: "center" }}>
                                    {formData.services.length > 1 && (
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleRemoveService(index)}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </Grid>
                            </Grid>
                        ))}
                        <Button
                            variant="contained"
                            sx={{ mt: 2, backgroundColor: "#25307F", color: "white" }}
                            onClick={handleAddService}
                        >
                            + Add Service
                        </Button>
                    </Grid>
                </Box>
            </DialogContent>

            <DialogActions sx={{ justifyContent: "center" }}>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{
                        width: "200px",
                        backgroundColor: "#25307F",
                        "&:hover": { backgroundColor: "green" },
                    }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>

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
    </div>
  );
};

export default Companies;
