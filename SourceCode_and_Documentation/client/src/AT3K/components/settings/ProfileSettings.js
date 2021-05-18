import {
    Avatar,
    Box,
    Button,
    Container,
    Modal,
    Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Cookie from "js-cookie";
import api from "../../constants/api";
import axios from "axios";
import React, { useState } from "react";
import { Notification } from "../notification";
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

    // ===== POST /api/user/parse_resume/ =====
    const parseResume = () => {
        const userID = Cookie.get("user_id");
        if (userID) {
            const postData = {
                method: "post",
                url: `${api.BASE_URL}/api/user/parse_resume`,
                data: {
                    user_id: userID,
                },
                headers: {
                    "Content-Type": "application/json",
                },
            };
            axios(postData)
                .then(() => {
                    Notification.spawnSuccess("Successfully parsed resume");
                })
                .catch((err) => Notification.spawnError(err));
        }
    };

    const boxStyle = {
        padding: "10px",
    };

    const inputStyle = {
        marginLeft: "10px",
    };

    const arrangeBtns = {
        display: "flex",
        justifyContent: "space-around",
    };

    return (
        <Container maxWidth="sm">
            <Box style={boxStyle}>
                <Avatar />
            </Box>
            <Box style={boxStyle}>
                First Name
                <input style={inputStyle} type="text" />
            </Box>
            <Box style={boxStyle}>
                Last Name
                <input style={inputStyle} type="text" />
            </Box>
            <Box style={boxStyle}>
                Password
                <Button style={inputStyle} variant="contained">
                    Change Password
                </Button>
            </Box>
            <Paper elevation={3} style={{ width: "650px" }}>
                <Box style={boxStyle}>
                    <h3>Upload your resume</h3>
                    <ResumeDropZone
                        setResume={setResume}
                        setResumeBinaryFile={setResumeBinaryFile}
                    />
                </Box>
                <Box style={boxStyle}>
                    <ResumeRenderer
                        file={resume}
                        setFile={setResume}
                        resumeBinaryFile={resumeBinaryFile}
                    />
                    <br />
                    <Button variant="outlined" onClick={parseResume}>
                        Parse resume
                    </Button>
                </Box>
            </Paper>
            <Container style={{ marginTop: "20px" }}>
                {/* <Button
                    variant="contained"
                    color="secondary"
                    onClick={openModal}
                >
                    Delete account
                </Button>
                <Modal
                    open={modalVisible}
                    onClose={closeModal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div style={modalStyle} className={classes.paper}>
                        <h2
                            id="simple-modal-title"
                            style={{ textAlign: "center" }}
                        >
                            Are you sure about that?
                        </h2>
                        <div style={arrangeBtns}>
                            <Button variant="contained" onClick={closeModal}>
                                Cancel
                            </Button>
                            <Button variant="contained">Confirm</Button>
                        </div>
                    </div>
                </Modal> */}
                {/* <Button variant="contained" style={{ marginLeft: "20px" }}>
                    Save changes
                </Button> */}
            </Container>
        </Container>
    );
};

export default ProfileSettings;
