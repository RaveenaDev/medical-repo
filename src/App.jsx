import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Login from './pages/login/login';
import PasswordReset from './pages/login/passwordReset';
import RecoveryLink from './pages/login/recoveryLink';
import UpdatePassword from './pages/login/updatePassword';
import Logo from './components/Logo';
import Receptionist from './pages/receptionist'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Faq from './pages/receptionist/Settings/Faq'
import Settings from './pages/receptionist/Settings/Settings';
import PrivacyPolicy from './pages/receptionist/Settings/PrivacyPolicy';

function App() {
  const [isSignUpOrLogin, setIsSignUpOrLogin] = useState(true);
  const [entity, setEntity] = useState("");
  return (
    <>
      <div className={`${isSignUpOrLogin ? "" : styles.crmApp}`}>
        <div className={styles.logo}>
        <Logo/>
        </div>
        {/* if login or register page is actiive, add this class ${styles.loginPageActive} */}
        {/* <div className={`${styles.register} ${isSignUpOrLogin ? styles.loginPageActive : styles.otherPages}`}>
          <Router>
            <Routes>
              <Route path="/" element={<Login setIsSignUpOrLogin={setIsSignUpOrLogin} />} />
              <Route path="/password-reset" element={<PasswordReset setIsSignUpOrLogin={setIsSignUpOrLogin} />} />
              <Route path="/recovery-link" element={<RecoveryLink setIsSignUpOrLogin={setIsSignUpOrLogin} />} />
              <Route path="/update-password" element={<UpdatePassword setIsSignUpOrLogin={setIsSignUpOrLogin} />} />
              <Route path="/receptionist" element={<Receptionist setIsSignUpOrLogin={setIsSignUpOrLogin} setEntity={setEntity} entity={entity}/>} />
            </Routes>
          </Router>
        </div> */}
        <div className="">
          <Faq/>
        </div>
      </div>
    </>
  );
}

export default App;