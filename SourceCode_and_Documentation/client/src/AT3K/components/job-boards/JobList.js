import React from 'react';
import {
    Grid
} from '@material-ui/core';
import JobCard from './JobCard';

const JobList = ({ trackedJobs }) => {
    return (
        <Grid container>
            {trackedJobs && trackedJobs.map((eachPosting) => (
                <Grid item xs={6}>
                    <JobCard 
                        {...eachPosting}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default JobList;