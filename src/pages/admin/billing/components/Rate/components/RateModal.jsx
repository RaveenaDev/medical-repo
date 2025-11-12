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
import {
  addService,
  getAllDepartments,
} from "../../../../../../components/State/Admin/Action.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2Icon } from "lucide-react";

const RateModal = ({ open, handleClose }) => {
  const [serviceDetails, setServiceDetails] = useState({
    name: "",
    departmentNames: [], // now an array
    subCategoryName: "",
    rateType: "",
    rate: "",
    amenities: "",
    effectiveDate: "",
    additionaldetails: [],
  });

  const [errors, setErrors] = useState({});
  const [lastUpdated, setLastUpdated] = useState(
    new Date().toISOString().split("T")[0]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDepartments());
  }, [dispatch]);

  const departments = useSelector((store) => store.admin.departments);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceDetails((prev) => ({ ...prev, [name]: value }));
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
      field === "value" ? parseFloat(value) : value;
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

    Object.keys(serviceDetails).forEach((key) => {
      if (
        key !== "additionaldetails" &&
        key !== "departmentNames" && // allow none selected
        (key !== "rate" || serviceDetails.additionaldetails.length === 0) &&
        !serviceDetails[key]
      ) {
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

    const finalRate = totalRate;

    const finalServiceDetails = {
      ...serviceDetails,
      rate: finalRate,
      additionaldetails: serviceDetails.additionaldetails.reduce(
        (acc, item) => ({ ...acc, [item.key]: item.value }),
        {}
      ),
    };

    console.log("Final Service Details to be submitted:", finalServiceDetails);

    dispatch(addService(finalServiceDetails));
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

  const totalRate =
    serviceDetails.additionaldetails.length > 0
      ? serviceDetails.additionaldetails.reduce(
          (acc, item) => acc + item.value,
          0
        )
      : serviceDetails.rate;

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

        {/* Multiple Select for Departments */}
        <TextField
          select
          label="Departments"
          fullWidth
          margin="dense"
          name="departmentNames"
          SelectProps={{
            multiple: true,
            value: serviceDetails.departmentNames,
            onChange: handleDepartmentChange,
            renderValue: (selected) => selected.join(", "),
          }}
        >
          {departments.map((department, index) => (
            <MenuItem key={index} value={department.departmentName}>
              <Checkbox
                checked={serviceDetails.departmentNames.includes(
                  department.departmentName
                )}
              />
              <ListItemText primary={department.departmentName} />
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
          label="Current Rate"
          fullWidth
          margin="dense"
          type="number"
          name="rate"
          value={totalRate}
          onChange={handleChange}
          error={!!errors.rate}
          helperText={errors.rate}
          disabled={serviceDetails.additionaldetails.length > 0}
          onWheel={(e) => e.target.blur()} //  Prevent scroll change
        />

        {/* Additional Details */}
        <div>
          <Grid container spacing={2} marginTop={1}>
            {serviceDetails.additionaldetails.map((item, index) => (
              <Grid item xs={12} container spacing={1} key={index}>
                <Grid item xs={6}>
                  <TextField
                    label="Detail Name"
                    fullWidth
                    value={item.key}
                    onChange={(e) =>
                      handleAdditionalDetailChange(index, "key", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    label="Value"
                    fullWidth
                    type="number"
                    value={item.value}
                    onWheel={(e) => e.target.blur()} //  Prevent scroll change
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
                  xs={1}
                  justifyContent="center"
                  display="flex"
                  alignItems="center"
                >
                  <Trash2Icon
                    onClick={() => handleRemoveAdditionalDetail(index)}
                    style={{ cursor: "pointer", color: "red" }}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
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
