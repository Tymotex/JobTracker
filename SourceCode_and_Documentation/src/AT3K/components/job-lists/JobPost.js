import React from 'react';
import {
    Link
} from 'react-router-dom';

const JobPost = ({ position, company, link }) => {
    return (
        <div>
            <div>
                Position: {position} 
            </div>
            <div>
                Company: {company}
            </div>
            <div>
                <a href={link}>Link to details</a>
            </div>
            <div>
                <Link to={`/search/details?id=${"JOB_POST_ID_HERE"}`}>See more details</Link>
            </div>
            <hr />
        </div>
    )
}

export default JobPost;
