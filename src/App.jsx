import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Login from './pages/login/login';
import PasswordReset from './pages/login/passwordReset';
import RecoveryLink from './pages/login/recoveryLink';
import UpdatePassword from './pages/login/updatePassword';
import Logo from './components/Logo';
import Receptionist from './pages/receptionist'
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import Departments from "./pages/receptionist/departments/Departments.jsx";
import DepartDetails from "./pages/receptionist/departments/DepartDetails/DepartDetails.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Admin from "./pages/admin/index.jsx";
import Settings from './pages/receptionist/Settings/Settings';
import Reception from "./pages/admin/reception/Reception.jsx";
import Appointments from "./pages/admin/reception/appointments/Appointments.jsx";
import Patients from "./pages/receptionist/patients/Patients.jsx";
import MoreInfo from "./pages/receptionist/patients/profile/MoreInfo.jsx";
import Profile from "./pages/receptionist/patients/profile/Profile.jsx";

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
    } else if (location.pathname.startsWith("/patient")) {
      setRole("patient");
    } else {
      setRole(""); // Default or no role
    }
  }, [location.pathname]);

  // Determine if the current path is a login or signup page
  const isLoginPage = ["/", "/password-reset", "/recovery-link", "/update-password"].includes(location.pathname);
  return (
    <>
        <div className={`${isSignUpOrLogin ? "" : styles.crmApp}`}>
          <div style={{width: '19vw'}}>
            <div className={styles.logo}>
              <Logo/>
            </div>
            {
              !isLoginPage && (
                    <div>
                      <Sidebar role={role}/>
                    </div>
                )
            }
          </div>
          {/* if login or register page is active, add this class ${styles.loginPageActive} */}
          <div className={`${styles.register} ${isSignUpOrLogin ? styles.loginPageActive : styles.otherPages}`}>
            <Routes>
              <Route path="/" element={<Login setIsSignUpOrLogin={setIsSignUpOrLogin}/>}/>
              <Route path="/password-reset" element={<PasswordReset setIsSignUpOrLogin={setIsSignUpOrLogin}/>}/>
              <Route path="/recovery-link" element={<RecoveryLink setIsSignUpOrLogin={setIsSignUpOrLogin}/>}/>
              <Route path="/update-password" element={<UpdatePassword setIsSignUpOrLogin={setIsSignUpOrLogin}/>}/>
              <Route path="/receptionist" element={<Receptionist setIsSignUpOrLogin={setIsSignUpOrLogin} setEntity={setEntity} entity={entity}/>}/>
              <Route path="/receptionist/patients" element={<Patients setIsSignUpOrLogin={setIsSignUpOrLogin} setEntity={setEntity} entity={entity} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/receptionist/departments" element={<Departments setIsSignUpOrLogin={setIsSignUpOrLogin} setEntity={setEntity} entity={entity}/>}/>
              <Route path="/receptionist/departments/departmentDetails" element={<DepartDetails setIsSignUpOrLogin={setIsSignUpOrLogin} setEntity={setEntity} entity={entity}/>}/>
              <Route path="/receptionist/settings" element={<Settings/>}/>
              <Route path="/admin" element={<Admin setIsSignUpOrLogin={setIsSignUpOrLogin} setEntity={setEntity} entity={entity}/>}/>
              <Route path="/admin/reception" element={<Reception setIsSignUpOrLogin={setIsSignUpOrLogin} setEntity={setEntity} entity={entity}/>}/><Route path="/admin/reception/appointments" element={<Appointments setIsSignUpOrLogin={setIsSignUpOrLogin} setEntity={setEntity} entity={entity}/>}/>
              <Route path="/more-info" element={<MoreInfo />} />
            </Routes>
          </div>
        {/*<div className="">*/}
        {/*  <Settings/>*/}
        {/*</div>*/}
        </div>
    </>
  );
}

export default App;
