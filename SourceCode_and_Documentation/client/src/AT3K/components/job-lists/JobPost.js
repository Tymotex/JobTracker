import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./jobPost.module.scss";
import axios from 'axios';
import Cookie from 'js-cookie';
import api from '../../constants/api';
import { Notification } from '../../components/notification';

const JobPost = ({
	fieldsToShow,
	selectedBoardID,
	detailLevel,
	title,
	company,
	locations,
	url,
	description,
	salary,
	date,
}) => {

	// ===== POST /api/tracker ======

	const trackNewJob = () => {
		const userID = Cookie.get("user_id");
		if (userID) {
			if (!selectedBoardID) {
				Notification.spawnInvalid("Please select a board first");
			} else {
				const jobToTrack = {
					title, company, locations, url, description, salary, date
				};
				const postData = {
					method: "post",
					url: `${api.BASE_URL}/api/tracker/`,
					data: {
						user_id: userID,
						board_id: selectedBoardID,
						job_to_track: jobToTrack
					},
					headers: { "Content-Type": "text/plain" }
				}
				axios.post(`${api.BASE_URL}/api/tracker/`, {
					user_id: userID,
					board_id: selectedBoardID,
					job_to_track: jobToTrack
				}, {
					headers: {
					  "Content-Type": "application/json"
					}
				}).then((response) => {
					Notification.spawnSuccess(`Tracking '${response.data.title}'`);
				}).catch((err) => {
					Notification.spawnError(err);
				})
			}
		} else {
			Notification.spawnRegisterError();
		}
	}

	// ==============================

	return (
		<>
			<Card className={`${styles.card}`}>
				<CardContent>
					{fieldsToShow && fieldsToShow.title && (
						<Typography variant="h5" component="h2">
							{title}
						</Typography>
					)}
					<Typography variant="body2" component="p">
						{detailLevel === 1 && (
							<div>
								{fieldsToShow.company && (
									<span>
										Company: {company}
									</span>
								)}
								{fieldsToShow.url && (
									<div>
										<a href={url}>Original post link</a>
									</div>
								)}
								{fieldsToShow.salary && (
									<div>
										Salary: {salary}
									</div>
								)}
								{fieldsToShow.locations && (
									<div>
										Location: {locations}
									</div>
								)}
								{fieldsToShow.date && (
									<div>
										Posted date: {date}
									</div>
								)}
								{fieldsToShow.description && (
									<div>
										Description: {description}
									</div>
								)}
							</div>
						)}
						{detailLevel === 2 && (
							<div>
								{fieldsToShow.company && company && company !== "" && (
									<span className={styles.field}>
										Company: {company}
									</span>
								)}
								{fieldsToShow.url && url && url !== "" && (
									<div className={styles.field}>
										<a href={url}>Original post link</a>
									</div>
								)}
								{fieldsToShow.salary && salary && salary !== "" && (
									<div className={styles.field}>
										Salary: {salary}
									</div>
								)}
								{fieldsToShow.locations && locations && locations !== "" && (
									<div className={styles.field}>
										Location: {locations}
									</div>
								)}
								{fieldsToShow.date && date && date !== "" && (
									<div className={styles.field}>
										Posted date: {date}
									</div>
								)}
								{fieldsToShow.description && description && description !== "" && (
									<div className={styles.field}>
										Description: {description}
									</div>
								)}
								<div>
									<Link to={`/search/details?id=${"JOB_POST_ID_HERE"}`}>
										<strong style={{ "font-size": "200%" }}>View more here</strong>
									</Link>
								</div>
							</div>
						)}
						<div>
							<Button variant="contained" color="info" onClick={trackNewJob}>
								Track
							</Button>
						</div>
					</Typography>
				</CardContent>
			</Card>
		</>
	);
};

export default JobPost;
