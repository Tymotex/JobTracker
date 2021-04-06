import React from 'react';
import Paper from '@material-ui/core/Paper';
import styles from './BoardToolbar.module.scss';
import { BoardDropdown } from '.';
import {
    BoardSettingsModal
} from '../modals';
import {
    Grid
} from '@material-ui/core';
import FunctionsMenu from './FunctionsMenu';
import RecordSearchBar from './RecordSearchBar';
import SaveButton from './SaveButton';


const BoardToolbar = ({ boardType, handleChangeBoard, saveBoard }) => {
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
                        <FunctionsMenu saveBoard={saveBoard} />
                    </Grid>
                    <Grid item xs={3}>
                        <SaveButton saveBoard={saveBoard} />
                    </Grid>
                </Grid>
            </div>
        </Paper>
    );
};

export default BoardToolbar;
