import React from 'react';
import {
	Link
} from 'react-router-dom';
import {
	Grid
} from '@material-ui/core';

import styles from './JobItem.module.scss';


const JobItem = (props) => {
	return (
		<Link to="/search/details">
			<Grid container direction="row" className={styles.container}>
				<Grid item xs={6} className={styles.jobTitle}>
					<div>{props.title} </div>
				</Grid>

				<Grid item xs={3}>
					{props.location}
				</Grid>

				<Grid item xs={3} className={styles.jobDate}>
					{props.postTime}
				</Grid>
			</Grid>
		</Link>

	);	

};


export default JobItem;