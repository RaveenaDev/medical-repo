import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./patients.module.scss";
import EntityBasedTable from "../EntityBasedTable/index.jsx";
import PatientList from "./PatientList.jsx";
import CommonPanel from "../components/CommonPanel.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getDoctors,
  getPatients,
  getRooms,
  getStaffs,
} from "../../../components/State/Receptionist/Action.js";

const Patients = (props) => {
  const [tableIndex, setTableIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

  const receptionist = useSelector((store) => store.receptionist);

  const noOfPatients = receptionist.totalPatients;
  const patients = receptionist.patients;

  return (
    <div className={styles.patients}>
      <CommonPanel />

      {!props.entity ? (
        <div className={styles.section}>
          <p className={styles.title}>Patient List</p>

          <PatientList allPatients={{ noOfPatients, patients }} />

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
