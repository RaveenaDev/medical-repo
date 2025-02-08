import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import Login from "./pages/login/login";
import PasswordReset from "./pages/login/passwordReset";
import RecoveryLink from "./pages/login/recoveryLink";
import UpdatePassword from "./pages/login/updatePassword";
import Logo from "./components/Logo";
import Receptionist from "./pages/receptionist";
import { Routes, Route, useLocation } from "react-router-dom";
import Departments from "./pages/receptionist/departments/Departments.jsx";
import DepartDetails from "./pages/receptionist/departments/DepartDetails/DepartDetails.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Admin from "./pages/admin/index.jsx";
import Reception from "./pages/admin/reception/Reception.jsx";
import Appointments from "./pages/admin/reception/appointments/Appointments.jsx";
import Patients from "./pages/receptionist/patients/Patients.jsx";
import MoreInfo from "./pages/receptionist/patients/profile/MoreInfo.jsx";
import Profile from "./pages/receptionist/patients/profile/Profile.jsx";
import Settings from "./pages/receptionist/Settings/Settings.jsx";
import Departments1 from "./pages/admin/departments/Departments1.jsx";
import DepartDetails1 from "./pages/admin/departments/DepartDetails/DepartDetails1.jsx";
import PrivacyPolicy from "./pages/receptionist/Settings/PrivacyPolicy.jsx";
import Help from "./pages/receptionist/Settings/Help.jsx";
import ProgressReport from "./pages/receptionist/patients/profile/ProgressReport.jsx";
import styles2 from "./App2.module.scss";
import PatientPanel from "./pages/admin/PatientPanel";
import PatientDetails from "./pages/admin/PatientDetails";
import Billing from "./pages/admin/Billing";
import History from "./pages/admin/History";
import Tracking from "./pages/admin/Tracking";
import Notification from "./components/NotificationFunc/Notification";
import Appointment from "./components/Buttons/Appointment";
import BookAppointmentButton from "./components/Buttons/BookApp";
import BillingButton from "./components/Buttons/Billing";
import Doctors from "./pages/receptionist/doctors/Doctors.jsx";
import Staffs from "./pages/receptionist/staffs/Staffs.jsx";
import Rooms from "./pages/receptionist/rooms/Rooms.jsx";
import Billings from "./pages/receptionist/billing/Billings.jsx";
import Earnings from "./pages/admin/earnings/Earnings.jsx";
import AdminDoctors from "./pages/admin/doctors/AdminDoctors.jsx";
import AdminStaffs from "./pages/admin/staffs/AdminStaffs.jsx";
import AdminRooms from "./pages/admin/rooms/AdminRooms.jsx";
import Expenses from "./pages/admin/expenses/Expenses.jsx";

