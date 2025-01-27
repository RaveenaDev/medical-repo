import React, { useState } from 'react';
import styles from './App.module.scss';
import Login from './pages/login';
import PasswordReset from './pages/passwordReset';
import RecoveryLink from './pages/recoveryLink';
import UpdatePassword from './pages/updatePassword';
import Logo from './components/Logo';
import Notification from './components/NotificationFunc/Notification';
import Appointment from './components/Buttons/Appointment';
import BookAppointmentButton from './components/Buttons/BookApp';
import BillingButton from './components/Buttons/Billing';

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
          <Appointment/>
          <BookAppointmentButton/>
          <BillingButton/>
          
        </div>
    </>
  );
}

export default App;