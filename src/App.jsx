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

function App() {
  const [isSignUpOrLogin, setIsSignUpOrLogin] = useState(true);
  const [entity, setEntity] = useState("");

  // Hook to get the current location
  const location = useLocation();

  // Determine if the current path is a login or signup page
  const isLoginPage = ["/", "/password-reset", "/recovery-link", "/update-password"].includes(location.pathname);
  return (
    <>
        <div className={`${isSignUpOrLogin ? "" : styles.crmApp}`}>
          <div style={{width: '20vw'}}>
            <div className={styles.logo}>
              <Logo/>
            </div>
            {
              !isLoginPage && (
                    <div>
                      <Sidebar/>
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
              <Route path="/receptionist"
                     element={<Receptionist setIsSignUpOrLogin={setIsSignUpOrLogin} setEntity={setEntity}
                                            entity={entity}/>}/>
              <Route path="/departments"
                     element={<Departments setIsSignUpOrLogin={setIsSignUpOrLogin} setEntity={setEntity}
                                           entity={entity}/>}/>
              <Route path="/departmentDetails"
                     element={<DepartDetails setIsSignUpOrLogin={setIsSignUpOrLogin} setEntity={setEntity}
                                             entity={entity}/>}/>
            </Routes>
          </div>
        </div>
    </>
  );
}

export default App;