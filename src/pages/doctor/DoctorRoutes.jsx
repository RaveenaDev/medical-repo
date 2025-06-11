import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import DoctorOverview from "./index.jsx";
import Calender from "./calender/Calender.jsx";
import Patients from "./patient/Patients.jsx";
import { Consultation } from "./consultation/consultation.jsx";
import Department from "./department/Department.jsx";
import Rooms from "./rooms/Rooms.jsx";
import DoctorRequest from "../doctorRequest/doctorRequest.jsx";

const DoctorRoutes = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);
  return (
    <Routes>
      <Route index element={<DoctorOverview />} />
      <Route path="/doctor-request" element={<DoctorRequest />} />
      <Route path="/calendar" element={<Calender />} />
      <Route path="/consultation" element={<Consultation />} />
      <Route path="/patient" element={<Patients />} />
      <Route path="/department" element={<Department />} />
      <Route path="/rooms" element={<Rooms />} />
    </Routes>
  );
};
export default DoctorRoutes;
