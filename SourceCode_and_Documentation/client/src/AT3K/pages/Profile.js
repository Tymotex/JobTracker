import React, { useState, useEffect } from 'react';
import {
    Grid
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


    const isLoading = false && (profile === null);
    return (
        <Layout>
            <div className={pageStyles.container}>
                {isLoading ? (
                    <ContentLoader />
                ) : (
                    <>
                        User ID: {profileUserID}
                        {profile && (
                            <div>
                                Username: {profile.username}
                                <br />
                                Email: {profile.email}
                                <br />
                                Education: {profile.education}
                                <br />
                                Experience: {profile.experience}
                                <br />
                                Name: {profile.name}
                                <br />
                                Phone: {profile.phone}
                                <br />
                                Skills: {profile.skills}
                                <br />
                                Image: 
                                <img src={profile.image_url} />
                                <br />
                                Find some ideas: https://www.google.com/search?q=user+profile+page+ideas&sxsrf=ALeKk0153cUe1fHXBrfroMjKSWMyiMqZPQ:1618297123586&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjsucTJ0vrvAhU_zjgGHW8zDYIQ_AUoAXoECAEQAw
                            </div>
                        )}
                        <Link to={`/user/edit/${profileUserID}`}>Edit Your Profile</Link>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default Profile;

