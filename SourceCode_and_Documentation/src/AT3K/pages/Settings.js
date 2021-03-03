import React from 'react';

import Layout from '../../components/Layout/Layout';
import { SettingsMenu } from '../components/settings';

const Settings = () => {
    return (
        <Layout>
            <h1>Settings</h1>
            <SettingsMenu />
        </Layout>
    );
};

export default Settings;

