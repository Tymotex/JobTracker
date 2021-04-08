import {
    Paper
} from '@material-ui/core';
import React from 'react';
import {
    NotificationsSettings,
    PreferencesSettings, ProfileSettings,
    ThemeSettings
} from './';
import styles from './SettingsPanel.module.scss';

const capitaliseFirstLetter = ([ first, ...rest ], locale = navigator.language) => (
    first.toLocaleUpperCase(locale) + rest.join('')
);

const SettingsPanel = ({ currCategory="profile", replaceTheme, currTheme }) => {
    return (
        <Paper className={styles.container} elevation={2}> 
            <h1>
                {capitaliseFirstLetter(currCategory)} Settings
            </h1>
            {currCategory === "profile" && (
                <ProfileSettings />
            )}
            {currCategory === "theme" && (
                <ThemeSettings 
                    replaceTheme={replaceTheme} 
                    currTheme={currTheme}
                />
            )}
            {currCategory === "notifications" && (
                <NotificationsSettings />
            )}
            {currCategory === "preferences" && (
                <PreferencesSettings />
            )}
        </Paper>
    );
};

export default SettingsPanel;
