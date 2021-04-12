import {
    Button, Grid
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import {
    ArrowBack as ArrowBackIcon,
    AttachMoney as AttachMoneyIcon, CalendarToday as CalendarTodayIcon,
    EventBusy as EventBusyIcon,
    Label as LabelIcon, Link as LinkIcon, List as ListIcon, Schedule as ScheduleIcon
} from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import {
    Link, useLocation
} from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { JobDetailField } from '../components/job-details';
import DescriptionSection from '../components/job-details/DescriptionSection';
import Footer from '../components/job-details/Footer';
import { JobMap } from '../components/job-map';
import styles from './JobDetails.module.scss';
import api from "../constants/api";
import axios from "axios";
import MapIcon from '@material-ui/icons/Map';
import Cookie from 'js-cookie';
import BoardSelectionDropdown from '../components/job-lists/BoardSelectionDropdown';
import { Notification } from '../components/notification';
import { ContentLoader } from '../components/loaders';

const iconSize = "small";
const btnStyle = {
    margin: '20px 5px'
};

const companyIconStyle = {
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    padding: '5px'
};

const tagStyle = {
    height: '30px',
    margin: '5px'
};

const Header = ({
    title,
    company,
    locations,
    url,
    description,
    salary,
    date,
}) => {
    const [boards, setBoards] = useState(null);
    const [selectedBoardID, setSelectedBoardID] = useState(null);

    const handleSelectBoard = (event) => {
        event.preventDefault();
        setSelectedBoardID(event.target.value);
    }

    // ===== GET /api/user/boards =====
    // If the user is logged in, fetch their boards

    const fetchUserBoards = () => {
        const userID = Cookie.get("user_id");
        if (userID) {
            axios.get(`${api.BASE_URL}/api/user/boards?user_id=${userID}`)
                .then((response) => {
                    setBoards(response.data);
                })
                .catch((err) => {
                    Notification.spawnError(err);
                });
        } else {
            Notification.spawnRegisterError();
        }
    }

    useEffect(() => {
        fetchUserBoards();
    }, []);

    // =========================

    // ===== POST /api/tracker ======

    const trackNewJob = () => {
        const userID = Cookie.get("user_id");
        if (userID) {
            if (!selectedBoardID) {
                Notification.spawnInvalid("Please select a board first");
            } else {
                const jobToTrack = {
                    title,
                    company,
                    locations,
                    url,
                    description,
                    salary,
                    date,
                };
                axios
                    .post(
                        `${api.BASE_URL}/api/tracker/`,
                        {
                            user_id: userID,
                            board_id: selectedBoardID,
                            job_to_track: jobToTrack,
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    .then((response) => {
                        Notification.spawnSuccess(`Tracking '${response.data.title}'`);
                    })
                    .catch((err) => {
                        Notification.spawnError(err);
                    });
            }
        } else {
            Notification.spawnRegisterError();
        }
    };

    // ============================

    // ===== POST /api/user/company =====

    const favouriteThisCompany = (companyName) => {
        const userID = Cookie.get("user_id");
        if (userID) {
            const postData = {
                method: "post",
                url: `${api.BASE_URL}/api/user/company`,
                data: {
                    user_id: userID,
                    company_name: companyName
                },
                headers: {
                    "Content-Type": "application/json"
                }
            };
            axios(postData)
                .then((res) => Notification.spawnSuccess(`Saved '${res.data}'`))
                .catch((err) => Notification.spawnError(err));
        } else {
            Notification.spawnRegisterError();
        }
    }

    // ============================


    const jobDetailFields = [
        {
            label: "Posted on",
            value: date,
            icon: CalendarTodayIcon
        },
        {
            label: "Salary",
            value: salary,
            icon: AttachMoneyIcon
        },
        {
            label: "Type",
            value: "Full time",
            icon: ScheduleIcon
        },
        {
            label: "Location",
            value: locations,
            icon: MapIcon,
        }
    ];

    return (
        <Grid container justify="space-between">
            <Grid item xs={7}>
                <Grid container direction="column">
                    <Grid item>
                        <Link className={styles.iconLabelSet}
                            to="/search"
                        >
                            <ArrowBackIcon id="back" fontSize="large" />
                            <label for="back">Back </label>
                        </Link>
                    </Grid>

                    <Grid item>
                        <div className={styles.iconLabelSet}>
                            {/* FIXME: drop icon if we don't have one */}
                            <img
                                src="https://th.bing.com/th/id/OIP.zJufwwvIsPoEYwp9lXhizgHaFi?w=158&h=129&c=7&o=5&dpr=2.5&pid=1.7"
                                style={companyIconStyle}
                                alt="company icon"
                            />
                            <Link
                                className={styles.field}
                                to={`/search/company?company=${company}`}
                            >
                                {company}
                            </Link>
                            {/* <a href="/search/company">{company}</a> */}
                        </div>
                        <div className={styles.mainTitle}>
                            {title}
                        </div>
                    </Grid>
                    <Grid item direction="row">
                        <Button style={btnStyle} variant="outlined" color="secondary" size="small" component="a" href={url}>
                            View original post
                        </Button>
                        <Button 
                            style={btnStyle} 
                            variant="contained" 
                            color="primary" 
                            size="small" 
                            onClick={() => favouriteThisCompany(company)}
                        >
                            Favourite Company ❤️
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={3}>
                <Grid container direction="column" style={{ paddingTop: '60px' }}>

                    {jobDetailFields.map((eachField) => (
                        <Grid item>
                            <JobDetailField {...eachField}>
                                <eachField.icon fontSize={iconSize} />
                            </JobDetailField>
                        </Grid>
                    ))}

                    <Grid item>
                        <Button
                            style={btnStyle}
                            variant="outlined"
                            size="large"
                            color="info"
                            onClick={trackNewJob}
                        >
                            Track This Job
                        </Button>

                        <BoardSelectionDropdown
                            selectedBoardID={selectedBoardID}
                            handleSelectBoard={handleSelectBoard}
                            boards={boards}
                        />
                    </Grid>

                </Grid>
            </Grid>
        </Grid>

    );
}



const JobDetails = () => {
    const [jobDescription, setJobDescription] = useState(null);
    // get data from 
    const search = useLocation().search;
    const params = new URLSearchParams(search);
    const title = params.get('title');
    const company = params.get('company');
    const locations = params.get('locations');
    const url = params.get('url');
    const salary = params.get('salary');
    const date = params.get('date');
    //

    useEffect(() => {
        axios.get(`${api.BASE_URL}/api/job?url=${url}`)
            .then(response => setJobDescription(response.data))
    }, [])

    const isLoading = (jobDescription === null);

    return (
        <Layout>
            <Header url={url} company={company} title={title} salary={salary} locations={locations} date={date} />

            <hr />

            <DescriptionSection title="Description">
                {/* NOTE this is probably not safe, but it works */}
                {(isLoading) ? (
                    <ContentLoader />
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: jobDescription && jobDescription.post_details }} />
                )}
            </DescriptionSection>

            <DescriptionSection title="Location">
                <JobMap locationQuery={locations} />  {/* Substitute this for actual location query */}
            </DescriptionSection>
            <hr />

            <Footer type="job" />

        </Layout>
    );
};

export default JobDetails;
