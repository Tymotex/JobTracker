import React from 'react';
import Board from 'react-trello';
import boardStyles from './JobBoard.module.scss';
import FullscreenMode from './FullscreenMode';

// Documentation:
// https://github.com/rcdexta/react-trello

// What is this: https://github.com/atlassian/react-beautiful-dnd
// Could this be helpful?


const JobBoard = ({ trackedJobs }) => {
    const data = {
        lanes: [
            {
                id: 'awaitingApplication',
                title: 'Awaiting Application',
                label: `${trackedJobs.length} Jobs`,
                cards: trackedJobs.map((eachJob, i) => ({
                    id: eachJob.job_id,
                    title: eachJob.title,
                    label: eachJob.company,
                    description: eachJob.description,
                })) 
            },
            {
                id: 'resumeSent',
                title: 'Resume Sent',
                label: '',
                cards: []
            },
            {
                id: 'interviewing',
                title: 'Interview Stages',
                label: '',
                cards: []
            },
            {
                id: 'finalised',
                title: 'Final Outcome',
                label: '',
                cards: []
            }
        ]
    }

    console.log("==== UPDATED BOARD ====");
    console.log(trackedJobs);
    console.log(data);

    // TODO: API call: PUT api/user/tracked_job - user_id, board_id, job_id, updated_job
    //  toLaneId -> resumeSent
    //  get the original job by using the index in the new lane's card array
    //  update its status
    //  make the API call

    return (
        <FullscreenMode>
            <div className={boardStyles.container}>
                
                <Board 
                    className={boardStyles.board} 
                    data={data} 
                    editable={true}
                    canAddLanes={true}
                    collapsibleLanes={true}
                    onCardMoveAcrossLanes={(_, __, cardId, index) => console.log(`${cardId}, ${index}`)}
                />
            </div>
        </FullscreenMode>
    );
};

export default JobBoard;
