import {
    TextField
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import React from 'react';
import styles from './Modal.module.scss';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.8)",
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
            <SettingsIcon onClick={handleOpen} />
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
                        <h2 className={styles.title} id="transition-modal-title">Board Settings</h2>
                        <form autoComplete="off">
                            <TextField className={styles.fullWidth} id="standard-basic" label="Standard" />
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
