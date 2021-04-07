import React from 'react';
import Paper from '@material-ui/core/Paper';
import styles from './BoardToolbar.module.scss';
import { BoardDropdown } from '.';
import {
    Grid
} from '@material-ui/core';
import AddNewJob from './AddNewJob';
import RecordSearchBar from './RecordSearchBar';
import SaveButton from './SaveButton';
import Cookie from 'js-cookie';
import axios from 'axios';
import api from '../../constants/api';

// import { CSVLink, CSVDownload } from "react-csv";

import CsvDownload from 'react-json-to-csv';

// const CSVDownloader = ({ data }) => {
//     return (
//         <div>
//             <CSVLink>Download me</CSVLink>
//         </div>
//     );
// }



const BoardToolbar = ({ boardType, handleChangeBoard, trackedJobs, boardID, fetchBoardInfo }) => {
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
                        <SaveButton />
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
