import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TablePagination,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Three-dot menu icon
import "./Rate.scss";

import RateModal from "./components/RateModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteService,
  deleteServiceCategory,
  getAllDepartments,
  getServices,
  uploadServicesExcel,
} from "../../../../../components/State/Admin/Action.js";
import EditRateModal from "./components/EditRateModal.jsx";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";

import { Alert, Snackbar } from "@mui/material";
import { TriangleAlert, Upload } from "lucide-react";

const Rate = () => {
  const [filters, setFilters] = useState({
    department: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServices(filters.department));
    dispatch(getAllDepartments());
  }, [dispatch]);

  const reduxServices = useSelector((store) => store.admin.services);
  const departments = useSelector((store) => store.admin.departments);
  const PROTECTED_SERVICES = new Set(["Room Type Service", "Consultation"]);
  const [notice, setNotice] = useState({ open: false, text: "" });

  // 3) helpers
  const isProtected = (name) =>
    PROTECTED_SERVICES.has(String(name || "").trim());
  const showNotice = (text) => setNotice({ open: true, text });
  // console.log("Redux Services: ", reduxServices);
  const services = reduxServices.map((service) => ({
    serviceId: service?._id,
    serviceName: service?.name,
    department: service?.department?.name,
    lastUpdated: service?.lastUpdated,
    categories: service?.categories.map((category) => ({
      categoryId: category._id,
      name: category.subCategoryName,
      rateType: category.rateType,
      currentRate: category.rate,
      amenities: category.amenities || "N/A",
      effectiveDate: category.effectiveDate,
      additionaldetails: category.additionaldetails || {},
      departments: category.departments || [],
    })),
  }));

  const [sortOrder, setSortOrder] = useState("Monthly");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const filterOptions = services.map((service) => service.serviceName);

  const [modalOpen, setModalOpen] = useState(false); // State for modal
  const [editModalOpen, setEditModalOpen] = useState(false); // State for modal
  const [selectedService, setSelectedService] = useState(null);

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const [viewDrawerOpen, setViewDrawerOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  const handleView = (service, category) => {
    setViewData({ service, category });
    setViewDrawerOpen(true);
  };
  const onViewClose = () => {
    setViewData(null);
    setViewDrawerOpen(false);
  };
  // Handle Sort Change
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenMenu = (event, service, category) => {
    event.stopPropagation(); // Prevent interference with other clicks
    setAnchorE2(event.currentTarget);
    setSelectedService({ service, category });
  };

  const handleCloseMenu = () => {
    setAnchorE2(null);
    setSelectedService(null);
  };

  const handleDelete = () => {
    const name = selectedService?.service?.serviceName;
    if (isProtected(name)) {
      showNotice(`"${name}" is protected. Do not delete its categories.`);
      return;
    }
    dispatch(
      deleteServiceCategory(
        selectedService.service.serviceId,
        selectedService.category.categoryId,
      ),
    );
  };

  const handleDeleteService = () => {
    const name = selectedService?.service?.serviceName;
    if (isProtected(name)) {
      showNotice(`"${name}" is a core service. Do not delete this service.`);
      return;
    }
    dispatch(deleteService(selectedService.service.serviceId));
  };

  const handleSelect = (option) => {
    setSelectedFilter(option);
    handleClose();
  };

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Search Results
  const handleSearchResults = () => {
    // console.log("Filter: ", filters);
    dispatch(getServices(filters.department));
    setFilterDrawerOpen(false);
  };
  const [page, setPage] = useState(0); // page number
  const [rowsPerPage, setRowsPerPage] = useState(10); // You can change this default

  const paginatedServices = services.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  // console.log(" Services: ", services);
  // console.log(" Data: ", viewData);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  const [uploading, setUploading] = useState(false);
  const handleExcelUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);

      const result = await dispatch(uploadServicesExcel(file));
      dispatch(getServices(filters.department));
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
      e.target.value = ""; //  allows re-uploading same file
    }
  };
  return (
    <div className="rate-container">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "0.5px solid #4A4A4A8C",
          borderBottom: "0.5px solid #4A4A4A8C",
          py: { xs: 1, md: 1.2, lg: 1.5 },
          mb: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, md: 1.5, lg: 2 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              borderRight: "0.5px solid #4A4A4A8C",
              paddingRight: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "black",
                fontSize: { xs: "1.4rem", md: "1.7rem", lg: "2rem" },
              }}
            >
              {services.length}
            </Typography>
            <Typography
              component="span"
              sx={{
                fontWeight: "normal",
                color: "#878787",
                ml: 1,
                fontSize: { xs: "0.8rem", md: "0.9rem", lg: "1rem" },
              }}
            >
              Services
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                mr: 1,
                color: "#0B0B0B",
                fontFamily: "Inter",
                fontWeight: "500",
                fontSize: { xs: "0.7rem", md: "1rem", lg: "1.25rem" },
              }}
            >
              Sort by:
            </Typography>
            <Select
              value={sortOrder}
              onChange={handleSortChange}
              size="small"
              sx={{
                minWidth: { xs: 120, md: 140, lg: 160 },
                background: "#fff",
                boxShadow: "0px 4px 4px 0px #BDBDBD1C",
                border: "1px solid transparent",
                outline: "none",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "inherit", // Removes hover effect
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent", // Hides the border
                },
              }}
            >
              <MenuItem
                value="Weekly"
                sx={{ borderBottom: "0.5px sloid black" }}
              >
                Weekly
              </MenuItem>
              <MenuItem
                sx={{ borderBottom: "0.5px sloid black" }}
                value="Monthly"
              >
                Monthly
              </MenuItem>
              <MenuItem value="Yearly">Yearly</MenuItem>
            </Select>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, md: 1.25, lg: 2 },
          }}
        >
          <Button
            variant="filled"
            sx={{
              textTransform: "none",
              backgroundColor: "#25307F",
              color: "white",
              boxShadow: "0px 4px 4px 0px #C2C2C240",
              px: { xs: 1.5, md: 2, lg: 2.5 },
              py: { xs: 0.6, md: 0.8, lg: 1 },
              fontSize: { xs: "0.7rem", md: "0.8rem", lg: "1rem" },
              "&:hover": {
                background: "#AEC3FF",
              },
            }}
            onClick={() => setModalOpen(true)}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_1313_1585"
                mask-type="alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="25"
                height="25"
              >
                <rect
                  x="0.347656"
                  y="0.745117"
                  width="24"
                  height="24"
                  fill="#D9D9D9"
                />
              </mask>
              <g mask="url(#mask0_1313_1585)">
                <path
                  d="M11.3477 21.7451V13.7451H3.34766V11.7451H11.3477V3.74512H13.3477V11.7451H21.3477V13.7451H13.3477V21.7451H11.3477Z"
                  fill="#D9D9D9"
                />
              </g>
            </svg>
            ADD SERVICE
          </Button>

          <Button
            variant="contained"
            component="label"
            sx={{
              textTransform: "none",
              backgroundColor: "#25307F",
              color: "white",

              px: { xs: 1.5, md: 2, lg: 2.5 },
              py: { xs: 0.6, md: 0.8, lg: 1 },
              fontSize: { xs: "0.7rem", md: "0.8rem", lg: "1rem" },
              "&:hover": { background: "#AEC3FF" },
            }}
            disabled={uploading}
          >
            {uploading ? (
              <CircularProgress size={20} sx={{ color: "#25307F" }} />
            ) : (
              <>
                <Upload />
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

          {/* Filter Button with Dropdown */}

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              startIcon={
                <FilterAltIcon
                  sx={{ color: "#878787", fontSize: { xs: 18, md: 20 } }}
                />
              }
              sx={{
                textTransform: "none",
                px: { xs: 1.5, md: 2 },
                py: { xs: 0.5, md: 0.7 },
                fontSize: { xs: "0.7rem", md: "0.75rem", lg: "1rem" },
                backgroundColor: "white",
                borderRadius: "5px",
                color: "#4A4A4A",
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                  backgroundColor: "white",
                },
              }}
              onClick={() => setFilterDrawerOpen(true)}
            >
              Filter
            </Button>
          </Box>
        </Box>
      </Box>
      <div className="rate-table" style={{ position: "relative" }}>
        <div className="rate-table-header">
          <span>Service Category</span>

          <span>Name</span>
          <span>Rate Type</span>
          <span>Current Rate</span>

          <span>Last Updated</span>
          <span>More Details</span>
        </div>
        <div>
          {services.length > 0 ? (
            paginatedServices
              .filter(
                (service) =>
                  !selectedFilter || service.serviceName === selectedFilter,
              )
              .map((service, ayu) => (
                <div key={ayu} className="service-container">
                  {/* Additional charges note */}
                  {(service.serviceName === "Room Type Service" ||
                    service.serviceName === "Consultation") && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0px 0px 4px 13px",
                      }}
                    >
                      <TriangleAlert size={16} color="red" />
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ fontSize: "0.75rem" }}
                      >
                        {service.serviceName === "Room Type Service"
                          ? "Add all room-related charges here"
                          : "Add all consultation-related charges here"}
                      </Typography>
                    </div>
                  )}

                  {service.categories.map((category, index) => (
                    <div className="rate-table-row" key={index}>
                      <span className="blue">
                        {index === 0
                          ? truncateText(service.serviceName, 18)
                          : ""}
                      </span>

                      <span className="blue">
                        {truncateText(category.name, 20)}
                      </span>
                      <span>{category.rateType}</span>
                      <span className="blue">₹{category.currentRate}</span>

                      <span>
                        {" "}
                        {new Date(service.lastUpdated).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          },
                        )}
                      </span>
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
                        <MoreVertIcon />
                      </IconButton>

                      {/* Dropdown Menu */}
                      <Menu
                        key={`${service.serviceId}-${category.categoryId}`}
                        anchorEl={anchorE2}
                        open={Boolean(
                          anchorE2 &&
                            selectedService?.category?.categoryId ===
                              category.categoryId,
                        )}
                        onClose={handleCloseMenu}
                      >
                        <MenuItem
                          value="edit"
                          sx={{ display: "flex", gap: "4px" }}
                          onClick={() => setEditModalOpen(true)}
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
                              <rect width="20" height="20" fill="#D9D9D9" />
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

                        {!isProtected(service.serviceName) &&
                          service.categories.length > 1 && (
                            <MenuItem
                              value="delete"
                              sx={{ display: "flex", gap: "4px" }}
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
                                  <rect width="20" height="20" fill="#D9D9D9" />
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
                          )}

                        {index === 0 && !isProtected(service.serviceName) && (
                          <MenuItem
                            value="delete"
                            sx={{ display: "flex", gap: "4px" }}
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
                                <rect width="20" height="20" fill="#D9D9D9" />
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

                        {isProtected(service.serviceName) && index === 0 && (
                          <MenuItem disabled sx={{ opacity: 0.7 }}>
                            Protected service. Deletion disabled
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
            count={services.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 20, 50, 100]}
            sx={{}}
          />
        </Box>
      </div>
      {/* Use the separate BillingModal Component */}
      <RateModal open={modalOpen} handleClose={() => setModalOpen(false)} />
      {selectedService && (
        <EditRateModal
          open={editModalOpen}
          handleClose={() => setEditModalOpen(false)}
          service={selectedService}
        />
      )}

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            height: "52vh", // Adjust height as needed
            top: "22vh", // Center it vertically
            borderRadius: "10px 0 0 10px", // Optional rounded corners
          },
        }}
        style={{ position: "relative" }}
      >
        <Box sx={{ width: 220, padding: 2, paddingLeft: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 1,
            }}
          >
            <Typography variant="h6" sx={{ color: "#0B0B0B" }}>
              Filter By
            </Typography>
            <IconButton
              sx={{
                "&:focus": {
                  outline: "none",
                  boxShadow: "none",
                },
                color: "black",
              }}
              onClick={() => setFilterDrawerOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Filter Options */}
          <FormControl
            sx={{ marginBottom: 4, marginTop: 2, width: "100%" }}
            component="fieldset"
          >
            <FormLabel
              component="legend"
              sx={{
                marginBottom: 1,
                color: "#000000",
                "&.Mui-focused": { color: "#000000" }, // Prevents blue color on focus
              }}
            >
              Departments
            </FormLabel>
            <Box sx={{ height: "23.5vh", overflowY: "auto" }}>
              <RadioGroup
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
              >
                <FormControlLabel
                  value=""
                  control={
                    <Radio
                      sx={{
                        color: "#878787", // Default color
                        "&.Mui-checked": {
                          color: "#25307F", // Selected dot color
                        },
                      }}
                    />
                  }
                  label="All"
                  sx={{ height: "34px", color: "#878787" }}
                />
                {departments.map((department, index) => (
                  <FormControlLabel
                    value={department.departmentId}
                    control={
                      <Radio
                        sx={{
                          color: "#878787", // Default color
                          "&.Mui-checked": {
                            color: "#25307F", // Selected dot color
                          },
                        }}
                      />
                    }
                    label={department.departmentName}
                    sx={{ height: "34px", color: "#878787" }}
                  />
                ))}
              </RadioGroup>
            </Box>
          </FormControl>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#25307F",
              textTransform: "none", // Prevents uppercase transformation
              borderRadius: "16px",
              padding: "6px 35px",
              marginLeft: "1.5rem",
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
            style={{ position: "absolute", right: "15%", bottom: "7%" }}
            onClick={handleSearchResults}
          >
            Search Results
          </Button>
        </Box>
      </Drawer>
      {/* View Drawer */}
      <Dialog
        open={viewDrawerOpen}
        onClose={onViewClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, p: 2 },
        }}
      >
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <DialogTitle sx={{ p: 0 }}>Service Details</DialogTitle>
          <IconButton onClick={onViewClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent dividers>
          {viewData && viewData.category ? (
            <Box>
              {/* Departments */}
              <Box mt={2}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Departments
                </Typography>
                {Array.isArray(viewData.category.departments) &&
                viewData.category.departments.length > 0 ? (
                  <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
                    {viewData.category.departments.map((department, idx) => (
                      <Chip
                        key={department._id || idx}
                        label={department?.name || "Unnamed Department"}
                        sx={{ background: "#F4F6FA" }}
                      />
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No departments listed
                  </Typography>
                )}
              </Box>

              {/* Amenities */}
              <Box mt={2}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Amenities
                </Typography>
                {viewData.category.amenities &&
                viewData.category.amenities.trim().length > 0 ? (
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

              {/* Additional Details */}
              <Box mt={2}>
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                  Additional Details
                </Typography>
                {viewData.category.additionaldetails &&
                typeof viewData.category.additionaldetails === "object" &&
                Object.keys(viewData.category.additionaldetails).length > 0 ? (
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
                            <td>{value ?? "—"}</td>
                          </tr>
                        ),
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
          ) : (
            <Typography variant="body2" color="text.secondary">
              No data available
            </Typography>
          )}
        </DialogContent>
      </Dialog>

      <Snackbar
        open={notice.open}
        autoHideDuration={4000}
        onClose={() => setNotice({ open: false, text: "" })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setNotice({ open: false, text: "" })}
          severity="warning"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notice.text || "This action is not allowed."}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Rate;
