import React, { useEffect } from 'react';
import styles from '../../styles/pages/login.module.scss';
import TextFieldHiddenLabel from '../../components/TextInput';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const PasswordReset = (props) => {
    const navigate = useNavigate();
    const handleSendEmail = () => {
        navigate('/recovery-link'); //send a recovery email on users mail id to reset the password
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
                <TextFieldHiddenLabel name="User Id" id="user_id" placeholder="Enter ID/ Email" />
                <Button variant="contained" sx={{fontSize: "24px", textTransform: "capitalize", backgroundColor:"#25307F"}} onClick={handleSendEmail}>Send</Button>
            </Stack>
        </div>
    );
};

export default PasswordReset;