import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { JobList, JobSearchToolbar, JobSelectionMenu } from '../components/job-lists';

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
        requiredSkills: [
            "Node.js",
            "React",
            "Express",
            "MongoDB",
            "Python",
            "C++"
        ],
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
        requiredSkills: [
            "Node.js",
            "React",
            "Express",
            "MongoDB",
            "Python",
            "C++"
        ],
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
        requiredSkills: [
            "Node.js",
            "React",
            "Express",
            "MongoDB",
            "Python",
            "C++"
        ],
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
        requiredSkills: [
            "Node.js",
            "React",
            "Express",
            "MongoDB",
            "Python",
            "C++"
        ],
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
        requiredSkills: [
            "Node.js",
            "React",
            "Express",
            "MongoDB",
            "Python",
            "C++"
        ],
        missingSkills: [
            "React",
            "Express",
            "MongoDB"
        ]
    },
];

const JobSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [locationQuery, setLocationQuery] = useState("");

    const handleSelectCategory = () => {
        setSearchQuery("Software");
    }
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }
    const handleLocationSearch = (event) => {
        setLocationQuery(event.target.value);
    }

    return (
        <Layout>
            <h1>Job Search</h1>
            <JobSearchToolbar 
                searchQuery={searchQuery}
                handleSearch={handleSearch}
                locationQuery={locationQuery}
                handleLocationSearch={handleLocationSearch}
            />
            {(searchQuery === "") ? (
                <JobSelectionMenu
                    data={data}
                    searchValue={searchQuery}
                    onSearch={handleSearch}
                    handleSelectCategory={handleSelectCategory}
                />
            ) : (
                <JobList
                    data={data}
                    searchValue={searchQuery}
                    onSearch={handleSearch}
                />
            )}
        </Layout>
    );
};

export default JobSearch;
