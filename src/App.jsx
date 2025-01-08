import React, { useState } from 'react';
import styles from './App.module.scss';
import Login from './pages/login';
import PasswordReset from './pages/passwordReset';
import RecoveryLink from './pages/recoveryLink';
import UpdatePassword from './pages/updatePassword';
import Logo from './components/Logo';
import Notification from './components/Notification/Notification';

function App() {

  return (
    <>
      <Logo/>
        <div className={`${styles.register}`}>
          {/* <Login/> */}
          {/* <PasswordReset/> */}
          {/* <RecoveryLink/> */}
          {/* <UpdatePassword/> */}
          <Notification/>
        </div>
    </>
  );
}

export default App;