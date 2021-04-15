
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
import pageStyles from './Page.module.scss';


const ProfileEdit = () => {
    let { id } = useParams();
    const [profile, setProfile] = useState(null);

    const getUserProfile = () => {
        const userID = Cookie.get("user_id");
        if (userID) {
            axios.get(`${api.BASE_URL}/api/user/profile?user_id=${userID}`) 
                .then(res => {
                    setProfile(res.data);
                })
                .catch(err => {
                    Notification.spawnError(err);
                })
        }
    }

    // TODO: Call this function to set the new fields. Should be ready to go
    const setUserProfile = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userID = Cookie.get("user_id");
        if (userID) {
            const postData = {
                method: "post",
                url: `${api.BASE_URL}/api/user/profile`,
                data: formData
            }
            axios.get(`${api.BASE_URL}/api/user/profile?user_id=${userID}`) 
                .then(res => {
                    setProfile(res.data);
                })
                .catch(err => {
                    Notification.spawnError(err);
                })
        }
    }

    useEffect(() => {
        getUserProfile();
    }, [])

    return (
        <Layout>
            <div className={pageStyles.container}>
                Profile {id}
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
                    </div>
                )}
                <h3>Edit your details here</h3>
                <form>          
                    Form here for submitting: username, email, experience, phone, skills. Use Material ui forms: https://material-ui.com/components/text-fields/
                    
                </form>
            </div>
        </Layout>
    );
};

export default ProfileEdit;

