
// Material UI Icons: https://material-ui.com/components/material-icons/ 
import React, { useState } from 'react';
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
    Link
} from 'react-router-dom';
import Button from '../components/buttons/Button';
import Cookie from 'js-cookie';
import FaceIcon from '@material-ui/icons/Face';

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

const AvatarDropdown = ({ username }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const signOut = () => {
        Cookie.remove("username");
        Cookie.remove("user_id");
        Cookie.remove("token");
        window.location.reload();
    };

    return (
        <div>
            <Avatar alt="Avatar" src="https://www.pngarts.com/files/11/Avatar-Transparent-Background-PNG.png" onClick={handleClick} />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>Welcome <strong style={{marginLeft: "5px"}}>{username}</strong></MenuItem>
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
        </div>
    );
};

const TopNavItems = () => {
    const username = Cookie.get("username");
    return (
        <>
            {(username && username !== "") ? (
                <div style={{display: "flex"}}>
                    <div>
                        <AvatarDropdown username={username} />
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
