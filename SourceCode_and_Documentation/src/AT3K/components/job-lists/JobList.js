import React from 'react';
import JobPost from './JobPost';

const JobList = ({ data }) => {
    return (
        <div>
            {data.map((eachJobPost) => (
                <JobPost {...eachJobPost} />
            )) }
        </div>
    )
}

export default JobList;
