import React from 'react';
import Layout from '../../components/Layout/Layout';
import { ContentLoader } from '../components/loaders';
import pageStyles from './Page.module.scss';

const Community = () => {
   
    // const getUserProfile = () => {
    //     const userID = Cookie.get("user_id");
    //     console.log(profileUserID);
    //     if (userID) {
    //         if (!profileUserID) Notification.spawnInvalid("No user ID specified");
    //         else {
    //             axios.get(`${api.BASE_URL}/api/user/profile?user_id=${profileUserID}`) 
    //                 .then(res => {
    //                     setProfile(res.data);
    //                 })
    //                 .catch(err => {
    //                     Notification.spawnError(err);
    //                 });
    //         }
    //     } else {
    //         Notification.spawnRegisterError();
    //     }
    // }

    // useEffect(() => {
    //     getUserProfile();
    // }, [])

    const isLoading = false;
    return (
        <Layout>
            <div className={pageStyles.container}>
                {isLoading ? (
                    <ContentLoader />
                ) : (
                    <>
                        Community
                    </>
                )}
            </div>
        </Layout>
    );
};

export default Community;

