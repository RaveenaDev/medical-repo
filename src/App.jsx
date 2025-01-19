import React, { useState } from "react";
import styles from "./App.module.scss";
import Login from "./pages/login";
import PasswordReset from "./pages/passwordReset";
import RecoveryLink from "./pages/recoveryLink";
import UpdatePassword from "./pages/updatePassword";
import Logo from "./components/Logo";
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from "react-router-dom";
import styles2 from "./App2.module.scss";
import PatientPanel from "./pages/admin/PatientPanel";
import PatientDetails from "./pages/admin/PatientDetails";
import Billing from "./pages/admin/Billing";
import History from "./pages/admin/History";
import Tracking from "./pages/admin/Tracking";


function App() {
  return (
    <>
    <BrowserRouter>
    
      <div className={styles2.main}>
          <div className={styles2.left}>
            <Logo />
            
          </div>

          <div className={styles2.right}>
          <Routes>
            <Route path="/" element={<PatientPanel/>}></Route>
            <Route path="/PatientDetails" element={<PatientDetails/>}></Route>
            <Route path="/Billing" element={ <Billing/> }></Route>
            <Route path="/History" element={ <History/> }></Route>
            <Route path="/Tracking" element={ <Tracking/> }></Route>




              

            
            

          </Routes>
          </div>
          


      </div>
      </BrowserRouter>
    </>
  );
}

export default App;
