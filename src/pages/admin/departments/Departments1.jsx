import React, { useEffect, useState } from "react";
import ayu from "./departments.module.scss";
import DepartCard from "./DepartCard.jsx";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartments } from "../../../components/State/Admin/Action.js";
import CommonPanel from "../Components/CommonPanel.jsx";

const Departments1 = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const handleBack = () => {
    navigate("/admin");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDepartments());
  }, [dispatch]);

  const admin = useSelector((store) => store.admin);

  const allDepartments = admin.departments;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "0px",
          padding: "10px",
          width: "77%",
          background: " #F1F1F1",
          zIndex: 10000,
        }}
      >
        <CommonPanel />
      </div>
      <div style={{ marginTop: "200px" }}>
        <div className={ayu.headerContainer}>
          <button className={ayu.backButton} onClick={handleBack}>
            <ArrowBackIosIcon />
          </button>
          <h2 className={ayu.departmentTitle}>Department</h2>
        </div>

        {/* Horizontal line */}
        <hr style={{ border: "1px solid #d3d3d3", margin: "20px 0" }} />

        {/* Cards */}

        <div className={ayu.superCardContainer}>
          {allDepartments.map((department, index) => (
            <DepartCard key={index} department={department} />
          ))}
        </div>
      </div>
    </>
  );
};
export default Departments1;
