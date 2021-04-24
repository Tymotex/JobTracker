import React from "react";
import Comment from './Comment';
import { Value } from 'slate';

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

const user2 = {
    username: "Elon Musk",
    profileUserID: 123,
    image: "https://ichef.bbci.co.uk/news/976/cpsprodpb/7727/production/_103330503_musk3.jpg",
    comment: initialValue,
    vote: 10,
    date: "1 month ago",
};

const user3 = {
    username: "Jeff Bezos",
    profileUserID: 123,
    image: "https://cdn.britannica.com/56/199056-050-CCC44482/Jeff-Bezos-2017.jpg",
    comment: initialValue,
    vote: -100,
    date: "1 month ago",
};

const CommentsList = () => {
    return (
        <div style={{ padding: 14 }} className="App">
            <h1>Comments</h1>
            <Comment {...user2} />
            <Comment {...user3} />
        </div>
    );
};

export default CommentsList;
