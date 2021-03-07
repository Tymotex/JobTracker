import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import {
	TextField,
	Grid
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
			<button type="button" onClick={handleOpen}>
					Register
			</button>
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
					<h2 
						className={styles.title}
						id="transition-modal-title"
					>
						Register
					</h2>
					<p id="transition-modal-description">
						Register now! 
					</p>
					<form autoComplete="off">
						<TextField
							required
							id="outlined-required"
							label="Email"
							variant="outlined"
						/>
						<TextField
							required
							type="password"
							id="outlined-required"
							label="Password"
							variant="outlined"
						/>
						<GoogleButton
							className={styles.fullWidth}
							onClick={() => { console.log('Google button clicked') }}
						/>
					</form>
					<Grid container className={styles.buttonGroup}> 
						<Grid item xs={6}>
							<Button className={styles.cancelButton} variant="contained" color="danger">Cancel</Button>
						</Grid>
						<Grid item xs={6}>
							<Button className={styles.registerButton} variant="contained" color="primary">Register</Button>
						</Grid>
					</Grid>
				</div>
				</Fade>
			</Modal>
		</div>
	);
}
