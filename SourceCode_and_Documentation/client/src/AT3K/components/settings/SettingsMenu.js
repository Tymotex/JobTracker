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
        width: "100%"
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
                    <Link to="/settings/profile" className={classes.menuItem}>
                        <MenuItem>
                            Profile
                            {(currCategory === "profile") && 
                                <span>✓</span>
                            }
                        </MenuItem>
                    </Link>
                    <Link to="/settings/theme" className={classes.menuItem}>
                        <MenuItem>
                            Themes
                            {(currCategory === "theme") && 
                                <span>✓</span>
                            }
                        </MenuItem>
                    </Link>
                    <Link to="/settings/notifications" className={classes.menuItem}>
                        <MenuItem>
                            Notifications
                            {(currCategory === "notifications") && 
                                <span>✓</span>
                            }
                        </MenuItem>
                    </Link>
                    <Link to="/settings/preferences" className={classes.menuItem}>
                        <MenuItem>
                            Preferences
                            {(currCategory === "preferences") && 
                                <span>✓</span>
                            }
                        </MenuItem>
                    </Link>
                </MenuList>
            </Paper>
        </div>
    );
}