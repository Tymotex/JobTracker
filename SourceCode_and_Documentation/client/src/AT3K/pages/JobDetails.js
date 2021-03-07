
import React from 'react';
import Layout from '../../components/Layout/Layout';
import { JobMap } from '../components/job-map';
import {
    Grid,
    Button
} from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import styles from './JobDetails.module.scss';

const JobDetails = () => {
    return (
        <Layout>
            <Grid container>
                <Grid item xs={9}>
                    <h1 className={styles.mainTitle}>
                        Job Details
                    </h1>
                    [Need a back button. Maybe use a Material UI breadcrumb?]
                    <div>
                        <Button variant="outlined" color="primary">
                            View official post
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <CalendarTodayIcon /> Posted on: ...
                    <div>
                        <Button variant="outlined" color="primary">
                            View official post
                        </Button>
                    </div>
                </Grid>
            </Grid>

            <hr />
            <h3>Description</h3>

            <h3>Location</h3>
            
            <JobMap />

            <h3>Requirements</h3>

            <h3>Missing Skills</h3>

            <h3>Resource Recommendations</h3>

            <hr />

            <div>
                Footer here [Share with facebook, linkedin, etc.]
            </div>

        </Layout>
    );
};

export default JobDetails;
