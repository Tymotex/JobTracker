import React from 'react';
import {
    Grid
} from '@material-ui/core';
import Layout from '../../components/Layout/Layout';
import { 
    SettingsMenu,
    SettingsPanel
} from '../components/settings';



const Settings = ({ replaceTheme, currTheme, settingsCategory }) => {
    return (
        <Layout>
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
        </Layout>
    );
};

export default Settings;

