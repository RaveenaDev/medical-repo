import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Three-dot menu icon
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import "./Rate.scss";

import RateModal from "./components/RateModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteService,
  deleteServiceCategory,
  getServices,
} from "../../../../../components/State/Admin/Action.js";
import EditRateModal from "./components/EditRateModal.jsx";

const Rate = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const reduxServices = useSelector((store) => store.admin.services);

  const services = reduxServices.map((service) => ({
    serviceId: service._id,
    serviceName: service.name,
    department: service.department.name,
    categories: service.categories.map((category) => ({
      categoryId: category._id,
      name: category.subCategoryName,
      rateType: category.rateType,
      currentRate: category.rate,
      amenities: category.amenities || "N/A",
      effectiveDate: category.effectiveDate,
      lastUpdated: "11-01-2025",
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
    // dispatch(deleteService(selectedService.category.categoryId));
    dispatch(
      deleteServiceCategory(
        selectedService.service.serviceId,
        selectedService.category.categoryId
      )
    );
  };

  const handleDeleteService = () => {
    dispatch(deleteService(selectedService.service.serviceId));
  };

  const handleSelect = (option) => {
    setSelectedFilter(option);
    handleClose();
  };

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
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
          paddingY: 2,
          marginBottom: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
              }}
            >
              {services.length}
            </Typography>
            <Typography
              component="span"
              variant="body1"
              sx={{ fontWeight: "normal", color: "#878787", marginLeft: 1 }}
            >
              Services
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" sx={{ marginRight: 1, color: "black" }}>
              Sort by:
            </Typography>
            <Select
              value={sortOrder}
              onChange={handleSortChange}
              size="small"
              sx={{ minWidth: 160, background: "#fff" }}
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

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="filled"
            sx={{
              textTransform: "none",
              backgroundColor: "#25307F",
              color: "white",
              boxShadow: "0px 4px 4px 0px #C2C2C240",
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
          {/* Filter Button with Dropdown */}
          <Button
            variant="outlined"
            startIcon={<FilterAltOutlinedIcon />}
            sx={{ textTransform: "none" }}
            onClick={handleOpen}
          >
            {selectedFilter ? `Filter: ${selectedFilter}` : "Filter"}
          </Button>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {filterOptions.map((option) => (
              <MenuItem key={option} onClick={() => handleSelect(option)}>
                {option}
              </MenuItem>
            ))}
          </Menu>

          {/* Selected Filter Chip */}
          {selectedFilter && (
            <Chip
              label={selectedFilter}
              onDelete={() => setSelectedFilter("")}
              sx={{ bgcolor: "#e0e0e0" }}
            />
          )}
        </Box>
      </Box>
      <div className="rate-table">
        <div className="rate-table-header">
          <span>Service Name</span>
          <span>Department</span>
          <span>Category</span>
          <span>Rate Type</span>
          <span>Current Rate</span>
          <span>Effective Date</span>
          <span>Last Updated</span>
          <span>Amenities</span>
        </div>
        <div>
          {services.length > 0 ? (
            services
              .filter(
                (service) =>
                  !selectedFilter || service.serviceName === selectedFilter
              )
              .map((service, ayu) => (
                <div key={ayu} className="service-container">
                  {service.categories.map((category, index) => (
                    <div className="rate-table-row" key={index}>
                      <span className="blue">
                        {index === 0
                          ? truncateText(service.serviceName, 18)
                          : ""}
                      </span>
                      <span className="blue">
                        {index === 0
                          ? truncateText(service.department, 16)
                          : ""}
                      </span>
                      <span className="blue">
                        {truncateText(category.name, 20)}
                      </span>
                      <span>{category.rateType}</span>
                      <span className="blue">₹{category.currentRate}</span>
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
                      <span>{category.lastUpdated}</span>
                      <span className="blue">{category.amenities}</span>
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
                              category.categoryId
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

                        {index === 0 && (
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
                      </Menu>
                    </div>
                  ))}
                </div>
              ))
          ) : (
            <div className="service-container">
              <div className="rate-table-row">No Services Found</div>
            </div>
          )}
        </div>
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
    </div>
  );
};

export default Rate;
