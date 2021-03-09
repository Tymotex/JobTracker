
import React from 'react';
import Layout from '../../components/Layout/Layout';
import { JobMap } from '../components/job-map';
// import DescriptionSection from '../components/job-details/DescriptionSection';

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

import styles from './JobDetails.module.scss';

const Header = () => {
    return (
        <Grid container>
            <Grid item xs={9}>
                <h1 className={styles.mainTitle}>
                    Job Details
                </h1>
                <ArrowBackIcon />
                [Need a back button. Maybe use a Material UI breadcrumb?]
                <div>
                    <Button variant="outlined" color="primary">
                        View official post
                    </Button>
                </div>
            </Grid>
            <Grid item xs={3}>
                <CalendarTodayIcon /> Posted on: ...
                <div>
                    <Button variant="outlined" color="primary">
                        View official post
                    </Button>
                </div>
            </Grid>
        </Grid>

    );
}

const Footer = () => {
    const fontSize = "large";
    return (
       <Grid 
            container 
            alignItems="center" 
            justify="space-between"
            className={styles.footer}
        >
            <Grid item xs={6}>
                <div className={styles.shareTitle}>Share this role</div>
                <div className={styles.iconSet}>
                    <FacebookIcon fontSize={fontSize}/>
                    <TwitterIcon fontSize={fontSize}/>
                    <LinkedInIcon fontSize={fontSize}/>
                    <EmailIcon fontSize={fontSize}/>
                </div>
            </Grid>
            <Grid item xs={3}>
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
            
            <p>
                <h3>Description</h3>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>
            <p>
                <h3>Location</h3>
            </p>
            <JobMap />

            <p>

                <h3>Requirements</h3>
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
            </p>
            <p>
                <h3>Missing Skills</h3>
                    <ul>
                        <li>Integer id velit egestas, blandit felis vel, porttitor mi.</li>
                        <li>Nulla sit amet ante a tellus elementum vulputate ut ac ante.</li>
                        <li>Nunc ut nulla vel urna molestie facilisis iaculis ac odio.</li>
                        <li>Phasellus nec erat nec nibh elementum bibendum.</li>
                        <li>Fusce in arcu eget nibh eleifend egestas non nec enim.</li>
                    </ul>
            </p>
            <p>
                <h3>Resource Recommendations</h3>
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
            </p>

            <hr />

            <Footer />
            
        </Layout>
    );
};

export default JobDetails;
