import React from 'react'
import PropTypes from 'prop-types'
import {
    Card,
    CardContent,
    Typography
} from '@material-ui/core';

const JobCard = ({ position, description }) => {
    return (
        <Card>
            <CardContent>
                <Typography gutterBottom>
                    {position}
                </Typography>
                <Typography variant="body2" component="p">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    )
}

JobCard.propTypes = {

}

export default JobCard;
