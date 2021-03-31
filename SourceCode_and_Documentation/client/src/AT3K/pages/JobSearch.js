import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { JobList, JobSearchToolbar, JobSelectionMenu } from '../components/job-lists';
import axios from 'axios';
import api from '../constants/api';

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
    const [pageNum, setPageNum] = useState(1);

    const fetchJobPosts = (setJobList, newPageNum, resultsPerPage) => {
        const location = "sydney";
        const query = "software";
        const results_per_page = "10";
        const page = "1";
        // const sort_criteria = "relevance";

        axios.get(`
            ${api.BASE_URL}/api/jobs?location=${locationQuery}&query=${searchQuery}&results_per_page=${resultsPerPage}&page=${newPageNum}
        `).then((response) => {
            console.log(response.data.jobs);
            setPageNum(newPageNum);
            setJobList(response.data.jobs);
        }).catch((err) => {
            alert(`Failed to GET ${api.BASE_URL}/api/jobs: ` + err.message);
        });
    }


    const handleSelectCategory = () => {
        setSearchQuery("Software");
    }
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }
    const handleLocationSearch = (event) => {
        setLocationQuery(event.target.value);
    }

    // ===== GET /api/jobs =====

    

    // =========================

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
                    // jobList={jobList}
                    pageNum={pageNum}
                    fetchJobPosts={fetchJobPosts}
                    searchValue={searchQuery}
                    onSearch={handleSearch}
                />
            )}
        </Layout>
    );
};

export default JobSearch;
