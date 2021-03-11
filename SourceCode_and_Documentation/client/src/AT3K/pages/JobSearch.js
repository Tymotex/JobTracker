import React, { useState } from 'react';

import Layout from '../../components/Layout/Layout';
import { JobList, JobSelectionMenu } from '../components/job-lists';


const data = [
    {
        position: "Graduate software engineer",
        company: "Canva",
        description: "This is some random description about the job",
        link: "https://www.google.com",
        salary: "$50000/yr",
        deadline: "Tomorrow",
        location: "Sydney, NSW",
        postedDate: "Yesterday",
        missingSkills: [
            "React",
            "Express",
            "MongoDB"
        ]
    },
    {
        position: "Security engineer",
        company: "Citadel",
        description: "This is some random description about the job",
        link: "https://www.google.com",
        salary: "$50000/yr",
        deadline: "Tomorrow",
        location: "Sydney, NSW",
        postedDate: "Yesterday",
        missingSkills: [
            "React",
            "Express",
            "MongoDB"
        ]
    },
    {
        position: "Techlead",
        company: "Google",
        description: "This is some random description about the job",
        link: "https://www.google.com",
        salary: "$50000/yr",
        deadline: "Tomorrow",
        location: "Sydney, NSW",
        postedDate: "Yesterday",
        missingSkills: [
            "React",
            "Express",
            "MongoDB"
        ]
    },
    {
        position: "Techlead",
        company: "Google",
        description: "This is some random description about the job",
        link: "https://www.google.com",
        salary: "$50000/yr",
        deadline: "Tomorrow",
        location: "Sydney, NSW",
        postedDate: "Yesterday",
        missingSkills: [
            "React",
            "Express",
            "MongoDB"
        ]
    },
    {
        position: "Techlead",
        company: "Google",
        description: "This is some random description about the job",
        link: "https://www.google.com",
        salary: "$50000/yr",
        deadline: "Tomorrow",
        location: "Sydney, NSW",
        postedDate: "Yesterday",
        missingSkills: [
            "React",
            "Express",
            "MongoDB"
        ]
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
                <JobSelectionMenu data={data} handleSelectCategory={handleSelectCategory}/>
            ) : (
                <JobList data={data} searchValue={selectedCategory} onSearch={handleSearch} />
            )}
        </Layout>
    );
};

export default JobSearch;
