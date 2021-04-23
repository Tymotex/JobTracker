import {
    Grid, TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Cookie from 'js-cookie';
import React from 'react';
import { Button } from '../../components/buttons';
import api from '../../constants/api';
import { Notification } from '../notification';
import styles from './Modal.module.scss';
import ModalWindow from './ModalWindow';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));

export default function TransitionsModal({ open, handleClose, updateBoardList }) {
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
                    handleClose();
                })
                .catch((err) => {
                    Notification.spawnError(err);
                });
        } else {
            Notification.spawnRegisterError();
        }
    }

    // ============================


    return (
        <ModalWindow
            buttonText="Create New Board"
        >
            <div className={styles.modalTitle}>
                <h2>
                    Create New Board
                </h2>
            </div>
            <form autoComplete="off" onSubmit={createBoard}>
                <div className={styles.inputGroup}>
                    <TextField className={styles.blockFields}
                        required
                        name="name"
                        type="name"
                        id="outlined-required"
                        label="Board Name"
                        variant="outlined"
                    />
                    <TextField className={styles.blockFields}
                        name="description"
                        multiline
                        rows={5}
                        id="outlined-required"
                        label="Description"
                        variant="outlined"
                    />
                    <TextField className={styles.blockFields}
                        name="image_url"
                        id="outlined-required"
                        value="https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        multiline
                        rows={3}
                        label="Image URL"
                        variant="outlined"
                    />
                </div>
                <div className={styles.buttonGroup}>
                    <Button onClick={handleClose} className={styles.cancelButton} variant="contained" color="danger">Cancel</Button>
                    <Button type="submit" className={styles.registerButton} variant="contained" color="primary">Create</Button>
                </div>
            </form>
        </ModalWindow>
    );
}
