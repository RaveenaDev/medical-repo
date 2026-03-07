import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addInsuranceCompany } from "../../../../components/State/Admin/Action.js";

const CompanyRateModal = ({ open, handleClose }) => {
  const [companyData, setCompanyData] = useState({
    id: "",
    name: "",
    TPA: "",
    tieup: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setCompanyData({
      ...companyData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveCompany = () => {
    const payload = {
      id: companyData.id,
      name: companyData.name,
      TPA: companyData.TPA,
      tieup: companyData.tieup,
    };

    dispatch(addInsuranceCompany(payload));

    setCompanyData({
      id: "",
      name: "",
      TPA: "",
      tieup: "",
    });

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 1,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 600,
          color: "#25307F",
          textAlign: "center",
        }}
      >
        Add Insurance Company
      </DialogTitle>

      <Divider sx={{ mb: 2 }} />

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Company ID"
              name="id"
              fullWidth
              size="small"
              value={companyData.id}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Company Name"
              name="name"
              fullWidth
              size="small"
              value={companyData.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="TPA"
              name="TPA"
              fullWidth
              size="small"
              value={companyData.TPA}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Tie-up Type"
              name="tieup"
              select
              fullWidth
              size="small"
              value={companyData.tieup}
              onChange={handleChange}
            >
              <MenuItem value="company">Company</MenuItem>
              <MenuItem value="tpa">TPA</MenuItem>
              <MenuItem value="corporate">Corporate</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderColor: "#25307F",
            color: "#25307F",
            "&:hover": {
              borderColor: "#1b245f",
              background: "rgba(37,48,127,0.04)",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSaveCompany}
          variant="contained"
          sx={{
            backgroundColor: "#25307F",
            "&:hover": {
              backgroundColor: "#1b245f",
            },
            px: 4,
          }}
        >
          Save Company
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompanyRateModal;
