import React from "react";
import {
  withRouter
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// AT3K imports
import { menuItems } from "../../AT3K/layouts"; 
import { AT3KLayout } from "../../AT3K/layouts";

// context
import { useLayoutState } from "../../context/LayoutContext";


const TopNavItems = menuItems.TopNavItems;

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <Header history={props.history} title={"Job Tracker"}>
        <TopNavItems />
      </Header>
      <Sidebar />
      <div
        className={classnames(classes.content, {
          [classes.contentShift]: layoutState.isSidebarOpened,
        })}
      >
        <div className={classes.fakeToolbar} />
        <AT3KLayout>
          {props.children}
        </AT3KLayout>
      </div>
    </div>
  );
}

export default withRouter(Layout);
