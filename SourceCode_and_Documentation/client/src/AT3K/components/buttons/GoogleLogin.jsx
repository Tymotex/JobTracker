import React from 'react';
import logo from './google.png';
import styles from './GoogleLogin.module.scss';

const GoogleLoginButton = ({ onClick }) => {
    return (
        <button className={styles.button} onClick={onClick} type="button">
            <span className={styles.logo}>
                <img alt="google logo" src={logo} />
            </span>
            <span className={styles.text}>Sign in with Google</span>
        </button>
    );
};

export default GoogleLoginButton;
