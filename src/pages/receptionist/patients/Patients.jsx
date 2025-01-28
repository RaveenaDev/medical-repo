import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./patients.module.scss";
import EntityBasedTable from "../EntityBasedTable/index.jsx";
import PatientList from './PatientList.jsx';
import CommonPanel from "../components/CommonPanel.jsx";



const Patients = (props) => {
  const [tableIndex, setTableIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

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
