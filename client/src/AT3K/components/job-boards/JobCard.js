import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import {
    Card,
    CardActionArea,
    CardContent,
    Typography
} from '@material-ui/core';
import styles from './JobCard.module.scss';
import LabelIcon from '@material-ui/icons/Label';

const mapStatusToColour = (currentStatus) => {
    switch (currentStatus) {
        case "application":
            return "#00b6e3";     // Light blue
        case "resume":
            return "#05a105";     // Green
        case "interview":
            return "#bd5e00";     // Orange
        case "finalised":           
            return "#cc0836";     // Red
        default:
            return "#333333"      // Gray
    }
};

const JobCard = ({ company, title, description, current_status }) => {

    return (
        <Card className={styles.jobCard} variant="outlined">
            <CardContent>
                <Typography gutterBottom>
                    {company} - {title}
                </Typography>
                <Typography variant="body2" component="p">
                    {description}
                </Typography>
                <CardActionArea>
                <Chip
                    avatar={<Avatar><LabelIcon /></Avatar>}
                    label={current_status}
                    clickable
                    style={{
                        color: "white",
                        backgroundColor: mapStatusToColour(current_status)
                    }}
                />
                </CardActionArea>
            </CardContent>
        </Card>
    )
}

JobCard.propTypes = {
    title: PropTypes.string, 
    description: PropTypes.string
}

export default JobCard;
