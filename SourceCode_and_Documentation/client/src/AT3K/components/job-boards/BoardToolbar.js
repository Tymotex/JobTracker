import React from 'react';
import Paper from '@material-ui/core/Paper';
import styles from './BoardToolbar.module.scss';
import { BoardDropdown } from '.';
import {
    Grid,
    Button
} from '@material-ui/core';
import AddNewJob from './AddNewJob';
import CustomiseView from './CustomiseView';
import RecordSearchBar from './RecordSearchBar';
import CsvDownload from 'react-json-to-csv';

const BoardToolbar = ({ boardType, handleChangeBoard, trackedJobs, boardID, fetchBoardInfo, fieldsToShow, setFields }) => {
    return (
        <Paper className={styles.toolbar} elevation={3}>
            <div className={styles.content}>
                <Grid container>
                    <Grid item xs={6}>
                        <div className={styles.full}>
                            <BoardDropdown 
                                boardType={boardType} 
                                handleChangeBoard={handleChangeBoard}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={3} className={styles.fullButton}>
                        <AddNewJob boardID={boardID} fetchBoardInfo={fetchBoardInfo} />
                    </Grid>
                    <Grid item xs={3} className={styles.fullButton}>
                        <CustomiseView boardType={boardType} fieldsToShow={fieldsToShow} setFields={setFields} />
                    </Grid>
                </Grid>
            </div>
        </Paper>
    );
};

export default BoardToolbar;
