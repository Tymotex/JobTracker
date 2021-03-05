import React from 'react';

import Layout from '../../components/Layout/Layout';
import { JobList } from '../components/job-lists';


const data = [
    {
        position: "Graduate software engineer",
        company: "Canva",
        link: "https://www.google.com"
    },
    {
        position: "Security engineer",
        company: "Citadel",
        link: "www.google.com"
    },
    {
        position: "Techlead",
        company: "Google",
        link: "www.google.com"
    }
];

const JobSearch = () => {
    return (
        <Layout>
            <h1>Job Search</h1>
            <JobList data={data} />
        </Layout>
    );
};

export default JobSearch;
