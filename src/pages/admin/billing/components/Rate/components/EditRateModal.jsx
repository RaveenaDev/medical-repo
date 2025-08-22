import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Grid2,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDepartments,
  updateService,
} from "../../../../../../components/State/Admin/Action.js";
import { Trash2Icon } from "lucide-react";
const EditRateModal = ({ open, handleClose, service }) => {
  const serviceId = service.service.serviceId;
  // console.log(service);
  const [serviceDetails, setServiceDetails] = useState({
    serviceId: serviceId,
    name: service.service.serviceName,
    departmentName: service.service.department,
    subCategoryName: service.category.name,
    rateType: service.category.rateType,
    rate: service.category.currentRate,
    effectiveDate: service.category.effectiveDate,
    amenities: service.category.amenities,
    additionaldetails: service.category.additionaldetails || {},
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
  // Handle changes in additional details
  const handleAdditionalDetailChange = (index, field, value) => {
    const updatedDetails = [...serviceDetails.additionaldetails];
    updatedDetails[index][field] =
      field === "value" ? parseFloat(value) : value;
    setServiceDetails({
      ...serviceDetails,
      additionaldetails: updatedDetails,
    });
  };

  // Add a new additional detail
  const handleAddAdditionalDetail = () => {
    setServiceDetails({
      ...serviceDetails,
      additionaldetails: [
        ...serviceDetails.additionaldetails,
        { key: "", value: 0 },
      ],
    });
  };

  // Remove an additional detail by index
  const handleRemoveAdditionalDetail = (index) => {
    const updatedDetails = [...serviceDetails.additionaldetails];
    updatedDetails.splice(index, 1);
    setServiceDetails({
      ...serviceDetails,
      additionaldetails: updatedDetails,
    });
  };
  const handleSubmit = () => {
    const pass = {
      serviceId: serviceDetails.serviceId,
      name: serviceDetails.name,
      departmentName: serviceDetails.departmentName,
      categories: [
        {
          _id: service.category.categoryId,
          subCategoryName: serviceDetails.subCategoryName,
          rateType: serviceDetails.rateType,
          rate: serviceDetails.rate,
          effectiveDate: serviceDetails.effectiveDate,
          amenities: serviceDetails.amenities,
          additionaldetails: serviceDetails.additionaldetails,
        },
      ],
    };
    dispatch(updateService(pass));
    // Reset the form fields
    setServiceDetails({
      name: "",
      departmentName: "",
      subCategoryName: "",
      rateType: "",
      rate: "",
      effectiveDate: "",
      amenities: "",
      additionaldetails: {},
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
          {/* Additional Details Section */}
          <div>
            <Grid2 container spacing={2} marginTop={1}>
              {Object.entries(serviceDetails.additionaldetails).map(
                ([key, value], index) => (
                  <Grid2 item xs={12} container spacing={1} key={index}>
                    <Grid2 item xs={6}>
                      <TextField
                        label="Detail Name"
                        fullWidth
                        value={key}
                        onChange={(e) =>
                          handleAdditionalDetailChange(
                            index,
                            "key",
                            e.target.value
                          )
                        }
                      />
                    </Grid2>
                    <Grid2 item xs={5}>
                      <TextField
                        label="Value"
                        fullWidth
                        type="number"
                        value={value}
                        onChange={(e) =>
                          handleAdditionalDetailChange(
                            index,
                            "value",
                            e.target.value
                          )
                        }
                      />
                    </Grid2>
                    <Grid2
                      item
                      xs={1}
                      justifyContent="center"
                      display="flex"
                      alignItems="center"
                    >
                      <Trash2Icon
                        onClick={() => handleRemoveAdditionalDetail(index)}
                        style={{ cursor: "pointer", color: "red" }}
                      />
                    </Grid2>
                  </Grid2>
                )
              )}
            </Grid2>
            <Button
              variant="outlined"
              onClick={handleAddAdditionalDetail}
              sx={{ marginTop: 2, marginBottom: 2 }}
            >
              Add Custom Charges & Details
            </Button>
          </div>
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
