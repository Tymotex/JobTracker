import React from 'react';
import Board from 'react-trello';
import boardStyles from './JobBoard.module.scss';
import FullscreenMode from './FullscreenMode';
import { useState } from 'react';
import axios from 'axios';
import { Notification } from '../notification';
import api from '../../constants/api';
import Cookie from 'js-cookie';
// import { Modal } from '../modals';
// import { PrimaryButton } from '../buttons';
// import ReactTooltip from 'react-tooltip';

// Documentation:
// https://github.com/rcdexta/react-trello

// What is this: https://github.com/atlassian/react-beautiful-dnd
// Could this be helpful?

const getJobCardsOfStatus = ((trackedJobs, status) => (
    trackedJobs.filter(job => job.current_status === status).map((eachJob, i) => ({
        id: eachJob.job_id,
        title: eachJob.title,
        label: eachJob.company,
        description: eachJob.description,
        job: eachJob 
    }))
));

const JobBoard = ({ trackedJobs, boardID }) => {
    const [jobs, setJobs] = useState({
        lanes: [
            {
                id: 'application',
                title: 'Awaiting Application',
                label: `${trackedJobs.length} Jobs`,
                cards: getJobCardsOfStatus(trackedJobs, "application")
            },
            {
                id: 'resume',
                title: 'Resume Sent',
                label: '',
                cards: getJobCardsOfStatus(trackedJobs, "resume")
            },
            {
                id: 'interview',
                title: 'Interview Stages',
                label: '',
                cards: getJobCardsOfStatus(trackedJobs, "interview")
            },
            {
                id: 'final',
                title: 'Final Outcome',
                label: '',
                cards: getJobCardsOfStatus(trackedJobs, "final")
            }
        ]
    });

    const getNewState = (newState) => {
        setJobs(newState);
    }

    const updateJob = (fromLaneID, toLaneID, cardID, index) => {
        const userID = Cookie.get("user_id");
        if (!userID) return;
        jobs.lanes.forEach(lane => {
            lane.cards.forEach(card => {
                if (card.id === cardID) {
                    card.job.current_status = toLaneID;
                    const putData = {
                        method: "put",
                        url: `${api.BASE_URL}/api/tracker/`,
                        data: {
                            user_id: userID,
                            board_id: boardID,
                            job_id: cardID,
                            updated_job: card.job,
                        },
                        headers: {
                            "Content-Type": "application/json"
                        }
                    };
                    axios(putData)
                        .then(() => {
                            Notification.spawnSuccess("Successfully saved changes");
                        })
                        .catch((err) => {
                            Notification.spawnError(err);
                        });
                }
            })
        });
    }

    // console.log("==== UPDATED BOARD ====");
    // console.log(trackedJobs);
    // console.log(jobs);

    // TODO: API call: PUT api/user/tracked_job - user_id, board_id, job_id, updated_job
    //  toLaneId -> resumeSent
    //  get the original job by using the index in the new lane's card array
    //  update its status
    //  make the API call
    // Save board is unnecessary?

    return (
        <FullscreenMode>
            <div className={boardStyles.container}>
                <Board 
                    className={boardStyles.board} 
                    data={jobs} 
                    editable={true}
                    // canAddLanes={true}
                    // collapsibleLanes={true}
                    onCardMoveAcrossLanes={updateJob}
                    onDataChange={getNewState}
                />
            </div>
        </FullscreenMode>
    );
};

export default JobBoard;
