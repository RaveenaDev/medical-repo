import styles from '../styles/pages/login.module.scss';
import TextFieldHiddenLabel from '../components/TextInput';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';

const UpdatePassword = () => {
    return (
        <div className={styles.login}>
            <p className={styles.login__title}>Update Password</p>
            <Stack
                component="form"
                spacing={3}
                noValidate
                autoComplete="off"
            >
                <TextFieldHiddenLabel name="Password" id="new_password" type="password" placeholder="Create New Password" />
                <TextFieldHiddenLabel name="Password" id="confirm_new_password" type="password" placeholder="Confirm New Password" />
                <Button variant="contained" sx={{fontSize: "24px", textTransform: "capitalize", backgroundColor:"#25307F"}}>Update Password</Button>
                <Grid size={12} offset={{md: '10'}} sx={{textAlign: "right"}}>
                    <Button variant="text" sx={{fontSize: "22px", color: "#0150EA", textTransform: "capitalize", padding: "0px"}}>Skip</Button>
                </Grid>
            </Stack>
        </div>
    );
};

export default UpdatePassword;