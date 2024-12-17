import React from 'react'
import {Box} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './departments.module.scss'
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const DepartCard = () => {
    return (
        <Box className={styles.cardContainer}>
            <div className={styles.cardHeader}>
                <div className={styles.circle}></div>
                <h2 className={styles.title}>Cardiology</h2>
                <span className={styles.arrow}>
                    <ArrowForwardIosIcon fontSize="small" />
                </span>
                <div className={styles.icons}>
                    <span className={styles.message}>
                    <EmailIcon/>
                    </span>
                    <span className={styles.phone}>
                    <PhoneIcon/>
                    </span>
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
