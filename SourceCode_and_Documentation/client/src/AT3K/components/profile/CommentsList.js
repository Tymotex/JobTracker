import React from "react";
import Comment from './Comment';

const CommentsList = ({ comments=[] }) => {
    return (
        <div style={{ padding: 14 }} className="App">
            <h1>Comments</h1>
            {comments && comments.map(eachComment => (
                <Comment {...eachComment} />
            ))}
        </div>
    );
};

export default CommentsList;
