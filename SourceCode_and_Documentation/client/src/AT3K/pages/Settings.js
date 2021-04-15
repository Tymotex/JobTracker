import React from 'react';
import {
    Grid
} from '@material-ui/core';
import Layout from '../../components/Layout/Layout';
import { 
    SettingsMenu,
    SettingsPanel
} from '../components/settings';
import pageStyles from "./Page.module.scss";
import FadeIn from 'react-fade-in';

// TODO: Dark mode: https://www.npmjs.com/package/darkreader

const Settings = ({ replaceTheme, currTheme, settingsCategory }) => {
    return (
        <Layout>
            <FadeIn>
                <div className={pageStyles.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <SettingsMenu currCategory={settingsCategory} />
                        </Grid>
                        <Grid item xs={9}>
                            <SettingsPanel 
                                currCategory={settingsCategory}
                                replaceTheme={replaceTheme}
                                currTheme={currTheme}
                            />
                        </Grid>
                    </Grid>
                </div>
            </FadeIn>
        </Layout>
    );
};

export default Settings;

