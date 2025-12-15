import React, { useEffect, useState, useCallback, useMemo } from "react";
import styles from "./Records.module.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  getBillDetails,
  getBillingRecords,
} from "../../../../../components/State/Admin/Action.js";
import useDebounce from "../../../../../hooks/useDebounce.js";

import RecordModal from "./components/RecordsModal.jsx";
import RecordsHeader from "./components/RecordsHeader.jsx";
import RecordsTable from "./components/RecordsTable.jsx";
import RecordsDrawer from "./components/RecordsDrawer.jsx";
import { useNavigate } from "react-router-dom";

/* ----------------- main component ----------------- */
const Records = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedBillId, setSelectedBillId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("Monthly");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({ status: "" });

  const debouncedSearch = useDebounce(searchQuery, 500);

  const billingRecords = useSelector((s) => s.admin?.billingRecords ?? []);

  // console.log("billingRecords", billingRecords);
  const billsCount = useSelector((s) => s.admin?.recordsCount ?? 0);
  const selectedBill = useSelector((s) => s.admin?.billingRecord ?? null);
  const loading = useSelector((s) => s.admin?.loading ?? false);
  const error = useSelector((s) => s.admin?.error ?? null);

  useEffect(() => {
    dispatch(getBillingRecords(page, rowsPerPage, debouncedSearch));
  }, [dispatch, page, rowsPerPage, debouncedSearch, sortOrder, filters]);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch, filters.status, sortOrder]);

  // const handleViewClick = useCallback(
  //   (billId) => {
  //     setSelectedBillId(billId);
  //     setOpenModal(true);
  //     dispatch(getBillDetails(billId));
  //   },
  //   [dispatch]
  // );
  const handleViewClick = useCallback(
    (billId) => {
      // dispatch(getBillDetails(billId));
      navigate(`${billId}`);
    },
    [dispatch, navigate]
  );
  const handleCloseModal = useCallback(() => setOpenModal(false), []);
  const handleChangePage = useCallback((_, newPage) => setPage(newPage), []);
  const handleChangeRowsPerPage = useCallback((e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  }, []);
  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((p) => ({ ...p, [name]: value }));
  }, []);
  const handleSearchResults = useCallback(() => {
    setFilterDrawerOpen(false);
    setPage(0);
  }, []);

  const rowsList = useMemo(() => billingRecords, [billingRecords]);

  return (
    <div className={styles["billing-container"]}>
      <RecordsHeader
        billsCount={billsCount}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <RecordsTable
        rowsList={rowsList}
        loading={loading}
        error={error}
        onView={handleViewClick}
        billsCount={billsCount}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />

      {/* <RecordModal
        open={openModal}
        bill={selectedBill}
        onClose={handleCloseModal}
        billId={selectedBillId}
      /> */}

      <RecordsDrawer
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleSearchResults={handleSearchResults}
      />
    </div>
  );
};

export default Records;
