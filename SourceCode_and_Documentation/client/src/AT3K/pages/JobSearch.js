import React, { useState } from 'react';

import Layout from '../../components/Layout/Layout';
import { JobList, JobSelectionMenu } from '../components/job-lists';


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
    },
    {
        position: "Techlead",
        company: "Google",
        link: "www.google.com"
    },
    {
        position: "Techlead",
        company: "Google",
        link: "www.google.com"
    },
];

const JobSearch = () => {
    const [selectedCategory, setCategory] = useState("");
    const handleSelectCategory = () => {
        setCategory("TEST");
    }
    const handleSearch = (event) => {
        setCategory(event.target.value);
    }

    return (
        <Layout>
            <h1>Job Search</h1>
            {(selectedCategory === "") ? (
                <JobSelectionMenu handleSelectCategory={handleSelectCategory}/>
            ) : (
                <JobList data={data} searchValue={selectedCategory} onSearch={handleSearch} />
            )}
        </Layout>
    );
};

export default JobSearch;
