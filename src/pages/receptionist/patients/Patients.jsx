import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./patients.module.scss";
import Searchbar from '../../../components/Searchbar';
import NotificationIcon from '../../../components/Notification';
import Grid from "@mui/material/Grid2";
import Card from "../../../components/Card/index.jsx";
import EntityBasedTable from "../EntityBasedTable/index.jsx";
import PatientList from './PatientList.jsx';
import CommonPanel from "../components/CommonPanel.jsx";



const Patients = (props) => {
  const [tableIndex, setTableIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const cardClickhandler = (e, entity) => {
    console.log("jhgfcg", e, entity);
    if (entity === "patient") {
      setTableIndex(0);
    }
    if (entity === "doctor") {
      setTableIndex(1);
    }
    if (entity === "staff") {
      setTableIndex(2);
    }
    if (entity === "room") {
      setTableIndex(3);
    }
    props?.setEntity(entity);
  };

  return (
    <div className={styles.patients}>
      <CommonPanel/>

      {!props.entity ? (
        <div className={styles.section}>
          <p className={styles.title}>
            Patient List
          </p>

          <PatientList />


          {/* <button onClick={() => navigate('/profile')} style={{backgroundColor: "white"}}>
            Click here to view the profile
          </button> */}
        </div>
      ) : (
        <EntityBasedTable entity={props?.entity} tableIndex={tableIndex} />
      )}
    </div>
  );
};

export default Patients;
