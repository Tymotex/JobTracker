import {
    Grid
} from '@material-ui/core';
import { Button } from '../components/buttons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
    BoardCardGrid,
} from '../components/job-dashboard';
import CompanyCard from '../components/job-dashboard/CompanyCard';
import {
    Dropdown
} from '../components/dropdowns';
import {
    BoardCreateModal
} from '../components/modals';
import {
    ContentLoader
} from '../components/loaders';
import FadeIn from 'react-fade-in';


// Force update hook
const useForceUpdate = () => {
    const [value, setValue] = useState(0);             
    return () => setValue(value => value + 1); 
}

const JobDashboardIndex = ({ boards, companies, handleSelectBoard, updateBoardList, boardSortStrategy, handleSetBoardSorter, fetchBoards }) => {
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
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} style={{ textAlign: "center" }}>
                            <h2>Your Job Boards</h2>
                            <hr />
                        </Grid>
                        {/* <Grid item xs={6}>
                            <Dropdown 
                                label="Sort by"
                                value={boardSortStrategy}
                                onChange={handleSetBoardSorter}
                                items={[
                                    { value: "alphabetical", text: "Alphabetical A-Z" },
                                    { value: "reverse-alphabetical", text: "Alphabetical Z-A" },
                                    { value: "recency", text: "Most recently interacted" },
                                    { value: "reverse-recency", text: "Least recently interacted" },
                                    { value: "priority", text: "Highest priority" },
                                    { value: "reversepriority", text: "Lowest priority" }
                                ]}
                            />
                        </Grid> */}
                    </Grid>
                    {isLoading ? (
                        <ContentLoader />
                    ) : (
                        <FadeIn
                            delay={100}
                            transitionDuration={400}
                        >
                            <BoardCardGrid
                                selectBoard={handleSelectBoard}
                                boards={boards}
                                fetchBoards={fetchBoards}
                            />
                            <div style={{"textAlign": "center", "margin": "20px"}}>
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    onClick={handleModalOpen}
                                >
                                    Create New Board
                                </Button>
                            </div>
                        </FadeIn>
                    )} 
                </Grid>
            </Grid>
            <BoardCreateModal 
                updateBoardList={updateBoardList}
                handleClose={handleModalClose} 
                open={modalOpen} 
            />
            {companies && companies.length !== 0 && (
                <>
                    <hr />
                    <h2>Favourited Companies</h2>
                    <FadeIn
                        delay={100}
                        transitionDuration={400}
                    >
                        {/* <CardCarousel 
                            companies={companies}
                        /> */}
                        <Grid container display='flex'>
                            {companies && companies.map((eachCompany) => (
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <CompanyCard
                                        {...eachCompany}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        
                    </FadeIn>
                </>
            )}
        </div>
    )
}

JobDashboardIndex.propTypes = {
    boards: PropTypes.array,
    companies: PropTypes.array,
    handleSelectBoard: PropTypes.func
};

export default JobDashboardIndex;
