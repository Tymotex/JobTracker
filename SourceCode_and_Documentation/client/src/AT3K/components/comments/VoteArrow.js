import React from 'react'
import PropTypes from 'prop-types'
import styles from './Arrow.module.scss';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';


const VoteArrow = props => {
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
}

VoteArrow.propTypes = {

}

export default VoteArrow
