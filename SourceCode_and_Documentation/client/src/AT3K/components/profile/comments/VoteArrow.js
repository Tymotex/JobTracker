import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React, { useState } from 'react';
import styles from './VoteArrow.module.scss';

const VoteArrow = ({ initialVote=0 }) => {
    const [vote, setVote] = useState(initialVote);

    const upvote = () => {
        setVote(vote + 1);
    }
    const downvote = () => {
        setVote(vote - 1);
    }

    // Applying a different class depending on the range that the vote falls under
    let voteClass;
    if (vote > 0) {
        voteClass = styles.positive;
    } else if (vote < 0) {
        voteClass = styles.negative;
    } else {
        voteClass = styles.neutral;
    }

    return (
        <div className={styles.container}>
            <div>
                <KeyboardArrowUpIcon 
                    className={styles.arrow}
                    onClick={upvote}
                /> 
            </div>
            <div className={styles.vote}>
                <span className={voteClass}>
                    {vote}
                </span>
            </div>
            <div>
                <KeyboardArrowDownIcon 
                    className={styles.arrow}
                    onClick={downvote}
                />
            </div>
        </div>
    )
};

export default VoteArrow;
