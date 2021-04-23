import {
  AppBar,

  IconButton, Toolbar
} from "@material-ui/core";
import {
  ArrowBack as ArrowBackIcon, Menu as MenuIcon
} from "@material-ui/icons";
import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
// context
import {
  toggleSidebar, useLayoutDispatch, useLayoutState
} from "../../context/LayoutContext";
// components
import { Typography } from "../Wrappers";
import logoIcon from './icon.png';
// styles
import useStyles from "./styles";

export default function Header(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          
          className={classNames(
            classes.headerMenuButtonSandwich,
            classes.headerMenuButtonCollapse,
            )}
            >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          <Link to="/" style={{textDecoration: "none", color: "white"}}>
            <strong style={{color: "blueviolet"}}>employ</strong>.me  <img src={logoIcon} alt="logo" style={{width: "18px"}} />
          </Link>
        </Typography>
        <div className={classes.grow} />
        {props.children}
      </Toolbar>
    </AppBar>
  );
}
