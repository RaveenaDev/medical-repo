import React, { useEffect, useState } from 'react'
import styles from "./patients.module.scss"; // Ensure correct path
import Searchbar from '../../../components/Searchbar';
import NotificationIcon from '../../../components/Notification';




function Patients() {


    return (
        <div className={styles.patients}>
        <div className={styles.patientHeader}>
          <Searchbar /> 
          <NotificationIcon />
        </div>
      </div>
      



    );

};


export default Patients;