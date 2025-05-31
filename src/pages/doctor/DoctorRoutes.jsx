import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import DoctorOverview from "./index.jsx";
import Calender from "./calender/Calender.jsx";
import { getAppointmentCounts } from "../../components/State/Admin/Action.js";
import { Consultation } from "./consultation/consultation.jsx";

const DoctorRoutes = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);
  return (
    <Routes>
      <Route index element={<DoctorOverview />} />
      <Route path="/calendar" element={<Calender />} />
      <Route path="/consultation" element={<Consultation />} />
    </Routes>
  );
};
export default DoctorRoutes;
