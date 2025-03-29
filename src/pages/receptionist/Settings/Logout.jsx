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
        <Typography variant="h6" sx={{marginTop: 2,fontWeight:500,color:'#000000'}} gutterBottom>
          Are you sure you want to logout?
        </Typography>
        <Box sx={{ display: 'flex' ,flexDirection: "column",justifyContent:'center', marginTop: 3, gap: 2}}>
          <div>
              <Button variant="outlined" onClick={handleClose}
                      sx={{color:"#878787",textTransform:'none', backgroundColor: "white", borderColor: "#25037F",
                          width:'70%',
                          "&:focus": {
                              outline: "none",
                              boxShadow: "none",
                          },}}>
                  No, Keep In
              </Button>
          </div>
          <div>
              <Button variant="contained" color="error" onClick={handleClick} sx={{color:"white",textTransform:'none', backgroundColor: "#25037F",
                  width:'70%',
                  "&:focus": {
                      outline: "none",
                      boxShadow: "none",
                  },}}>
                  Yes, Log Out
              </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default logout;
