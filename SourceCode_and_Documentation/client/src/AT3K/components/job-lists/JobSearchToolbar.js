import React from 'react';
import PropTypes from 'prop-types';
import Searchbar from './searchbar';
import {
    Grid,
    Paper,
    Button
} from '@material-ui/core';
import styles from './JobSearchToolbar.module.scss';
import { Dropdown } from '../dropdowns';

const JobSearchToolbar = ({ searchQuery, boards, handleSearch, fetchJobPosts, pageNum, resultsPerPage, locationQuery, handleLocationSearch, selectedBoardID, handleSelectBoard }) => {
    return (
        <Paper className={styles.toolbar} elevation={3}>
            <div className={styles.content}>
                <Grid container>
                    <Grid item  xs={12} sm={3}>
                        <div className={styles.full}>
                            <Searchbar
                                placeholder="Job Search"
                                value={searchQuery}
                                onSearch={handleSearch}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <div className={styles.full}>
                            <Searchbar
                                placeholder="Location"
                                value={locationQuery}
                                onSearch={handleLocationSearch}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Dropdown 
                            label="SelectedBoard"
                            value={selectedBoardID}
                            onChange={handleSelectBoard}
                            items={boards && boards.map((eachBoard) => ({
                                text: eachBoard.name,
                                value: eachBoard._id
                            }))}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
            			<Button variant="outlined" onClick={() => fetchJobPosts(pageNum, resultsPerPage)}>Search</Button>
                    </Grid>
                </Grid>
            </div>
        </Paper>
    )
};

JobSearchToolbar.propTypes = {
    searchQuery: PropTypes.string,
    handleSearch: PropTypes.func,
    locationQuery: PropTypes.string,
    handleLocationSearch: PropTypes.func
};

export default JobSearchToolbar;