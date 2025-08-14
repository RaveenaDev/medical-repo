import React, { useEffect, useState } from "react";
import styles from "./SingleCompanyDetails.module.scss";
import Searchbar from "../../../../../components/Searchbar";
import Notifications from "../../../../../components/NotificationFunc/Notification";
import { ChevronLeft, MoreVerticalIcon } from "lucide-react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Box,
  Button,
  Chip,
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
import { useNavigate } from "react-router-dom";
const SingleCompanyDetails = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [anchorE2, setAnchorE2] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  // Dummy services data
  const services = Array.from({ length: 20 }, (_, i) => ({
    serviceId: `srv-${i + 1}`,
    serviceName: `Service ${i + 1}`,
    department: ["Cardiology", "Neurology", "Orthopedics", "Dermatology"][
      i % 4
    ],
    categories: Array.from({ length: 3 }, (_, j) => ({
      categoryId: `cat-${i + 1}-${j + 1}`,
      name: `Category ${j + 1}`,
      rateType: ["Fixed", "Variable"][j % 2],
      currentRate: Math.floor(Math.random() * 5000) + 500,
      effectiveDate: new Date(
        2025,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ).toISOString(),
      lastUpdated: "14-08-2025",
      amenities: ["WiFi", "AC Room", "Parking"][j % 3],
    })),
  }));
  const handleBackBtn = () => {
    navigate("/admin/tpa");
  };
  // Pagination
  const paginatedServices = services.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // reset to first page when rows per page changes
  };
  // Helpers
  const truncateText = (text, length) =>
    text.length > length ? text.slice(0, length) + "..." : text;

  const handleOpenMenu = (event, service, category) => {
    setAnchorE2(event.currentTarget);
    setSelectedService({ service, category });
  };

  const handleCloseMenu = () => {
    setAnchorE2(null);
    setSelectedService(null);
  };

  const handleDelete = () => {
    console.log("Delete category:", selectedService?.category?.categoryId);
    handleCloseMenu();
  };

  const handleDeleteService = () => {
    console.log("Delete service:", selectedService?.service?.serviceId);
    handleCloseMenu();
  };
  return (
    <div className={styles.container}>
      <div className={styles.searchAndNotification}>
        <Searchbar /> <Notifications />
      </div>
      <div className={styles.content}>
        <div className={styles.backContainer}>
          <ChevronLeft onClick={handleBackBtn} className={styles.backIcon} />
          <p>Company</p>
        </div>
        <div className={styles.rateContainer}>
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
                  7 {/* services.length */}
                </Typography>
                <Typography
                  component="span"
                  variant="body1"
                  sx={{ fontWeight: "normal", color: "#878787", marginLeft: 1 }}
                >
                  Services
                </Typography>
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

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  startIcon={<FilterAltIcon sx={{ color: "#878787" }} />}
                  sx={{
                    textTransform: "none",
                    padding: "6px 20px",
                    backgroundColor: "white",
                    borderRadius: "5px",
                    fontSize: "16px",
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
          <div className={styles.rateTable} style={{ position: "relative" }}>
            <div className={styles.rateTableHeader}>
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
                paginatedServices
                  .filter(
                    (service) =>
                      !selectedFilter || service.serviceName === selectedFilter
                  )
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
                            {index === 0
                              ? truncateText(service.department, 16)
                              : ""}
                          </span>
                          <span className={styles.blue}>
                            {truncateText(category.name, 20)}
                          </span>
                          <span>{category.rateType}</span>
                          <span className={styles.blue}>
                            ₹{category.currentRate}
                          </span>
                          <span>
                            {new Date(
                              category.effectiveDate
                            ).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </span>
                          <span>{category.lastUpdated}</span>
                          <span className={styles.blue}>
                            {category.amenities}
                          </span>
                          <IconButton
                            onClick={(event) =>
                              handleOpenMenu(event, service, category)
                            }
                          >
                            <MoreVerticalIcon />
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
                                    maskType="alpha"
                                    maskUnits="userSpaceOnUse"
                                    x="0"
                                    y="0"
                                    width="20"
                                    height="20"
                                  >
                                    <rect
                                      width="20"
                                      height="20"
                                      fill="#D9D9D9"
                                    />
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
                <div className={styles.serviceContainer}>
                  <div
                    className={styles.rateTableRow}
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
        </div>
      </div>
    </div>
  );
};

export default SingleCompanyDetails;
