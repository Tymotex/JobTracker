import React from 'react';
import Layout from '../../components/Layout/Layout';

const Home = ({ unknownPath }) => {
    return (
        <Layout>
            <h1>Home</h1>
            <h2>Welcome to <strong>Job Tracker</strong></h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla eleifend dapibus. Pellentesque convallis auctor eleifend. Cras elementum pharetra velit, ut tincidunt diam elementum vitae. Donec faucibus venenatis sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a felis posuere, congue urna at, egestas velit. Donec nec nisi tincidunt, aliquet nisi id, maximus nibh. Aliquam eget ante cursus, porttitor tortor et, tempor lacus.
            </p>
        </Layout>
    );
};

export default Home;
