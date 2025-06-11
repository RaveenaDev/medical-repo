import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import DoctorOverview from "./index.jsx";
import Calender from "./calender/Calender.jsx";
import Patients from "./patient/Patients.jsx";
import { Consultation } from "./consultation/consultation.jsx";
import Department from "./department/Department.jsx";
import Rooms from "./rooms/Rooms.jsx";
import DoctorRequest from "../doctorRequest/doctorRequest.jsx";
import Settings from "../receptionist/Settings/Settings.jsx";
import PrivacyPolicy from "./settings/privacyPolicy/PrivacyPolicy.jsx";
import Help from "./settings/Help.jsx";

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
        <Route
            path="/settings"
            element={<Settings/>}
        />
        <Route
            path="/settings/privacyPolicy"
            element={
                    <PrivacyPolicy/>
            }
        />
        <Route
            path="/settings/helpAndSupport"
            element={
            <Help/>
            }
        />
    </Routes>
  );
};
export default DoctorRoutes;
