import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Button } from '../buttons';
import {
    EllipsesMenu
} from '../menus';
import {
    BoardDeleteModal, BoardEditModal
} from '../modals';
import styles from './BoardCard.module.scss';
import RichTextDisplay from '../richtext/RichTextDisplay';
import { Value } from 'slate';

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

const BoardCard = ({ 
    _id, 
    name, 
    description, 
    image_url, 
    selectBoard, 
    fetchBoards 
}) => {
    const [editModalOpen, setEditModalOpen] = React.useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [boardName, setBoardName] = React.useState(name); 
    const [boardDescription, setBoardDescription] = React.useState(description); 
    const [boardImageURL, setBoardImageURL] = React.useState(image_url); 
    
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
        if (option === "Edit this board") {  
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
            <CardMedia
                style={{height: "200px"}}
                 image={boardImageURL}
            />
            
            <CardContent>
                <Typography className={classes.title} gutterBottom>
                    <strong>
                        {boardName}
                    </strong>
                </Typography>
                <hr />
                <Typography variant="body2" component="p">
                    <RichTextDisplay
                        value={Value.fromJSON(boardDescription)}
                        readOnly
                    />
                </Typography>
                <Button 
                    className={styles.viewButton}
                    onClick={() => selectBoard(_id)} 
                    variant="contained" 
                    color="info"
                >
                    View
                </Button>
                <div className={styles.icon}>
                    <i></i>
                </div>
            </CardContent>

            <BoardEditModal 
                handleClose={handleCloseEditModal} 
                open={editModalOpen} 
                boardID={_id}
                boardName={boardName}
                setBoardName={setBoardName}
                boardDescription={boardDescription}
                setBoardDescription={setBoardDescription}
                boardImageURL={boardImageURL}
                setBoardImageURL={setBoardImageURL}
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