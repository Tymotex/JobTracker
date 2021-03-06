import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
        TextField,
        Button
} from '@material-ui/core';
import GoogleButton from 'react-google-button'
import styles from './Modal.module.scss';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
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


    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Login
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
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Log In</h2>
                        <p id="transition-modal-description">Welcome back!</p>
                        <form autoComplete="off">
                                <TextField className={styles.fullWidth} id="standard-basic" label="Standard" />
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
                        </form>
                        <GoogleButton
                                onClick={() => { console.log('Google button clicked') }}
                        />
                        <Button variant="contained" color="danger">Cancel</Button>
                        <Button variant="contained" color="primary">Register</Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
