
import React from 'react';
import Layout from '../../components/Layout/Layout';
import { JobMap } from '../components/job-map';

const JobDetails = () => {
    return (
        <Layout>
            <h1>Job Details</h1>
            [Need a back button. Maybe use a Material UI breadcrumb?]

            <hr />
            <h3>Description</h3>

            <JobMap />

            <h3>Requirements</h3>

            <h3>Missing Skills</h3>

            <h3>Resource Recommendations</h3>

            <div>
                Footer here [Share with facebook, linkedin, etc.]
            </div>

        </Layout>
    );
};

export default JobDetails;
