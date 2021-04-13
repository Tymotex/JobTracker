import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import {
	ResponsiveContainer
} from "recharts";
import {
	StatsHeatMap, StatsLineChart,
	StatsLineChartFilled,
	StatsPieChart
} from '../../AT3K/components/statistics';
import Layout from '../../components/Layout/Layout';
import Widget from "../../components/Widget/Widget";
import { DropdownHierarchical, Dropdown } from "../components/dropdowns";
import pageStyles from './Page.module.scss';
import BoardSelectionDropdown from '../components/job-lists/BoardSelectionDropdown';
import api from "../constants/api";
import axios from "axios";
import Cookie from 'js-cookie';
import { Notification } from "../components/notification";

const currentProgress = [
    { name: "No Application", value: 20 },
    { name: "Resume Sent", value: 10 },
    { name: "Interview Stage", value: 4 },
    { name: "Finalised", value: 2 },
];

const overallStats = [
    { name: "Resume hit", value: 20 },
    { name: "Resume miss", value: 10 },
];

export default function Charts(props) {
    const [boards, setBoards] = useState(null);
    const [selectedBoardID, setSelectedBoardID] = useState(null);
    const [activityType, setActivityType] = useState("application");
    const [activityStats, setActivityStats] = useState(null);

    const handleSelectBoard = (event) => {
        event.preventDefault();
        setSelectedBoardID(event.target.value);
    }

    const handleSelectActivity = (event) => {
        event.preventDefault();
        setActivityType(event.target.value);
    }

    var theme = useTheme();

    // ===== GET /api/user/boards =====
    // If the user is logged in, fetch their boards.
    // Note that their statistics are stored in each board under the "statistics" field

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

    // =========================

    // ===== GET /api/stats/activity =====
    // Getting the data to be rendered for the activity line graph and activity heatmap

    const fetchUserActivity = () => {
        // Current timestamp in seconds and last week's timestamp
        const userID = Cookie.get("user_id");
        if (userID) {
            if (selectedBoardID) {
                const currentTimestamp = parseInt(new Date().getTime() / 1000);
                const lastWeekTimestamp = currentTimestamp - (7 * 24 * 60 * 60);
                axios.get(`${api.BASE_URL}/api/stats/activity?user_id=${userID}&board_id=${selectedBoardID}&start_time=${lastWeekTimestamp}&end_time=${currentTimestamp}`)
                    .then((res) => {
                        setActivityStats(res.data);
                    })
                    .catch(err => Notification.spawnError(err));
            }
        } else {
            Notification.spawnRegisterError();
        }
    } 

    // =========================


    useEffect(() => {
        fetchUserBoards();
    }, []);

    useEffect(() => {
        fetchUserActivity();
    }, [selectedBoardID]);


    const timeRangeOptions = [ 
        { 
            label: "Intervals", 
            options: [
                {
                    name: "Last 7 days", 
                    value: 1
                },
                {
                    name: "Last 30 days",
                    value: 2
                },
                {
                    name: "Last 365 days",
                    value: 3
                }
            ] 
        }
    ];

    const outcomeOptions = [
        {
            label: "Resume",
            options: [
                {
                    name: "Resume Hits vs. Misses",
                    value: 1
                }
            ]
        },
        {
            label: "Interview",
            options: [
                {
                    name: "Interview: Success vs. Failure",
                    value: 2
                }
            ]
        },
    ]

    return (
        <Layout>
            <div className={pageStyles.container}>
                <h1>Your Statistics</h1>
                <Grid container>
                    <Grid item xs={12}>
                        <DropdownHierarchical options={timeRangeOptions}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Dropdown
                            label="Activity Type"
                            value={activityType}
                            onChange={handleSelectActivity}
                            items={[
                                {
                                    text: "All activities",
                                    value: "all"
                                },
                                {
                                    text: "Awaiting Application",
                                    value: "application"
                                },
                                {
                                    text: "Resume Sent",
                                    value: "resume"
                                },
                                {
                                    text: "Interview Stage",
                                    value: "interview"
                                },
                                {
                                    text: "Finalised",
                                    value: "final"
                                }
                            ]}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <BoardSelectionDropdown
                            selectedBoardID={selectedBoardID}
                            handleSelectBoard={handleSelectBoard}
                            boards={boards}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={12}>
                        <Widget title="Your activity the past week" upperTitle noBodyPadding>
                            <ResponsiveContainer width="100%" height={400}>
                                <StatsLineChartFilled theme={theme} activityType={activityType} activityStats={activityStats} />
                            </ResponsiveContainer>
                        </Widget>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Widget title="Number of applications made" upperTitle noBodyPadding>
                            <ResponsiveContainer width="100%" height={400}>
                                <StatsHeatMap />
                            </ResponsiveContainer>
                        </Widget>
                    </Grid>
                    {/* <Grid item xs={12} md={8}>
                        <Widget title="" noBodyPadding upperTitle>
                            <ResponsiveContainer width="100%" height={350}>
                                <StatsLineChart theme={theme} />
                            </ResponsiveContainer>
                        </Widget>
                    </Grid> */}
                    <Grid item xs={12} md={6}>
                        <Widget title="Visualising where you are" noBodyPadding upperTitle>
                            <ResponsiveContainer width="100%" height={300}>
                                <StatsPieChart 
                                    theme={theme} 
                                    pieChartData={currentProgress}
                                    boards={boards}
                                    selectedBoardID={selectedBoardID}
                                />
                            </ResponsiveContainer>
                        </Widget>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DropdownHierarchical 
                            options={outcomeOptions}
                        />
                        <Widget title="Visualising your overall outcomes" noBodyPadding upperTitle>
                            <ResponsiveContainer width="100%" height={300}>
                                <StatsPieChart 
                                    theme={theme} 
                                    pieChartData={overallStats}
                                    boards={boards}
                                    selectedBoardID={selectedBoardID}
                                />
                            </ResponsiveContainer>
                        </Widget>
                    </Grid>
                </Grid>
            </div>
        </Layout>
    );
}

