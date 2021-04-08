import {
    Grid
} from '@material-ui/core';
import {
    Email as EmailIcon, Facebook as FacebookIcon,

    LinkedIn as LinkedInIcon, Twitter as TwitterIcon
} from '@material-ui/icons';
import React from 'react';
import ReportModal from '../modals/ReportModal.js';
import styles from './Footer.module.scss';





const Footer = ({ type }) => {
    const fontSize = "large";
    return (
        <Grid container alignItems="center" justify="space-between" className={styles.footer}>
            <Grid item xs={6}>
                <div className={styles.shareTitle}>{ `Share this ${type}` }</div>
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