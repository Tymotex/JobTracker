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
import axios from 'axios';
import Cookie from 'js-cookie';
import api from '../../constants/api';
import { EllipsesMenu } from '../menus';
import ReactTimeAgo from 'react-time-ago';
import moment from 'moment';
import { Notification } from '../notification';

const Comment = ({ sender_user_id, comment, _id: commentID, date, vote=3 }) => {
    const [profile, setProfile] = useState(null);
    const [editingEnabled, setEditingEnabled] = useState(false);
    const [showComment, setShowComment] = useState(true);
    const postedDate = new Date(date * 1000);
    const [commentVote, setVote] = useState(vote);
    
    const options = [
        "Edit comment",
        "Delete comment"
    ];

    const handleCommentOperation = (operation) => {
        if (operation === "Edit comment") {
            setEditingEnabled(true);
        } else if (operation === "Delete comment") {
            deleteComment();
        }
    };

    // ===== PUT /api/comment/ =====
    const saveComment = (newComment) => {
        const userID = Cookie.get("user_id");
        console.log(commentID);
        if (userID) {
            const putData = {
                method: 'put',
                url: `${api.BASE_URL}/api/comment/`,
                data: {
                    comment_id: commentID,
                    new_comment: newComment
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            axios(putData)  
                .then(res => {
                    Notification.spawnSuccess("Successfully edited comment");
                    setEditingEnabled(false);
                })
                .catch(err => Notification.spawnError(err))
        }
    };

    // ===== DELETE /api/comment/ =====
    const deleteComment = () => {
        const userID = Cookie.get("user_id");
        if (userID) {
            const putData = {
                method: 'delete',
                url: `${api.BASE_URL}/api/comment/`,
                data: {
                    comment_id: commentID
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            axios(putData)  
                .then(() => {
                    Notification.spawnSuccess("Deleted comment");
                    setEditingEnabled(false);
                    setShowComment(false);
                })
                .catch(err => Notification.spawnError(err));
        }
    }

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

    // ===== POST /api/comment/vote =====
    const incrementVote = (incrementAmount) => {
        const userID = Cookie.get("user_id")
        if (userID) {
            const postData = {
                method: 'post',
                url: `${api.BASE_URL}/api/comment/vote`,
                data: {
                    user_id: userID,
                    comment_id: commentID,
                    increment_amount: incrementAmount
                },
            };
            axios(postData)
                .then(() => {
                    Notification.spawnSuccess("Voted successfully");
                    setVote(commentVote + incrementAmount);
                })
                .catch(err => Notification.spawnError(err));
        }
    }

    useEffect(() => {
        getUserProfile(sender_user_id);
    }, [sender_user_id])


    return (
        <>
            {showComment && (
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
                                    vote={commentVote}
                                    incrementVote={incrementVote}
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
                                        value={comment}
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
            )}
        </>
    );
};

export default Comment;
