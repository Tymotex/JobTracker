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
                        value="Urgency"
                        onChange={(event) => {}}
                        label="Sort Boards"
                        items={[
                            "Urgency", 
                            "Alphabetical A-Z",
                            "Alphabetical Z-A",
                            "Most recent created",
                            "Least recent created",
                            "Last modified",
                            "Most recently changed"
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
