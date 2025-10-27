import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import DoctorOverview from "./index.jsx";
import Calender from "./calender/Calender.jsx";
import Patients from "./patient/Patients.jsx";
import { Consultation } from "./consultation/Consultation.jsx";
import Department from "./department/Department.jsx";
import Rooms from "./rooms/Rooms.jsx";
import DoctorRequest from "./doctorRequest/DoctorRequest.jsx";
import DoctorNewRequest from "./doctorRequest/DoctorRequestDetail.jsx";
import Settings from "../receptionist/Settings/Settings.jsx";
import PrivacyPolicy from "./settings/privacyPolicy/PrivacyPolicy.jsx";
import Help from "./settings/Help.jsx";
import InPatient from "./patient/InPatient.jsx";
import TotalSurgeries from "./surgeries/TotalSurgeries.jsx";
import PatientsList from "./patientsList/PatientsList.jsx";
import SinglePatientDetail from "./patientsList/SinglePatientDetail.jsx";
import Inventory from "./inventory/Inventory.jsx";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  getAppointmentByDate,
  getAppointmentsOfToday,
} from "../../components/State/Doctor/Action.js";
import Appointments from "./appointments/Appointments.jsx";
import AdmissionForms from "./patientsList/component/addmissionForms/AddmissionForms.jsx";
import PatientProfile from "./patient/details/PatientProfile.jsx";
import MoreInfo from "./patient/details/MedicalInfo/MoreInfo.jsx";

const DoctorRoutes = (props) => {
  useEffect(() => {
    props?.setIsSignUpOrLogin(false);
  }, []);

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const startDate = dayjs(selectedDate).startOf("day").toISOString();
    const endDate = dayjs(selectedDate).endOf("day").toISOString();

    if (selectedDate) {
      dispatch(getAppointmentsOfToday(startDate, endDate));
    }
  }, [dispatch, selectedDate]);

  const appointments = useSelector((store) => store.doctor.appointmentsOfToday);
  const todayAppointments = appointments ? appointments.length : 0;

  // console.log("Appointments Today: ",todayAppointments)
  return (
    <Routes>
      <Route
        index
        element={<DoctorOverview todayAppointments={todayAppointments} />}
      />
      <Route path="/doctor-request" element={<DoctorRequest />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route
        path="/doctor-request/request-details"
        element={<DoctorNewRequest />}
      />
      <Route path="/calendar" element={<Calender />} />
      <Route path="/consultation" element={<Consultation />} />
      <Route path="/patient" element={<Patients />} />
      <Route path="/patientList" element={<PatientsList />} />
      <Route
        path="/patientList/patient-details"
        element={<SinglePatientDetail />}
      />
      <Route path="/inpatients" element={<InPatient />} />
      <Route path="/surgeries" element={<TotalSurgeries />} />
      <Route path="/department" element={<Department />} />
      <Route path="/department/inventory" element={<Inventory />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/settings/privacyPolicy" element={<PrivacyPolicy />} />
      <Route path="/settings/helpAndSupport" element={<Help />} />
      <Route path="/patientList/admission-forms" element={<AdmissionForms />} />
      <Route path="/patients/profile" element={<PatientProfile />} />
      <Route path="/patients/profile/more-info" element={<MoreInfo />} />
    </Routes>
  );
};
export default DoctorRoutes;
