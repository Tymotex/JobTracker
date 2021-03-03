import React from 'react';
import Spreadsheet from "react-spreadsheet";

const data = [
    [{ value: "Job Position" }, { value: "Company" }, { value: "Salary" }],
    [{ value: "Graduate Software Engineer" }, { value: "Canva" }, { value: "$50000/yr"}],
];

const JobSpreadsheet = () => {
    return (
        <Spreadsheet data={data} />
    );
};

export default JobSpreadsheet;
