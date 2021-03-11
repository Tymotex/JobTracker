import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
	TextField,
	Grid,
	Button
} from '@material-ui/core';
import GoogleButton from 'react-google-button';
import styles from './Modal.module.scss';


const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}
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


	return (
		<div>
			<Button variant="contained" color="info" onClick={handleOpen}>
				Register
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
						<h2 className={styles.title} id="transition-modal-title">Register</h2>
						<p className={styles.message} id="transition-modal-description">Register now! </p>
						<form autoComplete="off">
							<div className={styles.textGroup}>
								<TextField className={styles.nameBox}
									required
									type="name"
									id="outlined-required"
									label="Full Name"
									variant="outlined"
								/>
								<TextField className={styles.emailBox}
									required
									id="outlined-required"
									label="Email"
									variant="outlined"
								/>
								<TextField className={styles.passwordBox}
									required
									type="password"
									id="outlined-required"
									label="Password"
									variant="outlined"
								/>
								<TextField className={styles.passCheckBox}
									required
									type="password"
									id="outlined-required"
									label="Re-enter Password"
									variant="outlined"
								/>
							</div>
						</form>
						<Grid container className={styles.buttonGroup}>
							<Grid item xs={6}>
								<Button className={styles.cancelButton} variant="contained" color="danger">Cancel</Button>
							</Grid>
							<Grid item xs={6}>
								<Button className={styles.registerButton} variant="contained" color="primary">Register</Button>
							</Grid>
						</Grid>
						<p className={styles.register}>Or register with your Google account</p>
						<GoogleButton className={styles.googleButton}
							onClick={() => { console.log('Google button clicked') }}
						/>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
