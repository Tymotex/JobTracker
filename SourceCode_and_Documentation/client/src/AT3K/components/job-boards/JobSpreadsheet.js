import React from 'react';
import DataGrid from 'react-data-grid';

const columns = [
    { key: 'jobPosition', name: 'Job Position' },
    { key: 'companyName', name: 'Company Name' },
    { key: "salary", name: "salary" },
    { key: "etc", name: "etc..." }
];

const rows = [
    { jobPosition: "Frontend Dev", companyName: "Canva", salary: "$50000/yr" },
    { jobPosition: "Security Engineer", companyName: "Citadel", salary: "$120000/yr" },
    { jobPosition: "NEWLY TRACKED JOB POSTINGS ARE AUTOMATICALLY", companyName: "GENERATED", salary: "HERE"},
    { jobPosition: "NEWLY TRACKED JOB POSTINGS ARE AUTOMATICALLY", companyName: "GENERATED", salary: "HERE"},
    { jobPosition: "NEWLY TRACKED JOB POSTINGS ARE AUTOMATICALLY", companyName: "GENERATED", salary: "HERE"},
    { jobPosition: "NEWLY TRACKED JOB POSTINGS ARE AUTOMATICALLY", companyName: "GENERATED", salary: "HERE"},
    { jobPosition: "NEWLY TRACKED JOB POSTINGS ARE AUTOMATICALLY", companyName: "GENERATED", salary: "HERE"},
    { jobPosition: "NEWLY TRACKED JOB POSTINGS ARE AUTOMATICALLY", companyName: "GENERATED", salary: "HERE"},
    { jobPosition: "NEWLY TRACKED JOB POSTINGS ARE AUTOMATICALLY", companyName: "GENERATED", salary: "HERE"},
    { jobPosition: "NEWLY TRACKED JOB POSTINGS ARE AUTOMATICALLY", companyName: "GENERATED", salary: "HERE"},
    { jobPosition: "NEWLY TRACKED JOB POSTINGS ARE AUTOMATICALLY", companyName: "GENERATED", salary: "HERE"},
    { jobPosition: "NEWLY TRACKED JOB POSTINGS ARE AUTOMATICALLY", companyName: "GENERATED", salary: "HERE"}
];


const data = [
    [{ value: "Job Position" }, { value: "Company" }, { value: "Salary" }],
    [{ value: "Graduate Software Engineer" }, { value: "Canva" }, { value: "$50000/yr"}],
];

const JobSpreadsheet = () => {
    return (
        <>
            <DataGrid 
                columns={columns} 
                rows={rows}
            />
        </>
    );
};

export default JobSpreadsheet;
