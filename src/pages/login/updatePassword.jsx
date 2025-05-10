import React, { useEffect } from 'react';
import styles from '../../styles/pages/login.module.scss';
import TextFieldHiddenLabel from '../../components/TextInput';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = (props) => {
    const navigate = useNavigate();
    const handleUpdatePasswordLogin = () => {
        navigate('/');//add path of receptionist dashboard overview page
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
                <TextFieldHiddenLabel name="createPassword" id="createNewPassword" type="password" placeholder="Create New Password" />
                <TextFieldHiddenLabel name="confirmPassword" id="confirmNewPassword" type="password" placeholder="Confirm New Password" />
                <Button variant="contained" sx={{fontSize: "24px", textTransform: "capitalize", backgroundColor:"#25307F"}} onClick={handleUpdatePasswordLogin}>Login</Button>
                <Grid size={12} offset={{md: '10'}} sx={{textAlign: "right"}}>
                    <Button variant="text" sx={{fontSize: "22px", color: "#0150EA", textTransform: "capitalize", padding: "0px"}}>Skip</Button>
                </Grid>
            </Stack>
        </div>
    );
};

export default UpdatePassword;