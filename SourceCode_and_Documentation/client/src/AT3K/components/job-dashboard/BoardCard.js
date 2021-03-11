import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import {
    EllipsesMenu
} from '../menus';
import {
    BoardDeleteModal, BoardEditModal
} from '../modals';
import styles from './BoardCard.module.scss';

const useStyles = makeStyles({
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 20,
    },
    pos: {
        marginBottom: 12,
    },
});


const BoardCard = ({ name, description, selectBoard }) => {
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

    const handleEditModelOpen = () => {
        setEditModalOpen(true);
    };
    const handleDeleteModelOpen = () => {
        setDeleteModalOpen(true);
    };
    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };
    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
    }
    const openBoardControlModal = (option) => {
        if (option === "Edit this board") {    // TODO: Hardcoded string is bad :(
            handleEditModelOpen();
        } else if (option === "Delete this board") {
            handleDeleteModelOpen();
        }
    }
    
    const classes = useStyles();

    return (
        <Card className={styles.boardCard}>
            <EllipsesMenu 
                options = {[
                    "Edit this board",
                    "Delete this board"
                ]}
                onItemClick={option => openBoardControlModal(option)}
            />
            <CardContent>
                <Typography className={classes.title} gutterBottom>
                    {name}
                </Typography>
                <Typography variant="body2" component="p">
                    {description}
                </Typography>
                <Button 
                    className={styles.viewButton}
                    onClick={selectBoard} 
                    variant="contained" 
                    color="info"
                >
                    View
                </Button>
            </CardContent>

            <BoardEditModal 
                handleClose={handleCloseEditModal} 
                open={editModalOpen} 
            />
            <BoardDeleteModal 
                handleClose={handleCloseDeleteModal} 
                open={deleteModalOpen} 
            />
        </Card>
    );
}

export default BoardCard; 