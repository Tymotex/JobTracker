import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
    TextField,
    Grid
} from '@material-ui/core';
import { Button } from '../buttons';
import { GoogleLoginButton } from '../buttons';
import styles from './Modal.module.scss';
import Cookie from 'js-cookie';
import axios from 'axios';
import api from '../../constants/api';
import { Notification } from '../../components/notification';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
}));

export default function TransitionsModal() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const login = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const postData = {
			method: "post",
			url: `${api.BASE_URL}/api/auth/login`,
			data: formData,
			headers: { "Content-Type": "multipart/form-data" }
		};
		const loginRequest = axios(postData);
		Notification.spawnNotification(
			loginRequest,
            "Loading",
			"Successfully logged in!",
			"Failed to log in!"
		);
		loginRequest.then((newUserData) => {
			// TODO: Do something other than force reload the window
			Cookie.set("user_id", newUserData.data.user_id);
			Cookie.set("token", newUserData.data.token);
			window.location.reload();
		})
		.catch((err) => {
			Notification.spawnError(err);
		});
	};

    // Google Login
    // const signinRedirect = () => {
    //     Notification.spawnSuccess("Signing in via Google");
    //     window.location.assign("https://localhost:5000/api/auth/googlelogin")
    // }


    return (
        <div>
            <Button variant="contained" color="info" onClick={handleOpen}>
                Login
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={styles.window}>
                        <h2 className={styles.title} id="transition-modal-title">Log In</h2>
                        <p className={styles.message} id="transition-modal-description">Welcome back!</p>
                        <form autoComplete="off" onSubmit={login}>
                            <div className={styles.textGroup}>
                                <TextField className={styles.emailBox}
                                    required
                                    id="outlined-required"
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                />
                                <TextField className={styles.passwordBox}
                                    required
                                    type="password"
                                    name="password"
                                    id="outlined-required"
                                    label="Password"
                                    variant="outlined"
                                />
                            </div>
                            {/* <GoogleButton className={styles.googleButton}
                                onClick={signinRedirect}
                            /> */}
                            <GoogleLoginButton />
                            <Grid container className={styles.buttonGroup}>
                                <Grid item xs={6}>
                                    <Button onClick={handleClose} className={styles.cancelButton} variant="contained" color="danger">Cancel</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button type="submit" className={styles.loginButton} variant="contained" color="primary">Login</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
