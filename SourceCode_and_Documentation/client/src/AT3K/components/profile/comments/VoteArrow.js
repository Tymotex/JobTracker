import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React from 'react';

const VoteArrow = () => {
    return (
        <div>
            <div>
                <KeyboardArrowUpIcon /> 
            </div>
            <div>
                <span style={{color: "green"}}>+3</span>
            </div>
            <div>
                <KeyboardArrowDownIcon />
            </div>
        </div>
    )
};

export default VoteArrow;
