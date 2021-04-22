import {
    Grid
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { BoardDropdown } from '.';
import AddNewJob from './AddNewJob';
import styles from './BoardToolbar.module.scss';

const BoardToolbar = ({ boardType, handleChangeBoard, trackedJobs, boardID, fetchBoardInfo, fieldsToShow, setFields }) => {
    return (
        <Paper className={styles.toolbar} elevation={3}>
            <div className={styles.content}>
                <Grid container>
                    <Grid item xs={8}>
                        <div className={styles.full}>
                            <BoardDropdown 
                                boardType={boardType} 
                                handleChangeBoard={handleChangeBoard}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={4} className={styles.fullButton}>
                        <AddNewJob boardID={boardID} fetchBoardInfo={fetchBoardInfo} />
                    </Grid>
                </Grid>
            </div>
        </Paper>
    );
};

export default BoardToolbar;
