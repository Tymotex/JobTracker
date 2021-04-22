import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '../buttons';
import styles from "./FunctionsMenu.module.scss";
import {
	Modal
} from '../modals';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import api from '../../constants/api';
import Cookie from 'js-cookie';
import { Notification } from '../notification';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
	},
}));

const AddNewJob = ({ boardID, fetchBoardInfo }) => {
	const classes = useStyles();
	
	const NewJobForm = () => {
		const addNewJob = (event) => {
			event.preventDefault();
			const userID = Cookie.get("user_id");
			if (userID) {
				const formData = new FormData(event.target);
				const jobToTrack = {};
				formData.forEach((val, key) => jobToTrack[key] = val);
				const postData = {
					method: "post",
					url: `${api.BASE_URL}/api/tracker/`,
					data: {
						user_id: userID,
						board_id: boardID,
						job_to_track: jobToTrack
					},
					headers: {
						"Content-Type": "application/json"
					}
				};
				axios(postData)
					.then(() => {
						Notification.spawnSuccess(`Added '${formData.get("title")}'`);
						fetchBoardInfo();
					})
					.catch((err) => Notification.spawnError(err));
			} else {
				Notification.spawnRegisterError();
			}
		};

		return (
			<form onSubmit={addNewJob} className={styles.newJobForm} noValidate autoComplete="off">
				<div>
					<TextField 
						className={styles.field} 
						name="company"
						required 
						id="standard-required" 
						label="Company" 
						defaultValue="" 
					/>
					<TextField 
						className={styles.field}
						name="title" 
						required 
						id="standard-required" 
						label="Title" 
						defaultValue="" 
					/>
					<TextField className={styles.field}
						id="standard-number"
						name="priority"
						label="Priority"
						type="number"
						helperText="Priority value"
						defaultValue={5}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField className={styles.field}
						id="standard"
						name="location"
						label="Location"
						defaultValue=""
						helperText="Location"
					/>
					<TextField className={styles.field}
						id="standard"
						name="salary"
						label="Salary"
						defaultValue=""
						helperText="Salary"
					/>
					<TextField className={styles.field}
						id="standard"
						name="url"
						label="URL"
						defaultValue=""
						helperText="Job Post URL"
					/>
					<TextField className={styles.field}
						id="standard-multiline-static"
						name="description"
						label="Description"
						multiline
						rows={4}
						defaultValue=""
					/>
					<TextField className={styles.field}
						id="standard-multiline-static"
						name="notes"
						label="Notes"
						multiline
						rows={4}
						defaultValue=""
					/>
					<Button type="submit" variant="contained" color="primary">Add</Button>
				</div>
			</form>
		);
	};

	return (
		<div className={classes.root}>
			<Modal title={"Add a new job to track"} Contents={NewJobForm}>
				<Button className={styles.button} variant="contained" color="primary">
					Add Job
				</Button>
			</Modal>
		</div>
	);
};

export default AddNewJob;
