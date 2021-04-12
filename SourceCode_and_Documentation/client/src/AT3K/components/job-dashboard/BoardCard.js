import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
import Unsplash from "react-unsplash-wrapper";

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


const BoardCard = ({ _id, name, description, selectBoard, fetchBoards }) => {
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [boardName, setBoardName] = React.useState(name); 
    const [boardDescription, setBoardDescription] = React.useState(description); 
    

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
            {/* <CardMedia
                className={classes.media}
                image=""
                title="Contemplative Reptile"
            /> */}
            <Unsplash 
                img
                keywords={name.split(/\s+/).join(", ")}
                height="150"
            />
            
            <CardContent>
                <Typography className={classes.title} gutterBottom>
                    <strong>
                        {boardName}
                    </strong>
                </Typography>
                <hr />
                <Typography variant="body2" component="p">
                    {boardDescription}
                </Typography>
                <Button 
                    className={styles.viewButton}
                    onClick={() => selectBoard(_id)} 
                    variant="contained" 
                    color="info"
                >
                    View
                </Button>
            </CardContent>

            <BoardEditModal 
                handleClose={handleCloseEditModal} 
                open={editModalOpen} 
                boardID={_id}
                setBoardName={setBoardName}
                setBoardDescription={setBoardDescription}
            />
            <BoardDeleteModal 
                handleClose={handleCloseDeleteModal} 
                open={deleteModalOpen} 
                boardID={_id}
                fetchBoards={fetchBoards}
            />
        </Card>
    );
}

export default BoardCard; 