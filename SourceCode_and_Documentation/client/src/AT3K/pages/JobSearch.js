import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { JobList, JobSearchToolbar, JobSelectionMenu } from '../components/job-lists';
import axios from 'axios';
import api from '../constants/api';
import Cookie from 'js-cookie';
import { useEffect } from 'react';
import { Notification } from '../components/notification';
import pageStyles from './Page.module.scss';
import FadeIn from 'react-fade-in';

const JobSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [locationQuery, setLocationQuery] = useState("Sydney");
    const [pageNum, setPageNum] = useState(1);
    const [boards, setBoards] = useState(null);
    const [selectedBoardID, setSelectedBoardID] = useState(null);
    const [numResults, setNumResults] = useState(0);
    const [pageCount, setPageCount] = useState(10);
	const [jobList, setJobList] = useState(null);
    const [resultsPerPage, setResultsPerPage] = useState(9);
    const [sortStrategy, setSortStrategy] = useState("relevance");
    const [categorySelected, setCategorySelected] = useState(false);

    const fetchJobPosts = (pageNum, resultsPerPage, sortCriteria="relevance") => {
        if (!searchQuery) Notification.spawnInvalid("Please enter a job query")
        else {
            setJobList([]);
            axios.get(`
                ${api.BASE_URL}/api/jobs?location=${locationQuery}&query=${searchQuery}&results_per_page=${resultsPerPage}&page=${pageNum}&sort_criteria=${sortCriteria}
            `).then((response) => {
                setPageNum(pageNum);
                setJobList(response.data.jobs);
                setNumResults(response.data.hits);
                setPageCount(response.data.pages);
            }).catch((err) => {
                Notification.spawnError(err);
            });
        }
    }

    useEffect(()=> {
        if (categorySelected) {
            fetchJobPosts(pageNum, resultsPerPage);
            setCategorySelected(false);
        }
    }, [searchQuery, categorySelected, pageNum, resultsPerPage]);  // eslint-disable-line react-hooks/exhaustive-deps

    const handleSelectCategory = (category) => {
        setSearchQuery(category);
        setCategorySelected(true);
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
    const handleSetSortStrategy = (val) => {
        setSortStrategy(val);
        fetchJobPosts(pageNum, resultsPerPage, val);
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

    return (
        <Layout>
            <FadeIn>
                <div className={pageStyles.container}>
                    {(searchQuery === "") && (
                        <h1>Job Search</h1>
                    )}
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
                            sortStrategy={sortStrategy}
                            handleSetSortStrategy={handleSetSortStrategy}
                        />
                    )}
                </div>
            </FadeIn>
        </Layout>
    );
};

export default JobSearch;
