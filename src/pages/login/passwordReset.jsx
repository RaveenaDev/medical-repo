import React, {useEffect, useState} from 'react';
import styles from '../../styles/pages/login.module.scss';
import TextFieldHiddenLabel from '../../components/TextInput';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import {TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {forgotPassword} from "../../components/State/Authentication/Action.js";

const PasswordReset = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState({
        email: ''
    });

    const dispatch = useDispatch();

    const handleSendEmail = () => {
        // console.log("Email: ",email)
        dispatch(forgotPassword(email))
        navigate('/recovery-link',{state: email}); //send a recovery email on users mail id to reset the password
    };

    useEffect(() => {
      props?.setIsSignUpOrLogin(true);
    }, []);

    return (
        <div className={styles.login}>
            <p className={styles.login__passwordResetTitle}>Password Reset</p>
            <Stack
                component="form"
                spacing={3}
                noValidate
                autoComplete="off"
            >
                <p className={styles.login__passwordReset}>You will receive instructions for resetting your password.</p>
                <TextField name="email" id="email" placeholder="Enter Email ID" value={email.email} onChange={(e) => {setEmail({...email,email: e.target.value})}}/>
                <Button variant="contained" sx={{fontSize: "24px", textTransform: "capitalize", backgroundColor:"#25307F"}} onClick={handleSendEmail}>Send</Button>
            </Stack>
        </div>
    );
};

export default PasswordReset;