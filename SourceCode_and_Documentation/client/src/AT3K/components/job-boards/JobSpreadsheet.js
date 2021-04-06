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
    { key: "job_id", name: "Job ID", resizable: true },
    { key: 'company', name: "Company", frozen: true,  resizable: true },
    { key: "title", name: "Title", filterable: true, frozen: true,  resizable: true },
    { key: "date", name: "Date",  resizable: true },
    { key: "description", name: "Description", resizable: true },
    { key: "url", name: "URL",  resizable: true },
    { key: "salary", name: "Salary",  resizable: true },
    { key: "locations", name: "Locations",  resizable: true },
    { key: "priority", name: "Priority", sortable: true, sortDescendingFirst: true,  resizable: true },
    // { key: "key_date", name: "Key Dates", isExpanded: true, ,  resizable: true },
    { key: "current_state", name: "Current State",  resizable: true },
    { key: "notes", name: "Notes",  resizable: true },
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

    // TODO: API call: when a field is changed, call POST /api/user/board and give the new trackedJobs
    // https://www.google.com/search?q=react+data+grid+on+change&oq=react+data+grid+on+change&aqs=chrome..69i57.2423j0j7&sourceid=chrome&ie=UTF-8

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
