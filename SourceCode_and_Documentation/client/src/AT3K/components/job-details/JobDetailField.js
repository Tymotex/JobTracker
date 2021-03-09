import React from 'react'

const JobDetailField = ({ label, value, link, children }) => {
    return (
        <div>
            {children}
            {label ? (
                link ? (
                    <label>
                        {label}: <a href={link}>{value}</a>   {/* TODO: Change this to Link in react router */}
                    </label>
                ) : (
                    <label>{label}: {value}</label>
                )
            ) : (
                <label>
                    <a href={link}>Official Website</a>
                </label>
            )}
        </div>
    )
};

export default JobDetailField;
