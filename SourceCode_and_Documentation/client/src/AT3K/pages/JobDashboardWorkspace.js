import {
    Paper
} from '@material-ui/core';
import axios from 'axios';
import Cookie from 'js-cookie';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
    BreadCrumbs
} from '../components/breadcrumbs';
import {
    BoardToolbar,
    JobCalendar, JobKanban,
    JobList,
    JobSpreadsheet
} from '../components/job-boards';
import { LoadingSpinner } from '../components/loaders';
import { Notification } from '../components/notification';
import RichTextDisplay from '../components/richtext/RichTextDisplay';
import api from '../constants/api';
import styles from './JobDashboardWorkspace.module.scss';

const JobDashboardWorkspace = ({ 
    boardType, 
    selectedBoardID,
    handleChangeBoard, 
    handleDeselectBoard,
}) => {
    const [board, setBoard] = useState(null);
    const [trackedJobs, setTrackedJobs] = useState(null);
    const [fieldsToShow, setFields] = useState({
        title: true,
        company: true,
        locations: true,
        url: true,
        description: true,
        salary: true,
        date: true,
        priority: true,
        notes: true,
        current_status: true,
        job_id: true
    });

    // ===== GET /api/user/board =====

    const fetchBoardInfo = () => {
        const userID = Cookie.get("user_id");
        if (userID) {
            axios.get(`${api.BASE_URL}/api/user/board?user_id=${userID}&board_id=${selectedBoardID}`)
                .then((response) => {
                    setBoard(response.data);
                    setTrackedJobs(response.data.tracked_jobs);
                }) 
                .catch((err) => {
                    Notification.spawnError(err);
                });
        } else {
            Notification.spawnRegisterError();
        }
    };

    useEffect(() => {
        fetchBoardInfo();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            {board && (
                <BreadCrumbs deselectBoard={handleDeselectBoard} name={board.name} />
            )}
            <div className={styles.boardInfo}>
                {board && (
                    <Paper className={styles.boardImage}>
                        <img 
                            alt="Board card wallpaper"
                            src={board.image_url} 
                        />
                    </Paper>
                )}
                <div className={styles.boardInfoTextSection}>
                    {board && (
                        <h1>{board.name}</h1>
                    )}
                    <hr className={styles.divider} />
                    {board && (
                        <RichTextDisplay 
                            value={board.description}
                            readOnly
                        />
                    )}
                </div>
            </div>
            <BoardToolbar 
                boardType={boardType}
                handleChangeBoard={handleChangeBoard}
                trackedJobs={trackedJobs}
                boardID={selectedBoardID}
                fetchBoardInfo={fetchBoardInfo}
                fieldsToShow={fieldsToShow} 
                setFields={setFields}
            />
            {board && trackedJobs !== null ? (
                <>
                    {boardType === "spreadsheet" && (
                        <JobSpreadsheet 
                            trackedJobs={trackedJobs} 
                            setTrackedJobs={setTrackedJobs} 
                            boardID={board._id} 
                            fieldsToShow={fieldsToShow} 
                        />
                    )}
                    {boardType === "board" && (
                        <JobKanban 
                            trackedJobs={trackedJobs} 
                            boardID={board._id} 
                            fieldsToShow={fieldsToShow} 
                        />
                    )}
                    {boardType === "calendar" && (
                        <JobCalendar 
                            trackedJobs={trackedJobs} 
                            boardID={board._id} 
                            fieldsToShow={fieldsToShow} 
                        />
                    )}
                    {boardType === "list" && (
                        <JobList 
                            trackedJobs={trackedJobs} 
                            boardID={board._id} 
                            fieldsToShow={fieldsToShow} 
                        /> 
                    )}
                </>
            ) : (
                <div>
                    <LoadingSpinner type={"Rings"} />
                </div>
            )}
            <hr />
        </div>
    );
};

JobDashboardWorkspace.propTypes = {
    boardType: PropTypes.string, 
    selectedBoardID: PropTypes.string,
    jobPostings: PropTypes.array, 
    handleChangeBoard: PropTypes.func, 
    handleDeselectBoard: PropTypes.func
};

export default JobDashboardWorkspace;
