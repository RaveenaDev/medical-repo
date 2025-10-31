import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import CommonPanel from "../Components/CommonPanel.jsx";
import addIcon from "../../../assets/plus.svg";
import ayu from "../../receptionist/doctors/doctors.module.scss";
import styles from "../../receptionist/styles.module.scss";
import {
  addStaff,
  deleteStaff,
  getStaffs,
  updateStaff,
} from "../../../components/State/Admin/Action.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import StaffTable from "./StaffTable.jsx";
import StaffActionsMenu from "./StaffActionsMenu.jsx";
import StaffFormDialog from "./StaffFormDialog.jsx";
import { validateStaff } from "./validators.js";

const FIXED_WRAPPER_SX = {
  background: "#f1f1f1",
  height: "99dvh",
  overflow: "hidden",
};
const FIXED_PANEL_SX = {
  position: "fixed",
  top: 0,
  padding: 10,
  width: "77%",
  background: "#F1F1F1",
  zIndex: 100,
};

const AdminStaffs = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // selectors with shallowEqual to avoid pointless rerenders
  const staffs = useSelector((s) => s.admin.staffs || [], shallowEqual);
  const loading = useSelector((s) => s.admin.isLoading === true);
  const count = useSelector((s) => s.admin.staffCount || 0);
  const departments = useSelector(
    (s) => s.admin.departments || [],
    shallowEqual
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selected, setSelected] = useState(null);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const emptyStaff = useMemo(
    () => ({
      staff_id: "",
      staffId: "",
      profile: "",
      name: "",
      phone: "",
      department: "",
      designation: "",
      status: "",
    }),
    []
  );

  const [addForm, setAddForm] = useState(emptyStaff);
  const [editForm, setEditForm] = useState(emptyStaff);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    props?.setIsSignUpOrLogin?.(false);
  }, []);

  // debounce fetch to prevent double fire during fast pagination changes
  useEffect(() => {
    const t = setTimeout(() => {
      dispatch(getStaffs(page, rowsPerPage));
    }, 120);
    return () => clearTimeout(t);
  }, [page, rowsPerPage, dispatch]);

  const onAddClick = useCallback(() => {
    setErrors({});
    setAddForm(emptyStaff);
    setAddOpen(true);
  }, [emptyStaff]);

  const openMenu = useCallback((event, staff) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelected(staff);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuAnchor(null);
    setSelected(null);
  }, []);

  const onEdit = useCallback(() => {
    if (!selected) return;
    setErrors({});
    setEditForm({
      staff_id: selected.staff_id ?? "",
      staffId: selected._id ?? "",
      profile: selected.profile ?? "",
      name: selected.name ?? "",
      phone: selected.phone ?? "",
      department:
        selected?.department?._id || selected?.department?.departmentId || "",
      designation: selected.designation ?? "",
      status: selected.status ?? "",
    });
    setEditOpen(true);
    closeMenu();
  }, [selected, closeMenu]);

  const onDelete = useCallback(() => {
    if (!selected?._id) return;
    dispatch(deleteStaff(selected._id));
    closeMenu();
  }, [dispatch, selected, closeMenu]);

  const handleChangePage = useCallback((_, newPage) => setPage(newPage), []);
  const handleChangeRowsPerPage = useCallback((e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  }, []);

  // object URL helper with revoke
  const handleImageChange = useCallback((file, setForm) => {
    setForm((f) => {
      if (f.profile?.startsWith("blob:")) URL.revokeObjectURL(f.profile);
      return f;
    });
    if (!file) {
      setForm((f) => ({ ...f, profile: "" }));
      return;
    }
    const url = URL.createObjectURL(file);
    setForm((f) => ({ ...f, profile: url }));
  }, []);
  useEffect(() => {
    return () => {
      // revoke any blob URLs when component unmounts
      if (addForm.profile?.startsWith("blob:"))
        URL.revokeObjectURL(addForm.profile);
      if (editForm.profile?.startsWith("blob:"))
        URL.revokeObjectURL(editForm.profile);
    };
  }, [addForm.profile, editForm.profile]);

  const submitAdd = useCallback(() => {
    const v = validateStaff(addForm);
    if (!v.ok) {
      setErrors(v.errors);
      toast.error("Please fill all required fields.");
      return;
    }
    setErrors({});
    dispatch(addStaff(addForm));
    setAddOpen(false);
  }, [dispatch, addForm]);

  const submitEdit = useCallback(() => {
    const v = validateStaff(editForm, true);
    if (!v.ok) {
      setErrors(v.errors);
      toast.error("Please fill all required fields.");
      return;
    }
    setErrors({});
    dispatch(updateStaff(editForm.staffId, editForm));
    setEditOpen(false);
  }, [dispatch, editForm]);

  return (
    <div style={FIXED_WRAPPER_SX}>
      <div style={FIXED_PANEL_SX}>
        <CommonPanel />
      </div>

      <div style={{ marginTop: 150 }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <CircularProgress sx={{ color: "#25307F" }} size={58} />
          </Box>
        ) : (
          <>
            <Box sx={{ borderBottom: "0.5px solid #4A4A4A8C", pb: 1.5 }}>
              <div className={ayu.headerContainer}>
                <span
                  onClick={() => navigate(-1)}
                  style={{
                    transform: "translateY(4px)",
                    color: "black",
                    cursor: "pointer",
                  }}
                >
                  <ArrowBackIosIcon />
                </span>
                <h2 className={ayu.departmentTitle}>Total Staffs:</h2>
                <h2 className={ayu.departmentTitleDetails}>{count}</h2>

                <div style={{ marginLeft: "auto" }}>
                  <Button
                    variant="contained"
                    sx={{
                      fontSize: 20,
                      color: "#ffffff",
                      textTransform: "capitalize",
                      p: "2px 18px",
                      backgroundColor: "#25307F",
                      boxShadow: "0px 4px 4px 0px #C2C2C240",
                      "&:hover": { background: "#AEC3FF" },
                    }}
                    onClick={onAddClick}
                  >
                    <img
                      src={addIcon}
                      className={styles.appointmentBlock__plusIcon}
                    />
                    Add
                  </Button>
                </div>
              </div>
            </Box>

            <StaffTable
              staffs={staffs}
              page={page}
              rowsPerPage={rowsPerPage}
              count={count}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              onOpenMenu={openMenu}
            />

            <StaffActionsMenu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={closeMenu}
              onEdit={onEdit}
              onDelete={onDelete}
            />

            <StaffFormDialog
              title="Add New Staff"
              open={addOpen}
              onClose={() => setAddOpen(false)}
              form={addForm}
              setForm={setAddForm}
              errors={errors}
              departments={departments}
              onSubmit={submitAdd}
              onImage={handleImageChange}
              submitLabel="Save"
            />

            <StaffFormDialog
              title="Edit Staff"
              open={editOpen}
              onClose={() => setEditOpen(false)}
              form={editForm}
              setForm={setEditForm}
              errors={errors}
              departments={departments}
              onSubmit={submitEdit}
              onImage={handleImageChange}
              submitLabel="Save"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminStaffs;
