
// Material UI Icons: https://material-ui.com/components/material-icons/ 
import React, { useState, useEffect } from 'react';
import {
  Home as HomeIcon,
  Work as WorkIcon,
  Search as SearchIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  HelpOutline as FAQIcon,
  ExitToApp as SignOutIcon
} from "@material-ui/icons";
import {
    Avatar,
    Menu,
    MenuItem
} from '@material-ui/core';
import {
    Link, withRouter
} from 'react-router-dom';
import Button from '../components/buttons/Button';
import Cookie from 'js-cookie';
import FaceIcon from '@material-ui/icons/Face';
import axios from 'axios';
import api from '../constants/api';
import { Notification } from '../components/notification';
import { LoadingSpinner } from '../components/loaders';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

// Top nav components:
import { LoginModal, RegisterModal } from '../components/modals';


const userID = Cookie.get("user_id");

/**
 * Side nav items
 */
const sideNavItems = [
    { id: 0, label: "Home", link: "/", icon: <HomeIcon /> },
    { id: 10, label: "Job Dashboard", link: "/dashboard", icon: <WorkIcon /> },
    { id: 20, label: "Search For Jobs", link: "/search", icon: <SearchIcon /> },
    { id: 30, label: "Statistics", link: "/statistics", icon: <BarChartIcon /> },
    { id: 41, type: "divider" },
    { 
        id: 32, 
        label: "Profile", 
        icon: <FaceIcon />,
        children: [
            {
                label: "View profile",
                link: `/user/${userID}`
            },
            {
                label: "Edit profile",
                link: `/user/edit/${userID}`
            }
        ]
    },
    { id: 35, type: "divider" },
    {
        id: 36,
        label: "Community",
        link: "/community",
        icon: <EmojiPeopleIcon />
    },
    { id: 40, type: "divider" },
    { 
        id: 50, 
        label: "Settings", 
        link: "/settings",
        icon: <SettingsIcon />, 
        children: [
            {
                label: "Profile", 
                link: "/settings/profile",
            },
            {
                label: "Theme", 
                link: "/settings/theme",
            },
            {
                label: "Notifications", 
                link: "/settings/notifications",
            },
            {
                label: "Preferences", 
                link: "/settings/preferences",
            },
        ]
    },
    { id: 60, type: "divider" },
    { id: 70, type: "title", label: "Resources" },
    { id: 80, label: "FAQ", link: "/faq", icon: <FAQIcon /> }
]

/**
 * Top nav items
 */

const AvatarDropdown = withRouter(({ history }) => {
    const [anchorEl, setAnchorEl] = useState(null);
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
                });
        } else {
            Notification.spawnRegisterError();
        }
    }

    useEffect(() => {
        getUserProfile();
    }, [])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const signOut = () => {
        Cookie.remove("user_id");
        Cookie.remove("token");
        history.push("/");
    };

    const userID = Cookie.get("user_id");

    return (
        <div>
            {profile ? (
                <>
                    <Avatar alt="Avatar" src={profile.image_url} onClick={handleClick} />
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem>Welcome <strong style={{marginLeft: "5px"}}>{profile.username}</strong></MenuItem>
                        <hr />
                        <MenuItem >
                            <Link to={`/user/${userID}`}>
                                My profile
                            </Link>
                        </MenuItem>
                        <MenuItem >
                            <Link to={`/user/edit/${userID}`}>
                                Edit profile
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={signOut}>Logout <SignOutIcon style={{marginLeft: "5px"}} /></MenuItem>
                    </Menu>
                </>
            ) : (
                <>
                    <LoadingSpinner type="Puff" />
                </>
            )}
        </div>
    );
});

const TopNavItems = () => {
    const userID = Cookie.get("user_id");
    return (
        <>
            {(userID && userID !== "") ? (
                <div style={{display: "flex"}}>
                    <div>
                        <AvatarDropdown />
                    </div>
                </div>
            ) : (
                <>
                    <div>
                    <LoginModal />
                    </div>
                    <div style={{marginLeft: "20px"}}>
                    <RegisterModal />
                    </div>
                </>
            )}
        </>
    );
};

const menuItems = {
    sideNavItems, 
    TopNavItems 
};

export default menuItems;
