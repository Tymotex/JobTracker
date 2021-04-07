import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
    BreadCrumbs
} from '../components/breadcrumbs';
import {
    BoardToolbar, JobBoard,
    JobCalendar,
    JobList, JobSpreadsheet
} from '../components/job-boards';
import axios from 'axios';
import api from '../constants/api';
import Cookie from 'js-cookie';
import { LoadingSpinner } from '../components/loaders';
import { Notification } from '../components/notification';


const JobDashboardWorkspace = ({ 
    boardType, 
    selectedBoardID,
    handleChangeBoard, 
    handleDeselectBoard,
}) => {

    const [board, setBoard] = useState(null);
    const [trackedJobs, setTrackedJobs] = useState(null);

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
    }

    // ===============================

    useEffect(() => {
        fetchBoardInfo();
    }, []);

    return (
        <div>
            <BreadCrumbs deselectBoard={handleDeselectBoard} name={selectedBoardID} />
            {board && (
                <h1>{board.name}</h1>
            )}
            {board && (
                <p>{board.description}</p>
            )}
            <BoardToolbar 
                boardType={boardType}
                handleChangeBoard={handleChangeBoard}
                trackedJobs={trackedJobs}
                boardID={selectedBoardID}
                fetchBoardInfo={fetchBoardInfo}
            />
            {board && trackedJobs !== null ? (
                <>
                    {boardType === "spreadsheet" && (
                        <JobSpreadsheet trackedJobs={trackedJobs} setTrackedJobs={setTrackedJobs} boardID={board._id} />
                    )}
                    {boardType === "board" && (
                        <JobBoard trackedJobs={trackedJobs} boardID={board._id} />
                    )}
                    {boardType === "calendar" && (
                        <JobCalendar trackedJobs={trackedJobs} boardID={board._id} />
                    )}
                    {boardType === "list" && (
                        <JobList trackedJobs={trackedJobs} boardID={board._id} /> 
                    )}
                </>
            ) : (
                <div>
                    <LoadingSpinner type={"Rings"} />
                </div>
            )}
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
