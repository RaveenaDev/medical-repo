import React from 'react'
import {Box, Button} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './departments.module.scss'
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import avi from "./DepartDetails/departDetails.module.scss";
import {useNavigate} from "react-router-dom";

const DepartCard = () => {

    const navigate = useNavigate()
    const handleClick = () => {
        // Redirect to the specific page
        navigate('/departmentDetails');
    }

    const handleClickMessage = (e) => {
        e.stopPropagation(); // Prevent navigation from firing
        // You can add further functionality here
    }

    const handleClickContact = (e) => {
        e.stopPropagation(); // Prevent navigation from firing
        // You can add further functionality here
    }

    return (
        <Box className={styles.cardContainer} onClick={handleClick}>
            <div className={styles.cardHeader}>
                <div className={styles.circle}></div>
                <h2 className={styles.title}>Cardiology</h2>
                <span className={styles.arrow}>
                    <ArrowForwardIosIcon fontSize="small" />
                </span>
                <div className={styles.icons}>
                    <Button className={styles.message}
                            onClick={handleClickMessage}
                            sx={{ outline: 'none', boxShadow: 'none', '&:focus': { outline: 'none' },borderRadius: '12px',padding:"6px 10px" ,
                                minWidth: 'auto',  // Remove default minWidth
                                width: '40px',     // Custom width
                                height: '30px',    // Custom height
                            }}
                    >
                        <EmailIcon/>
                    </Button>
                    <Button className={styles.phone}
                            onClick={handleClickContact}
                            sx={{ outline: 'none', boxShadow: 'none', '&:focus': { outline: 'none' },borderRadius: '12px',padding: "6px 10px",
                                minWidth: 'auto',  // Remove default minWidth
                                width: '40px',     // Custom width
                                height: '30px',    // Custom height
                            }}
                    >
                        <PhoneIcon/>
                    </Button>
                </div>
            </div>

            <div className={styles.detailsContainer}>
                <div className={styles.details}>
                    <p className={styles.name}>Department Head:</p>
                    <p className={styles.value}>Dr. S. Balkrishna</p>
                </div>
                <div className={styles.details}>
                    <p className={styles.name}>Patients Present:</p>
                    <p className={styles.value}>10</p>
                </div>
                <div className={styles.details}>
                    <p className={styles.name}>Total Doctors:</p>
                    <p className={styles.value}>10</p>
                </div>
                <div className={styles.details}>
                    <p className={styles.name}>Specialist Doctors:</p>
                    <p className={styles.value}>01</p>
                </div>
                <div className={styles.details}>
                    <p className={styles.name}>Total Nurses:</p>
                    <p className={styles.value}>18</p>
                </div>
                <div className={styles.details}>
                    <p className={styles.name}>Active Services:</p>
                    <p className={styles.value}>ECG, Cardio, etc</p>
                </div>
            </div>
        </Box>

    )
}
export default DepartCard
