import { Container } from "@material-ui/core";
import Cookie from "js-cookie";
import React from "react";
import FadeIn from "react-fade-in";
import { useParams, withRouter } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import styles from "./Home.module.scss";

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
                    <h1 className={styles.title}>Home</h1>
                    <h2 className={styles.welcome}>
                        Welcome to{" "}
                        <strong style={{ color: "blueviolet" }}>employ</strong>
                        .me!
                    </h2>
                    <div className={styles.container}>
                        <img
                            className={styles.image}
                            src="https://www.mystudenthouse.com.au/wp-content/uploads/2015/09/job-search.jpg"
                            alt="demo"
                        />
                        <p className={styles.bodyText}>
                            <strong>employ.me</strong> is your own personalised
                            app that you can use to search and apply for jobs!
                            The app also has many features that can be
                            customised to your preferences without taking away
                            the ease and simplicity of the design.
                            <br></br>
                            <br></br>
                            {/* <strong>employ.me</strong> offers a large range of resources to help fill in any gaps that you may have when you are applying for a job, helping to increase your chances of receiving an offer. */}
                            {/* <br></br> */}
                            {/* <br></br> */}
                            {/* The app is a great way to organise the jobs that you are interested in and are tracking, with extra features such as Statistics to inform you of the current trends in the market that aligns to your preferences. */}
                            {/* <br></br> */}
                            {/* <br></br> */}
                            Get a head-start and begin searching for your new
                            career <strong>employ.me</strong>! Register or log
                            in if you already have an account.
                            <br></br>
                            <br></br>
                            Have more questions? Head to our FAQ tab for answers
                            to our most popular questions! Or contact us if you
                            need further help. Happy tracking!
                        </p>
                    </div>
                </Container>
            </FadeIn>
        </Layout>
    );
});

export default Home;
