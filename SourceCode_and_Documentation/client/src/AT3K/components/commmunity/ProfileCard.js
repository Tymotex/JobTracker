import React from 'react';
import {
    Paper,
    Avatar
} from '@material-ui/core';
import styles from './ProfileCard.module.scss';
import { Link } from 'react-router-dom';
import './style.scss';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const ProfileCard = ({ user }) => {
    // return (
    //     <Paper elevation={3} className={styles.card}>
    //         <Link
    //             to=
    //             className={styles.user_link}
    //         >
    //             <Avatar
    //                 src={}
    //                 alt="No image"
    //             />
    //             <section className={styles.detail}>
    //             <h4>{user.username}</h4>
    //             <p>Email: {user.email}</p>
    //             <p>{user.experience}</p>
    //             </section>
    //         </Link>
    //     </Paper>
    // );
    return (
        <Link to={`/user/${user._id}`}>
            <div className={styles.ourTeam}>
                <div className={styles.picture}>
                    <img 
                        className={styles.avatar} 
                        src={user.image_url} 
                    />
                </div>
                <div>
                    <h3>{user.username}</h3>
                    <h4 className={styles.title}>Web Developer</h4>
                </div>
                <ul className={styles.social}>
                    <li>
                        <FacebookIcon />
                    </li>
                    <li>
                        <LinkedInIcon />
                    </li>
                </ul>
            </div>
        </Link>
    )
};

export default ProfileCard;
