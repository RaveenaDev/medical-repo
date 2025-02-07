import React, { useState } from 'react';
import { Box, Typography, Button } from "@mui/material";
import styles from './Logout.module.scss';
import {useDispatch} from "react-redux";
import {Logout} from "../../../components/State/Authentication/Action.js";
import {useNavigate} from "react-router-dom";

const logout = ({ isLogout, setIsLogout }) => {

    const handleClose = () => {
        setIsLogout(false);
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        dispatch(Logout());
        navigate('/')
    }

  return (
    <div className={styles.popup_overlay}>
      <div className={styles.popup_box}>
        <Typography variant="h6" sx={{marginTop: 2}} gutterBottom>
          Are you sure you want to logout?
        </Typography>
        <Box sx={{ display: 'flex' ,flexDirection: "column", marginTop: 5, gap: 2 }}>
          <Button variant="outlined" onClick={handleClose} sx={{color:"#878787", backgroundColor: "white", borderColor: "#25037F"}}>
          No, Keep In
          </Button>
          <Button variant="contained" color="error" onClick={handleClick} sx={{color:"white", backgroundColor: "#25037F"}}>
          Yes, Log Out
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default logout;
