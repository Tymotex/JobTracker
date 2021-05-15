import React from 'react';
import logo from './google.png';
import styles from './GoogleLogin.module.scss';

const GoogleLoginButton = props => {
    return (
        <>

            <button className={styles.button}>
                <span className={styles.logo}>
                    <img 
                        alt="google logo"
                        src={logo} 
                    />
                </span>
                <span className={styles.text}>
                    Sign in with Google
                </span>
            </button>
        </>
    )
}

GoogleLoginButton.propTypes = {

}

export default GoogleLoginButton
