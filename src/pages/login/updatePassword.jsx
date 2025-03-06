import React, {useEffect, useState} from 'react';
import styles from '../../styles/pages/login.module.scss';
import TextFieldHiddenLabel from '../../components/TextInput';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {resetPassword} from "../../components/State/Authentication/Action.js";

const UpdatePassword = (props) => {
    const [data, setData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = (searchParams.get('token') || '').trim();
    const role = (searchParams.get('role') || '').trim();


    // console.log("Role:",role)
    // console.log("Token:",token)

    const dispatch = useDispatch()
    const handleUpdatePasswordLogin = () => {

        // console.log("Pass: ",data)
        const newData = {
            newPassword: data.password,
            role: role
        }

        dispatch(resetPassword(newData,token,navigate))
        // navigate('/');//add path of receptionist dashboard overview page
    };

    useEffect(() => {
      props?.setIsSignUpOrLogin(true);
    }, []);

    return (
        <div className={styles.login}>
            <p className={styles.login__title}>Update Password</p>
            <Stack
                component="form"
                spacing={3}
                noValidate
                autoComplete="off"
            >
                <TextField name="createPassword" id="createNewPassword" type="password" value={data.password} onChange={(e) => setData({...data,password: e.target.value})} placeholder="Create New Password" />
                <TextField name="confirmPassword" id="confirmNewPassword" type="password" value={data.confirmPassword} onChange={(e) => setData({...data,confirmPassword: e.target.value})} placeholder="Confirm New Password" />
                <Button variant="contained" sx={{fontSize: "24px", textTransform: "capitalize", backgroundColor:"#25307F"}} onClick={handleUpdatePasswordLogin}>Login</Button>
                {/*<Grid size={12} offset={{md: '10'}} sx={{textAlign: "right"}}>*/}
                {/*    <Button variant="text" sx={{fontSize: "22px", color: "#0150EA", textTransform: "capitalize", padding: "0px"}}>Skip</Button>*/}
                {/*</Grid>*/}
            </Stack>
        </div>
    );
};

export default UpdatePassword;
