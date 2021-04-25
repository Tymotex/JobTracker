import { Avatar, Grid, Paper } from "@material-ui/core";
import {
    Link
} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import {
    VoteArrow
} from './comments';
import RichTextDisplay from '../richtext/RichTextDisplay';
import styles from './Comment.module.scss';
import { Value } from 'slate';
import axios from 'axios';
import Cookie from 'js-cookie';
import api from '../../constants/api';
import { EllipsesMenu } from '../menus';
import ReactTimeAgo from 'react-time-ago';
import moment from 'moment';
import { Notification } from '../notification';

const Comment = ({ sender_user_id, comment, date, vote=3 }) => {
    const [profile, setProfile] = useState(null);
    const [editingEnabled, setEditingEnabled] = useState(false);
    const postedDate = new Date(date * 1000);
    
    const options = [
        "Edit comment",
        "Delete comment"
    ];

    const handleCommentOperation = (operation) => {
        if (operation === "Edit comment") {
            setEditingEnabled(true);
        } else if (operation === "Delete comment") {
            Notification.spawnInvalid("DELETE COMMENT NOT IMPLEMENTED.");
        }
    };

    const saveComment = () => {
        Notification.spawnInvalid("SAVE COMMENT NOT IMPLEMENTED.");
        setEditingEnabled(false);
    };

    // ==== GET /api/user/profile =====
    const getUserProfile = (senderUserID) => {
        const userID = Cookie.get("user_id");
        if (userID) {
            if (!senderUserID) Notification.spawnInvalid("No user ID specified");
            else {
                axios.get(`${api.BASE_URL}/api/user/profile?user_id=${senderUserID}`)
                    .then(res => {
                        setProfile(res.data);
                    })
                    .catch(err => {
                        Notification.spawnError(err);
                    });
            }
        } else {
            Notification.spawnRegisterError();
        }
    };

    useEffect(() => {
        getUserProfile(sender_user_id);
    }, [sender_user_id])


    return (
        <Paper className={styles.comment} elevation={3}>
            <EllipsesMenu 
                className={styles.optionsMenu}
                options={options}
                onItemClick={handleCommentOperation}
            />
            {profile && (
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Link to={`/user/${sender_user_id}`}>
                            <Avatar 
                                className={styles.avatar}
                                src={profile.image_url} 
                            />
                        </Link>
                        <VoteArrow 
                            initialVote={vote}
                        />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                        <Link to={`/user/${sender_user_id}`}>
                            <h3 className={styles.username}>
                                {profile.username}
                            </h3>
                        </Link>
                        <div className={styles.commentBox}>
                            <RichTextDisplay
                                readOnly={!editingEnabled}
                                value={Value.fromJSON(comment)}
                                buttonText="Save"
                                onSubmit={saveComment}
                            />
                        </div>
                        <p className={styles.postedTime}>
                            Commented <ReactTimeAgo date={postedDate} locale="en-US"/>, on {moment(postedDate).format("dddd do MMM, YYYY, hh:mmA")}
                        </p>
                        <span className={styles.userID}>
                            UserID: {sender_user_id}
                        </span>
                    </Grid>
                </Grid>
            )}
        </Paper>
    );
};

export default Comment;
