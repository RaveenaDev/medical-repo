import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Trash2Icon } from "lucide-react";
import { editTPAService, getAllDepartments } from "../../../../../components/State/Admin/Action.js";

/* ------- Helper Functions: Indian-format display + raw parsing (no commas in state) ------- */
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

// Parse to RAW number (without commas or non-numeric characters)
const parseToRaw = (input) => {
    const stripped = String(input).replace(/,/g, "").replace(/[^\d.]/g, "");
    if (!stripped) return "";
    const parts = stripped.split(".");
    const intPart = parts[0].replace(/^0+(?=\d)/, ""); // remove leading zeros
    const decPart = parts.slice(1).join(""); // concatenate decimals
    let raw = intPart || "0";
    if (decPart.length) raw += "." + decPart;
    if (stripped.startsWith(".")) raw = "0." + decPart; // for inputs like ".5"
    return raw;
};
/* ---------------------------------------------------------------------- */

const EditRateModal = ({ companyId, open, handleClose, service }) => {
    const dispatch = useDispatch();
    const serviceId = service.service._id;
    const categoryId = service.category._id;

    // ✅ Format effectiveDate into YYYY-MM-DD
    const formattedDate = service.category.effectiveDate
        ? new Date(service.category.effectiveDate).toISOString().split("T")[0]
        : "";

    const [serviceDetails, setServiceDetails] = useState({
        serviceId: serviceId,
        name: service.service.serviceName,
        subCategoryName: service.category.subCategoryName,
        rateType: service.category.rateType,
        rate: service.category.rate,
        effectiveDate: formattedDate, // ✅ formatted here
        amenities: service.category.amenities,
        additionaldetails: service.category.additionaldetails || {},
    });

    // NEW: hold in-progress edits for keys so we don't rename on each keystroke
    const [draftKeys, setDraftKeys] = useState({});

    useEffect(() => {
        // Initialize draft keys when the modal opens / service changes
        setDraftKeys(() => {
            const map = {};
            Object.keys(serviceDetails.additionaldetails || {}).forEach((k) => {
                map[k] = k;
            });
            return map;
        });
    }, [open]); // Run only when `open` changes (i.e., modal opens or closes)

    // Reset form when modal is closed
    useEffect(() => {
        if (!open) {
            // Reset the form data when modal is closed
            setServiceDetails({
                serviceId: serviceId,
                name: service.service.serviceName,
                subCategoryName: service.category.subCategoryName,
                rateType: service.category.rateType,
                rate: service.category.rate,
                effectiveDate: formattedDate, // formatted here
                amenities: service.category.amenities,
                additionaldetails: service.category.additionaldetails || {},
            });
        }
    }, [open, serviceId, service, formattedDate]); // When `open`, `serviceId`, or `service` change

    const [lastUpdated, setLastUpdated] = useState(
        new Date().toISOString().split("T")[0]
    );

    const handleChange = (e) => {
        setServiceDetails({
            ...serviceDetails,
            [e.target.name]: e.target.value,
        });
    };

    // Current Rate change handler (keeps RAW in state)
    const handleRateChange = (e) => {
        setServiceDetails((prev) => ({ ...prev, rate: parseToRaw(e.target.value) }));
    };

    // Helper: rename a key but keep the same order in the object
    const renameKeyPreserveOrder = (obj, oldKey, newKey) => {
        if (!newKey || newKey === oldKey) return obj;
        if (Object.prototype.hasOwnProperty.call(obj, newKey)) return obj; // avoid overwrite

        const entries = Object.entries(obj);
        const out = {};
        for (const [k, v] of entries) {
            if (k === oldKey) {
                out[newKey] = v; // insert new key in the same position
            } else {
                out[k] = v;
            }
        }
        return out;
    };

    // Commit rename only on blur/Enter
    const commitKeyRename = (originalKey) => {
        const newKey = (draftKeys[originalKey] || "").trim();
        if (!newKey || newKey === originalKey) return;

        setServiceDetails((prev) => {
            const updated = renameKeyPreserveOrder(
                prev.additionaldetails,
                originalKey,
                newKey
            );
            return { ...prev, additionaldetails: updated };
        });

        // also fix the draft map to reflect the new canonical key
        setDraftKeys((prev) => {
            const { [originalKey]: _, ...rest } = prev;
            return { ...rest, [newKey]: newKey };
        });
    };

    // Value changes (numbers) stay instant as before
    const handleAdditionalValueChange = (key, newValue) => {
        setServiceDetails((prev) => ({
            ...prev,
            additionaldetails: {
                ...prev.additionaldetails,
                [key]: newValue,
            },
        }));
    };

    const handleAddAdditionalDetail = () => {
        setServiceDetails((prev) => {
            const count = Object.keys(prev.additionaldetails || {}).length + 1;
            const newKey = `Detail_${count}`;
            const additionaldetails = { ...prev.additionaldetails, [newKey]: 0 };
            return { ...prev, additionaldetails };
        });
        setDraftKeys((prev) => {
            const count = Object.keys(prev).length + 1;
            const newKey = `Detail_${count}`;
            return { ...prev, [newKey]: newKey };
        });
    };

    const handleRemoveAdditionalDetail = (key) => {
        setServiceDetails((prev) => {
            const updated = { ...prev.additionaldetails };
            delete updated[key];
            return { ...prev, additionaldetails: updated };
        });
        setDraftKeys((prev) => {
            const { [key]: _, ...rest } = prev;
            return rest;
        });
    };

    const totalRate =
        Object.keys(serviceDetails.additionaldetails || {}).length > 0
            ? Object.values(serviceDetails.additionaldetails || {}).reduce(
                (acc, val) => acc + (parseFloat(val) || 0),
                0
            )
            : serviceDetails.rate;

    const handleSubmit = () => {
        const finalRate = totalRate;
        const pass = {
            service: {
                serviceName: serviceDetails.name, // matches serviceFields
            },
            category: {
                subCategoryName: serviceDetails.subCategoryName,
                rateType: serviceDetails.rateType,
                rate: finalRate,
                effectiveDate: serviceDetails.effectiveDate,
                amenities: serviceDetails.amenities,
                additionaldetails: serviceDetails.additionaldetails,
            },
        };

        dispatch(editTPAService(companyId, serviceId, categoryId, pass));

        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>Edit Service</DialogTitle>
            <DialogContent>
                {/* Service fields (2 columns) */}
                <Grid container spacing={1}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Service Name"
                            fullWidth
                            margin="dense"
                            name="name"
                            value={serviceDetails.name}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Category Name"
                            fullWidth
                            margin="dense"
                            name="subCategoryName"
                            value={serviceDetails.subCategoryName}
                            onChange={handleChange}
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
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        {/* Current Rate with Indian commas */}
                        <TextField
                            label="Current Rate"
                            fullWidth
                            margin="dense"
                            type="text"            // allow commas in display
                            inputMode="decimal"    // numeric keypad on mobile
                            name="rate"
                            value={formatIndian(totalRate)}  // display formatted rate
                            onChange={handleRateChange}
                            disabled={Object.keys(serviceDetails.additionaldetails || {}).length > 0}
                        />
                    </Grid>

                    {/* Additional Details */}
                    <Grid item xs={12}>
                        <div>
                            <Grid container spacing={2} marginTop={1}>
                                {Object.entries(serviceDetails.additionaldetails).map(
                                    ([key, value]) => {
                                        const draftName = draftKeys[key] ?? key; // show draft while typing
                                        return (
                                            <Grid item xs={12} container spacing={1} key={`add-${key}`}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        label="Detail Name"
                                                        fullWidth
                                                        value={draftName}
                                                        onChange={(e) =>
                                                            setDraftKeys((prev) => ({
                                                                ...prev,
                                                                [key]: e.target.value,
                                                            }))
                                                        }
                                                        onBlur={() => commitKeyRename(key)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                e.currentTarget.blur();
                                                            }
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={5}>
                                                    <TextField
                                                        label="Value"
                                                        fullWidth
                                                        type="number"
                                                        value={value}
                                                        onChange={(e) =>
                                                            handleAdditionalValueChange(key, parseFloat(e.target.value))
                                                        }
                                                    />
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={1}
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    <Trash2Icon
                                                        onClick={() => handleRemoveAdditionalDetail(key)}
                                                        style={{ cursor: "pointer", color: "red" }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        );
                                    }
                                )}
                            </Grid>
                            <Button
                                variant="outlined"
                                onClick={handleAddAdditionalDetail}
                                sx={{ mt: 2, mb: 2 }}
                            >
                                Add Custom Charges & Details
                            </Button>
                        </div>
                    </Grid>

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
                    sx={{ mt: 2, background: "#25307F" }}
                >
                    Done
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default EditRateModal;
