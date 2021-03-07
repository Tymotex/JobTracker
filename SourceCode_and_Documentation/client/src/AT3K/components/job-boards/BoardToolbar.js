import React from 'react';
import Paper from '@material-ui/core/Paper';
import styles from './BoardToolbar.module.scss';
import { BoardDropdown } from '.';

const BoardToolbar = ({ boardType, handleChangeBoard }) => {
    return (
        <Paper className={styles.toolbar} elevation={3}>
            <div className={styles.content}>
                <BoardDropdown 
                    boardType={boardType} 
                    handleChangeBoard={handleChangeBoard}
                />
            </div>
        </Paper>
    );
};

export default BoardToolbar;
