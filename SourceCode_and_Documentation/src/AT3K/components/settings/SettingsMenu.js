import React from 'react';
import {
    Link 
} from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
// import menuStyles from './SettingsMenu.module.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
    menuItem: {
        textDecoration: "none!important"
    }
})); 

export default function MenuListComposition({ currCategory }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <MenuList>
                    <MenuItem>
                        <Link to="/settings/profile" className={classes.menuItem}>
                            Profile
                        </Link>
                        {(currCategory === "profile") && 
                            <span>ACTIVE</span>
                        }
                    </MenuItem>
                    <MenuItem>
                        <Link to="/settings/theme" className={classes.menuItem}>
                            Themes
                        </Link>
                        {(currCategory === "theme") && 
                            <span>ACTIVE</span>
                        }
                    </MenuItem>
                    <MenuItem>
                        <Link to="/settings/notifications" className={classes.menuItem}>
                            Notifications
                        </Link>
                        {(currCategory === "notifications") && 
                            <span>ACTIVE</span>
                        }
                    </MenuItem>
                    <MenuItem>
                        <Link to="/settings/preferences" className={classes.menuItem}>
                            Preferences
                        </Link>
                        {(currCategory === "preferences") && 
                            <span>ACTIVE</span>
                        }
                    </MenuItem>
                </MenuList>
            </Paper>
        </div>
    );
}