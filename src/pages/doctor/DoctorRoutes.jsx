import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import DoctorOverview from "./index.jsx";
import Calender from "./calender/Calender.jsx";
import Patients from "./patient/Patients.jsx";
import { Consultation } from "./consultation/consultation.jsx";
import Department from "./department/Department.jsx";
import Rooms from "./rooms/Rooms.jsx";
import DoctorRequest from "./doctorRequest/DoctorRequest.jsx";
import DoctorNewRequest from "./doctorRequest/DoctorRequestDetail.jsx";
import Settings from "../receptionist/Settings/Settings.jsx";
import PrivacyPolicy from "./settings/privacyPolicy/PrivacyPolicy.jsx";
import Help from "./settings/Help.jsx";
import InPatient from "./patient/InPatient.jsx";
import TotalSurgeries from "./surgeries/TotalSurgeries.jsx";
import PatientsList from "./patientsList/patientsList.jsx";

const DoctorRoutes = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);
  return (
    <Routes>
      <Route index element={<DoctorOverview />} />
      <Route path="/doctor-request" element={<DoctorRequest />} />
      <Route
        path="/doctor-request/request-details"
        element={<DoctorNewRequest />}
      />
      <Route path="/calendar" element={<Calender />} />
      <Route path="/consultation" element={<Consultation />} />
      <Route path="/patient" element={<Patients />} />
      <Route path="/patientList" element={<PatientsList />} />
      <Route path="/inpatients" element={<InPatient />} />
      <Route path="/surgeries" element={<TotalSurgeries />} />
      <Route path="/department" element={<Department />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/settings/privacyPolicy" element={<PrivacyPolicy />} />
      <Route path="/settings/helpAndSupport" element={<Help />} />
    </Routes>
  );
};
export default DoctorRoutes;
