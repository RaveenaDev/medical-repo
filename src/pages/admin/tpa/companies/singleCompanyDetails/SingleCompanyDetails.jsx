import React, { useEffect, useState } from "react";
import styles from "./SingleCompanyDetails.module.scss";
import Searchbar from "../../../../../components/Searchbar";
import Notifications from "../../../../../components/NotificationFunc/Notification";
import {ChevronLeft, MoreVerticalIcon, Plus} from "lucide-react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    TablePagination,
    Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const SingleCompanyDetails = (props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorE2, setAnchorE2] = useState(null);
    const [selectedService, setSelectedService] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const company = location.state || {};

    useEffect(() => {
        props?.setIsSignUpOrLogin(false);
    }, []);

    const services = company.services || [];
    console.log(services)

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
                                onClick={() => console.log("Open Add Service Modal")}
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
