import { Avatar, Grid, Paper } from "@material-ui/core";
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

const Comment = ({ sender_user_id, comment, date, vote=3 }) => {
    const [profile, setProfile] = useState(null);

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
    }, [])

    return (
        <Paper className={styles.comment} elevation={3}>
            {profile && (
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar src={profile.image_url} />
                        <VoteArrow 
                            initialVote={vote}
                        />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>{profile.username}</h4>
                        <p>UserID: {sender_user_id}</p>
                        <div>
                            <RichTextDisplay
                                readOnly
                                value={Value.fromJSON(comment)}
                            />
                        </div>
                        <p style={{ textAlign: "left", color: "gray" }}>
                            Posted: {date}
                        </p>
                    </Grid>
                </Grid>
            )}
        </Paper>
    );
};

export default Comment;
