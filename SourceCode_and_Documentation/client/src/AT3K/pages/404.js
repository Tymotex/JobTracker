import React from 'react';
import {
    Link
} from 'react-router-dom';

import Layout from '../../components/Layout/Layout';

const Error404 = ({ unknownPath }) => {
    return (
        <Layout>
            <h2>404, whoops.</h2>
            {unknownPath && (
                <>
                    <div>
                        Whoops! You have hit the route <strong>{unknownPath}</strong>, which doesn't seem to exist. 
                    </div>
                    <div>
                        Take me <Link to="/">back home</Link>!
                    </div>
                </>
            )}
        </Layout>
    );
};

export default Error404;

