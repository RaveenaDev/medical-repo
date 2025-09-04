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
    const stripped = String(input).replace(/,/g, "").replace(/[^\d.]/g, "");
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
        services: [],
    });

    const [serviceDetails, setServiceDetails] = useState({
        name: "",
        departmentName: "",
        subCategoryName: "",
        rateType: "",
        rate: "", // keep RAW numeric string (no commas)
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
        setServiceDetails({ ...serviceDetails, [e.target.name]: e.target.value });
    };

    const handleRateChange = (e) => {
        setServiceDetails((prev) => ({ ...prev, rate: parseToRaw(e.target.value) }));
    };

    const handleAdditionalDetailChange = (index, field, value) => {
        const updated = [...serviceDetails.additionaldetails];
        updated[index][field] = field === "value" ? parseFloat(value) || 0 : value;
        setServiceDetails({ ...serviceDetails, additionaldetails: updated });
    };

    const handleAddAdditionalDetail = () => {
        setServiceDetails((prev) => ({
            ...prev,
            additionaldetails: [...prev.additionaldetails, { key: "", value: 0 }],
        }));
    };

    const handleRemoveAdditionalDetail = (index) => {
        const updated = [...serviceDetails.additionaldetails];
        updated.splice(index, 1);
        setServiceDetails({ ...serviceDetails, additionaldetails: updated });
    };

    const handleAddService = () => {
        let newErrors = {};
        if (!serviceDetails.name) newErrors.name = "This field is required";
        if (!serviceDetails.subCategoryName)
            newErrors.subCategoryName = "This field is required";
        if (!serviceDetails.rateType) newErrors.rateType = "This field is required";
        if (!serviceDetails.effectiveDate)
            newErrors.effectiveDate = "This field is required";
        if (!serviceDetails.amenities)
            newErrors.amenities = "This field is required";

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

        dispatch(addInsuranceCompany(payload));

        setCompanyData({ id: "", name: "", services: [] });
        handleClose();
    };

    // compute value to DISPLAY (formatted), but keep RAW in state
    const additionalSum = serviceDetails.additionaldetails.reduce(
        (acc, item) => acc + (item.value || 0),
        0
    );
    const isAutoRate = serviceDetails.additionaldetails.length > 0;
    const displayRate = isAutoRate
        ? formatIndian(additionalSum)                // show formatted sum when auto
        : formatIndian(serviceDetails.rate);         // show formatted manual rate

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

                <p style={{ fontWeight: 500, color: "#25307F", marginTop: "1rem" }}>
                    Service
                </p>

                {/* Service Fields (2 columns per row) */}
                <Grid container spacing={1} sx={{ mb: -1 }}>
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
                            type="text"            // allow commas
                            inputMode="decimal"    // mobile numeric keypad
                            name="rate"
                            value={displayRate}
                            onChange={(e) => {
                                if (isAutoRate) return;     // ignore edits if auto-calculated
                                handleRateChange(e);
                            }}
                            disabled={isAutoRate}
                        />
                    </Grid>
                </Grid>

                {/* Additional Details */}
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {serviceDetails.additionaldetails.map((item, index) => (
                        <Grid item xs={12} key={index}>
                            <Grid container spacing={2} alignItems="center">
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
                                            handleAdditionalDetailChange(index, "value", e.target.value)
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
                    sx={{ mt: 2, mb: 1 }}
                >
                    Add Custom Charges & Details
                </Button>

                <Grid container spacing={1} sx={{ mb: 1 }}>
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

                {/* Buttons */}
                <Grid container spacing={2}>
                    <Grid item>
                        <Button onClick={handleAddService} variant="outlined">
                            Add Service
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={handleSaveCompany}
                            variant="contained"
                            sx={{ background: "#25307F" }}
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
