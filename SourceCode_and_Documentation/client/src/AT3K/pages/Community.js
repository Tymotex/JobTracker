import React from 'react';
import Layout from '../../components/Layout/Layout';
import { ContentLoader } from '../components/loaders';
import pageStyles from './Page.module.scss';

/*

TODO: make a call to GET /api/users. No parameters necessary

Get back a list of objects containing: 
    { 
        username, 
        image, 
        user_id
    }

Click on user card to go to /user/<id here>

*/

const Community = () => {
    const isLoading = false;
    return (
        <Layout>
            <div className={pageStyles.container}>
                {isLoading ? (
                    <ContentLoader />
                ) : (
                    <>
                        Community
                    </>
                )}
            </div>
        </Layout>
    );
};

export default Community;

