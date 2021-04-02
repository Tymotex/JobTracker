import {
    Button, Grid
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
    BoardCardGrid,
    CardCarousel
} from '../components/job-dashboard';
import {
    Dropdown
} from '../components/dropdowns';
import {
    BoardCreateModal
} from '../components/modals';
import {
    ContentLoader
} from '../components/loaders';


// Force update hook
const useForceUpdate = () => {
    const [value, setValue] = useState(0);             
    return () => setValue(value => value + 1); 
}

const JobDashboardIndex = ({ boards, companies, handleSelectBoard, updateBoardList }) => {
    const [modalOpen, setModalOpen] = React.useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };
    const handleModalClose = () => {
        setModalOpen(false);
    };

    const isLoading = (boards == null);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <h2>Recently Viewed</h2>
                    {isLoading ? (
                        <ContentLoader />
                    ) : (
                        <BoardCardGrid 
                            selectBoard={handleSelectBoard}
                            boards={boards}
                        />
                    )}
                </Grid>
                <Grid item xs={6}>
                    <h2>Personal Boards</h2>
                    {isLoading ? (
                        <ContentLoader />
                    ) : (
                        <>
                            <Dropdown 
                                label="Sort by"
                                value={1}
                                onChange={(event) => { }}
                                items={[
                                    { value: 1, text: "Urgency" },
                                    { value: 2, text: "Alphabetical A-Z" },
                                    { value: 3, text: "Alphabetical Z-A" },
                                    { value: 4, text: "Most recent created" },
                                    { value: 5, text: "Least recent created" },
                                    { value: 6, text: "Last modified" },
                                    { value: 7, text: "Most recently changed" }
                                ]}
                            />
                            <BoardCardGrid
                                selectBoard={handleSelectBoard}
                                boards={boards}
                            />
                            <div style={{"textAlign": "center"}}>
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    onClick={handleModalOpen}
                                >
                                    Create New Board
                                </Button>
                            </div>
                        </>
                    )} 
                </Grid>
            </Grid>
            <hr />
            <h2>Favourited Companies</h2>
            <CardCarousel 
                companies={companies}
            />
            <BoardCreateModal 
                updateBoardList={updateBoardList}
                handleClose={handleModalClose} 
                open={modalOpen} 
            />
        </div>
    )
}

JobDashboardIndex.propTypes = {
    boards: PropTypes.array,
    companies: PropTypes.array,
    handleSelectBoard: PropTypes.func
};

export default JobDashboardIndex;
