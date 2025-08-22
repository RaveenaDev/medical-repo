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
import {addServiceToCompany, getAllDepartments} from "../../../../../components/State/Admin/Action.js";

const RateModal = ({companyId, open, handleClose }) => {
    const [serviceDetails, setServiceDetails] = useState({
        name: "",
        departmentName: "",
        subCategoryName: "",
        rateType: "",
        rate: "", // default base rate
        amenities: "",
        effectiveDate: "", // New field for effective date
        additionaldetails: [], // Array of { key: '', value: 0 }
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
        setServiceDetails({
            ...serviceDetails,
            [e.target.name]: e.target.value,
        });
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

        // Validate required fields
        if (!serviceDetails.name) newErrors.name = "This field is required";
        if (!serviceDetails.subCategoryName) newErrors.subCategoryName = "This field is required";
        if (!serviceDetails.rateType) newErrors.rateType = "This field is required";
        if (!serviceDetails.effectiveDate) newErrors.effectiveDate = "This field is required";
        if (!serviceDetails.amenities) newErrors.amenities = "This field is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Please fill all required fields!", {
                position: "bottom-right",
            });
            return;
        }

        // Calculate total rate
        const additionalRate = serviceDetails.additionaldetails.reduce(
            (acc, item) => acc + (item.value || 0),
            0
        );

        const finalRate =
            serviceDetails.additionaldetails.length > 0
                ? additionalRate
                : parseFloat(serviceDetails.rate) || 0;

        // Convert additionaldetails array → object
        const additionalDetailsObj = serviceDetails.additionaldetails.reduce(
            (acc, item) => {
                if (item.key) acc[item.key] = item.value;
                return acc;
            },
            {}
        );

        // Final payload in backend format
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
                },
            ],
        };

        // console.log("Payload to backend: ", payload);

        // dispatch to backend
        dispatch(addServiceToCompany(companyId, payload));

        // Reset form
        setServiceDetails({
            name: "",
            departmentName: "",
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


    // Calculate the total rate, which is the sum of the additional details
    const totalRate =
        serviceDetails.additionaldetails.length > 0
            ? serviceDetails.additionaldetails.reduce(
                (acc, item) => acc + item.value,
                0
            )
            : serviceDetails.rate; // Use base rate if no additional details

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

                {/* Current Rate Section */}
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
                    disabled={serviceDetails.additionaldetails.length > 0} // Disable when additional details are added
                />

                {/* Additional Details Section */}
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
