import axios from 'axios';
import Cookie from 'js-cookie';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
    BreadCrumbs
} from '../components/breadcrumbs';
import {
    BoardToolbar, 
    JobKanban,
    JobCalendar,
    JobList, 
    JobSpreadsheet
} from '../components/job-boards';
import { LoadingSpinner } from '../components/loaders';
import { Notification } from '../components/notification';
import RichTextDisplay from '../components/richtext/RichTextDisplay';
import api from '../constants/api';
import styles from './JobDashboardWorkspace.module.scss';
import { Value } from 'slate';

const sampleInitialValue = Value.fromJSON({
    document: {
      nodes: [
        {
          object: "block",
          type: "paragraph",
          nodes: [
            {
              object: "text",
              leaves: [{ text: "Start typing here!" }]
            }
          ]
        }
      ]
    }
});

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
            <BreadCrumbs deselectBoard={handleDeselectBoard} name={selectedBoardID} />
            <div className={styles.boardInfo}>
                {board && (
                    <h1>{board.name}</h1>
                )}
                <hr className={styles.divider} />
                {board && (
                    <p>{board.description}</p>
                )}
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

            <h3>Update board description</h3> 
            <RichTextDisplay 
                value={sampleInitialValue}
                readOnly={false}
                buttonText="Update"
                onSubmit={() => {}}
            />

            {/* TODO: Remove brs. These are to prevent the bottom nav from blocking content */}
            <br />
            <br />
            <br />
            <br />
            <br />
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
