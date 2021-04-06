import React from 'react'
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types'
import styles from "./FunctionsMenu.module.scss";

const SaveButton = ({ saveBoard }) => {
    return (
        <Button variant="outlined" onClick={saveBoard}>
            Save Board
        </Button>
    )
}

SaveButton.propTypes = {

}

export default SaveButton
