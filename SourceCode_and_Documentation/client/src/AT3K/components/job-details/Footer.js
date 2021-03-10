import React from 'react';

import ReportModal from '../modals/ReportModal.js';

import styles from './Footer.module.scss';

import {
    Facebook as FacebookIcon,
    Twitter as TwitterIcon,
    LinkedIn as LinkedInIcon,
    Email as EmailIcon,
} from '@material-ui/icons';

import {
    Grid,
    Button
} from '@material-ui/core';

const Footer = ({type}) => {
    const fontSize = "large";
    return (
        <Grid container alignItems="center" justify="space-between" className={styles.footer}>
            <Grid item xs={6}>
                <div className={styles.shareTitle}>Share this {type}</div>
                <div className={styles.iconSet}>
                    <FacebookIcon fontSize={fontSize}/>
                    <TwitterIcon fontSize={fontSize}/>
                    <LinkedInIcon fontSize={fontSize}/>
                    <EmailIcon fontSize={fontSize}/>
                </div>
            </Grid>
            <Grid item xs={2}>
                <ReportModal type={type}/>
            </Grid>
        </Grid>
    )
}

export default Footer;