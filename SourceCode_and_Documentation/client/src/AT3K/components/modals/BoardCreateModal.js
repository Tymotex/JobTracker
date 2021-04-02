import {
    Grid, TextField
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import styles from './Modal.module.scss';
import axios from 'axios';
import api from '../../constants/api';
import Cookie from 'js-cookie';
import { Notification } from '../notification';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));

// TODO!!!!!!!
// Modals are repetitive.
// Maybe extract most of the html to a base component

export default function TransitionsModal({ open, handleClose, updateBoardList }) {
    const classes = useStyles();

    // ===== POST /api/boards =====

    const createBoard = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
        const userID = Cookie.get("user_id");
        if (userID) {
            formData.append("user_id", userID);
            const postData = {
                method: "post",
                url: `${api.BASE_URL}/api/user/boards`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" }
            };
            axios(postData)
                .then(() => {
                    Notification.spawnSuccess("Successfully created board");
                    updateBoardList();
                })
                .catch((err) => {
                    alert(err);
                    Notification.spawnError(err);
                });
        } else {
            Notification.spawnRegisterError();
        }
    }

    // ============================

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
                            Create Board
                        </h2>
                        <form autoComplete="off" onSubmit={createBoard}>
                            <div className={styles.textGroup}>
                                <TextField className={styles.nameBox}
                                    required
                                    name="name"
                                    type="name"
                                    id="outlined-required"
                                    label="Board Name"
                                    variant="outlined"
                                />
                                <TextField className={styles.emailBox}
                                    name="description"
                                    multiline
                                    id="outlined-required"
                                    label="Description"
                                    variant="outlined"
                                />
                            </div>
                            <Grid container className={styles.buttonGroup}>
                                <Grid item xs={6}>
                                    <Button className={styles.cancelButton} variant="contained" color="danger">Cancel</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button type="submit" className={styles.registerButton} variant="contained" color="primary">Create</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
