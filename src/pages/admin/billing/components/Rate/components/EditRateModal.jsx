import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
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
    new Date().toISOString().split("T")[0],
  );

  const handleChange = (e) => {
    setServiceDetails({
      ...serviceDetails,
      [e.target.name]: e.target.value,
    });
  };
  // Handle changes in additional details (object)
  const handleAdditionalDetailChange = (key, newKey, newValue) => {
    const updatedDetails = { ...serviceDetails.additionaldetails };

    // If user is changing the key name
    if (newKey !== undefined && key !== newKey) {
      updatedDetails[newKey] = newValue ?? updatedDetails[key];
      delete updatedDetails[key];
    } else {
      updatedDetails[key] = newValue;
    }

    setServiceDetails({
      ...serviceDetails,
      additionaldetails: updatedDetails,
    });
  };

  // Add a new additional detail (object entry)
  const handleAddAdditionalDetail = () => {
    setServiceDetails({
      ...serviceDetails,
      additionaldetails: {
        ...serviceDetails.additionaldetails,
        [`Detail_${Object.keys(serviceDetails.additionaldetails).length + 1}`]: 0,
      },
    });
  };

  // Remove a detail by key
  const handleRemoveAdditionalDetail = (key) => {
    const updatedDetails = { ...serviceDetails.additionaldetails };
    delete updatedDetails[key];
    setServiceDetails({
      ...serviceDetails,
      additionaldetails: updatedDetails,
    });
  };
  const handleSubmit = () => {
    const finalRate = totalRate;
    const pass = {
      serviceId: serviceDetails.serviceId,
      name: serviceDetails.name,
      categories: [
        {
          _id: service.category.categoryId,
          subCategoryName: serviceDetails.subCategoryName,
          rateType: serviceDetails.rateType,
          rate: finalRate,
          amenities: serviceDetails.amenities,
          additionaldetails: serviceDetails.additionaldetails,
        },
      ],
    };

    // console.log("Updated Service Data:", pass);
    dispatch(updateService(pass, serviceId));
    // Reset the form fields
    setServiceDetails({
      name: "",
      departmentName: "",
      subCategoryName: "",
      rateType: "",
      rate: "",
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
  // Calculate the total rate dynamically
  const totalRate =
    Object.keys(serviceDetails.additionaldetails || {}).length > 0
      ? Object.values(serviceDetails.additionaldetails || {}).reduce(
          (acc, val) => acc + (parseFloat(val) || 0),
          0,
        )
      : serviceDetails.rate;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Service</DialogTitle>
      <DialogContent>
        <TextField
          label="Service Category"
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
            label="Name"
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
            value={totalRate}
            onChange={handleChange}
            disabled={
              Object.keys(serviceDetails.additionaldetails || {}).length > 0
            }
            onWheel={(e) => e.target.blur()} //  Prevent scroll change
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
                            key,
                            e.target.value,
                            value,
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
                        onWheel={(e) => e.target.blur()} //  Prevent scroll change
                        onChange={(e) =>
                          handleAdditionalDetailChange(
                            key,
                            key,
                            parseFloat(e.target.value),
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
                        onClick={() => handleRemoveAdditionalDetail(key)}
                        style={{ cursor: "pointer", color: "red" }}
                      />
                    </Grid2>
                  </Grid2>
                ),
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
