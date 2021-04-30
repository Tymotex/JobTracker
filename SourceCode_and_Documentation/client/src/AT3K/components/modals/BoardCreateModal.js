import { TextField } from '@material-ui/core';
import axios from 'axios';
import Cookie from 'js-cookie';
import React, { useState } from 'react';
import api from '../../constants/api';
import { Notification } from '../notification';
import RichTextDisplay from '../richtext/RichTextDisplay';
import styles from './Modal.module.scss';
import ModalWindow from './ModalWindow';

export default function BoardCreateModal({ handleClose, updateBoardList }) {
    const [boardName, setBoardName] = useState(""); 
    const [boardImage, setBoardImage] = useState("");

    // ===== POST /api/boards =====
    const createBoard = (boardDescription) => {
        const userID = Cookie.get("user_id");
        if (userID) {
            const postData = {
                method: "post",
                url: `${api.BASE_URL}/api/user/boards`,
                data: {
                    'user_id': userID,
                    'name': boardName,
                    'description': boardDescription,
                    'image_url': boardImage
                },
                headers: { "Content-Type": "application/json" }
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
                        value={boardName}
                        onChange={(e) => setBoardName(e.target.value)}
                        id="outlined-required"
                        label="Board Name"
                        variant="outlined"
                    />
                    <TextField className={styles.blockFields}
                        name="image_url"
                        id="outlined-required"
                        defaultValue="https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        multiline
                        rows={3}
                        label="Image URL"
                        value={boardImage}
                        onChange={(e) => setBoardImage(e.target.value)}
                        variant="outlined"
                    />
                    <h3>Board Description</h3>
                    <p>Give a brief description about your goals, what jobs you will track, etc. </p>
                    <RichTextDisplay
                        readOnly={false}
                        buttonText="Create"
                        onSubmit={createBoard}
                    />
                </div>
            </form>
        </ModalWindow>
    );
}
