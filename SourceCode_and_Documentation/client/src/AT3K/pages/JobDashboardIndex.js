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
import FunctionsMenu from '../components/job-boards/FunctionsMenu';
import { Planet } from 'react-planet';


// Force update hook
const useForceUpdate = () => {
    const [value, setValue] = useState(0);             
    return () => setValue(value => value + 1); 
}

function Test() {
    return (
        <Planet
            centerContent={
                <div
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius: '50%',
                        backgroundColor: '#0008a4',
                    }}
                />
            }
            open
            dragablePlanet
            dragRadiusPlanet={20}
            bounce
            autoClose
        >
            <div
                style={{
                    height: 70,
                    width: 70,
                    borderRadius: '50%',
                    backgroundColor: '#9257ad',
                }}
            />
            <div
                style={{
                    height: 70,
                    width: 70,
                    borderRadius: '50%',
                    backgroundColor: '#9257ad',
                }}
            />
        </Planet>
    );
}










const JobDashboardIndex = ({ boards, companies, handleSelectBoard, updateBoardList, boardSortStrategy, handleSetBoardSorter }) => {
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
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <h2>Personal Boards</h2>
                        </Grid>
                        <Grid item xs={6}>
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
                        </Grid>
                    </Grid>
                    {isLoading ? (
                        <ContentLoader />
                    ) : (
                        <>
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
            <Test />
        </div>
    )
}

JobDashboardIndex.propTypes = {
    boards: PropTypes.array,
    companies: PropTypes.array,
    handleSelectBoard: PropTypes.func
};

export default JobDashboardIndex;
