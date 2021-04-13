import React from 'react';
import {
    Grid
} from '@material-ui/core';
import JobCard from './JobCard';
import FullscreenMode from './FullscreenMode';
import JobListPaginator from '../job-lists/JobListPaginator';

const JobList = ({ trackedJobs, fieldsToShow }) => {
    return (
        <FullscreenMode>
            <Grid container>
                {trackedJobs && trackedJobs.map((eachPosting) => (
                    <Grid item xs={6}>
                        <JobCard 
                            {...eachPosting}
                        />
                    </Grid>
                ))}
            </Grid>
            <JobListPaginator />
        </FullscreenMode>
    );
};

export default JobList;