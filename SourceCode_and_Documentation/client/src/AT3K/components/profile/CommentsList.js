import React from "react";
import Comment from './Comment';

const CommentsList = () => {
    return (
        <div style={{ padding: 14 }} className="App">
            <h1>Comments</h1>
            <Comment />
        </div>
    );
};

export default CommentsList;
