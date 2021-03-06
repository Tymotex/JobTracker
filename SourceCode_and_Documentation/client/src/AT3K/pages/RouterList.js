/**
 * 
 */

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
import JobDetails from "./JobDetails";
import Maps from '../../pages/maps/Maps';

 /**
  * Routes are created here!
  */
const routes = [
    {
        path: "/",
        page: Home
    },
    {
        path: "/dashboard",
        page: JobDashboard
    },
    {
        path: "/statistics",
        page: Statistics
    },
    {
        path: "/settings",
        page: Settings
    },
    {
        path: "/settings/profile",
        page: Settings,
        props: {
            settingsCategory: "profile"
        }
    },
    {
        path: "/settings/theme",
        page: Settings,
        props: {
            settingsCategory: "theme"
        }
    },
    {
        path: "/settings/notifications",
        page: Settings,
        props: {
            settingsCategory: "notifications"
        }
    },
    {
        path: "/settings/preferences",
        page: Settings,
        props: {
            settingsCategory: "preferences"
        }
    },
    {
        path: "/search",
        page: JobSearch
    },
    {
        path: "/search/details",
        page: JobDetails
    },
    {
        path: "/faq",
        page: FAQ
    },
    {
        path: "/map",
        page: Maps
    }
];

const RouterList = ({ replaceTheme, currTheme }) => {
    const location = useLocation();
    return (
        <Switch>
            {/* <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route
            exact
            path="/"
            render={() => <Redirect to="/home" />}
            /> */}
            {/* Only allow exact route matches */}
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