function App() {
  const [isSignUpOrLogin, setIsSignUpOrLogin] = useState(true);
  const [entity, setEntity] = useState("");
  const [role, setRole] = useState(""); // Role state

  // Hook to get the current location
  const location = useLocation();

  // Determine role based on the route
  useEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      setRole("admin");
    } else if (location.pathname.startsWith("/receptionist")) {
      setRole("receptionist");
    } else if (location.pathname.startsWith("/doctor")) {
      setRole("doctor");
    } else {
      setRole(""); // Default or no role
    }
  }, [location.pathname]);

  // Determine if the current path is a login or signup page
  const isLoginPage = [
    "/",
    "/password-reset",
    "/recovery-link",
    "/update-password",
  ].includes(location.pathname);
  return (
    <>
      <div className={`${isSignUpOrLogin ? "" : styles.crmApp}`}>
        <div style={{ width: "20%", backgroundColor: "white" }}>
          <div className={styles.logo}>
            <Logo />
          </div>
          {!isLoginPage && (
            <div>
              <Sidebar role={role} />
            </div>
          )}
        </div>
        {/* if login or register page is active, add this class ${styles.loginPageActive} */}
        <div
          className={`${styles.register} ${
            isSignUpOrLogin ? styles.loginPageActive : styles.otherPages
          }`}
        >
          <Routes>
            <Route
              path="/"
              element={<Login setIsSignUpOrLogin={setIsSignUpOrLogin} />}
            />
            <Route
              path="/password-reset"
              element={
                <PasswordReset setIsSignUpOrLogin={setIsSignUpOrLogin} />
              }
            />
            <Route
              path="/recovery-link"
              element={<RecoveryLink setIsSignUpOrLogin={setIsSignUpOrLogin} />}
            />
            <Route
              path="/update-password"
              element={
                <UpdatePassword setIsSignUpOrLogin={setIsSignUpOrLogin} />
              }
            />
            <Route
              path="/receptionist"
              element={
                <Receptionist
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            />
            <Route
              path="/receptionist/patients"
              element={
                <Patients
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            />
            <Route
              path="/receptionist/billing"
              element={
                <Billings
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            />
            <Route
              path="/receptionist/doctors"
              element={
                <Doctors
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            />
            <Route
              path="/receptionist/staffs"
              element={
                <Staffs
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            />
            <Route
              path="/receptionist/rooms"
              element={
                <Rooms
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            />
            <Route
              path="/receptionist/patients/profile"
              element={
                <Profile
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            />
            <Route
              path="/receptionist/patients/profile/more-info"
              element={
                <MoreInfo
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            />
            <Route
              path="/receptionist/patients/profile/progressReport"
              element={<ProgressReport />}
            />
            <Route
              path="/receptionist/departments"
              element={
                <Departments
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            />
            <Route
              path="/receptionist/departments/departmentDetails"
              element={
                <DepartDetails
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            />
            <Route
              path="/receptionist/settings"
              element={
                <Settings
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            />
            <Route
              path="/receptionist/settings/privacyPolicy"
              element={
                <PrivacyPolicy
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            />
            <Route
              path="/receptionist/settings/helpAndSupport"
              element={
                <Help
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            />
            <Route
              path="/admin"
              element={
                <Admin
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            />

              <Route
                  path="/admin/earnings"
                  element={
                      <Earnings
                          setIsSignUpOrLogin={setIsSignUpOrLogin}
                          setEntity={setEntity}
                          entity={entity}
                      />
                  }
              />

              <Route
                  path="/admin/doctors"
                  element={
                      <AdminDoctors
                          setIsSignUpOrLogin={setIsSignUpOrLogin}
                          setEntity={setEntity}
                          entity={entity}
                      />
                  }
              />

              <Route
                  path="/admin/staffs"
                  element={
                      <AdminStaffs
                          setIsSignUpOrLogin={setIsSignUpOrLogin}
                          setEntity={setEntity}
                          entity={entity}
                      />
                  }
              />

              <Route
                  path="/admin/rooms"
                  element={
                      <AdminRooms
                          setIsSignUpOrLogin={setIsSignUpOrLogin}
                          setEntity={setEntity}
                          entity={entity}
                      />
                  }
              />
            <Route
              path="/admin/reception"
              element={
                <Reception
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            />
            <Route
              path="/admin/reception/appointments"
              element={
                <Appointments
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            />
            <Route
              path="/admin/departments"
              element={
                <Departments1
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            />
            <Route
              path="/admin/departments/departmentDetails"
              element={
                <DepartDetails1
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            />
            <Route
              path="/admin/reception/patients"
              element={
                <PatientPanel
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            ></Route>
            <Route
              path="/admin/reception/patients/PatientDetails"
              element={
                <PatientDetails
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            ></Route>
            <Route
              path="/admin/reception/patients/Billing"
              element={
                <Billing
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            ></Route>
            <Route
              path="/admin/reception/patients/History"
              element={
                <History
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            ></Route>
            <Route
              path="/admin/reception/patients/Tracking"
              element={
                <Tracking
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            ></Route>

              <Route path="/admin/expenses" element={<Expenses setIsSignUpOrLogin={setIsSignUpOrLogin} setEntity={setEntity} entity={entity}/>}/>

              <Route
                  path="/admin/settings"
                  element={
                      <Settings
                          setIsSignUpOrLogin={setIsSignUpOrLogin}
                          setEntity={setEntity}
                          entity={entity}
                      />
                  }
              />
              <Route
                  path="/admin/settings/privacyPolicy"
                  element={
                      <PrivacyPolicy
                          setIsSignUpOrLogin={setIsSignUpOrLogin}
                          setEntity={setEntity}
                          entity={entity}
                      />
                  }
              />
              <Route
                  path="/admin/settings/helpAndSupport"
                  element={
                      <Help
                          setIsSignUpOrLogin={setIsSignUpOrLogin}
                          setEntity={setEntity}
                          entity={entity}
                      />
                  }
              />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
