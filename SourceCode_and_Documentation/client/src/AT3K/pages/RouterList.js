import React from "react";
import {
    Route,
    Switch,
    useLocation
} from "react-router-dom";

// Pages:
import Home from './Home';
import JobDashboard from './JobDashboard';
import Statistics from './Statistics';
import Settings from './Settings';
import JobSearch from './JobSearch';
import FAQ from './FAQ';
import Error404 from './404';
import JobDetails from './JobDetails';
import CompanyProfile from './CompanyProfile';
import Restricted from "./Restricted";
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import Cookie from 'js-cookie';

/**
  * Routes are created here!
  */
let routes = [
    {
        path: "/home/:id/:token", // FIXME: Extremely hacky way of getting google auth data
        page: Home
    },
    {
        path: "/home",
        page: Home
    },
    {
        path: "/",
        page: Home
    },
    {
        path: "/dashboard",
        page: JobDashboard,
        requiresAuth: true
    },
    {
        path: "/statistics",
        page: Statistics,
        requiresAuth: true
    },
    {
        path: "/settings",
        page: Settings,
        requiresAuth: true
    },
    {
        path: "/settings/profile",
        page: Settings,
        props: {
            settingsCategory: "profile"
        },
        requiresAuth: true
    },
    {
        path: "/settings/theme",
        page: Settings,
        props: {
            settingsCategory: "theme"
        },
        requiresAuth: true
    },
    {
        path: "/settings/notifications",
        page: Settings,
        props: {
            settingsCategory: "notifications"
        },
        requiresAuth: true
    },
    {
        path: "/settings/preferences",
        page: Settings,
        props: {
            settingsCategory: "preferences"
        },
        requiresAuth: true
    },
    {
        path: "/search",
        page: JobSearch,
        requiresAuth: true
    },
    {
        path: "/search/details",
        page: JobDetails,
        requiresAuth: true
    },
    {
        path: "/search/company",
        page: CompanyProfile,
        requiresAuth: true
    },
    {
        path: "/user/edit/:id",   // TODO: FIX ROUTE
        page: ProfileEdit,
        requiresAuth: true
    },
    {
        path: "/user/:id",
        page: Profile,
        requiresAuth: true
    },
    {
        path: "/faq",
        page: FAQ
    }
];

const userID = Cookie.get("user_id");
routes = routes.map((route) => {
    return (route.requiresAuth) ? ({
        ...route,
        page: (userID && userID !== "") ? route.page : Restricted
    }) : route;
});

const RouterList = ({ replaceTheme, currTheme }) => {
    const location = useLocation();
    return (
        <Switch>
            {routes.map((eachRoute) => (
                <Route 
                    exact 
                    path={eachRoute.path} 
                    component={() => (
                        <eachRoute.page 
                            {...eachRoute.props} 
                            replaceTheme={replaceTheme} 
                            currTheme={currTheme}
                        />
                    )} 
                />    
            ))}
            <Route component={() => <Error404 unknownPath={location.pathname} />} />
        </Switch>
    );
}
export default RouterList;
