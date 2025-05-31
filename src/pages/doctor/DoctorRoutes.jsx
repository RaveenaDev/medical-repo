import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import DoctorOverview from "./index.jsx";
import Calender from "./calender/Calender.jsx";
import Patients from "./patient/Patients.jsx";
import { getAppointmentCounts } from "../../components/State/Admin/Action.js";

const DoctorRoutes = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);
  return (
    <Routes>
      <Route index element={<DoctorOverview />} />
      <Route path="/calendar" element={<Calender />} />
      <Route path="/patient" element={<Patients />} />
    </Routes>
  );
};
export default DoctorRoutes;
