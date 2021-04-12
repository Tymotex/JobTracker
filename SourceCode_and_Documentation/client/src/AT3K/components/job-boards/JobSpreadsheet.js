import React, { useState } from 'react';
import DataGrid, { SelectColumn, TextEditor } from 'react-data-grid';
import FullscreenMode from './FullscreenMode';
import Cookie from 'js-cookie';

import axios from 'axios';
import api from '../../constants/api';
import styles from './JobSpreadsheet.module.scss';
import DropdownEditor from '../dropdowns/DropdownEditor';

import { Modal } from '../modals';
import { PrimaryButton } from '../buttons';
import ReactTooltip from 'react-tooltip';
import { Notification } from '../notification';
import MUIDataTable from "mui-datatables";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// Given the current_status, returns a formatted string for displaying
const mapStatusToStr = (currentStatus) => {
    return currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1); 
}


// TODO: PREFERNCES THAT SHOULD BE SAVED TO LOCALSTORAGE:
// Columns ordering
// Shown fields
// Rows per page
// Table size

const JobSpreadsheet = ({ trackedJobs, setTrackedJobs, boardID, fieldsToShow }) => {
    const [responsive, setResponsive] = useState("vertical");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  
    const columns = [
        {
            name: "Company", 
            options: {
                filter: true,
                sort: true,
                draggable: true,
            }
        },
        {
            name: "Title", 
            options: {
                filter: false,
                sort: true,
                draggable: true,
            }
        },
        {
            name: "Date", 
            options: {
                filter: false,
                sort: true,
                draggable: true,
                hint: "When the job was posted"
            }
        },
        {
            name: "Description", 
            options: {
                filter: false,
                draggable: true,
            }
        },
        {
            name: "Status", 
            options: {
                filter: true,
                sort: true,
                draggable: true,
                hint: "What stage this job post is currently at"
            }
        },
        {
            name: "URL", 
            options: {
                filter: false,
                draggable: true,
                customBodyRender(value, tableMeta, updateValue) {
                    console.log(tableMeta);
                    console.log(updateValue);
                    return (
                        <>
                            <div>
                                <a href={value} className={styles.link}>Original post</a>
                            </div>
                            <br />
                            <div>
                                <a href={value} className={styles.link}>Details page</a>
                            </div>
                        </>
                    );
                }
            }
        },
        {
            name: "Locations", 
            options: {
                filter: true,
                sort: true,
                draggable: true,
            }
        },
        {
            name: "Priority", 
            options: {
                filter: true,
                sort: true,
                draggable: true,
                hint: "A number you assign from 1-10, with 1 being the highest priority"
            }
        },
        {
            name: "Salary", 
            options: {
                filter: false,
                sort: true,
                draggable: true,
            }
        },
        {
            name: "Notes", 
            options: {
                filter: false,
                sort: true,
                draggable: true,
                hint: "This is a field for jotting down any thoughts you have about this job post"
            }
        },
        {
            name: "JobID",
            options: {
                filter: false,
                sort: true,
                draggable: true,
                hint: "Hint here!"
            }
        },
    ];

    const options = {
        // filter: true,
        filterType: "dropdown",
        responsive,
        tableBodyHeight,
        tableBodyMaxHeight,
        rowsPerPageOptions: [5, 10, 20, 50],
        draggableColumns: {
            enabled: true
        },
        downloadOptions: {
            filename: {boardID}
        },
        elevation: 6,
        selectableRowsHeader: false,             // Removed selection checkboxes here!!!
        selectableRowsHideCheckboxes: true
    };

    const data = trackedJobs.map(eachJob => ([
        eachJob.company,
        eachJob.title,
        eachJob.date,
        eachJob.description,
        mapStatusToStr(eachJob.current_status),
        eachJob.url,
        eachJob.locations,
        eachJob.priority,
        eachJob.salary,
        eachJob.notes,
        eachJob.job_id
    ]));

    return (

            <FullscreenMode>
                <React.Fragment>
                    <FormControl>
                        <InputLabel 
                            className={styles.dropdowns}
                            id="demo-simple-select-label"
                        >Table Body Height</InputLabel>
                        <Select
                            className={styles.dropdowns}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={tableBodyHeight}
                            style={{ width: "200px", marginBottom: "10px", marginRight: 10 }}
                            onChange={(e) => setTableBodyHeight(e.target.value)}
                        >
                        <MenuItem value={""}></MenuItem>
                        <MenuItem value={"400px"}>400px</MenuItem>
                        <MenuItem value={"800px"}>800px</MenuItem>
                        <MenuItem value={"1200px"}>1200px</MenuItem>
                        <MenuItem value={"100%"}>100%</MenuItem>
                        </Select>
                    </FormControl>
                    <MUIDataTable
                        title={"Tracked Jobs"}
                        data={data}
                        columns={columns}
                        options={options}
                    />
                </React.Fragment>

            </FullscreenMode>
    );
}





export default JobSpreadsheet;
