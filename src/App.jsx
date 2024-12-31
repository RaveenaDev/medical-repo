import React, { useState } from "react";
import styles from "./App.module.scss";
import Login from "./pages/login";
import PasswordReset from "./pages/passwordReset";
import RecoveryLink from "./pages/recoveryLink";
import UpdatePassword from "./pages/updatePassword";
import Logo from "./components/Logo";
import History from "./pages/admin/History";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles2 from "./App2.module.scss";

function App() {
  return (
    <>
      <div className={styles2.main}>
        <Router>

          <div className={styles2.left}>
            <Logo />
            <Sidebar role="admin" />
          </div>



          <div className={styles2.right}>
            


          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
