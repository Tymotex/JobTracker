import {
    Grid
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import { Button } from '../buttons';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import styles from './Modal.module.scss';
import axios from 'axios';
import api from '../../constants/api';
import { Notification } from '../notification';
import Cookie from 'js-cookie'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    }
}));

export default function TransitionsModal({ open, handleClose, boardID, fetchBoards }) {
    const classes = useStyles();

    const deleteBoard = (event) => {
        event.preventDefault();
        const userID = Cookie.get("user_id");
        if (userID) {
            const deleteData = {
                method: "delete",
                url: `${api.BASE_URL}/api/user/board`,
                data: {
                    user_id: userID,
                    board_id: boardID
                }
            }
            axios(deleteData)
                .then(() => {
                    Notification.spawnSuccess(`Successfully deleted board`);
                    fetchBoards();
                    handleClose();
                })
                .catch((err) => Notification.spawnError(err));
        } else {
            Notification.spawnRegisterError();
        }
    };

    return (
        <div>
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
                        <h2 className={styles.title} id="transition-modal-title">
                            Delete Board
                        </h2>
                        <Grid container className={styles.buttonGroup}>
                            <Grid item xs={6}>
                                <Button onClick={handleClose} className={styles.cancelButton} variant="contained" color="secondary">Cancel</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button onClick={deleteBoard} className={styles.registerButton} variant="contained" color="danger">Proceed</Button>
                            </Grid>
                        </Grid>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
