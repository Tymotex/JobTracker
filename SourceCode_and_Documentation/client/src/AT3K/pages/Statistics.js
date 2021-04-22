import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import {
	ResponsiveContainer
} from "recharts";
import {
	StatsLineChartFilled,
	StatsPieChartOutcomes,
	StatsPieChartStatuses
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
import FadeIn from "react-fade-in";

// Dropdown options for status types 
const statusDropdownItems = [
	{
		text: "All activities",
		value: "all"
	},
	{
		text: "Tracked",
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
];

// Time range dropdown items
const timeRangeOptions = [
	{
		label: "Intervals",
		options: [
			{
				name: "Last 3 days",
				value: "last 3 days"
			},
			{
				name: "Last 7 days",
				value: "last 7 days"
			},
			{
				name: "Last 30 days",
				value: "last 30 days"
			},
			{
				name: "Last 60 days",
				value: "last 60 days"
			},
		]
	}
];

// 'Visualising your outcomes' items
const outcomeOptions = [
	{
		label: "Resume",
		options: [
			{
				name: "Resume Hits vs. Misses",
				value: "resume"
			}
		]
	},
	{
		label: "Interview",
		options: [
			{
				name: "Interview: Success vs. Failure",
				value: "interview"
			}
		]
	},
	{
		label: "Final",
		options: [
			{
				name: "Final: Offer vs. No Offer",
				value: "final"
			}
		]
	},
];

export default function Charts() {
	const [boards, setBoards] = useState(null);
	const [selectedBoardID, setSelectedBoardID] = useState(null);
	const [activityType, setActivityType] = useState("application");
	const [activityStats, setActivityStats] = useState(null);

	const currentTimestamp = parseInt(new Date().getTime() / 1000);
	const [startTimePeriod, setStartTimePeriod] = useState(currentTimestamp - (7 * 24 * 60 * 60));

	const handleSelectBoard = (event) => {
		event.preventDefault();
		setSelectedBoardID(event.target.value);
	}

	const handleSelectActivity = (event) => {
		event.preventDefault();
		setActivityType(event.target.value);
	}

	const handleSelectTimePeriod = (event) => {
		event.preventDefault();
		const currentTimestamp = parseInt(new Date().getTime() / 1000);
		switch (event.target.value) {
			case "last 3 days":
				setStartTimePeriod(currentTimestamp - (3 * 24 * 60 * 60));
				break;
			case "last 7 days":
				setStartTimePeriod(currentTimestamp - (7 * 24 * 60 * 60));
				break;
			case "last 30 days":
				setStartTimePeriod(currentTimestamp - (30 * 24 * 60 * 60));
				break;
			case "last 60 days":
				setStartTimePeriod(currentTimestamp - (60 * 24 * 60 * 60));
				break;
			default:
				setStartTimePeriod(null);
				break;
		}
	}

	const theme = useTheme();

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

	// ===== GET /api/stats/activity =====


	useEffect(() => {
		fetchUserBoards();
	}, []);

	// Getting the data to be rendered for the activity line graph and activity heatmap
	useEffect(() => {
		// Current timestamp in seconds and last week's timestamp
		const userID = Cookie.get("user_id");
		if (userID) {
			if (selectedBoardID && startTimePeriod) {
				const currentTimestamp = parseInt(new Date().getTime() / 1000);
				axios.get(`${api.BASE_URL}/api/stats/activity?user_id=${userID}&board_id=${selectedBoardID}&start_time=${startTimePeriod}&end_time=${currentTimestamp}`)
					.then((res) => {
						setActivityStats(res.data);
					})
					.catch(err => Notification.spawnError(err));
			}
		} else {
			Notification.spawnRegisterError();
		}
	}, [selectedBoardID, startTimePeriod]);

	return (
		<Layout>
			<FadeIn>
				<div className={pageStyles.container}>
					<h1>Your Statistics</h1>
					<Grid container>
						<Grid item xs={12}>
							<DropdownHierarchical
								onChange={handleSelectTimePeriod}
								options={timeRangeOptions}
								value={"last 7 days"}
							/>
						</Grid>
						<Grid item xs={6}>
							<Dropdown
								label="Status Type"
								value={activityType}
								onChange={handleSelectActivity}
								items={statusDropdownItems}
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
									<StatsLineChartFilled startTimePeriod={startTimePeriod} theme={theme} activityType={activityType} activityStats={activityStats} />
								</ResponsiveContainer>
							</Widget>
						</Grid>
						<Grid item xs={12} md={12}>
							<Widget title="Visualising where you are" noBodyPadding upperTitle>
								<ResponsiveContainer width="100%" height={300}>
									<StatsPieChartStatuses
										theme={theme}
										boards={boards}
										selectedBoardID={selectedBoardID}
									/>
								</ResponsiveContainer>
							</Widget>
						</Grid>
						<Grid item xs={12} md={12}>
							<Widget title="Visualising your overall outcomes" noBodyPadding upperTitle>
								<ResponsiveContainer width="100%" height={300}>
									<StatsPieChartOutcomes
										theme={theme}
										boards={boards}
										selectedBoardID={selectedBoardID}
									/>
								</ResponsiveContainer>
								<DropdownHierarchical
									options={outcomeOptions}
								/>
							</Widget>
						</Grid>
					</Grid>
				</div>
			</FadeIn>
		</Layout>
	);
};
