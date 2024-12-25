import React from 'react';
import styles from '../../styles/components/logo.module.scss';

const Logo = () => {
    return (
        <div className={styles.logo}>
            <p className={styles.logo__image}>Logo</p>
            <p className={styles.logo__tagline}>Tagline</p>
        </div>
    );
};

export default Logo;