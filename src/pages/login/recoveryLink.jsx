import React, { useEffect, useState } from 'react';
import styles from '../../styles/pages/login.module.scss';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../components/State/Authentication/Action.js";

const RecoveryLink = (props) => {
    const location = useLocation();
    const email = location.state;
    const dispatch = useDispatch();
    const [timer, setTimer] = useState(30);
    const [isDisabled, setIsDisabled] = useState(true);

    const handleRecoveryEmail = () => {
        // console.log("Recovery email:", email);
        dispatch(forgotPassword(email));
        setIsDisabled(true);
        setTimer(30); // Reset the timer
    };

    useEffect(() => {
        props?.setIsSignUpOrLogin(true);
        const countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown);
                    setIsDisabled(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(countdown); // Cleanup timer on unmount
    }, [isDisabled]);

    return (
        <div className={styles.login}>
            <Stack component="form" spacing={3} noValidate autoComplete="off">
                <p className={styles.login__recoveryLinkMsg}>
                    A Recovery Link has been sent to your mail
                </p>
                <Button
                    variant="contained"
                    sx={{ fontSize: "24px", textTransform: "capitalize", backgroundColor: "#25307F" }}
                    onClick={handleRecoveryEmail}
                    disabled={isDisabled}
                >
                    {isDisabled ? `Re-Send (${timer}s)` : "Re-Send"}
                </Button>
            </Stack>
        </div>
    );
};

export default RecoveryLink;
