import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import IpdOverview from "./index.jsx";
import AdmissionFormsStaff from "./component/addmissionForms/AddmissionForms.jsx";
import SinglePatientDetailStaff from "./SinglePatientDetailStaff.jsx";

const IpdRoutes = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);
  return (
    <Routes>
      <Route index element={<IpdOverview />} />
      <Route path="admission-forms" element={<AdmissionFormsStaff />} />
      <Route path="patientDetails" element={<SinglePatientDetailStaff />} />
    </Routes>
  );
};
export default IpdRoutes;
