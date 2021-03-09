import PropTypes from 'prop-types';
import { React } from 'react';
import {
    BreadCrumbs
} from '../components/breadcrumbs';
import {
    BoardToolbar, JobBoard,
    JobCalendar,
    JobList, JobSpreadsheet
} from '../components/job-boards';

const JobDashboardWorkspace = ({ boardType, selectedBoard, jobPostings, handleChangeBoard, handleDeselectBoard }) => {
    return (
        <div>
            <BreadCrumbs deselectBoard={handleDeselectBoard} name={selectedBoard} />
            <h1>Dashboard</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <BoardToolbar 
                boardType={boardType}
                handleChangeBoard={handleChangeBoard}
            />
            
            {boardType === "spreadsheet" && (
                <>
                    <JobSpreadsheet />
                </>
            )}
            {boardType === "board" && (
                <>
                    <JobBoard />
                </>
            )}
            {boardType === "calendar" && (
                <>
                    <JobCalendar />
                </>
            )}
            {boardType === "list" && (
                <>
                    <JobList jobPostings={jobPostings} />
                </>
            )}
        </div>
    );
};

JobDashboardWorkspace.propTypes = {
    boardType: PropTypes.string, 
    selectedBoard: PropTypes.string,
    jobPostings: PropTypes.array, 
    handleChangeBoard: PropTypes.func, 
    handleDeselectBoard: PropTypes.func
};

export default JobDashboardWorkspace;
