import { useState } from 'react';
import styles from './App.module.scss';
import Login from './pages/login';
import PasswordReset from './pages/passwordReset';
import RecoveryLink from './pages/recoveryLink';
import UpdatePassword from './pages/updatePassword';
import Logo from './components/Logo';

const PAGES = {
  login: Login,
  passwordReset: PasswordReset,
  recoveryLink: RecoveryLink,
  updatePassword: UpdatePassword,
};

function App() {
  const [activePage, setActivePage] = useState('updatePassword');
  const ActivePage = PAGES[activePage];

  return (
    <>
      <Logo />
      <div className={styles.pageSwitcher}>
        {Object.keys(PAGES).map((page) => (
          <button
            key={page}
            type="button"
            className={activePage === page ? styles.pageSwitcher__active : ''}
            onClick={() => setActivePage(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <div className={styles.register}>
        <ActivePage />
      </div>
    </>
  );
}

export default App;
