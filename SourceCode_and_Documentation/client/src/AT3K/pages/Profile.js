import {
    Box,
    Button,
    Container,
    Divider,
    Typography
} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import Cookie from 'js-cookie';
import React, { useEffect, useState } from 'react';
import FadeIn from 'react-fade-in';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import {
    Expandable
} from '../components/expandable';
import { ContentLoader } from '../components/loaders';
import { Notification } from '../components/notification';
import { CommentsList } from "../components/profile";
import RichTextEditor from '../components/richtext/RichTextEditor';
import ResumeRenderer from "../components/settings/ResumeRenderer";
import api from '../constants/api';
import pageStyles from './Page.module.scss';
 
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
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

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
                                                    {profile.education ? (
                                                        <div>{profile.education}</div>
                                                    ) : (
                                                        <div>Empty</div>
                                                    )}
                                                </AttributeContent>
                                            </Box>
                                        </Box>
                                        <Box p={3}>
                                            <AttributeTitle>Experience</AttributeTitle>
                                            <Box p={3}>
                                                <AttributeContent>
                                                    {
                                                        profile.experience === ''
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
                                            <Expandable text={`${profile.username}'s Resume`}>
                                                <Container>
                                                        <ResumeRenderer
                                                            file={`${api.BASE_URL}/api/user/resume?user_id=${profileUserID}&dummy=${parseInt(Math.random() * 1000000)}`}   // Note: the dummy arg is used to work around caching https://stackoverflow.com/questions/728616/disable-cache-for-some-images
                                                            showUploadButton={false}
                                                            showPages={false}
                                                        />
                                                </Container>
                                            </Expandable>
                                        <CommentsList />
                                    </Box>
                                    <hr />
                                    <div>
                                        <h1>Leave a Comment For {profile.username}</h1>
                                        <div>
                                            <p>
                                                Give some constructive criticism about this person's resume, career goals, skill development, job profile, etc.
                                            </p>
                                            <p>
                                                If your comment is seen as helpful by the {profile.username} and other members of the community, you will acquire
                                                reputation points and gain access to certain privileges. If your comment is unhelpful, abusive or negative, 
                                                you will lose reputation points and eventually your account will be suspended.
                                            </p>
                                            <p>
                                                Currently supported commands: 
                                                <ul>
                                                    <li>Ctrl+b for bold</li>
                                                    <li>Ctrl+` for code block syntax</li>
                                                    <li>Ctrl+g for green colouring</li>
                                                    <li>Ctrl+u for hyperlinking</li>
                                                </ul>
                                            </p>
                                        </div>
                                        <RichTextEditor />
                                    </div>
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

