
// Material UI Icons: https://material-ui.com/components/material-icons/ 
import {
  Home as HomeIcon,
  Work as WorkIcon,
  Search as SearchIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  HelpOutline as FAQIcon,
} from "@material-ui/icons";

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
    { id: 9, label: "FAQ", link: "/faq", icon: <FAQIcon /> },
]

/**
 * Top nav items
 */
// const topNavItems = [];

const TopNavItems = () => {
    return (
        <>
            <LoginModal />
            <RegisterModal />
        </>
    );
};

const menuItems = {
    sideNavItems, 
    TopNavItems 
};

export default menuItems;
