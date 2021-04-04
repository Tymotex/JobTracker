import { Avatar, Box, Button, Container, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import ResumeDropZone from "./ResumeDropZone";
import ResumeRenderer from "./ResumeRenderer";

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
  const [resume, setResume] = useState(null); 
  const [resumeBinaryFile, setResumeBinaryFile] = useState(null);

  const [modalStyle] = useState(getModalStyle);
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const boxStyle = {
    padding: "10px"
  }

  const inputStyle = {
    marginLeft: "10px"
  }

  const arrangeBtns = {
    display: "flex",
    justifyContent: "space-around"
  }

  return (
    <Container maxWidth="sm">
      <Box style={boxStyle}>
        <Avatar />
      </Box>
      <Box style={boxStyle}>
        <label>
          First Name
          <input style={inputStyle} type="text" />
        </label>
      </Box>
      <Box style={boxStyle}>
        <label>
          Last Name
          <input  style={inputStyle} type="text" />
        </label>
      </Box>
      <Box style={boxStyle}>
        <label>
          Password
          <Button style={inputStyle} variant="contained">Change Password</Button>
        </label>
      </Box>

      <Box style={boxStyle}>
        <label>
          Resume
          {/* <Button variant="contained">Upload Resume</Button> */}
          <ResumeDropZone setResume={setResume} setResumeBinaryFile={setResumeBinaryFile} />
          {/* <Dropzone>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            )}
          </Dropzone> */}
        </label>
      </Box>
      <Box style={boxStyle}>
        <ResumeRenderer file={resume} setFile={setResume} resumeBinaryFile={resumeBinaryFile} />
      </Box>
      <div>
        <Button variant="contained" color="secondary" onClick={openModal}>
          Delete account
        </Button>
        <Modal
          open={modalVisible}
          onClose={closeModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper} >
            <h2 id="simple-modal-title" style={{ textAlign: "center"}}>Are you sure about that?</h2>
            <div style={arrangeBtns}>
              <Button variant="contained" onClick={closeModal}>
                Cancel
              </Button>
              <Button variant="contained">Confirm</Button>
            </div>

          
          </div>
        </Modal>
        <Button variant="contained" style={{ marginLeft: "20px"}}>Save changes</Button>
      </div>
    </Container>
  );
};

export default ProfileSettings;
