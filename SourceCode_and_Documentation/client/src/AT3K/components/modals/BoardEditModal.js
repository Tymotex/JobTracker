import {
    Grid, TextField
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import styles from './Modal.module.scss';
import axios from 'axios';
import api from '../../constants/api';
import { Notification } from '../notification';
import Cookie from 'js-cookie';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));

export default function BoardEditModal({ boardID, open, handleClose, boardName, setBoardName, boardDescription, setBoardDescription, boardImageURL, setBoardImageURL }) {
    const classes = useStyles();
    const [name, setNameField] = useState(boardName);
    const [description, setDescriptionField] = useState(boardDescription);
    const [imageURL, setImageURL] = useState(boardImageURL);


    const editBoard = (event) => {
        event.preventDefault();
        const userID = Cookie.get("user_id");
        if (userID) {
            const formData = new FormData(event.target);
            formData.append("user_id", userID);
            formData.append("board_id", boardID);
            const putData = {
                method: "put",
                url: `${api.BASE_URL}/api/user/board`,
                data: formData,
            }
            axios(putData)
                .then((res) => {
                    setBoardName(res.data.new_name);
                    setBoardDescription(res.data.new_description);
                    setBoardImageURL(res.data.new_image_url);
                    Notification.spawnSuccess(`Successfully edited board '${res.data.new_name}'`);
                })
                .catch((err) => alert(err));
        } else {
            Notification.spawnRegisterError();
        }
        handleClose();
    };

    const handleNameType = (event) => {
        setNameField(event.target.value);
    }

    const handleDescriptionType = (event) => {
        setDescriptionField(event.target.value);
    }

    const handleImageURLType = (event) => {
        setImageURL(event.target.value);
    }

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
                            Edit Board
                        </h2>
                        <form autoComplete="off" onSubmit={editBoard}>
                            <div className={styles.textGroup}>
                                <TextField className={styles.nameBox}
                                    required
                                    name="new_name"
                                    id="outlined-required"
                                    onChange={handleNameType}
                                    label="Board Name"
                                    value={name}
                                    defaultValue={boardName}
                                    variant="outlined"
                                />
                                <TextField className={styles.emailBox}
                                    required
                                    name="new_description"
                                    multiline
                                    id="outlined-required"
                                    onChange={handleDescriptionType}
                                    label="Description"
                                    value={description}
                                    defaultValue={boardDescription}
                                    variant="outlined"
                                />
                                <TextField className={styles.emailBox}
                                    required
                                    name="new_image_url"
                                    multiline
                                    id="outlined-required"
                                    onChange={handleImageURLType}
                                    label="Image URL"
                                    value={imageURL}
                                    defaultValue={boardImageURL}
                                    variant="outlined"
                                />
                            </div>
                            <Grid container className={styles.buttonGroup}>
                                <Grid item xs={6}>
                                    <Button onClick={handleClose} className={styles.cancelButton} variant="contained" color="danger">Cancel</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button type="submit" className={styles.registerButton} variant="contained" color="primary">Save</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};
