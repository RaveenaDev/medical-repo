import React, { useCallback, useEffect, useState } from "react";

import {
  Box,
  CircularProgress,
  MenuItem,
  Select,
  TablePagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AddmissionForms.module.scss";
import ActionMenu from "./components/ActionMenu.jsx"; // Custom menu component for actions
import { Search } from "lucide-react";
import { getAdmissionRequests } from "../../../../components/State/Doctor/Action.js";
import useDebounce from "../../../../hooks/useDebounce.js";

const AdmissionFormsStaff = () => {
  const dispatch = useDispatch();

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // Filters (status, type, sort order)
  const [filters, setFilters] = useState({
    status: "",
    type: "",
    sort: "desc",
  });
  const [sortOrder, setSortOrder] = useState("desc");

  // Redux store: inpatients
  const admin = useSelector((store) => store.doctor);
  const totalAdmissionRequests = admin.admissionRequestsCount;
  const admissionRequests = admin.admissionRequests;
  const isLoadingAdmissionRequests = admin.isLoadingGetAdmissionRequests;
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Fetch patients whenever filters/pagination change
  useEffect(() => {
    dispatch(getAdmissionRequests(debouncedSearch, page, rowsPerPage, filters));
  }, [dispatch, debouncedSearch, page, rowsPerPage, filters]);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch, filters.status, sortOrder]);

  // Helper: truncate long strings (ID, name, email)
  const truncateText = (text, maxLength) =>
    text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  // Sort dropdown change
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    setFilters({ ...filters, sort: event.target.value });
  };

  // Pagination: page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Pagination: rows per page change
  const handleChangeRowsPerPage = useCallback((e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  }, []);

  return (
    <div className={styles.inpatientcontainer}>
      {/* Header Section */}
      <div className={styles.patientsHeader}>
        <div className={styles.headerTop}>
          <h2>Admission Forms</h2>
        </div>
        <hr />
        <div className={styles.headerBottom}>
          <span className={styles.patientCount}>
            {totalAdmissionRequests} <span>Forms</span>
          </span>
          <div className={styles.verticalDivider}></div>

          {/* Sort + Filter Controls */}
          <div className={styles.sortFilterSection}>
            {/* Sort dropdown */}
            <div className={styles.sortBy}>
              <span>Sort by:</span>
              <Select
                value={sortOrder}
                onChange={handleSortChange}
                size="small"
                sx={{
                  minWidth: 180,
                  background: "#fff",
                  color: "#4A4A4A",
                  boxShadow: "0px 4px 4px 0px #BDBDBD1C",
                  border: "1px solid transparent",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                }}
              >
                <MenuItem value="desc">Newest to Oldest</MenuItem>
                <MenuItem value="asc">Oldest to Newest</MenuItem>
              </Select>
            </div>
            <div className={styles.filterSearch}>
              <div className={styles["search-wrapper"]}>
                <Search size={18} className={styles["search-icon"]} />
                <input
                  type="text"
                  placeholder="Search inpatients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles["search-input"]}
                />
              </div>
              {/* Filter button */}
            </div>
          </div>
        </div>
        <hr />
      </div>
      {isLoadingAdmissionRequests ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "67vh", // or full height you need
          }}
        >
          <CircularProgress sx={{ color: "#25307F" }} size={55} />
        </Box>
      ) : (
        <>
          {/* Patients Table */}
          <div className={styles.patientsTableContainer}>
            {admissionRequests && admissionRequests.length > 0 ? (
              <div className={styles.tableWrapper}>
                <table className={styles.patientsTable}>
                  <thead>
                    <tr>
                      <th>Patient ID</th>
                      <th>Patient</th>
                      <th>Bed</th>
                      <th>Insurance</th>
                      <th>Doctor</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admissionRequests.map((patient, index) => (
                      <tr key={index}>
                        <td className={styles.patientId}>
                          {truncateText(
                            patient?.patient?.patId || "Not Assigned",
                            12
                          )}
                        </td>
                        <td className={styles.patientInfo}>
                          <div>
                            <div className={styles.patientName}>
                              {truncateText(
                                patient?.admissionDetails?.name ||
                                  "Not Assigned",
                                25
                              )}
                            </div>
                            <div className={styles.patientEmail}>
                              {truncateText(
                                patient?.admissionDetails?.contact ||
                                  "Not Assigned",
                                15
                              )}
                            </div>
                          </div>
                        </td>
                        <td className={styles.bedNumber}>
                          <div>
                            {patient?.admissionDetails?.bed?.bedNumber ||
                              "Not Assigned"}
                          </div>
                          <div>
                            {patient?.admissionDetails?.bed?.bedType ||
                              "Not Assigned"}
                          </div>
                        </td>
                        <td className={styles.condition}>
                          {patient?.admissionDetails?.insurance?.hasInsurance
                            ? "Insured"
                            : "Not Insured"}
                        </td>
                        <td className={styles.doctor}>
                          {patient?.doctor?.name || "Not Assigned"}
                        </td>

                        <td className={styles.actions}>
                          {/* Menu with options like Add Insurance */}
                          <ActionMenu patient={patient} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className={styles.noDataMessage}>No inpatients found.</div>
            )}
          </div>

          {/* Pagination Section */}
          <Box
            sx={{
              width: "100%",
              position: "sticky",
              bottom: 0,
              backgroundColor: "#fff",
              borderTop: "2px solid #ddd",
              zIndex: 2,
            }}
          >
            <TablePagination
              component="div"
              count={totalAdmissionRequests}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 20, 50, 100]}
            />
          </Box>
        </>
      )}
    </div>
  );
};

export default AdmissionFormsStaff;
