import React, { useEffect } from 'react';
import styles from '../../styles/pages/login.module.scss';
import TextFieldHiddenLabel from '../../components/TextInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {event.preventDefault();};
    const handleMouseUpPassword = (event) => {event.preventDefault();};
    const navigate = useNavigate();
    const handleLoginClick = () => {
        //validation for user login & write an api call for user login 
        navigate('/receptionist'); //add path of receptionist dashboard overview page
    };
    const handleForgetPassword = () => {navigate('/password-reset')};

    useEffect(() => {
      props?.setIsSignUpOrLogin(true);
    }, []);

    return (
        <div className={styles.login}>
            <p className={styles.login__title}>Login</p>
            <Stack
                component="form"
                spacing={3}
                noValidate
                autoComplete="off"
            >
                <TextFieldHiddenLabel name="User Id" id="user_id" placeholder="Enter ID" />
                {/* <TextFieldHiddenLabel name="Password" id="password" type="password" placeholder="Enter Password" /> */}
                <OutlinedInput placeholder="Enter Password" id="outlined-adornment-password" type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <p className={styles.login__errormsg}>The password you have entered is incorrect </p>
                {/* <Grid container spacing={2} justifyContent="space-between" alignItems="center" flexDirection={{ xs: 'column', md: 'row' }} size={12}>
                    <Grid size={6}>
                        <TextFieldHiddenLabel name="Captcha" id="captcha_read" placeholder="45673"/>
                    </Grid>
                    <Grid size={6}>
                        <TextFieldHiddenLabel name="Captcha" id="captcha_write" placeholder="Enter Captcha"/>
                    </Grid>
                </Grid> */}
                <Button variant="contained" sx={{fontSize: "24px", textTransform: "capitalize", backgroundColor:"#25307F"}} onClick={handleLoginClick}>Login</Button>
                <Grid container spacing={2} justifyContent="space-between" alignItems="center" flexDirection={{ xs: 'column', sm: 'row' }} size={12}>
                    <Grid size={6} offset={{md: '0'}}>
                        {/* <Button variant="text" sx={{fontSize: "22px", color: "#0150EA", textTransform: "capitalize", padding: "0px"}}>Forgot ID</Button> */}
                    </Grid>
                    <Grid size={6} offset={{md: '10'}} sx={{textAlign: "right"}}>
                        <Button variant="text" sx={{fontSize: "22px", color: "#0150EA", textTransform: "capitalize", padding: "0px"}} onClick={handleForgetPassword}>Forgot password</Button>
                    </Grid>
                </Grid>
            </Stack>
        </div>
    );
};

export default Login;