import React from 'react';
import Board from 'react-trello';
import boardStyles from './JobBoard.module.scss';
import FullscreenMode from '../fullscreen/FullscreenMode';
import { useState } from 'react';
import axios from 'axios';
import { Notification } from '../notification';
import api from '../../constants/api';
import Cookie from 'js-cookie';

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

    return (
        <FullscreenMode>
            <div className={boardStyles.container}>
                <Board 
                    className={boardStyles.board} 
                    data={jobs} 
                    editable={true}
                    onCardMoveAcrossLanes={updateJob}
                    onDataChange={getNewState}
                />
            </div>
        </FullscreenMode>
    );
};

export default JobBoard;
