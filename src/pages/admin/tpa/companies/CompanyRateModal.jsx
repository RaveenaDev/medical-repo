import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2Icon } from "lucide-react";
import {
  addInsuranceCompany,
  getAllDepartments,
} from "../../../../components/State/Admin/Action.js";

/* ------- Helpers: Indian-format display + raw parsing (no commas kept in state) ------- */
const formatIndian = (val) => {
  if (val === "" || val == null) return "";
  const s = String(val);
  const [rawInt = "", rawDec = ""] = s.split(".");
  const intOnly = rawInt.replace(/\D/g, "");
  const decOnly = rawDec.replace(/\D/g, "");
  if (!intOnly) return decOnly ? `0.${decOnly}` : "";

  const last3 = intOnly.slice(-3);
  const head = intOnly.slice(0, -3);
  const headWithCommas = head.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  const withCommas = (head ? headWithCommas + "," : "") + last3;
  return decOnly ? `${withCommas}.${decOnly}` : withCommas;
};

// keep only digits and a single dot; normalize leading '.' → '0.'
const parseToRaw = (input) => {
  const stripped = String(input)
    .replace(/,/g, "")
    .replace(/[^\d.]/g, "");
  if (!stripped) return "";
  const parts = stripped.split(".");
  const intPart = parts[0].replace(/^0+(?=\d)/, "");
  const decPart = parts.slice(1).join("");
  let raw = intPart || "0";
  if (decPart.length) raw += "." + decPart;
  if (stripped.startsWith(".")) raw = "0." + decPart;
  return raw;
};
/* ---------------------------------------------------------------------- */

const CompanyRateModal = ({ open, handleClose }) => {
  const [companyData, setCompanyData] = useState({
    id: "",
    name: "",
  });

  const [errors, setErrors] = useState({});
  const [lastUpdated] = useState(new Date().toISOString().split("T")[0]);

  const dispatch = useDispatch();
  const departments = useSelector((store) => store.admin.departments) || [];

  useEffect(() => {
    dispatch(getAllDepartments());
  }, [dispatch]);

  const handleSaveCompany = () => {
    const payload = {
      id: companyData.id,
      name: companyData.name,
    };

    dispatch(addInsuranceCompany(payload));

    setCompanyData({ id: "", name: "" });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle style={{ fontWeight: 600, color: "#25307F" }}>
        Add Company
      </DialogTitle>
      <DialogContent>
        {/* Company Info (2 columns) */}
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Company ID"
              fullWidth
              margin="dense"
              name="id"
              value={companyData.id}
              onChange={(e) =>
                setCompanyData({ ...companyData, id: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Company Name"
              fullWidth
              margin="dense"
              name="name"
              value={companyData.name}
              onChange={(e) =>
                setCompanyData({ ...companyData, name: e.target.value })
              }
            />
          </Grid>
        </Grid>

        {/* Buttons */}
        <Grid container spacing={2}>
          <Grid item>
            <Button
              onClick={handleSaveCompany}
              variant="contained"
              sx={{ background: "#25307F" }}
            >
              Save Company
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyRateModal;
