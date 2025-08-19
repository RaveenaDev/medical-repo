import React, { useEffect, useState } from "react";
import styles from "./SingleCompanyDetails.module.scss";
import Searchbar from "../../../../../components/Searchbar";
import Notifications from "../../../../../components/NotificationFunc/Notification";
import {ChevronLeft, MoreVerticalIcon, Plus} from "lucide-react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
    Box,
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton,
    Menu,
    MenuItem,
    TablePagination, TextField,
    Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import {addInsuranceCompany, addServiceToCompany} from "../../../../../components/State/Admin/Action.js";
import {useDispatch, useSelector} from "react-redux";

const SingleCompanyDetails = (props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorE2, setAnchorE2] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [formData, setFormData] = useState([{
        serviceName: "",
        pricingDetails:
            {
                rate: "",
                description: ""
            }
    }]);

    const dispatch = useDispatch()

    const navigate = useNavigate();
    const location = useLocation();
    const companyFromNav = location.state || {};
    const companyId = companyFromNav._id;

// Get the latest company from Redux
    const company = useSelector(
        (state) => state.admin.insuranceCompanies.find((c) => c._id === companyId)
    ) || companyFromNav;

    const [errors, setErrors] = useState({}); // Added error state

    useEffect(() => {
        props?.setIsSignUpOrLogin(false);
    }, []);

    const services = company.services || [];
    // console.log(services)

    // Pagination
    const paginatedServices = services.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Menu actions
    const handleOpenMenu = (event, service) => {
        setAnchorE2(event.currentTarget);
        setSelectedService(service);
    };

    const handleCloseMenu = () => {
        setAnchorE2(null);
        setSelectedService(null);
    };

    const handleDelete = () => {
        console.log("Delete service:", selectedService?._id);
        handleCloseMenu();
    };

    const handleBackBtn = () => {
        navigate("/admin/tpa");
    };

    const handleAddDialogOpen = () => setAddDialogOpen(true);

    const handleAddDialogClose = () => {
        setAddDialogOpen(false);
    };

    const handleServiceChange = (index, key, value) => {
        const updatedServices = [...formData];

        // if the key belongs to pricingDetails
        if (key in updatedServices[index].pricingDetails) {
            updatedServices[index].pricingDetails[key] = value;
        } else {
            updatedServices[index][key] = value;
        }

        setFormData(updatedServices);
    };

    const handleRemoveService = (index) => {
        const updatedServices = [...formData];
        updatedServices.splice(index, 1);
        setFormData(updatedServices);
    };

    const handleAddService = () => {
        setFormData([
            ...formData,
            {
                serviceName: "",
                pricingDetails: {
                    rate: "",
                    description: ""
                }
            }
        ]);
    };

    const handleSubmit = () => {
        let newErrors = {};

        Object.keys(formData).forEach((key) => {
            if (key !== "beds" && !formData[key]) {
                newErrors[key] = "This field is required";
            }
        });

        // console.log("Form Data: ",formData)

        dispatch(addServiceToCompany(company._id,formData))
        setErrors({});
        setAddDialogOpen(false);
    };


    return (
        <div className={styles.container}>
            <div className={styles.searchAndNotification}>
                <Searchbar /> <Notifications />
            </div>

            <div className={styles.content}>
                {/* Back button */}
                <div className={styles.backContainer}>
                    <ChevronLeft onClick={handleBackBtn} className={styles.backIcon} />
                    <p>Company</p>
                </div>

                <div className={styles.rateContainer}>
                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderTop: "0.5px solid #4A4A4A8C",
                            borderBottom: "0.5px solid #4A4A4A8C",
                            paddingY: 1.5,
                            marginBottom: 1,
                        }}
                    >
                        <Box sx={{ ml:2,display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography variant="h4" sx={{ fontWeight: "bold", color: "black" }}>
                                {services.length}
                            </Typography>
                            <Typography
                                component="span"
                                variant="body1"
                                sx={{ fontWeight: "normal", color: "#878787" }}
                            >
                                Services
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Button
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
                                 ADD SERVICE
                            </Button>

                            {/*<Button*/}
                            {/*    startIcon={<FilterAltIcon sx={{ color: "#878787" }} />}*/}
                            {/*    sx={{*/}
                            {/*        textTransform: "none",*/}
                            {/*        backgroundColor: "white",*/}
                            {/*        color: "#4A4A4A",*/}
                            {/*        borderRadius: "5px",*/}
                            {/*    }}*/}
                            {/*    onClick={() => console.log("Open Filter Drawer")}*/}
                            {/*>*/}
                            {/*    Filter*/}
                            {/*</Button>*/}
                        </Box>

                        <Dialog
                            open={addDialogOpen}
                            onClose={handleAddDialogClose}
                            maxWidth="md"
                            fullWidth
                            sx={{
                                "& .MuiDialog-paper": {
                                    minWidth: "55%", // This will reduce the max width between md and lg.
                                    pl: 6
                                },
                            }}
                        >
                            <DialogTitle>Add Service</DialogTitle>
                            <DialogContent>
                                <Box sx={{ width: "100%" }}>
                                    {" "}
                                    {/* Fix width issue */}
                                    <Grid container spacing={2}>
                                        {formData.map((service, index) => (
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
                                                        name={`rate-${index}`}
                                                        type="number"
                                                        value={service.pricingDetails.rate}
                                                        onChange={(e) =>
                                                            handleServiceChange(index, "rate", e.target.value)
                                                        }
                                                        fullWidth
                                                        margin="dense"
                                                        variant="outlined"
                                                        required
                                                        error={!!errors[`rate-${index}`]}
                                                        helperText={errors[`rate-${index}`]}
                                                    />
                                                </Grid>
                                                <Grid xs={3}>
                                                    <TextField
                                                        label="Description"
                                                        name={`description-${index}`}
                                                        value={service.pricingDetails.description}
                                                        onChange={(e) =>
                                                            handleServiceChange(index, "description", e.target.value)
                                                        }
                                                        fullWidth
                                                        margin="dense"
                                                        variant="outlined"
                                                        required
                                                        error={!!errors[`description-${index}`]}
                                                        helperText={errors[`description-${index}`]}
                                                    />
                                                </Grid>
                                                <Grid xs={3} sx={{ display: "flex", alignItems: "center" }}>
                                                    {formData.length > 1 && (
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
                    </Box>

                    {/* Service Table */}
                    <div className={styles.rateTable}>
                        <div className={styles.rateTableHeader}>
                            <span>Service Name</span>
                            <span>Description</span>
                            <span>Rate</span>
                            <span>Currency</span>
                            <span>Last Updated</span>
                        </div>

                        {services.length > 0 ? (
                            paginatedServices.map((service) => (
                                <div key={service._id} className={styles.rateTableRow}>
                                    <span className={styles.blue}>{service.serviceName}</span>
                                    <span>{service.pricingDetails?.description || "-"}</span>
                                    <span className={styles.blue}>
                    ₹{service.pricingDetails?.rate || 0}
                  </span>
                                    <span>{service.pricingDetails?.currency || "INR"}</span>
                                    <span>
                    {new Date(company.updatedAt).toLocaleDateString("en-IN")}
                  </span>

                                    <IconButton onClick={(event) => handleOpenMenu(event, service)}>
                                        <MoreVerticalIcon />
                                    </IconButton>

                                    {/* Menu */}
                                    <Menu
                                        anchorEl={anchorE2}
                                        open={Boolean(anchorE2 && selectedService?._id === service._id)}
                                        onClose={handleCloseMenu}
                                    >
                                        <MenuItem onClick={() => console.log("Edit", service._id)}>
                                            Edit
                                        </MenuItem>
                                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                                    </Menu>
                                </div>
                            ))
                        ) : (
                            <div className={styles.rateTableRow}>
                <span style={{ gridColumn: "1 / -1", textAlign: "center" }}>
                  No Services Found
                </span>
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
                        }}
                    >
                        <TablePagination
                            component="div"
                            count={services.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[5, 10, 20, 50, 100]}
                        />
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default SingleCompanyDetails;
