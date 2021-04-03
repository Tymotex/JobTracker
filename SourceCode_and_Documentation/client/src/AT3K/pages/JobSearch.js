import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { JobList, JobSearchToolbar, JobSelectionMenu } from '../components/job-lists';
import axios from 'axios';
import api from '../constants/api';
import Cookie from 'js-cookie';
import { useEffect } from 'react';
import { Notification } from '../components/notification';

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
    const [boards, setBoards] = useState(null);
    const [selectedBoardID, setSelectedBoardID] = useState(null);

    const fetchJobPosts = (setJobList, newPageNum, resultsPerPage) => {
        // const location = "sydney";
        // const query = "software";
        // const results_per_page = "10";
        // const page = "1";
        // const sort_criteria = "relevance";

        axios.get(`
            ${api.BASE_URL}/api/jobs?location=${locationQuery}&query=${searchQuery}&results_per_page=${resultsPerPage}&page=${newPageNum}
        `).then((response) => {
            setPageNum(newPageNum);
            setJobList(response.data.jobs);
        }).catch((err) => {
            Notification.spawnError(err);
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
    const handleSelectBoard = (event) => {
        alert("SELECTED: " + event.target.value);
        setSelectedBoardID(event.target.value);
    }

    // ===== GET /api/user/boards =====

    // If the user is logged in, fetch their boards
    const fetchUserBoards = () => {
        const userID = Cookie.get("user_id");
        if (userID) {
            axios.get(`${api.BASE_URL}/api/user/boards?user_id=${userID}`)
                .then((response) => {
                    setBoards(response.data);
                })
                .catch((err) => {
                    Notification.spawnError(err);
                });
        } else {
            Notification.spawnRegisterError();
        }
    }

    useEffect(() => {
        fetchUserBoards();
    }, []);

    // =========================

    return (
        <Layout>
            <h1>Job Search</h1>
            <JobSearchToolbar 
                searchQuery={searchQuery}
                handleSearch={handleSearch}
                locationQuery={locationQuery}
                handleLocationSearch={handleLocationSearch}
                boards={boards}
                selectedBoardID={selectedBoardID}
                handleSelectBoard={handleSelectBoard}
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
                    selectedBoardID={selectedBoardID}
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
