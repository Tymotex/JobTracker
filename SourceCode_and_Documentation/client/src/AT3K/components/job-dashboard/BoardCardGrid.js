import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BoardCard from './BoardCard';
import styles from './BoardCard.module.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


const BoardCardGrid = ({ boards, selectBoard, fetchBoards }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid className={styles.boardCardGrid} container spacing={3}>
                {boards && boards.map((eachBoard) => (
                   <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
                        <BoardCard 
                            className={styles.boardCard}
                            selectBoard={selectBoard}
                            {...eachBoard}
                            fetchBoards={fetchBoards}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default BoardCardGrid;
