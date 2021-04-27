import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProfileCard.module.scss';
import './style.scss';

const ProfileCard = ({ user }) => {
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
