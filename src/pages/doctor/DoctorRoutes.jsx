import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import DoctorOverview from "./index.jsx";
import Calender from "./calender/Calender.jsx";
import Patients from "./patient/Patients.jsx";
import { Consultation } from "./consultation/consultation.jsx";
import Department from "./department/Department.jsx";

const DoctorRoutes = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);
  return (
    <Routes>
      <Route index element={<DoctorOverview />} />
      <Route path="/calendar" element={<Calender />} />
      <Route path="/consultation" element={<Consultation />} />
      <Route path="/patient" element={<Patients />} />
      <Route path="/department" element={<Department/>} />
    </Routes>
  );
};
export default DoctorRoutes;
