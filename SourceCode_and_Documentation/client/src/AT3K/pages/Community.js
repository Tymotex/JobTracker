import React from 'react';
import Layout from '../../components/Layout/Layout';
import { ContentLoader } from '../components/loaders';
import pageStyles from './Page.module.scss';

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

