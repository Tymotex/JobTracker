
// Material UI Icons: https://material-ui.com/components/material-icons/ 
import {
  Home as HomeIcon,
  Work as WorkIcon,
  Search as SearchIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";

/**
 * Side nav items
 */
const sideNavItems = [
    { id: 0, label: "Home", link: "/app", icon: <HomeIcon /> },
    { id: 1, label: "Job Dashboard", link: "/app/dashboard", icon: <WorkIcon /> },
    { id: 2, label: "Search For Jobs", link: "/app/dashboard", icon: <SearchIcon /> },
    { id: 5, type: "divider" },
    { id: 6, type: "title", label: "Resources" },
    { id: 9, label: "FAQ", link: "", icon: <FAQIcon /> },
]

/**
 * Top nav items
 */
const topNavItems = [

];

/**
 * Footer items
 */
const footerItems = [

];


export default {
    sideNavItems, topNavItems, footerItems
};
