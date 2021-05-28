import Cookie from 'js-cookie';
import React from 'react';
import FadeIn from 'react-fade-in';
import { useParams, withRouter } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import Newsfeed from './Newsfeed';
import WelcomePage from './WelcomePage';

const Home = withRouter(({ unknownPath, history }) => {
    const { id: userID, token } = useParams();
    const isLoggedIn = userID;
    if (userID) {
        Cookie.set('user_id', userID);
        Cookie.set('token', token);
        history.push('/');
        window.location.reload();
    }

    return (
        <Layout htmlTitle="Home">
            <FadeIn>
                <WelcomePage />
            </FadeIn>
        </Layout>
    );
});

export default Home;
