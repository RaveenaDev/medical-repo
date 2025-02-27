import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  MenuItem,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addService,
  getAllDepartments,
  updateService,
} from "../../../../../../components/State/Admin/Action.js";

const EditRateModal = ({ open, handleClose,service}) => {
    console.log("Selected Services :",service)
    const serviceId = service.service.serviceId;
    console.log("IDDDDDDDDDDDDD:",serviceId)
    const [serviceDetails, setServiceDetails] = useState({
        serviceId: serviceId,
        name: service.service.serviceName,
        departmentName: service.service.department,
        subCategoryName:service.category.name,
        rateType:service.category.rateType,
        rate:service.category.currentRate,
        effectiveDate:service.category.effectiveDate,
        amenities:service.category.amenities,
    });

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
        const pass = {
            serviceId: serviceDetails.serviceId,
            name: serviceDetails.name,
            departmentName: serviceDetails.departmentName,
            categories: {
                _id : service.category.categoryId,
                subCategoryName:serviceDetails.subCategoryName,
                rateType:serviceDetails.rateType,
                rate:serviceDetails.rate,
                effectiveDate:serviceDetails.effectiveDate,
                amenities:serviceDetails.amenities,
            }
        }
        console.log("Edited Testing Service Details: ",pass)
        dispatch(updateService(pass))
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
        />

        <TextField
          select
          label="Deparment Name"
          fullWidth
          margin="dense"
          name="departmentName"
          value={serviceDetails.departmentName}
          onChange={handleChange}
        >
          {departments.map((department, index) => (
            <MenuItem key={index} value={department.departmentName}>
              {department.departmentName}
            </MenuItem>
          ))}
        </TextField>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "16px",
          }}
        >
          <TextField
            label="Category Name"
            fullWidth
            margin="dense"
            name="subCategoryName"
            value={serviceDetails.subCategoryName}
            onChange={handleChange}
          />
          <TextField
            label="Rate Type"
            fullWidth
            margin="dense"
            name="rateType"
            value={serviceDetails.rateType}
            onChange={handleChange}
          />
          <TextField
            label="Current Rate"
            fullWidth
            margin="dense"
            type="number"
            name="rate"
            value={serviceDetails.rate}
            onChange={handleChange}
          />
          <TextField
            label="Amenities"
            fullWidth
            margin="dense"
            name="amenities"
            value={serviceDetails.amenities}
            onChange={handleChange}
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
          />
        </div>

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

export default EditRateModal;
