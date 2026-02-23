import styles from '../styles/pages/login.module.scss';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const RecoveryLink = () => {
    return (
        <div className={styles.login}>
            <Stack
                component="form"
                spacing={3}
                noValidate
                autoComplete="off"
            >
                <p className={styles.login__recoveryLinkMsg}>A Recovery Link has been sent to your mail</p>
                <Button variant="contained" sx={{fontSize: "24px", textTransform: "capitalize", backgroundColor:"#25307F"}}>Re-Send</Button>
            </Stack>
        </div>
    );
};

export default RecoveryLink;