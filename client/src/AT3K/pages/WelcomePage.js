import React from "react";
import { Container, Grid } from "@material-ui/core";
import styles from "./Home.module.scss";
import { Video } from '../components/video';

const WelcomePage = (props) => {
    return (
        <>
            <img
                className={styles.headerImage}
                src="https://www.ashdownpeople.com.au/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb3RKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ada3c8dc8b85e0c85ec5de54bf615377d7618fc7/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9MY21WemFYcGxTU0lPTWpBd01IZzFNREErQmpvR1JWUT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--dd63425399ff8805b68fabd53739560ae8aaa28f/e56a551f"
                alt="banner"
            />
            <Container>
                <br />
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Container>
                            <h2 className={styles.welcome}>
                                Welcome to{" "}
                                <strong style={{ color: "blueviolet" }}>employ</strong>
                                .me!
                            </h2>
                            <p className={styles.bodyText}>
                                <strong>employ.me</strong> is your own personalised app
                                that you can use to search and apply for jobs! The app
                                also has many features that can be customised to your
                                preferences without taking away the ease and simplicity
                                of the design.
                                <br></br>
                                <br></br>
                                Get a head-start and begin searching for your new career{" "}
                                <strong>employ.me</strong>! Register or log in if you
                                already have an account.
                            </p>
                        </Container>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Video videoId={"VoWjZLe-DFs"} />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

WelcomePage.propTypes = {};

export default WelcomePage;
