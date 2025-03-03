import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addService,
  getAllDepartments,
} from "../../../../../../components/State/Admin/Action.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RateModal = ({ open, handleClose }) => {
  const [serviceDetails, setServiceDetails] = useState({
    name: "",
    departmentName: "",
    subCategoryName: "",
    rateType: "",
    rate: "",
    effectiveDate: "",
    amenities: "",
  });

  const [errors, setErrors] = useState({}); // Added error state

  const [lastUpdated, setLastUpdated] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleChange = (e) => {
    setServiceDetails({
      ...serviceDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    let newErrors = {};

    Object.keys(serviceDetails).forEach((key) => {
      if (!serviceDetails[key]) {
        newErrors[key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all required fields!", {
        position: "bottom-right",
      });
      return;
    }

    dispatch(addService(serviceDetails));

    // Reset the form fields
    setServiceDetails({
      name: "",
      departmentName: "",
      subCategoryName: "",
      rateType: "",
      rate: "",
      effectiveDate: "",
      amenities: "",
    });
    setErrors({});
    handleClose();
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDepartments());
  }, [dispatch]);

  const departments = useSelector((store) => store.admin.departments);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Service</DialogTitle>
      <DialogContent>
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

        <TextField
          select
          label="Department Name"
          fullWidth
          margin="dense"
          name="departmentName"
          value={serviceDetails.departmentName}
          onChange={handleChange}
          error={!!errors.departmentName}
          helperText={errors.departmentName}
          required
        >
          {departments.map((department, index) => (
            <MenuItem key={index} value={department.departmentName}>
              {department.departmentName}
            </MenuItem>
          ))}
        </TextField>

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
        <TextField
          label="Current Rate"
          fullWidth
          margin="dense"
          type="number"
          name="rate"
          value={serviceDetails.rate}
          onChange={handleChange}
          error={!!errors.rate}
          helperText={errors.rate}
          required
        />
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

        <TextField
          label="Last Updated"
          fullWidth
          margin="dense"
          type="date"
          value={lastUpdated}
          disabled
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ marginTop: 2, background: "#25307F" }}
        >
          Done
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RateModal;
