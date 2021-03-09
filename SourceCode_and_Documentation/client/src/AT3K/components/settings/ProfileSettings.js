import { Avatar, Button, Container, Box, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

// TODO: file drop input: https://react-dropzone.js.org/#section-examples

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ProfileSettings = () => {
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  return (
    <Container maxWidth="sm">
      <Box>
        <Avatar />
      </Box>
      <Box>
        <label>
          First Name
          <input type="text" />
        </label>
      </Box>
      <Box>
        <label>
          Last Name
          <input type="text" />
        </label>
      </Box>
      <Box>
        <label>
          Password
          <Button variant="contained">Change Password</Button>
        </label>
      </Box>

      <Box>
        <label>
          Resume
          <Button variant="contained">Upload Resume</Button>
        </label>
      </Box>
      <Button variant="contained" color="secondary" onClick={openModal}>
        Delete account
      </Button>
      <Modal
        open={modalVisible}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Are you sure about that?</h2>
          <Button variant="contained" onClick={closeModal}>Cancel</Button>
          <Button variant="contained">Confirm</Button>
        </div>
      </Modal>
      <Button variant="contained">Save changes</Button>
    </Container>
  );
};

export default ProfileSettings;
