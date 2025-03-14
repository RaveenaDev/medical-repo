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
import PatientPanel from "./pages/admin/patient/PatientPanel.jsx";
import PatientDetails from "./pages/admin/patient/PatientDetails.jsx";
import Billing from "./pages/admin/Billing";
import History from "./pages/admin/patient/History.jsx";
import Doctors from "./pages/receptionist/doctors/Doctors.jsx";
import Staffs from "./pages/receptionist/staffs/Staffs.jsx";
import Rooms from "./pages/receptionist/rooms/Rooms.jsx";
import Billings from "./pages/receptionist/billing/Billings.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for the toast notifications
import Earnings from "./pages/admin/earnings/Earnings.jsx";
import AdminDoctors from "./pages/admin/doctors/AdminDoctors.jsx";
import AdminStaffs from "./pages/admin/staffs/AdminStaffs.jsx";
import AdminRooms from "./pages/admin/rooms/AdminRooms.jsx";
import Expenses from "./pages/admin/expenses/Expenses.jsx";
import RequestTabs from "./pages/admin/requests/Request.jsx";
import BillingAdmin from "./pages/admin/billing/Billing.jsx";
import Tracking from "./pages/admin/patient/Tracking.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Register from "./pages/register/Register.jsx";
import Information from "./pages/register/info/Information.jsx";
import { Navigate } from "react-router-dom";

