import { TextField } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Cookie from 'js-cookie';
import React, { useState } from 'react';
import api from '../../constants/api';
import { Notification } from '../notification';
import RichTextDisplay from '../richtext/RichTextDisplay';
import { Value } from 'slate';
import styles from './Modal.module.scss';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    }
}));

export default function BoardEditModal({ boardID, open, handleClose, boardName, setBoardName, boardDescription, setBoardDescription, boardImageURL, setBoardImageURL }) {
    const classes = useStyles();
    const [name, setNameField] = useState(boardName);
    const [imageURL, setImageURL] = useState(boardImageURL);

    const editBoard = (boardDescription) => {
        const userID = Cookie.get("user_id");
        if (userID) {
            const putData = {
                method: "put",
                url: `${api.BASE_URL}/api/user/board`,
                data: {
                    'user_id': userID,
                    'board_id': boardID,
                    'new_name': name,
                    'new_description': boardDescription,
                    'new_image_url': imageURL
                },
                headers: { 'Content-Type': 'application/json' }
            };
            axios(putData)
                .then((res) => {
                    setBoardName(name);
                    // TODO: board description not rerendering?
                    setBoardDescription(boardDescription);
                    setBoardImageURL(imageURL);
                    Notification.spawnSuccess(`Successfully edited board '${res.data.new_name}'`);
                })
                .catch((err) => Notification.spawnError(err));
        } else {
            Notification.spawnRegisterError();
        }
        handleClose();
    };

    const handleNameType = (event) => {
        setNameField(event.target.value);
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
                                    name="new_image_url"
                                    multiline
                                    id="outlined-required"
                                    onChange={handleImageURLType}
                                    label="Image URL"
                                    value={imageURL}
                                    defaultValue={boardImageURL}
                                    variant="outlined"
                                />
                                <RichTextDisplay
                                    readOnly={false}
                                    value={Value.fromJSON(boardDescription)}
                                    buttonText="Update"
                                    onSubmit={editBoard}
                                />
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};
