import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";

// context
import { useUserState } from "../context/UserContext";


// Router list defined by AT3K
import RouterList from '../AT3K/pages/RouterList';


export default function App() {
  // global
  var { isAuthenticated } = useUserState();

  return (
    <BrowserRouter>
      <RouterList />
      {/* <Switch>
        <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
        <Route
          exact
          path="/"
          render={() => <Redirect to="/dashboard" />}
        />
        <Route path="/dashboard" component={Login} />
        <RouterList />
        <PrivateRoute path="/" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        <Route component={Error} />
      </Switch> */}
    </BrowserRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
