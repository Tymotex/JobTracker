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
                    id: `job${i}`,
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
    return (
        <FullscreenMode>
            <div className={boardStyles.container}>
                
                <Board 
                    className={boardStyles.board} 
                    data={data} 
                    editable={true}
                    canAddLanes={true}
                    collapsibleLanes={true}
                />
            </div>
        </FullscreenMode>
    );
};

export default JobBoard;
