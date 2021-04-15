import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Paper,
    Typography
} from '@material-ui/core';
import Layout from '../../components/Layout/Layout';
import {
    useParams
} from 'react-router-dom';
import axios from 'axios';
import Cookie from 'js-cookie';
import api from '../constants/api';
import { Notification } from '../components/notification';
import {
    Link
} from 'react-router-dom';
import pageStyles from './Page.module.scss';
import { ContentLoader } from '../components/loaders';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ResumeRenderer from "../components/settings/ResumeRenderer";
import { CommentsList } from "../components/profile";
import FadeIn from 'react-fade-in';

const theme = createMuiTheme({
    typography: {
      h4: {
        fontFamily: 'Arialight',
        fontWeight: 'lighter',
      },
    },
  });

const AttributeTitle = ({ children }) => {
    return (
        <Typography 
            align="center" 
            variant="h4" 
            component="h3" 
            color='textPrimary'
        >
            {children}
        </Typography>
    )
}

const AttributeContent = ({ children }) => {
    return (
        <Typography 
            align="center" 
            variant="subtitle1" 
            component="h3">
            {children}
        </Typography>
    )
}

const Profile = () => {
    const { id: profileUserID } = useParams();
    const [profile, setProfile] = useState(null);

    const getUserProfile = () => {
        const userID = Cookie.get("user_id");
        console.log(profileUserID);
        if (userID) {
            if (!profileUserID) Notification.spawnInvalid("No user ID specified");
            else {
                axios.get(`${api.BASE_URL}/api/user/profile?user_id=${profileUserID}`) 
                    .then(res => {
                        setProfile(res.data);
                    })
                    .catch(err => {
                        Notification.spawnError(err);
                    });
            }
        } else {
            Notification.spawnRegisterError();
        }
    }

    useEffect(() => {
        getUserProfile();
    }, [])

    console.log(profile);

    const isLoading = false && (profile === null);
    return (
        <Layout>
            <FadeIn>
                <div className={pageStyles.container}>
                    {isLoading ? (
                        <ContentLoader />
                    ) : (
                        <>
                            {profile && (
                                <ThemeProvider theme={theme}>
                                    <Box 
                                        display='flex' 
                                        alignItems='center'
                                        flexDirection='column'
                                        p={3}
                                    >
                                        <Box p={3} alignItem="center">
                                            <Box textAlign="center">
                                                <img width="200px" alt="profile_img" src={profile.image_url} />
                                            </Box>
                                            <Box p={2}>
                                                <Typography 
                                                    align="center" 
                                                    variant="h3" 
                                                    component="h3" 
                                                    color='textPrimary'
                                                >
                                                    {profile.username}
                                                </Typography>
                                                <Typography width="100%" align="center" variant="caption" color="textSecondary">
                                                    User ID: {profileUserID}
                                                </Typography>

                                            </Box>
                                            <Button 
                                                component={Link} 
                                                to={`/user/edit/${profileUserID}`} 
                                                variant="outlined"
                                                style={{ width: '100%' }}
                                            >
                                                Edit Your Profile
                                            </Button>
                                        </Box>
                                        <Divider width="400px" />
                                        <Box p={3}>
                                            <AttributeTitle>Email</AttributeTitle>
                                            <Box p={3}>
                                                <AttributeContent>{profile.email}</AttributeContent>
                                            </Box>
                                        </Box>
                                        <Box p={3}>
                                            <AttributeTitle>Education</AttributeTitle>
                                            <Box p={3}>
                                                <AttributeContent>
                                                    {profile.education ?? '[Empty]'}
                                                </AttributeContent>
                                            </Box>
                                        </Box>
                                        <Box p={3}>
                                            <AttributeTitle>Experience</AttributeTitle>
                                            <Box p={3}>
                                                <AttributeContent>
                                                {
                                                    profile.experience  === ''
                                                        ? '[Empty]'
                                                        : profile.experience
                                                }
                                                </AttributeContent>
                                            </Box>
                                        </Box>
                                        <Box p={3}>
                                            <AttributeTitle>Name</AttributeTitle>
                                            <Box p={3}>
                                                <AttributeContent>
                                                    {profile.name ?? '[Empty]'}
                                                </AttributeContent>
                                            </Box>
                                        </Box>
                                        <Box p={3}>
                                            <AttributeTitle> Phone</AttributeTitle>
                                            <Box p={3}>
                                                <AttributeContent>
                                                    {
                                                        profile.phone === ''
                                                            ? '[Empty]'
                                                            : profile.phone
                                                    }
                                                </AttributeContent>
                                            </Box>
                                        </Box>
                                        <Box p={3}>
                                            <AttributeTitle>Skills</AttributeTitle>
                                            <Box p={3}>
                                                <AttributeContent>
                                                {
                                                    profile.skills === ""
                                                        ? '[Empty]'
                                                        : (
                                                            <div>
                                                                {profile.skills}
                                                            </div>
                                                        )
                                                }
                                                </AttributeContent>
                                            </Box>
                                        </Box>
                                        <Paper>
                                            <Container>
                                                <h2 style={{textAlign: "center"}}>{profile.username}'s Resume</h2>
                                                <hr />

                                                <ResumeRenderer 
                                                    file={`${api.BASE_URL}/api/user/resume?user_id=${profileUserID}&dummy=${parseInt(Math.random() * 1000000)}`}   // Note: the dummy arg is used to work around caching https://stackoverflow.com/questions/728616/disable-cache-for-some-images
                                                    showUploadButton={false} 
                                                    showPages={false} 
                                                />
                                            </Container>
                                        </Paper>
                                        <CommentsList />
                                    </Box>
                                </ThemeProvider>
                            )}
                            
                        </>
                    )}
                </div>
            </FadeIn>
        </Layout>
    );
};

export default Profile;

