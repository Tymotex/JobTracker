import React from 'react';
import styles from '../../pages/JobDetails.module.scss';

const JobDetailField = ({ label, value, link, children}) => {
    return (
        <div className={styles.iconListItem}>
            {children}
            <label>
                {label}{label ? ":" : ""} <a href={link}>{value}</a>  
            </label>
        </div>
    )
};

export default JobDetailField;