function App() {
  const [isSignUpOrLogin, setIsSignUpOrLogin] = useState(true);
  const [entity, setEntity] = useState("");
  const [role, setRole] = useState(""); // Role state
  const [shouldShowSidebar, setShouldShowSidebar] = useState(true);

  // Hook to get the current location
  const location = useLocation();

  const RedirectToLanding = () => {
    window.location.href = "https://landingpage.stepcare.tech";
    return null; // Prevents rendering anything
  };

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
    "/login",
    "/password-reset",
    "/recovery-link",
    "/update-password",
    "/register",
  ].includes(location.pathname);

  return (
    <>
      <ToastContainer />
      <div className={`${isSignUpOrLogin ? "" : styles.crmApp}`}>
        {shouldShowSidebar && (
          <div
            style={{
              width: "20%",
              backgroundColor: "white",
              height: "100vh",
              position: "fixed",
              top: 0, // Ensure it sticks to the top
              left: 0, // Position it on the left side
              overflowY: "auto", // Allows scrolling inside the sidebar if needed
            }}
          >
            <div className={styles.logo}>
              <Logo />
            </div>
            {!isLoginPage && (
              <div>
                <Sidebar role={role} />
              </div>
            )}
          </div>
        )}
        {/* if login or register page is active, add this class ${styles.loginPageActive} */}
        <div
          className={`${styles.register} ${
            isSignUpOrLogin ? styles.loginPageActive : styles.otherPages
          }`}
          style={{
            marginLeft: shouldShowSidebar ? "20%" : "0",
            height: "100%",
          }} // Prevent content from going under the sidebar
        >
          <Routes>
            <Route path="/" element={<RedirectToLanding />} />
            <Route
              path="/login"
              element={
                <Login
                  setShouldShowSidebar={setShouldShowSidebar}
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setShouldShowSidebar={setShouldShowSidebar}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
            />
            <Route
              path="/information"
              element={
                <Information
                  setIsSignUpOrLogin={setIsSignUpOrLogin}
                  setShouldShowSidebar={setShouldShowSidebar}
                  setEntity={setEntity}
                  entity={entity}
                />
              }
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
              path="/reset-password"
              element={
                <UpdatePassword setIsSignUpOrLogin={setIsSignUpOrLogin} />
              }
            />
            <Route
              path="/receptionist"
              element={
                <ProtectedRoute allowedRoles={["receptionist"]}>
                  <Receptionist
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/receptionist/patients"
              element={
                <ProtectedRoute allowedRoles={["receptionist"]}>
                  <Patients
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/receptionist/billing"
              element={
                <ProtectedRoute allowedRoles={["receptionist"]}>
                  <Billings
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/receptionist/doctors"
              element={
                <ProtectedRoute allowedRoles={["receptionist"]}>
                  <Doctors
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/receptionist/staffs"
              element={
                <ProtectedRoute allowedRoles={["receptionist"]}>
                  <Staffs
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/receptionist/rooms"
              element={
                <ProtectedRoute allowedRoles={["receptionist"]}>
                  <Rooms
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/receptionist/patients/profile"
              element={
                <ProtectedRoute allowedRoles={["receptionist"]}>
                  <Profile
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/receptionist/patients/profile/more-info"
              element={
                <ProtectedRoute allowedRoles={["receptionist"]}>
                  <MoreInfo
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/receptionist/patients/profile/progressReport"
              element={
                <ProtectedRoute allowedRoles={["receptionist"]}>
                  <ProgressReport
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/receptionist/departments"
              element={
                <ProtectedRoute allowedRoles={["receptionist"]}>
                  <Departments
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/receptionist/departments/departDetails"
              element={
                <ProtectedRoute allowedRoles={["receptionist"]}>
                  <DepartDetails
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/receptionist/settings"
              element={
                <ProtectedRoute allowedRoles={["receptionist"]}>
                  <Settings
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/receptionist/settings/privacyPolicy"
              element={
                <ProtectedRoute allowedRoles={["receptionist"]}>
                  <PrivacyPolicy
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/receptionist/settings/helpAndSupport"
              element={
                <ProtectedRoute allowedRoles={["receptionist"]}>
                  <Help
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["hospitalAdmin"]}>
                  <Admin
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/earnings"
              element={
                <ProtectedRoute allowedRoles={["hospitalAdmin"]}>
                  <Earnings
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/requests"
              element={
                <ProtectedRoute allowedRoles={["hospitalAdmin"]}>
                  <RequestTabs
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/billings"
              element={
                <ProtectedRoute allowedRoles={["hospitalAdmin"]}>
                  <BillingAdmin
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/doctors"
              element={
                <ProtectedRoute allowedRoles={["hospitalAdmin"]}>
                  <AdminDoctors
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/staffs"
              element={
                <ProtectedRoute allowedRoles={["hospitalAdmin"]}>
                  <AdminStaffs
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/rooms"
              element={
                <ProtectedRoute allowedRoles={["hospitalAdmin"]}>
                  <AdminRooms
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reception"
              element={
                <ProtectedRoute allowedRoles={["hospitalAdmin"]}>
                  <Reception
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reception/appointments"
              element={
                <ProtectedRoute allowedRoles={["hospitalAdmin"]}>
                  <Appointments
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/departments"
              element={
                <ProtectedRoute allowedRoles={["hospitalAdmin"]}>
                  <Departments1
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/departments/departDetails"
              element={
                <ProtectedRoute allowedRoles={["hospitalAdmin"]}>
                  <DepartDetails1
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reception/patients"
              element={
                <ProtectedRoute allowedRoles={["hospitalAdmin"]}>
                  <PatientPanel
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/reception/patients/PatientDetails"
              element={
                <ProtectedRoute allowedRoles={["hospitalAdmin"]}>
                  <PatientDetails
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/reception/patients/Billing"
              element={
                <ProtectedRoute allowedRoles={["hospitalAdmin"]}>
                  <Billing
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/reception/patients/History"
              element={
                <ProtectedRoute allowedRoles={["hospitalAdmin"]}>
                  <History
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/reception/patients/Tracking"
              element={
                <ProtectedRoute allowedRoles={["hospitalAdmin"]}>
                  <Tracking
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/admin/expenses"
              element={
                <ProtectedRoute allowedRoles={["hospitalAdmin"]}>
                  <Expenses
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute allowedRoles={["hospitalAdmin"]}>
                  <Settings
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings/privacyPolicy"
              element={
                <ProtectedRoute allowedRoles={["hospitalAdmin"]}>
                  <PrivacyPolicy
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings/helpAndSupport"
              element={
                <ProtectedRoute allowedRoles={["hospitalAdmin"]}>
                  <Help
                    setIsSignUpOrLogin={setIsSignUpOrLogin}
                    setEntity={setEntity}
                    entity={entity}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
