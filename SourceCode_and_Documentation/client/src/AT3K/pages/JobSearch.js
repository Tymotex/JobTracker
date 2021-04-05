import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { JobList, JobSearchToolbar, JobSelectionMenu } from '../components/job-lists';
import axios from 'axios';
import api from '../constants/api';
import Cookie from 'js-cookie';
import { useEffect } from 'react';
import { Notification } from '../components/notification';


const JobSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [locationQuery, setLocationQuery] = useState("");
    const [pageNum, setPageNum] = useState(1);
    const [boards, setBoards] = useState(null);
    const [selectedBoardID, setSelectedBoardID] = useState(null);
    const [numResults, setNumResults] = useState(0);
    const [pageCount, setPageCount] = useState(10);
	const [jobList, setJobList] = useState(null);
    const [resultsPerPage, setResultsPerPage] = useState(9);

    const fetchJobPosts = (newPageNum, resultsPerPage) => {
        setJobList([]);
        axios.get(`
            ${api.BASE_URL}/api/jobs?location=${locationQuery}&query=${searchQuery}&results_per_page=${resultsPerPage}&page=${newPageNum}
        `).then((response) => {
            setPageNum(newPageNum);
            setJobList(response.data.jobs);
            setNumResults(response.data.hits);
            setPageCount(response.data.pages);
        }).catch((err) => {
            Notification.spawnError(err);
        });
    }

    const handleSelectCategory = (category) => {
        setSearchQuery(category);
    }
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }
    const handleLocationSearch = (event) => {
        setLocationQuery(event.target.value);
    }
    const handleSelectBoard = (event) => {
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
                fetchJobPosts={fetchJobPosts}
                resultsPerPage={resultsPerPage}
                pageNum={pageNum}
            />
            {(searchQuery === "") ? (
                <JobSelectionMenu
                    searchValue={searchQuery}
                    onSearch={handleSearch}
                    handleSelectCategory={handleSelectCategory}
                />
            ) : (
                <JobList
                    selectedBoardID={selectedBoardID}
                    pageNum={pageNum}
                    fetchJobPosts={fetchJobPosts}
                    searchValue={searchQuery}
                    onSearch={handleSearch}
                    numResults={numResults}
                    pageCount={pageCount}
                    jobList={jobList}
                    resultsPerPage={resultsPerPage}
                    setResultsPerPage={setResultsPerPage}
                />
            )}
        </Layout>
    );
};

export default JobSearch;
