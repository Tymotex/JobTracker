import React, { useState } from 'react';
import {
    Grid,
    Button
} from '@material-ui/core';
import Layout from '../../components/Layout/Layout';
import { 
    JobSpreadsheet, 
    JobBoard,
    JobCalendar,
    JobList,
    BoardDropdown,
    BoardToolbar
} from '../components/job-boards';
import {
    BoardCardGrid,
    CardCarousel
} from '../components/job-dashboard';
import {
    BreadCrumbs
} from '../components/breadcrumbs';

const tempBoards = [
    {
        name: "Software Engineering",
        description: "Software engineering is the systematic application of engineering approaches to the development of software."
    },
    {
        name: "Electrical Engineering",
        description: "Electrical engineering is an engineering discipline concerned with the study, design and application of equipment, devices and systems which use electricity, electronics, and electromagnetism."
    }
]

const tempCompanies = [
    {
        name: "Canva",
        description: `
            Canva is a graphic design platform, used to create social media graphics, presentations, posters, documents and other visual content. The app includes templates for users to use. The platform is free to use and offers paid subscriptions like Canva Pro and Canva for Enterprise for additional functionality.
        `
    },
    {
        name: "Atlassian",
        description: `
            Atlassian Corporation Plc is an Australian software company that develops products for software developers and project managers.
        `
    }
];

const JobDashboard = () => {
    // TODO: store the boardtype under cookies/localStorage
    // so that the site remembers the user's preferences
    const [boardType, setBoardType] = useState("spreadsheet".toLowerCase());
    const [selectedBoard, setBoard] = useState(null);

    const handleChangeBoard = (event) => {
        setBoardType(event.target.value);
    }

    const handleSelectBoard = () => {
        setBoard("Software Engineering");
    }

    const handleDeselectBoard = () => {
        setBoard(null);
    }
    
    return (
        <Layout>
            {selectedBoard === null ? (
                <>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <h2>Recently Viewed</h2>
                            <BoardCardGrid 
                                selectBoard={handleSelectBoard}
                                boards={tempBoards}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <h2>Your Boards</h2>
                            <BoardCardGrid
                                selectBoard={handleSelectBoard}
                                boards={tempBoards}
                            />
                            <div style={{"textAlign": "center"}}>
                                <Button variant="contained" color="primary">
                                    Create New Board
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                    <hr />
                    <CardCarousel 
                        companies={tempCompanies}
                    />
                </>
            ) : (
                <>
                    <BreadCrumbs deselectBoard={handleDeselectBoard} name={selectedBoard} />
                    <h1>Dashboard</h1>
                    <BoardToolbar 
                        boardType={boardType}
                        handleChangeBoard={handleChangeBoard}
                    />
                    
                    {boardType === "spreadsheet" && (
                        <>
                            <h3>Spreadsheet</h3>
                            <JobSpreadsheet />
                        </>
                    )}
                    {boardType === "board" && (
                        <>
                            <h3>Board</h3>
                            <JobBoard />
                        </>
                    )}
                    {boardType === "calendar" && (
                        <>
                            <h3>Calendar</h3>
                            <JobCalendar />
                        </>
                    )}
                    {boardType === "list" && (
                        <>
                            <h3>List</h3>
                            <JobList />
                        </>
                    )}
                </>
            )}
        </Layout>
    );
};

export default JobDashboard;
