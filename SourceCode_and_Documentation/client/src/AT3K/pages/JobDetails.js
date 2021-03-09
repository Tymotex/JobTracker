
import React from 'react';
import Layout from '../../components/Layout/Layout';
import { JobMap } from '../components/job-map';
import DescriptionSection from '../components/job-details/DescriptionSection';

import {
    Grid,
    Button
} from '@material-ui/core';


import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ListIcon from '@material-ui/icons/List';
import LinkIcon from '@material-ui/icons/Link';

// import { 
//     CalendarTodayIcon,
//     ArrowBackIcon,
//     FacebookIcon,
//     TwitterIcon,
//     LinkedInIcon,
//     EmailIcon,
//     EventBusyIcon,
//     AttachMoneyIcon,
//     ScheduleIcon,
//     ListIcon,
//     LinkIcon

// } from '@material-ui/icons';

import styles from './JobDetails.module.scss';

const Header = () => {
    const iconSize = "small";
    const btnStyle = {
        margin: '20px 5px'
    };

    const companyIconStyle = {
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        padding: '5px'
    }

    return (
        <Grid container justify="space-between">
            <Grid item xs={6}>
                <Grid container direction="column">
                    <Grid item  className={styles.iconLabelSet}>
                        <ArrowBackIcon fontSize="large"/> 
                        <label>Back </label>
                    </Grid>

                    <Grid item>
                        <div className={styles.iconLabelSet}>
                            <img src="https://th.bing.com/th/id/OIP.zJufwwvIsPoEYwp9lXhizgHaFi?w=158&h=129&c=7&o=5&dpr=2.5&pid=1.7" style={companyIconStyle}/>
                            <a href="">Whatever company</a>
                        </div>
                        <h1 className={styles.mainTitle}>
                            Job Details
                        </h1>
                    </Grid>

                    <Grid item direction="row">
                        <Button style={btnStyle} variant="outlined" color="secondary" size="small" href="">
                            View official post
                        </Button>
                        <Button style={btnStyle} variant="outlined" color="secondary" size="small" href="">
                            Save
                        </Button>
                    </Grid>
                    <Grid item >
                    </Grid>

                    <Grid item>
                    </Grid>

                </Grid>
            </Grid>

            <Grid item xs={3}>
                <Grid container direction="column">

                <Grid item className={styles.iconListItem}>
                    <CalendarTodayIcon fontSize={iconSize}/> 
                    <label>Posted on: ...</label>
                </Grid>
                <Grid item className={styles.iconListItem}>
                    <EventBusyIcon fontSize={iconSize}/> 
                    <label>Deadline: ...</label>
                </Grid>
                <Grid item className={styles.iconListItem}>
                    <AttachMoneyIcon fontSize={iconSize}/> 
                    <label>Salary: ...</label>
                </Grid>
                <Grid item className={styles.iconListItem}>
                    <ScheduleIcon fontSize={iconSize}/> 
                    <label>Type: ...</label>
                </Grid>
                <Grid item className={styles.iconListItem}>
                    <ListIcon fontSize={iconSize}/> 
                    <label>
                        Category: 
                        <a href=""> Category 1</a>
                    </label>
                </Grid>
                <Grid item className={styles.iconListItem}>
                    <LinkIcon fontSize={iconSize}/> 
                    <label>Official Website: ...</label>
                </Grid>
                <Grid item className={styles.iconListBtn}>
                    <Button variant="outlined" color="primary">
                        View official post
                    </Button>
                </Grid>

                </Grid>
            </Grid>
        </Grid>

    );
}

const Footer = () => {
    const fontSize = "large";
    return (
       <Grid container alignItems="center" justify="space-between" className={styles.footer}>
            <Grid item xs={6}>
                <div className={styles.shareTitle}>Share this role</div>
                <div className={styles.iconSet}>
                    <FacebookIcon fontSize={fontSize}/>
                    <TwitterIcon fontSize={fontSize}/>
                    <LinkedInIcon fontSize={fontSize}/>
                    <EmailIcon fontSize={fontSize}/>
                </div>
            </Grid>
            <Grid item xs={2}>
                <Button variant="outlined" color="primary">
                    Report this job
                </Button>    

          </Grid>
       </Grid>
    );
    
}

const JobDetails = () => {
    return (
        <Layout>
            <Header />

            <hr />
            
            <DescriptionSection title="Description">
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </DescriptionSection>

            <DescriptionSection title="Location">
                <JobMap />
            </DescriptionSection>

            <DescriptionSection title="Requirements">
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. 
                <ul>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li>Nullam fringilla velit vitae odio pulvinar ultricies.</li>
                    <li>Fusce rhoncus nunc non ante posuere, eu laoreet ipsum ultricies.</li>
                </ul>

                <ul>
                    <li>Sed ac est a elit mattis sagittis et quis orci.</li>
                    <li>Donec eu nunc aliquet arcu cursus posuere.</li>
                </ul>
                <ul>
                    <li>Integer id velit egestas, blandit felis vel, porttitor mi.</li>
                    <li>Nulla sit amet ante a tellus elementum vulputate ut ac ante.</li>
                    <li>Nunc ut nulla vel urna molestie facilisis iaculis ac odio.</li>
                    <li>Phasellus nec erat nec nibh elementum bibendum.</li>
                    <li>Fusce in arcu eget nibh eleifend egestas non nec enim.</li>
                </ul>
            </DescriptionSection>

            <DescriptionSection title="Missing Skills">
                    <ul>
                        <li>Integer id velit egestas, blandit felis vel, porttitor mi.</li>
                        <li>Nulla sit amet ante a tellus elementum vulputate ut ac ante.</li>
                        <li>Nunc ut nulla vel urna molestie facilisis iaculis ac odio.</li>
                        <li>Phasellus nec erat nec nibh elementum bibendum.</li>
                        <li>Fusce in arcu eget nibh eleifend egestas non nec enim.</li>
                    </ul>
            </DescriptionSection>

            <DescriptionSection title="Resource Recommendations">
                <ul>
                    <li>Sed ac est a elit mattis sagittis et quis orci.</li>
                    <li>Donec eu nunc aliquet arcu cursus posuere.</li>
                </ul>
                <ul>
                    <li>Integer id velit egestas, blandit felis vel, porttitor mi.</li>
                    <li>Nulla sit amet ante a tellus elementum vulputate ut ac ante.</li>
                    <li>Nunc ut nulla vel urna molestie facilisis iaculis ac odio.</li>
                    <li>Phasellus nec erat nec nibh elementum bibendum.</li>
                    <li>Fusce in arcu eget nibh eleifend egestas non nec enim.</li>
                </ul>
            </DescriptionSection>

            <hr />

            <Footer />
            
        </Layout>
    );
};

export default JobDetails;
