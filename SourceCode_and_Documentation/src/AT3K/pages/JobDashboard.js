import React from 'react';

import Layout from '../../components/Layout/Layout';
import { JobSpreadsheet } from '../components/job-boards';

const JobDashboard = () => {
    return (
        <Layout>
            <h1>Dashboard</h1>
            <JobSpreadsheet />
        </Layout>
    );
};

export default JobDashboard;
