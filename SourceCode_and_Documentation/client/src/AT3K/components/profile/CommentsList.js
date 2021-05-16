import React from "react";
import AttributeTitle from "./AttributeTitle";
import Comment from './Comment';

const CommentsList = ({ comments=[] }) => {
    console.log(comments);
    return (
        <div style={{ paddingBottom: 14 }} className="App">
            <AttributeTitle>Comments</AttributeTitle>
            {comments && comments.map(eachComment => (
                <Comment {...eachComment} />
            ))}
        </div>
    );
};

export default CommentsList;
