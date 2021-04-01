import React from 'react';
import DataGrid from 'react-data-grid';

const columns = [
    { key: 'company', name: "Company" },
    { key: "title", name: "Title" },
    { key: "date", name: "Date" },
    { key: "description", name: "Description"},
    { key: "url", name: "URL" },
    { key: "salary", name: "Salary" },
    { key: "locations", name: "Locations" },
];

const JobSpreadsheet = ({ trackedJobs }) => {
    return (
        <>
            <DataGrid 
                columns={columns} 
                rows={trackedJobs}
            />
        </>
    );
};

export default JobSpreadsheet;
