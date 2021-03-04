import React from 'react';

import Layout from '../../components/Layout/Layout';
import { 
    JobSpreadsheet, 
    JobBoard,
    JobCalendar,
    JobList
} from '../components/job-boards';

const JobDashboard = () => {
    return (
        <Layout>
            <h1>Dashboard</h1>
            <h3>Spreadsheet</h3>
            <JobSpreadsheet />
            <h3>Kanban Board</h3>
            <JobBoard />
            <h3>Calendar</h3>
            <JobCalendar />
            <h3>List</h3>
            <JobList />
        </Layout>
    );
};

export default JobDashboard;
