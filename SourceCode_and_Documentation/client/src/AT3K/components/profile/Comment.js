import { Avatar, Grid, Paper } from "@material-ui/core";
import React from "react";
import {
    VoteArrow
} from './comments';
import RichTextDisplay from '../richtext/RichTextDisplay';
import { Value } from 'slate';

const imgLink = "https://d5t4h5a9.rocketcdn.me/wp-content/uploads/2020/11/Professional-Headshot-Poses-Blog-Post.jpg";



const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: "block",
                type: "paragraph",
                nodes: [
                    {
                        object: "text",
                        leaves: [
                            { text: "This is a " },
                            { text: "great ", marks: [{ type: "bold" }] },
                            { text: "resume but... sunt fugiat officia pariatur aliqua magna nulla et dolor. Ea et id ea ipsum Lorem excepteur. Excepteur adipisicing enim id consectetur anim mollit ad esse aliqua dolore aliqua. Id do nostrud sint laborum nulla cupidatat reprehenderit anim. Eu ex minim aute tempor laborum mollit consequat ut." }
                        ]
                    }
                ]
            },
        ]
    }
});

const Comment = () => {
    return (
        <Paper style={{ padding: "40px 20px" }} elevation={3}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar src={imgLink} />
                    <VoteArrow 
                        vote={3}
                    />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>Andrew Taylor</h4>
                    <div>
                        <RichTextDisplay
                            readOnly
                            value={initialValue}
                        />
                    </div>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        posted 1 minute ago
                    </p>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Comment;
