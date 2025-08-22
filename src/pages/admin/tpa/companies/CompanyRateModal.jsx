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
import {addInsuranceCompany, getAllDepartments} from "../../../../components/State/Admin/Action.js";
// import { addCompany } from "../../../../components/State/Admin/Action.js";

const CompanyRateModal = ({ open, handleClose }) => {
    const [companyData, setCompanyData] = useState({
        id: "",
        name: "",
        services: [],
    });

    const [serviceDetails, setServiceDetails] = useState({
        name: "",
        departmentName: "",
        subCategoryName: "",
        rateType: "",
        rate: "",
        amenities: "",
        effectiveDate: "",
        additionaldetails: [],
    });

    const [errors, setErrors] = useState({});
    const [lastUpdated] = useState(new Date().toISOString().split("T")[0]);

    const dispatch = useDispatch();
    const departments = useSelector((store) => store.admin.departments);

    useEffect(() => {
        dispatch(getAllDepartments());
    }, [dispatch]);

    const handleChange = (e) => {
        setServiceDetails({ ...serviceDetails, [e.target.name]: e.target.value });
    };

    const handleAdditionalDetailChange = (index, field, value) => {
        const updated = [...serviceDetails.additionaldetails];
        updated[index][field] = field === "value" ? parseFloat(value) : value;
        setServiceDetails({ ...serviceDetails, additionaldetails: updated });
    };

    const handleAddAdditionalDetail = () => {
        setServiceDetails({
            ...serviceDetails,
            additionaldetails: [...serviceDetails.additionaldetails, { key: "", value: 0 }],
        });
    };

    const handleRemoveAdditionalDetail = (index) => {
        const updated = [...serviceDetails.additionaldetails];
        updated.splice(index, 1);
        setServiceDetails({ ...serviceDetails, additionaldetails: updated });
    };

    const handleAddService = () => {
        let newErrors = {};
        if (!serviceDetails.name) newErrors.name = "This field is required";
        if (!serviceDetails.subCategoryName) newErrors.subCategoryName = "This field is required";
        if (!serviceDetails.rateType) newErrors.rateType = "This field is required";
        if (!serviceDetails.effectiveDate) newErrors.effectiveDate = "This field is required";
        if (!serviceDetails.amenities) newErrors.amenities = "This field is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Please fill all required fields!", { position: "bottom-right" });
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

        const additionalDetailsObj = serviceDetails.additionaldetails.reduce((acc, item) => {
            if (item.key) acc[item.key] = item.value;
            return acc;
        }, {});

        const newService = {
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

        setCompanyData((prev) => ({ ...prev, services: [...prev.services, newService] }));

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
    };

    const handleSaveCompany = () => {
        const payload = {
            id: companyData.id,
            name: companyData.name,
            services: companyData.services,
        };

        // console.log("Final Payload: ", payload);
        dispatch(addInsuranceCompany(payload));

        setCompanyData({id: "", name: "", services: [] });
        handleClose();
    };

    const totalRate =
        serviceDetails.additionaldetails.length > 0
            ? serviceDetails.additionaldetails.reduce((acc, item) => acc + item.value, 0)
            : serviceDetails.rate;

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Add Company</DialogTitle>
            <DialogContent>
                <TextField
                    label="Company ID"
                    fullWidth
                    margin="dense"
                    name="id"
                    value={companyData.id}
                    onChange={(e) => setCompanyData({ ...companyData, id: e.target.value })}
                />

                <TextField
                    label="Company Name"
                    fullWidth
                    margin="dense"
                    name="name"
                    value={companyData.name}
                    onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                />

                {/* Service Fields */}
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
                >
                    {departments.map((d, i) => (
                        <MenuItem key={i} value={d.departmentName}>
                            {d.departmentName}
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
                    disabled={serviceDetails.additionaldetails.length > 0}
                />

                {/* Additional Details */}
                <Grid container spacing={2} marginTop={1}>
                    {serviceDetails.additionaldetails.map((item, index) => (
                        <Grid item xs={12} container spacing={1} key={index}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Detail Name"
                                    fullWidth
                                    value={item.key}
                                    onChange={(e) => handleAdditionalDetailChange(index, "key", e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    label="Value"
                                    fullWidth
                                    type="number"
                                    value={item.value}
                                    onChange={(e) => handleAdditionalDetailChange(index, "value", e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={1} display="flex" alignItems="center">
                                <Trash2Icon
                                    onClick={() => handleRemoveAdditionalDetail(index)}
                                    style={{ cursor: "pointer", color: "red" }}
                                />
                            </Grid>
                        </Grid>
                    ))}
                </Grid>

                <Button variant="outlined" onClick={handleAddAdditionalDetail} sx={{ mt: 2, mb: 2 }}>
                    Add Custom Charges & Details
                </Button>

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

                {/* Buttons */}
                <Grid container spacing={2} mt={2}>
                    <Grid item>
                        <Button onClick={handleAddService} variant="outlined">
                            Add Service
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={handleSaveCompany} variant="contained" sx={{ background: "#25307F" }}
                                disabled={companyData.services.length === 0}
                        >
                            Save Company
                        </Button>
                    </Grid>
                </Grid>

                {/* Preview Services */}
                {companyData.services.length > 0 && (
                    <div style={{ marginTop: "1rem" }}>
                        <h4>Services Added:</h4>
                        <ul>
                            {companyData.services.map((s, i) => (
                                <li key={i}>
                                    {s.serviceName} — {s.categories[0].rateType} ({s.categories[0].rate})
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CompanyRateModal;
