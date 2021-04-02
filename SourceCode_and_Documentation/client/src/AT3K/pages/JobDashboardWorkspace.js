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

const JobDashboardWorkspace = ({ 
    boardType, 
    selectedBoardID,
    jobPostings, 
    handleChangeBoard, 
    handleDeselectBoard 
}) => {

    const [board, setBoard] = useState(null);

    // ===== GET /api/user/board =====

    const fetchBoardInfo = () => {
        const userID = Cookie.get("user_id");
        if (userID) {
            axios.get(`${api.BASE_URL}/api/user/board?user_id=${userID}&board_id=${selectedBoardID}`)
                .then((response) => {
                    setBoard(response.data);
                    console.log(response.data.tracked_jobs);
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
            />
            {board ? (
                <>
                    {console.log(board.tracked_jobs)}
                    {boardType === "spreadsheet" && (
                        <JobSpreadsheet trackedJobs={board.tracked_jobs} />
                    )}
                    {boardType === "board" && (
                        <JobBoard trackedJobs={board.tracked_jobs} />
                    )}
                    {boardType === "calendar" && (
                        <JobCalendar trackedJobs={board.tracked_jobs} />
                    )}
                    {boardType === "list" && (
                        <JobList trackedJobs={board.tracked_jobs} /> // GET RID OF jobPostings
                    )}
                </>
            ) : (
                <div>
                    Loading...
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
