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
                            <RecordSearchBar /> 
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={styles.full}>
                            <BoardDropdown 
                                boardType={boardType} 
                                handleChangeBoard={handleChangeBoard}
                            />
                        </div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={3}>
                        <AddNewJob boardID={boardID} fetchBoardInfo={fetchBoardInfo} />
                    </Grid>
                    <Grid item xs={3}>
                        <CustomiseView boardType={boardType} fieldsToShow={fieldsToShow} setFields={setFields} />
                    </Grid>
                    <Grid item xs={3}>
                        {/* <CSVLink data={{}}>Download me</CSVLink> */}
                        <CsvDownload 
                            data={trackedJobs} 
                            filename="Tim.csv" 
                            style={{
                                // background:"linear-gradient(to bottom, #333333 5%, #222222 100%)",
                                borderRadius:"6px",
                                border:"1px solid #111111",
                                display:"inline-block",
                                // cursor:"pointer","color":"#ffffff",
                                fontSize:"15px",
                                padding:"6px 24px",
                                textDecoration:"none",
                            }}
                        >
                            Download as CSV
                        </CsvDownload>
                    </Grid>
                </Grid>
            </div>
        </Paper>
    );
};

export default BoardToolbar;
