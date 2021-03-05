import React from 'react';
import {
    Paper
} from '@material-ui/core';
import {
    ProfileSettings,
    NotificationsSettings,
    PreferencesSettings,
    ThemeSettings
} from './';

const capitaliseFirstLetter = ([ first, ...rest ], locale = navigator.language) => (
    first.toLocaleUpperCase(locale) + rest.join('')
);

const SettingsPanel = ({ currCategory, replaceTheme, currTheme }) => {
    const settingsType = currCategory.toLowerCase();
    return (
        <Paper elevation={2}> 
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
