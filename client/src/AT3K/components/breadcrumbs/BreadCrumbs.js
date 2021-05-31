import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import { emphasize, withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import {
    Link
} from 'react-router-dom';

const StyledBreadcrumb = withStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.grey[100],
        height: theme.spacing(3),
        color: theme.palette.grey[800],
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[300],
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
        },
    },
}))(Chip); 

const BreadCrumbs = ({ deselectBoard, name }) => {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link to="/">
                <StyledBreadcrumb
                    component="a"
                    href="#"
                    label="Home"
                    icon={<HomeIcon fontSize="small" />}
                />
            </Link>
            <StyledBreadcrumb component="a" href="#" label="Dashboard" onClick={deselectBoard} />
            <StyledBreadcrumb
                label={name}
                color="textPrimary"
            />
        </Breadcrumbs>
    );
};

export default BreadCrumbs;
