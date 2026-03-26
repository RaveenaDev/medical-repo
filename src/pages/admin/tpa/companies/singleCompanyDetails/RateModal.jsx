import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
  Grid,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2Icon } from "lucide-react";
import {
  addServiceToCompany,
  getAllDepartments,
} from "../../../../../components/State/Admin/Action.js";

/* ------- Helpers: Indian-format display + raw parsing (no commas in state) ------- */
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

const RateModal = ({ companyId, open, handleClose }) => {
  const [serviceDetails, setServiceDetails] = useState({
    name: "",
    departmentNames: [],
    subCategoryName: "",
    rateType: "",
    rate: "", // RAW numeric string (no commas)
    amenities: "",
    effectiveDate: "",
    additionaldetails: [],
  });

  const [errors, setErrors] = useState({});
  const [lastUpdated] = useState(new Date().toISOString().split("T")[0]);

  const dispatch = useDispatch();
  const departments = useSelector((store) => store.admin.departments) || [];

  useEffect(() => {
    dispatch(getAllDepartments());
  }, [dispatch]);

  const handleChange = (e) => {
    setServiceDetails({
      ...serviceDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Current Rate change handler (keeps RAW in state)
  const handleRateChange = (e) => {
    setServiceDetails((prev) => ({
      ...prev,
      rate: parseToRaw(e.target.value),
    }));
  };

  const handleDepartmentChange = (e) => {
    const { value } = e.target;
    setServiceDetails((prev) => ({
      ...prev,
      departmentNames: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleAdditionalDetailChange = (index, field, value) => {
    const updatedDetails = [...serviceDetails.additionaldetails];
    updatedDetails[index][field] =
      field === "value" ? parseFloat(value) || 0 : value;
    setServiceDetails({
      ...serviceDetails,
      additionaldetails: updatedDetails,
    });
  };

  const handleAddAdditionalDetail = () => {
    setServiceDetails({
      ...serviceDetails,
      additionaldetails: [
        ...serviceDetails.additionaldetails,
        { key: "", value: 0 },
      ],
    });
  };

  const handleRemoveAdditionalDetail = (index) => {
    const updatedDetails = [...serviceDetails.additionaldetails];
    updatedDetails.splice(index, 1);
    setServiceDetails({
      ...serviceDetails,
      additionaldetails: updatedDetails,
    });
  };

  const handleSubmit = async () => {
    let newErrors = {};
    if (!serviceDetails.name) newErrors.name = "This field is required";
    if (!serviceDetails.subCategoryName)
      newErrors.subCategoryName = "This field is required";
    if (!serviceDetails.rateType) newErrors.rateType = "This field is required";
    if (!serviceDetails.effectiveDate)
      newErrors.effectiveDate = "This field is required";
    if (!serviceDetails.amenities)
      newErrors.amenities = "This field is required";
    if (
      !serviceDetails.departmentNames ||
      serviceDetails.departmentNames.length === 0
    )
      newErrors.departmentNames = "Please select at least one department";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all required fields!", {
        position: "bottom-right",
      });
      return;
    }

    const additionalRate = serviceDetails.additionaldetails.reduce(
      (acc, item) => acc + (item.value || 0),
      0
    );

    const finalRate =
      serviceDetails.additionaldetails.length > 0
        ? additionalRate
        : parseFloat(serviceDetails.rate) || 0;

    const additionalDetailsObj = serviceDetails.additionaldetails.reduce(
      (acc, item) => {
        if (item.key) acc[item.key] = item.value;
        return acc;
      },
      {}
    );
    const selectedDepartmentIds = departments
      .filter((dep) =>
        serviceDetails.departmentNames?.includes(dep.departmentName)
      )
      .map((dep) => dep.departmentId);

    const payload = {
      serviceName: serviceDetails.name,
      categories: [
        {
          subCategoryName: serviceDetails.subCategoryName,
          rateType: serviceDetails.rateType,
          rate: finalRate,
          effectiveDate: new Date(serviceDetails.effectiveDate).toISOString(),
          amenities: serviceDetails.amenities,
          additionaldetails: additionalDetailsObj,
          departments: selectedDepartmentIds,
        },
      ],
    };
    // console.log("Final Payload to be submitted:", payload);

    dispatch(addServiceToCompany(companyId, payload));

    setServiceDetails({
      name: "",
      departmentNames: [],
      subCategoryName: "",
      rateType: "",
      rate: "",
      amenities: "",
      effectiveDate: "",
      additionaldetails: [],
    });
    setErrors({});
    handleClose();
  };

  // Display value (formatted) for Current Rate
  const additionalSum = serviceDetails.additionaldetails.reduce(
    (acc, item) => acc + (item.value || 0),
    0
  );
  const isAutoRate = serviceDetails.additionaldetails.length > 0;
  const displayRate = isAutoRate
    ? formatIndian(additionalSum)
    : formatIndian(serviceDetails.rate);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Add Service</DialogTitle>
      <DialogContent>
        {/* Service fields in a responsive 2-column grid */}
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Service Name"
              fullWidth
              margin="dense"
              name="name"
              value={serviceDetails.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Departments"
              fullWidth
              margin="dense"
              name="departmentNames"
              SelectProps={{
                multiple: true,
                value: serviceDetails.departmentNames || [],
                onChange: handleDepartmentChange,
                renderValue: (selected) => selected.join(", "),
              }}
              error={!!errors.departmentNames}
              helperText={errors.departmentNames}
              required
            >
              {departments.map((department, index) => (
                <MenuItem key={index} value={department.departmentName}>
                  <Checkbox
                    checked={serviceDetails.departmentNames?.includes(
                      department.departmentName
                    )}
                  />
                  <ListItemText primary={department.departmentName} />
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Category Name"
              fullWidth
              margin="dense"
              name="subCategoryName"
              value={serviceDetails.subCategoryName}
              onChange={handleChange}
              error={!!errors.subCategoryName}
              helperText={errors.subCategoryName}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Rate Type"
              fullWidth
              margin="dense"
              name="rateType"
              value={serviceDetails.rateType}
              onChange={handleChange}
              error={!!errors.rateType}
              helperText={errors.rateType}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Amenities"
              fullWidth
              margin="dense"
              name="amenities"
              value={serviceDetails.amenities}
              onChange={handleChange}
              error={!!errors.amenities}
              helperText={errors.amenities}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            {/* Current Rate with Indian commas */}
            <TextField
              label="Current Rate"
              fullWidth
              margin="dense"
              type="text" // allow commas in display
              inputMode="decimal" // numeric keypad on mobile
              name="rate"
              value={displayRate}
              onChange={(e) => {
                if (isAutoRate) return; // ignore edits if auto-calculated
                handleRateChange(e);
              }}
              error={!!errors.rate}
              helperText={errors.rate}
              disabled={isAutoRate}
            />
          </Grid>
        </Grid>

        {/* Additional Details rows */}
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {serviceDetails.additionaldetails.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Detail Name"
                    fullWidth
                    value={item.key}
                    onChange={(e) =>
                      handleAdditionalDetailChange(index, "key", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={10} md={5}>
                  <TextField
                    label="Value"
                    fullWidth
                    type="number"
                    value={item.value}
                    onChange={(e) =>
                      handleAdditionalDetailChange(
                        index,
                        "value",
                        e.target.value
                      )
                    }
                  />
                </Grid>
                <Grid
                  item
                  xs={2}
                  md={1}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Trash2Icon
                    onClick={() => handleRemoveAdditionalDetail(index)}
                    style={{ cursor: "pointer", color: "red" }}
                  />
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>

        <Button
          variant="outlined"
          onClick={handleAddAdditionalDetail}
          sx={{ mt: 1, mb: 2 }}
        >
          Add Custom Charges & Details
        </Button>

        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Effective Date"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              type="date"
              name="effectiveDate"
              value={serviceDetails.effectiveDate}
              onChange={handleChange}
              error={!!errors.effectiveDate}
              helperText={errors.effectiveDate}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Last Updated"
              fullWidth
              margin="dense"
              type="date"
              value={lastUpdated}
              disabled
            />
          </Grid>
        </Grid>

        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ mt: 1, background: "#00a378" }}
        >
          Done
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RateModal;
