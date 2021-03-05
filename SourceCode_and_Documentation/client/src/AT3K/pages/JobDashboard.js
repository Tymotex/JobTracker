import React, { useState } from 'react';

import Layout from '../../components/Layout/Layout';
import { 
    JobSpreadsheet, 
    JobBoard,
    JobCalendar,
    JobList,
    BoardDropdown
} from '../components/job-boards';

const JobDashboard = () => {
    // TODO: store the boardtype under cookies/localStorage
    // so that the site remembers the user's preferences
    const [boardType, setBoardType] = useState("spreadsheet".toLowerCase());

    const handleChangeBoard = (event) => {
        setBoardType(event.target.value);
    }
    
    return (
        <Layout>
            <h1>Dashboard</h1>
            <BoardDropdown 
                boardType={boardType} 
                handleChangeBoard={handleChangeBoard}
            />
            {boardType === "spreadsheet" && (
                <>
                    <h3>Spreadsheet</h3>
                    <JobSpreadsheet />
                </>
            )}
            {boardType === "board" && (
                <>
                    <h3>Board</h3>
                    <JobBoard />
                </>
            )}
            {boardType === "calendar" && (
                <>
                    <h3>Calendar</h3>
                    <JobCalendar />
                </>
            )}
            {boardType === "list" && (
                <>
                    <h3>List</h3>
                    <JobList />
                </>
            )}
        </Layout>
    );
};

export default JobDashboard;
