import Cookies from 'js-cookie';
import React, { useState, useCallback } from 'react';
import Layout from '../../components/Layout/Layout';
import JobDashboardIndex from './JobDashboardIndex';
import JobDashboardWorkspace from './JobDashboardWorkspace';
import axios from 'axios';
import api from '../constants/api';
import { useEffect } from 'react';
import { Notification } from '../components/notification';
import pageStyles from './Page.module.scss';

const JobDashboard = () => {
    const [boardType, setBoardType] = useState('spreadsheet'.toLowerCase());
    const [selectedBoard, setBoard] = useState(null);
    const [boards, setBoards] = useState(null);
    const [boardSortStrategy, setBoardSortStrategy] = useState(null);
    const [companies, setCompanies] = useState(null);

    const handleChangeBoard = (event) => {
        setBoardType(event.target.value);
    };

    const handleSelectBoard = (boardID) => {
        setBoard(boardID);
    };

    const handleDeselectBoard = () => {
        setBoard(null);
    };

    const handleSetBoardSorter = (event) => {
        setBoardSortStrategy(event.target.value);
    };

    // ===== GET /api/user/boards =====
    const userID = Cookies.get('user_id');
    const fetchBoards = useCallback(() => {
        // Fetches the currently logged in user's boards
        if (userID) {
            axios.get(`${api.BASE_URL}/api/user/boards?user_id=${userID}`).then((response) => {
                setBoards(response.data);
            });
        } else {
            Notification.spawnRegisterError();
        }
    }, [userID]);

    // ===== GET /api/user/companies =====

    useEffect(() => {
        const fetchCompanies = async () => {
            // Fetches the currently logged in user's companies
            if (userID) {
                const tempCompanies = [];
                const res = await axios.get(`${api.BASE_URL}/api/user/company?user_id=${userID}`);
                // clear the favourite company array
                tempCompanies.splice(0, tempCompanies.length);
                res.data.forEach((company) => {
                    tempCompanies.push({
                        name: company,
                        link: '/search/company',
                        description: '',
                    });
                });
                setCompanies(tempCompanies);
                Promise.all(
                    tempCompanies.map((company) => {
                        return axios.get(
                            `${api.BASE_URL}/api/company?company=${company.name}&disable_jobs=true`
                        );
                    })
                )
                    .then((res) => {
                        const finalCompanies = res.map((company) => {
                            return {
                                name: company.data.company_info.company_name,
                                link: '/search/company',
                                description: company.data.company_info.company_details,
                            };
                        });
                        setCompanies(finalCompanies);
                    })
                    .catch((err) => console.log(err));
            } else {
                Notification.spawnRegisterError();
            }
        };
        fetchBoards();
        fetchCompanies();
    }, [userID, setCompanies, fetchBoards]);

    return (
        <Layout htmlTitle="Job Dashboard">
            <div className={pageStyles.container}>
                {selectedBoard === null ? (
                    <JobDashboardIndex
                        boards={boards}
                        companies={companies}
                        handleSelectBoard={handleSelectBoard}
                        updateBoardList={fetchBoards}
                        boardSortStrategy={boardSortStrategy}
                        handleSetBoardSorter={handleSetBoardSorter}
                        fetchBoards={fetchBoards}
                    />
                ) : (
                    <JobDashboardWorkspace
                        boardType={boardType}
                        selectedBoardID={selectedBoard}
                        handleChangeBoard={handleChangeBoard}
                        handleDeselectBoard={handleDeselectBoard}
                    />
                )}
            </div>
        </Layout>
    );
};

export default JobDashboard;
