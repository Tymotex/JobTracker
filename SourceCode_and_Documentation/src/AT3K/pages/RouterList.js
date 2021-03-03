/**
 * 
 */

import React from "react";
import {
    Route,
    Switch,
    Redirect,
    withRouter,
} from "react-router-dom";

// Pages:
import Home from './Home';
import JobDashboard from './JobDashboard';
import Statistics from './Statistics';
import Settings from './Settings';
import JobSearch from './JobSearch';
import FAQ from './FAQ';

 /**
  * Routes are created here!
  */
const routes = [
    {
        path: "/home",
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
        path: "/search",
        page: JobSearch
    },
    {
        path: "/faq",
        page: FAQ
    }
];

const RouterList = () => (
    <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route
          exact
          path="/"
          render={() => <Redirect to="/home" />}
        />
        {routes.map((eachRoute) => (
            <Route path={eachRoute.path} component={eachRoute.page} />
        ))}
    </Switch>
);

export default RouterList;
