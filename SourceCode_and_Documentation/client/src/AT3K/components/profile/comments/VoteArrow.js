import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React, { useState } from 'react';
import styles from './VoteArrow.module.scss';

// If voteInfo doesn't exist, then the current user hasn't voted for this comment yet
// otherwise, we can prevent the user from further voting.
const VoteArrow = ({ commentID, userID, vote = 0, incrementVote, voteInfo, clearVote }) => {
    const [currVoteInfo, setVoteInfo] = useState(voteInfo);
    const [currVote, setVote] = useState(vote);

    const handleVote = (incrementAmount) => {
        // If the vote already exists, then clear it
        if (currVoteInfo) {
            // Previous vote amount and the new vote amount must have the same sign
            // to be cleared (otherwise you'll be able to use an upvote to cancel a downvote
            // and vice versa). This method might cause integer overflow.
            if (currVoteInfo.vote_amount * incrementAmount > 0) {
                setVoteInfo(null);
                setVote(currVote - incrementAmount);
            } else {
                clearVote(commentID);
                setVoteInfo(null);
                setVote(currVote + incrementAmount);
            }
        } else {
            setVoteInfo({
                "voter_id": userID,
                "vote_amount": incrementAmount
            })
            setVote(currVote + incrementAmount);
            incrementVote(incrementAmount);
        }
    }

    // Applying a different class depending on the range that the vote falls under
    let voteClass;
    if (currVote > 0) {
        voteClass = styles.positive;
    } else if (currVote < 0) {
        voteClass = styles.negative;
    } else {
        voteClass = styles.neutral;
    }

    return (
        <div className={styles.container}>
            <div>
                <KeyboardArrowUpIcon 
                    className={`${styles.arrow} ${(currVoteInfo && currVoteInfo.vote_amount > 0) && styles.upvoted}`}
                    onClick={() => handleVote(1)}
                /> 
            </div>
            <div className={styles.vote}>
                <span className={voteClass}>
                    {currVote}
                </span>
            </div>
            <div>
                <KeyboardArrowDownIcon 
                    className={`${styles.arrow} ${(currVoteInfo && currVoteInfo.vote_amount < 0) && styles.downvoted}`}
                    onClick={() => handleVote(-1)}
                />
            </div>
        </div>
    )
};

export default VoteArrow;
