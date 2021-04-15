import React from 'react';
import Layout from '../../components/Layout/Layout';
import styles from './Home.module.scss';
import { Notification } from '../components/notification';
import {
    Container
} from '@material-ui/core';
import Button from '../components/buttons/Button';
import {
    useParams,
    withRouter
} from 'react-router-dom';
import Cookie from 'js-cookie';

import Unsplash from "react-unsplash-wrapper";

import { ParallaxBanner, Parallax, Image } from 'react-scroll-parallax';
import Cookies from 'js-cookie';
import FadeIn from 'react-fade-in';

const ParallaxWallpaper = ({ image }) => {
    return (
        <ParallaxBanner
            className="your-class"
            layers={[
                {
                    image: image,
                    amount: -0.5,
                },
                {
                    image: image,
                    amount: 0.5,
                },
            ]}
            style={{
                height: '300px',
            }}
        >
            <h1>Banner Children</h1>
        </ParallaxBanner>
    )
}

const Home = withRouter(({ unknownPath, history }) => {

    const { id: userID, token } = useParams();
    if (userID) {
        Cookie.set("user_id", userID);
        Cookie.set("token", token);
        history.push("/");
        window.location.reload();
    }
    

    return (
        <Layout>
            <FadeIn>
                <img 
                    className={styles.headerImage} 
                    src="https://www.ashdownpeople.com.au/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb3RKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ada3c8dc8b85e0c85ec5de54bf615377d7618fc7/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9MY21WemFYcGxTU0lPTWpBd01IZzFNREErQmpvR1JWUT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--dd63425399ff8805b68fabd53739560ae8aaa28f/e56a551f" 
                    alt="banner"
                />
                <Container>
                    {/* <ParallaxWallpaper image="https://images.unsplash.com/photo-1462206092226-f46025ffe607?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1506&q=80"/>
                    ^cool parallax effect
                    <div className={styles.parallax}></div>
                    ^cool parallax effect */}
                    <h1 className={styles.title}>Home</h1>
                    <h2 className={styles.welcome}>Welcome to <strong style={{color: "blueviolet"}}>employ</strong>.me</h2>
                    <div className={styles.container}>
                        <img 
                            className={styles.image} 
                            src="https://www.mystudenthouse.com.au/wp-content/uploads/2015/09/job-search.jpg"
                            alt="demo"
                        />
                        <p className={styles.bodyText}>
                            Job Tracker is your own personalised app that you can use to search and apply for jobs! The app also has many features that can be customised to your preferences without taking away the ease and simplicity of the design.
                            <br></br>
                            <br></br>
                            Job Tracker offers a large range of resources to help fill in any gaps that you may have when you are applying for a job, helping to increase your chances of receiving an offer.
                            <br></br>
                            <br></br>
                            The app is a great way to organise the jobs that you are interested in and are tracking, with extra features such as Statistics to inform you of the current trends in the market that aligns to your preferences.
                            <br></br>
                            <br></br>
                            Get a head-start and begin searching for your new career with Job Tracker! Register or log in if you already have an account.
                            <br></br>
                            <br></br>
                            Have more questions? Head to our FAQ tab for answers to our most popular questions! Or contact us if you need further help. Happy tracking!
                        </p>
                    </div>
                    {/* <div className={styles.parallax}></div> */}
                </Container>
            </FadeIn>
        </Layout>
    );
});

export default Home;
