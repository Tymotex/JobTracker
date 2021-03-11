import {
    Button, Grid
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
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

const JobDashboardIndex = ({ boards, companies, handleSelectBoard }) => {
    const [modalOpen, setModalOpen] = React.useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };
    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <h2>Recently Viewed</h2>
                    
                    <BoardCardGrid 
                        selectBoard={handleSelectBoard}
                        boards={boards}
                    />
                </Grid>
                <Grid item xs={6}>
                    <h2>Personal Boards</h2>
                    <Dropdown 
                        label="Sort by"
                        value={1}
                        onChange={(event) => { }}
                        label="Sort Boards"
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
                </Grid>
            </Grid>
            <hr />
            <h2>Favourited Companies</h2>
            <CardCarousel 
                companies={companies}
            />

            <BoardCreateModal 
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
