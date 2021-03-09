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

const JobCard = ({ position, description }) => {
    return (
        <Card className={styles.jobCard} variant="outlined">
            <CardContent>
                <Typography gutterBottom>
                    {position}
                </Typography>
                <Typography variant="body2" component="p">
                    {description}
                </Typography>
                <CardActionArea>
                <Chip
                    avatar={<Avatar><LabelIcon /></Avatar>}
                    label="Tag"
                    clickable
                    color="primary"
                />
                </CardActionArea>
            </CardContent>
        </Card>
    )
}

JobCard.propTypes = {

}

export default JobCard;
