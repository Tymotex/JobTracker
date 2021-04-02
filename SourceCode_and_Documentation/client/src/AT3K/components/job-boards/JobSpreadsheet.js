import React from 'react';
import DataGrid from 'react-data-grid';
import FullscreenMode from './FullscreenMode';

// import { Editors } from "react-data-grid-addons";

// import { DropdownCell } from '../dropdowns'

// const { DropDownEditor } = Editors;
// const stateTypes = [
//     { id: "awaitingApplication", value: "Awaiting Application" },
//     { id: "resumeSent", value: "Resume Sent" },
//     { id: "interviewing", value: "Interview Stage" },
//     { id: "finalised", value: "Finalised" }
// ];
// const StateDropdown = <DropDownEditor options={stateTypes} />;

const columns = [
    { key: 'company', name: "Company", frozen: true },
    { key: "title", name: "Title", filterable: true, frozen: true },
    { key: "date", name: "Date" },
    { key: "description", name: "Description", resizable: true },
    { key: "url", name: "URL" },
    { key: "salary", name: "Salary" },
    { key: "locations", name: "Locations" },
    { key: "priority", name: "Priority", sortable: true, sortDescendingFirst: true },
    { key: "keyDates", name: "Key Dates", isExpanded: true,  },
    { key: "state", name: "Current State" },
];

// Documentation: https://adazzle.github.io/react-data-grid/docs/ReactDataGrid

const JobSpreadsheet = ({ trackedJobs }) => {
    Date.prototype.yyyymmdd = function() {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();
      
        return [(dd>9 ? '' : '0') + dd,
            (mm>9 ? '' : '0') + mm,
            this.getFullYear(),
        ].join('/');
    };

    // Rendering preprocessing 
    trackedJobs.forEach((eachJob) => {
        // eachJob.date = (new Date(eachJob.date)).yyyymmdd();
        eachJob.priority = 5;
        eachJob.children = [
            {
                deadline: "Today"
            }
        ]
        eachJob.state = "Awaiting Application";
    });

    return (
        <>
            <FullscreenMode>
                <DataGrid 
                    columns={columns} 
                    rows={trackedJobs}

                />
            </FullscreenMode>
        </>
    );
};

export default JobSpreadsheet;
