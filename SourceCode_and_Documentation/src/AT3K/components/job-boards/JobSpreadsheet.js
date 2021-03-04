import React from 'react';
import Spreadsheet from "react-spreadsheet";

// TODO:
//    Two options for spreadsheet:
//    1. https://www.npmjs.com/package/react-data-grid
//    2. https://www.npmjs.com/package/react-spreadsheet
// It looks like option 1 has better documentation and more downloads. 
// Currently using option 2 at the moment.

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
