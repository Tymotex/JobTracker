import { Avatar, Grid, Paper } from "@material-ui/core";
import React from "react";
import {
    VoteArrow
} from './comments';
import RichTextDisplay from '../richtext/RichTextDisplay';
import styles from './Comment.module.scss';

const Comment = ({ username, profileUserID, image, comment, vote, date }) => {
    return (
        <Paper className={styles.comment} elevation={3}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar src={image} />
                    <VoteArrow 
                        initialVote={vote}
                    />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>{username}</h4>
                    <p>UserID: {profileUserID}</p>
                    <div>
                        <RichTextDisplay
                            readOnly
                            value={comment}
                        />
                    </div>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        Posted: {date}
                    </p>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Comment;
