import React from 'react';
import {
	Link,
} from 'react-router-dom';
import {
	Grid,
	Button
} from '@material-ui/core';

import styles from './JobItem.module.scss';


const JobItem = (props) => {
	return (
		<Button 
			variant="outlined" 
			componenet={Link} 
			to="/search/details"
			style={{margin: "5px", width: "100%"}}
		>
			<Grid container direction="row">
				<Grid item xs={4} className={styles.jobTitle}>
					<div>{props.title} </div>
				</Grid>

				<Grid item xs={4}>
					{props.location}
				</Grid>

				<Grid item xs={4} className={styles.jobDate}>
					{props.postTime}
				</Grid>
			</Grid>
		</Button>

	);	

};


export default JobItem;