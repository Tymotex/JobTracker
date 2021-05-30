import Cookie from 'js-cookie';
import React from 'react';
import FadeIn from 'react-fade-in';
import { withRouter } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
// import Newsfeed from './Newsfeed';
import WelcomePage from './WelcomePage';

const Home = withRouter(({ unknownPath, history }) => {
    const queryStrParams = new URLSearchParams(window.location.search);
    if (queryStrParams && queryStrParams.get('user_id') && queryStrParams.get('token')) {
        Cookie.set('user_id', queryStrParams.get('user_id'));
        Cookie.set('token', queryStrParams.get('token'));
        window.location.replace('/');
    }
    const isLoggedIn = Cookie.get('user_id');

    return (
        <Layout htmlTitle="Home">
            <FadeIn>{isLoggedIn ? <Newsfeed /> : <WelcomePage />}</FadeIn>
        </Layout>
    );
});

export default Home;
