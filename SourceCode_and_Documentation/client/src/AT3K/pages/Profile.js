import {
    AppBar,
    Box,
    Button,
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Paper,
    Tab,
    Tabs,
    Typography
} from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import PhoneIphoneOutlinedIcon from '@material-ui/icons/PhoneIphoneOutlined';
import PlaylistAddCheckOutlinedIcon from '@material-ui/icons/PlaylistAddCheckOutlined';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import styled from 'styled-components';
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
import RichTextDisplay from '../components/richtext/RichTextDisplay';
import ResumeRenderer from "../components/settings/ResumeRenderer";
import api from '../constants/api';
import pageStyles from './Page.module.scss';
import { Value } from 'slate';
import styles from './Profile.module.scss';
import { StayCurrentLandscapeSharp } from '@material-ui/icons';

const theme = createMuiTheme({
    typography: {
        // h4: {
        //     fontFamily: 'Arialight',
        //     fontWeight: 'lighter',
        // },
    },
});

const AttributeTitle = ({ children }) => {
    return (
        <Typography
            align="left"
            variant="h5"
            color='textPrimary'
            style={{ marginTop: '15px' }}
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

const sampleInitialValue = Value.fromJSON({
    document: {
      nodes: [
        {
          object: "block",
          type: "paragraph",
          nodes: [
            {
              object: "text",
              leaves: [{ text: "Start typing here!" }]
            }
          ]
        }
      ]
    }
});
  

const Profile = () => {
    const { id: profileUserID } = useParams();
    const [profile, setProfile] = useState({ resume_fields: {} });
    const [comments, setComments] = useState(null);
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // ==== GET /api/user/profile =====
    const getUserProfile = () => {
        const userID = Cookie.get("user_id");
        if (userID) {
            if (!profileUserID) Notification.spawnInvalid("No user ID specified");
            else {
                axios.get(`${api.BASE_URL}/api/user/profile?user_id=${profileUserID}`)
                    .then(res => {
                        setProfile(res.data);
                        console.log(res.data)
                    })
                    .catch(err => {
                        Notification.spawnError(err);
                    });
            }
        } else {
            Notification.spawnRegisterError();
        }
    };

    // ===== GET /api/comment/ =====
    const fetchComments = (receiverUserID) => {
        const userID = Cookie.get("user_id");
        if (userID) {
            axios.get(`${api.BASE_URL}/api/comment?user_id=${receiverUserID}`)
                .then((res) => {
                    setComments(res.data);
                })
                .catch(err => Notification.spawnError(err));
        }
    }

    // ==== POST /api/comment/ =====
    const postComment = (comment) => {
        const receiverUserID = profileUserID;
        const userID = Cookie.get("user_id");
        if (userID) {
            const postData = {
                method: 'post',
                url: `${api.BASE_URL}/api/comment/`,
                data: {
                    sender_user_id: userID,
                    receiver_user_id: receiverUserID,
                    comment: comment
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            axios(postData)
                .then((res) => {
                    Notification.spawnSuccess("Your comment has been posted!");
                    // FIXME: Inefficient solution: refetch comments. Ideally we should have web sockets for this
                    fetchComments(profileUserID);
                })
                .catch(err => Notification.spawnError(err));
        }
    };

    useEffect(() => {
        const receiverUserID = profileUserID
        getUserProfile();
        fetchComments(receiverUserID);
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    const isLoading = false && (profile === null);

    const { 
        name, 
        mobile_number, 
        skills, 
        college_name: university, 
        degree: degrees, 
        designation, 
        experience, 
        company_names: companies
    } = profile.resume_fields;
    return (
        <Layout>
            <div className={pageStyles.container}>
                {isLoading ? (
                    <ContentLoader />
                ) : (
                        <FadeIn>
                            {profile && (
                                <ThemeProvider theme={theme}>
                                    
                                    <Box
                                        display='flex'
                                        alignItems='center'
                                        justifyContent='center'
                                        flexDirection='column'
                                        className={styles.body}
                                    >
                                        <div className={styles.profileCover}>
                                            <img 
                                                src="https://th.bing.com/th/id/R9a227e4ae9d3902d499c7e911b4368ac?rik=Ky0wbxax%2bTGsxg&pid=ImgRaw" 
                                                alt="profile img"
                                                className={styles.profileBgImg}
                                            />
                                            
                                            <img 
                                                alt="profile_img" 
                                                src={profile.image_url} 
                                                className={styles.profileAvatar}
                                            />
                                            <div className={styles.username}>
                                                <Typography
                                                    align="left"
                                                    variant="h4"
                                                    color='textPrimary'
                                                >
                                                    {profile.username}
                                                </Typography>
                                                <Typography 
                                                    width="100%" 
                                                    align="center" 
                                                    variant="caption" 
                                                    color="textSecondary"
                                                    classname={styles.userId}
                                                >
                                                    User ID: {profileUserID}
                                                </Typography>
                                            </div>
                                            <Button
                                                component={Link}
                                                to={`/user/edit/${profileUserID}`}
                                                variant="contained"
                                                className={styles.editProfileBtn}
                                            >
                                                Edit Your Profile
                                            </Button>
                                        </div>
                                        <Grid container spacing={3} style={{ paddingTop: '60px' }}>
                                            <Grid item xs={4} spacing={2}>
                                                <div className={styles.about}>
                                                    <List component="nav" subheader={
                                                        <ListSubheader>About</ListSubheader>
                                                    }>
                                                        <Divider />
                                                        <ListItem>
                                                            <ListItemIcon>
                                                                <MailOutlineIcon />
                                                            </ListItemIcon>
                                                            <ListItemText 
                                                                primary="Email" 
                                                                secondary={profile.email}
                                                            />
                                                        </ListItem>
                                                        <Divider />
                                                        <ListItem>
                                                            <ListItemIcon>
                                                                <SchoolOutlinedIcon />
                                                            </ListItemIcon>
                                                            <ListItemText 
                                                                primary="Education" 
                                                                secondary={profile.education 
                                                                    ? profile.education
                                                                    : '[Empty]'
                                                                }
                                                            />
                                                        </ListItem>
                                                        <Divider />
                                                        <ListItem>
                                                            <ListItemIcon>
                                                                <WorkOutlineOutlinedIcon />
                                                            </ListItemIcon>
                                                            <ListItemText 
                                                                primary="Experience" 
                                                                secondary={profile.experience === ''
                                                                ? '[Empty]'
                                                                : profile.experience}
                                                            />
                                                        </ListItem>
                                                        <Divider />
                                                        <ListItem>
                                                            <ListItemIcon>
                                                                <AssignmentIndOutlinedIcon />
                                                            </ListItemIcon>
                                                            <ListItemText 
                                                                primary="Name" 
                                                                secondary={profile.name === ''
                                                                ? '[Empty]'
                                                                : profile.name}
                                                            />
                                                        </ListItem>
                                                        <Divider />
                                                        <ListItem>
                                                            <ListItemIcon>
                                                                <PhoneIphoneOutlinedIcon />
                                                            </ListItemIcon>
                                                            <ListItemText 
                                                                primary="Phone" 
                                                                secondary={profile.phone === ''
                                                                ? '[Empty]'
                                                                : profile.phone}
                                                            />
                                                        </ListItem>
                                                        <Divider />
                                                        <ListItem>
                                                            <ListItemIcon>
                                                                <PlaylistAddCheckOutlinedIcon />
                                                            </ListItemIcon>
                                                            <ListItemText 
                                                                primary="Skills" 
                                                                // secondary={profile.skills.split(' ').length === 0
                                                                // ? '[Empty]'
                                                                // : profile.skills}
                                                                secondary="[TODO: array vs. string]"
                                                            />
                                                        </ListItem>
                                                    </List>
                                                </div>
                                            </Grid>
                                            <Grid item xs={8} spacing={2}>
                                                <AppBar position="static" color="default" elevation={0}>
                                                    <Tabs
                                                        value={tabValue}
                                                        onChange={handleChange}
                                                        indicatorColor="primary"
                                                        textColor="primary"
                                                        variant="fullWidth"
                                                        aria-label="full width tabs"
                                                        className={styles.appbar}
                                                    >
                                                        <Tab label="Resume" />
                                                        <Tab label="Comments"/>
                                                    </Tabs>
                                                </AppBar>
                                                <div className={styles.resume}>
                                                    {
                                                        tabValue === 0 &&
                                                        (
                                                            <>
                                                                <AttributeTitle>View PDF</AttributeTitle>
                                                                <Expandable text={`${profile.username}'s Resume`}>
                                                                    <Container>
                                                                        <ResumeRenderer
                                                                            file={`${api.BASE_URL}/api/user/resume?user_id=${profileUserID}&dummy=${parseInt(Math.random() * 1000000)}`}   // Note: the dummy arg is used to work around caching https://stackoverflow.com/questions/728616/disable-cache-for-some-images
                                                                            showUploadButton={false}
                                                                            showPages={false}
                                                                        />
                                                                    </Container>
                                                                </Expandable>
                                                                {profile.resume_fields && (
                                                                    <>
                                                                        <AttributeTitle>Name</AttributeTitle>
                                                                        <div>
                                                                            {name}
                                                                        </div>
                                                                        <AttributeTitle>Mobile Number</AttributeTitle>
                                                                        <div>
                                                                            {mobile_number}
                                                                        </div>
                                                                        <AttributeTitle>Skill</AttributeTitle>
                                                                        <ul>
                                                                            {skills && skills.map(skill => (
                                                                                <li>{skill}</li>
                                                                            ))}
                                                                        </ul>
                                                                        <AttributeTitle>Uni</AttributeTitle>
                                                                        <div>
                                                                            {university}
                                                                        </div>
                                                                        <AttributeTitle>Degree</AttributeTitle>
                                                                        <ul>
                                                                            {degrees && degrees.map(degree => (
                                                                                <li>{degree}</li>
                                                                            ))}
                                                                        </ul>
                                                                        <AttributeTitle>Designation</AttributeTitle>
                                                                        <ul>
                                                                            {designation && designation.map(title => (
                                                                                <li>{title}</li>
                                                                            ))}
                                                                        </ul>
                                                                        <AttributeTitle>Experience</AttributeTitle>
                                                                        <ul>
                                                                            {experience && experience.map(exp => (
                                                                                <li>{exp}</li>
                                                                            ))}
                                                                        </ul>
                                                                        <AttributeTitle>Company Names</AttributeTitle>
                                                                        <ul>
                                                                            {companies && companies.map(comp => (
                                                                                <li>{comp}</li>
                                                                            ))}
                                                                        </ul>
                                                                    </>
                                                                )}
                                                            </>
                                                        )
                                                    }
                                                    {
                                                        tabValue === 1 &&
                                                        (
                                                            <>
                                                                <CommentsList
                                                                    comments={comments}
                                                                />
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
                                                                    <RichTextDisplay
                                                                        readOnly={false}
                                                                        value={sampleInitialValue}
                                                                        buttonText="Post comment"
                                                                        onSubmit={postComment}
                                                                    />
                                                                </div>
                                                            </>
                                                        )
                                                    }
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </ThemeProvider>
                            )}
                        </FadeIn>
                )}
            </div>
        </Layout>
    );
};

export default Profile;

