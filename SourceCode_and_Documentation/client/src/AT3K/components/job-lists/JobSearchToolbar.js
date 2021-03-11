import React from 'react';
import PropTypes from 'prop-types';
import Searchbar from './searchbar';
import {
    Grid,
    Paper
} from '@material-ui/core';
import styles from './JobSearchToolbar.module.scss';

const JobSearchToolbar = ({ searchQuery, handleSearch, locationQuery, handleLocationSearch }) => {
    return (
        <>
            <Paper className={styles.toolbar} elevation={3}>
                <div className={styles.content}>
                    <Grid container>
                        <Grid item xs={6}>
                            <div className={styles.full}>
                                <Searchbar
                                    placeholder="Job Search"
                                    value={searchQuery}
                                    onSearch={handleSearch}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={styles.full}>
                                <Searchbar
                                    placeholder="Location"
                                    value={locationQuery}
                                    onSearch={handleLocationSearch}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        </>
    )
};

JobSearchToolbar.propTypes = {
    searchQuery: PropTypes.string,
    handleSearch: PropTypes.func,
    locationQuery: PropTypes.string,
    handleLocationSearch: PropTypes.func
};

export default JobSearchToolbar;
