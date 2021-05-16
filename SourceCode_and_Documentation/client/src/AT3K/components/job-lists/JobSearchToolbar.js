import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Searchbar from './searchbar';
import {
    Grid,
    Paper,
    Button
} from '@material-ui/core';
import styles from './JobSearchToolbar.module.scss';
import BoardSelectionDropdown from './BoardSelectionDropdown';

import api from '../../constants/api';

import {SearchBar as AutoSearch} from "../searchbar"
import axios from 'axios';

const JobSearchToolbar = ({ 
    searchQuery, 
    boards, 
    setSearchQuery, 
    fetchJobPosts, 
    pageNum, 
    resultsPerPage, 
    locationQuery, 
    handleLocationSearch, 
    selectedBoardID, 
    handleSelectBoard 
}) => {
    const [autoCompItems, setAutoCompItems] = useState([])

    useEffect(() => {
        axios.get(`
        ${api.BASE_URL}/api/jobs/autocomplete?query=${searchQuery}
    `).then((response) => {
        setAutoCompItems(response.data)
    })
    }, [searchQuery])

    return (
        <Paper className={styles.toolbar} elevation={3}>
            <div className={styles.content}>
                <Grid container className={styles.grid}>
                    <Grid item xs={6} sm={6} md={3}>
                        <div>
                            <AutoSearch 
                                labelText="Job Search" 
                                items={autoCompItems}
                                query={searchQuery} 
                                setQuery={setSearchQuery}
                            />
                            {/* <Searchbar
                                placeholder="Job Search"
                                value={searchQuery}
                                onSearch={handleSearch}
                            /> */}
                        </div>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <div>
                            <Searchbar
                                placeholder="Location"
                                value={locationQuery}
                                onSearch={handleLocationSearch}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <BoardSelectionDropdown 
                            selectedBoardID={selectedBoardID}
                            handleSelectBoard={handleSelectBoard}
                            boards={boards}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <div style={{ textAlign: "center", padding: "10px" }}>
                            <Button 
                                variant="contained" 
                                color="primary"
                                onClick={() => fetchJobPosts(pageNum, resultsPerPage)}
                                style={{ width: "100%", height: "100%" }}
                            >
                                Search
                            </Button>
                        </div>
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
