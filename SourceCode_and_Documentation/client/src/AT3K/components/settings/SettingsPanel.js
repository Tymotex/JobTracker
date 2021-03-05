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

const SettingsPanel = ({ currCategory }) => {
    const settingsType = currCategory.toLowerCase();
    return (
        <Paper elevation={2}>
            {currCategory === "profile" && (
                <ProfileSettings />
            )}
            {currCategory === "theme" && (
                <ThemeSettings />
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
