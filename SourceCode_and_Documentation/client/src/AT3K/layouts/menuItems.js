
// Material UI Icons: https://material-ui.com/components/material-icons/ 
import {
  Home as HomeIcon,
  Work as WorkIcon,
  Search as SearchIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  HelpOutline as FAQIcon,
} from "@material-ui/icons";
import Button from '../components/buttons/Button';
import Cookie from 'js-cookie';

// Top nav components:
import { LoginModal, RegisterModal } from '../components/modals';

/**
 * Side nav items
 */
const sideNavItems = [
    { id: 0, label: "Home", link: "/", icon: <HomeIcon /> },
    { id: 1, label: "Job Dashboard", link: "/dashboard", icon: <WorkIcon /> },
    { id: 2, label: "Search For Jobs", link: "/search", icon: <SearchIcon /> },
    { id: 3, label: "Statistics", link: "/statistics", icon: <BarChartIcon /> },
    { id: 5, type: "divider" },
    { 
        id: 6, 
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
    { id: 7, type: "divider" },
    { id: 8, type: "title", label: "Resources" },
    { id: 9, label: "FAQ", link: "/faq", icon: <FAQIcon /> }
]

/**
 * Top nav items
 */

const Welcome = ({ username }) => {
    return (
        <div>
            Welcome <em>{username}</em>
        </div>
    );
};

const SignOutButton = () => {
    const signOut = () => {
        Cookie.remove("username");
        Cookie.remove("user_id");
        Cookie.remove("token");
        window.location.reload();
    };
    return (
        <div>
            <Button variant="contained" onClick={signOut}>Sign Out</Button>
        </div>
    );
};

const TopNavItems = () => {
    const username = Cookie.get("username");
    return (
        <>
            {(username && username !== "") ? (
                <div>
                    <Welcome username={username} />
                    <SignOutButton />
                </div>
            ) : (
                <>
                    <LoginModal />
                    <RegisterModal />
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
