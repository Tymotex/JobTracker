import React from 'react';

import Layout from '../../components/Layout/Layout';
import { 
    SettingsMenu,
    SettingsPanel
} from '../components/settings';

const capitaliseFirstLetter = ([ first, ...rest ], locale = navigator.language) => (
    first.toLocaleUpperCase(locale) + rest.join('')
);

const Settings = ({ replaceTheme, currTheme, settingsCategory }) => {
    return (
        <Layout>
            <h1>
                {capitaliseFirstLetter(settingsCategory)} Settings
            </h1>
            <SettingsMenu currCategory={settingsCategory} />
            <SettingsPanel 
                currCategory={settingsCategory}
                replaceTheme={replaceTheme}
                currTheme={currTheme}
            />
        </Layout>
    );
};

export default Settings;

