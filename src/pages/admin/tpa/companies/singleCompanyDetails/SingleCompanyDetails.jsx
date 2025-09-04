import React, { useEffect, useState } from "react";
import styles from "./SingleCompanyDetails.module.scss";
import Searchbar from "../../../../../components/Searchbar";
import Notifications from "../../../../../components/NotificationFunc/Notification";
import {ChevronLeft, Plus} from "lucide-react";
import {
    Box,
    Button, Chip, Dialog, DialogContent, DialogTitle,
    IconButton,
    Menu,
    MenuItem,
    TablePagination,
    Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import RateModal from "./RateModal.jsx";
import {deleteTPAService, deleteTPAServiceCategory} from "../../../../../components/State/Admin/Action.js";
import EditRateModal from "./EditRateModal.jsx";

const SingleCompanyDetails = (props) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorE2, setAnchorE2] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [viewDrawerOpen, setViewDrawerOpen] = useState(false);
    const [viewData, setViewData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false); // State for modal
    const [editModalOpen, setEditModalOpen] = useState(false); // State for modal

    const dispatch = useDispatch()

    const navigate = useNavigate();
    const location = useLocation();
    const companyFromNav = location.state || {};
    const companyId = companyFromNav._id;

// Get the latest company from Redux
    const company = useSelector(
        (state) => state.admin.insuranceCompanies.find((c) => c._id === companyId)
    ) || companyFromNav;

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
    const handleOpenMenu = (event, service,category) => {
        event.stopPropagation(); // Prevent interference with other clicks
        setAnchorE2(event.currentTarget);
        setSelectedService({ service, category });
    };

    const handleCloseMenu = () => {
        setAnchorE2(null);
        // setSelectedService(null);
    };

    const handleView = (service, category) => {
        setViewData({ service, category });
        setViewDrawerOpen(true);
    };

    const onViewClose = () => {
        setViewData(null);
        setViewDrawerOpen(false);
    };

    const handleDelete = () => {
        // console.log("Delete Category: ", selectedService);
        dispatch(deleteTPAServiceCategory(companyId,selectedService.service._id,selectedService.category._id))
        handleCloseMenu();
    };

    const handleDeleteService = () => {
        // console.log("Delete Service: ",selectedService)
        dispatch(deleteTPAService(companyId,selectedService.service._id));
        handleCloseMenu();
    }

    const handleEdit = () => {
        setEditModalOpen(true)
        handleCloseMenu();
    }

    const handleBackBtn = () => {
        navigate("/admin/tpa");
    };

    const truncateText = (text, maxLength) => {
        return text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
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
                                onClick={() => setModalOpen(true)}
                            >
                                <Plus className={styles.plusIcon} />
                                 ADD SERVICE
                            </Button>

                        </Box>

                    </Box>

                    {/* Service Table */}
                    <div className={styles.rateTable}>
                        <div className={styles.rateTableHeader}>
                            <span>Service Name</span>
                            <span>Category</span>
                            <span>Rate Type</span>
                            <span>Current Rate</span>
                            <span>Effective Date</span>
                            {/*<span>Last Updated</span>*/}
                            <span>More Details</span>
                        </div>

                        <div>
                            {services.length > 0 ? (
                                paginatedServices
                                    // .filter(
                                    //     (service) =>
                                    //         !selectedFilter || service.serviceName === selectedFilter
                                    // )
                                    .map((service, ayu) => (
                                        <div key={ayu} className={styles.serviceContainer}>
                                            {service.categories.map((category, index) => (
                                                <div className={styles.rateTableRow} key={index}>
                      <span className={styles.blue}>
                        {index === 0
                            ? truncateText(service.serviceName, 18)
                            : ""}
                      </span>
                                                    <span className={styles.blue}>
                        {truncateText(category.subCategoryName, 20)}
                      </span>
                                                    <span>{category.rateType}</span>
                                                    <span className={styles.blue}>₹{category.rate}</span>
                                                    <span>
                                                        {new Date(category.effectiveDate).toLocaleDateString(
                                                            "en-IN",
                                                            {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                      </span>
                                                      {/*<span>*/}
                                                      {/*  {" "}*/}
                                                      {/*  {new Date(service.updatedAt).toLocaleDateString(*/}
                                                      {/*      "en-IN",*/}
                                                      {/*      {*/}
                                                      {/*          day: "2-digit",*/}
                                                      {/*          month: "2-digit",*/}
                                                      {/*          year: "numeric",*/}
                                                      {/*      }*/}
                                                      {/*  )}*/}
                                                      {/*</span>*/}
                                                    <button
                                                        style={{
                                                            border: "1px solid #25307F",
                                                            color: "#25307F",
                                                            fontSize: "1rem",
                                                            backgroundColor: "transparent",
                                                            padding: "4px",
                                                        }}
                                                        onClick={() => handleView(service, category)}
                                                    >
                                                        View
                                                    </button>

                                                    <IconButton
                                                        onClick={(event) =>
                                                            handleOpenMenu(event, service, category)
                                                        }
                                                    >
                                                        <MoreVertIcon/>
                                                    </IconButton>
                                                    {/* Dropdown Menu */}
                                                    <Menu
                                                        key={`${service._id}-${category._id}`}
                                                        anchorEl={anchorE2}
                                                        open={Boolean(
                                                            anchorE2 &&
                                                            selectedService?.service?._id === service._id &&
                                                            selectedService?.category?._id === category._id
                                                        )}
                                                        onClose={handleCloseMenu}
                                                    >
                                                        <MenuItem
                                                            value="edit"
                                                            sx={{display: "flex", gap: "4px"}}
                                                            onClick={() => handleEdit()}
                                                        >
                                                            <svg
                                                                width="20"
                                                                height="20"
                                                                viewBox="0 0 20 20"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <mask
                                                                    id="mask0_1313_1066"
                                                                    mask-type="alpha"
                                                                    maskUnits="userSpaceOnUse"
                                                                    x="0"
                                                                    y="0"
                                                                    width="20"
                                                                    height="20"
                                                                >
                                                                    <rect width="20" height="20" fill="#D9D9D9"/>
                                                                </mask>
                                                                <g mask="url(#mask0_1313_1066)">
                                                                    <path
                                                                        d="M1.66699 20V16.6667H18.3337V20H1.66699ZM5.00033 13.3334H6.16699L12.667 6.85419L11.4795 5.66669L5.00033 12.1667V13.3334ZM3.33366 15V11.4584L12.667 2.14585C12.8198 1.99308 12.9969 1.87502 13.1982 1.79169C13.3996 1.70835 13.6114 1.66669 13.8337 1.66669C14.0559 1.66669 14.2712 1.70835 14.4795 1.79169C14.6878 1.87502 14.8753 2.00002 15.042 2.16669L16.1878 3.33335C16.3545 3.48613 16.476 3.66669 16.5524 3.87502C16.6288 4.08335 16.667 4.29863 16.667 4.52085C16.667 4.72919 16.6288 4.93405 16.5524 5.13544C16.476 5.33683 16.3545 5.52085 16.1878 5.68752L6.87533 15H3.33366Z"
                                                                        fill="#1C1B1F"
                                                                    />
                                                                </g>
                                                            </svg>
                                                            Edit
                                                        </MenuItem>

                                                        {
                                                            service.categories.length > 1 && (
                                                                <MenuItem
                                                                    value="delete"
                                                                    sx={{display: "flex", gap: "4px"}}
                                                                    onClick={() => handleDelete()}
                                                                >
                                                                    <svg
                                                                        width="20"
                                                                        height="20"
                                                                        viewBox="0 0 20 20"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <mask
                                                                            id="mask0_1313_1069"
                                                                            mask-type="alpha"
                                                                            maskUnits="userSpaceOnUse"
                                                                            x="0"
                                                                            y="0"
                                                                            width="20"
                                                                            height="20"
                                                                        >
                                                                            <rect width="20" height="20" fill="#D9D9D9"/>
                                                                        </mask>
                                                                        <g mask="url(#mask0_1313_1069)">
                                                                            <path
                                                                                d="M5.83301 17.5C5.37467 17.5 4.98231 17.3368 4.65592 17.0104C4.32954 16.684 4.16634 16.2917 4.16634 15.8333V5H3.33301V3.33333H7.49967V2.5H12.4997V3.33333H16.6663V5H15.833V15.8333C15.833 16.2917 15.6698 16.684 15.3434 17.0104C15.017 17.3368 14.6247 17.5 14.1663 17.5H5.83301ZM14.1663 5H5.83301V15.8333H14.1663V5ZM7.49967 14.1667H9.16634V6.66667H7.49967V14.1667ZM10.833 14.1667H12.4997V6.66667H10.833V14.1667Z"
                                                                                fill="#FF4800"
                                                                            />
                                                                        </g>
                                                                    </svg>
                                                                    Delete
                                                                </MenuItem>
                                                            )
                                                        }

                                                        {index === 0 && (
                                                            <MenuItem
                                                                value="delete"
                                                                sx={{display: "flex", gap: "4px"}}
                                                                onClick={() => handleDeleteService()}
                                                            >
                                                                <svg
                                                                    width="20"
                                                                    height="20"
                                                                    viewBox="0 0 20 20"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <mask
                                                                        id="mask0_1313_1069"
                                                                        mask-type="alpha"
                                                                        maskUnits="userSpaceOnUse"
                                                                        x="0"
                                                                        y="0"
                                                                        width="20"
                                                                        height="20"
                                                                    >
                                                                        <rect width="20" height="20" fill="#D9D9D9"/>
                                                                    </mask>
                                                                    <g mask="url(#mask0_1313_1069)">
                                                                        <path
                                                                            d="M5.83301 17.5C5.37467 17.5 4.98231 17.3368 4.65592 17.0104C4.32954 16.684 4.16634 16.2917 4.16634 15.8333V5H3.33301V3.33333H7.49967V2.5H12.4997V3.33333H16.6663V5H15.833V15.8333C15.833 16.2917 15.6698 16.684 15.3434 17.0104C15.017 17.3368 14.6247 17.5 14.1663 17.5H5.83301ZM14.1663 5H5.83301V15.8333H14.1663V5ZM7.49967 14.1667H9.16634V6.66667H7.49967V14.1667ZM10.833 14.1667H12.4997V6.66667H10.833V14.1667Z"
                                                                            fill="#FF4800"
                                                                        />
                                                                    </g>
                                                                </svg>
                                                                Delete Service
                                                            </MenuItem>
                                                        )}
                                                    </Menu>
                                                </div>
                                            ))}
                                        </div>
                                    ))
                            ) : (
                                <div className="service-container">
                                    <div
                                        className="rate-table-row"
                                        style={{
                                            gridTemplateColumns: "1fr",
                                            textAlign: "center",
                                            fontSize: "1rem",
                                            fontWeight: "500",
                                        }}
                                    >
                                        No Services Found
                                    </div>
                                </div>
                            )}
                        </div>
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

            <RateModal companyId={company._id} open={modalOpen} handleClose={() => setModalOpen(false)}/>

            {
                selectedService && (
                    <EditRateModal
                        key={`${selectedService.service._id}-${selectedService.category._id}`}
                        companyId={companyId}
                        open={editModalOpen}
                        handleClose={() => setEditModalOpen(false)}
                        service={selectedService}
                    />
                )
            }

            {/* View Drawer */}
            <Dialog
                open={viewDrawerOpen}
                onClose={() => onViewClose()}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 3, p: 2 },
                }}
            >
                {/* Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <DialogTitle sx={{ p: 0 }}>Service Details</DialogTitle>
                    <IconButton onClick={() => onViewClose()}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <DialogContent dividers>
                    {viewData && (
                        <Box>
                            {/* Amenities */}
                            <Box mt={2}>
                                <Typography variant="subtitle2" fontWeight="600">
                                    Amenities
                                </Typography>
                                {viewData.category.amenities ? (
                                    <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
                                        {viewData.category.amenities
                                            .split(",")
                                            .map((amenity, idx) => (
                                                <Chip
                                                    key={idx}
                                                    label={amenity.trim()}
                                                    sx={{ background: "#F4F6FA" }}
                                                />
                                            ))}
                                    </Box>
                                ) : (
                                    <Typography variant="body2" color="text.secondary">
                                        No amenities listed
                                    </Typography>
                                )}
                            </Box>

                            {/* Additional Details (object) */}
                            <Box mt={2}>
                                <Typography variant="subtitle2" fontWeight="600" gutterBottom>
                                    Additional Details
                                </Typography>

                                {viewData.category.additionaldetails &&
                                typeof viewData.category.additionaldetails === "object" ? (
                                    <Box
                                        component="table"
                                        sx={{
                                            width: "100%",
                                            borderCollapse: "collapse",
                                            "& td, & th": { border: "1px solid #E0E0E0", p: 1 },
                                            "& th": { backgroundColor: "#F9FAFB" },
                                        }}
                                    >
                                        <thead>
                                        <tr>
                                            <th>Service</th>
                                            <th>Price</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {Object.entries(viewData.category.additionaldetails).map(
                                            ([key, value]) => (
                                                <tr key={key}>
                                                    <td style={{ textTransform: "capitalize" }}>
                                                        {key}
                                                    </td>
                                                    <td>{value}</td>
                                                </tr>
                                            )
                                        )}
                                        </tbody>
                                    </Box>
                                ) : (
                                    <Typography variant="body2" color="text.secondary">
                                        No additional details provided
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SingleCompanyDetails;
