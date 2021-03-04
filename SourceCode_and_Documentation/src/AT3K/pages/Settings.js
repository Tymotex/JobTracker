import React from 'react';

import Layout from '../../components/Layout/Layout';
import { 
    SettingsMenu
} from '../components/settings';

const capitaliseFirstLetter = ([ first, ...rest ], locale = navigator.language) => (
    first.toLocaleUpperCase(locale) + rest.join('')
);

const Settings = ({ settingsCategory }) => {
    return (
        <Layout>
            <h1>
                {capitaliseFirstLetter(settingsCategory)} Settings
            </h1>
            <SettingsMenu currCategory={settingsCategory}/>
        </Layout>
    );
};

export default Settings;

