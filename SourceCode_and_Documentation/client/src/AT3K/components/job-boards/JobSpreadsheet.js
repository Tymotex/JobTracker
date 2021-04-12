import React, { useState } from 'react';
import DataGrid, { SelectColumn, TextEditor } from 'react-data-grid';
import FullscreenMode from './FullscreenMode';
import Cookie from 'js-cookie';
import {
    Button,
    InputLabel,
    MenuItem
} from '@material-ui/core';

import axios from 'axios';
import api from '../../constants/api';
import styles from './JobSpreadsheet.module.scss';
import DropdownEditor from '../dropdowns/DropdownEditor';
import TextField from '@material-ui/core/TextField';

import { Modal } from '../modals';
import { PrimaryButton } from '../buttons';
import ReactTooltip from 'react-tooltip';
import { Notification } from '../notification';
import MUIDataTable from "mui-datatables";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// Given the current_status, returns a formatted string for displaying
const mapStatusToStr = (currentStatus) => {
    return currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1); 
    // return currentStatus;
}

// TODO: PREFERNCES THAT SHOULD BE SAVED TO LOCALSTORAGE:
// Columns ordering
// Shown fields
// Rows per page
// Table size

// TODO: Clean up this clusterfuck of a file


// Given the array of trackedJobs, reshapes it to be compatible with mui-datatable's rendering format
const fitToDataFormat = (trackedJobs) => {
    return trackedJobs.map(eachJob => ([
        eachJob.company,
        eachJob.title,
        eachJob.date,
        eachJob.description,
        eachJob.current_status,
        eachJob.url,
        eachJob.locations,
        eachJob.priority,
        eachJob.salary,
        eachJob.notes,
        eachJob.job_id
    ]));
}




const JobSpreadsheet = ({ trackedJobs, setTrackedJobs, boardID, fieldsToShow }) => {
    const [tableBodyHeight, setTableBodyHeight] = useState("100%");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    const [editingEnabled, setEditingEnabled] = useState(false);


    // Called whenever a text field cell is edited
    const saveCurrBoardState = (newTrackedJobs) => {
        const userID = Cookie.get("user_id");
        if (userID) {
            axios.post(`${api.BASE_URL}/api/user/board`, {
                user_id: userID,
                board_id: boardID,
                tracked_jobs: newTrackedJobs
            }, {
                headers: {
                "Content-Type": "application/json"
                }
            })
                .then(() => {
                    Notification.spawnSuccess("Successfully edited");
                    setTrackedJobs(newTrackedJobs);
                })
                .catch((err) => {
                    Notification.spawnError(err);
                })
        }
    };

    const updateTrackedJobStatus = (userID, boardID, jobID, updatedJob, newStatus) => {
        // Update tracked job's status as a special case (since we need to push the statistic to the
        // board document)
        updatedJob.current_status = newStatus;
        const putData = {
            method: "put",
            url: `${api.BASE_URL}/api/tracker/`,
            data: {
                user_id: userID, 
                board_id: boardID, 
                job_id: jobID, 
                updated_job: updatedJob
            },
            headers: {
                "Content-Type": "application/json"
            }
        };
        axios(putData)
            .then((res) => {
                alert(res.data);
            })
            .catch((err) => {
                Notification.spawnError(err);
            });
    };

    // Table cell components
    const EditableField = (currValue, tableMeta) => {
        const setNewBoard = (event, row, fieldName) => {
            event.preventDefault();
            trackedJobs[row][fieldName] = event.target.value;
        }
        return (
            <>
                <TextField 
                    style={{width: "200px"}}
                    multiline
                    rowsMax={4}
                    onChange={(e) => setNewBoard(e, tableMeta.rowIndex, tableMeta.columnData.name)}
                    defaultValue={currValue}
                />
            </>
        );
    }

    const DropdownField = (currValue, tableMeta) => {
        const setNewBoard = (event, row, fieldName) => {
            event.preventDefault();
            trackedJobs[row][fieldName] = event.target.value;
        }
        const options = [
            { label: "Awaiting Application", name: "application" },
            { label: "Resume Sent", name: "resume" },
            { label: "Interview Stage", name: "interview" },
            { label: "Final Outcome", name: "final" }
        ]
        return (
            <>
                <InputLabel id="status-dropdown">Status</InputLabel>
                <Select 
                    id="status-dropdown"
                    multiline
                    rowsMax={4}
                    onChange={(e) => setNewBoard(e, tableMeta.rowIndex, tableMeta.columnData.name)}
                    defaultValue={currValue}
                >
                    {options.map(option => (
                        <MenuItem value={option.name}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </>
        );
    }

    const columns = [
        {
            name: "company", 
            label: "Company",
            options: {
                filter: true,
                sort: true,
                draggable: true
            }
        },
        {
            name: "title", 
            label: "Title", 
            options: {
                filter: false,
                sort: true,
                draggable: true,
            }
        },
        {
            name: "date", 
            label: "Date", 
            options: {
                filter: false,
                sort: true,
                draggable: true,
                hint: "When the job was posted"
            }
        },
        {
            name: "description", 
            label: "Description", 
            options: {
                filter: false,
                draggable: true
            }
        },
        {
            name: "current_status", 
            label: "Status", 
            options: {
                filter: true,
                sort: true,
                draggable: true,
                hint: "What stage this job post is currently at",
                customBodyRender(value) {
                    return <>{mapStatusToStr(value)}</>
                }
            }
        },
        {
            name: "url", 
            label: "URL", 
            options: {
                filter: false,
                draggable: true,
                sort: false,
                customBodyRender(value, tableMeta, updateValue) {
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
            name: "locations", 
            label: "Locations", 
            options: {
                filter: true,
                sort: true,
                draggable: true,
            }
        },
        {
            name: "priority", 
            label: "Priority", 
            options: {
                filter: true,
                sort: true,
                draggable: true,
                hint: "A number you assign from 1-10, with 1 being the highest priority",
            }
        },
        {
            name: "salary", 
            label: "Salary", 
            options: {
                filter: false,
                sort: true,
                draggable: true,
            }
        },
        {
            name: "notes", 
            label: "Notes", 
            options: {
                filter: false,
                sort: true,
                draggable: true,
                hint: "This is a field for jotting down any thoughts you have about this job post",
            }
        },
        {
            name: "job_id",
            label: "JobID",
            options: {
                filter: false,
                sort: true,
                draggable: true,
                hint: "This is for debugging. You shouldn't be able to see this!"
            }
        },
    ];

    // Augmenting columns depending on whether editing is enabled
    columns.forEach(col => {
        if (editingEnabled) col.options.sort = false;
        else col.options.sort = true;

        if (editingEnabled) {
            if (col.name !== "current_status") {
                col.options.customBodyRender = EditableField;
            } else {
                col.options.customBodyRender = DropdownField;
            }
        }
    })

    const [datatableOptions, setOptions] = useState({
        filter: true,
        filterType: "dropdown",
        responsive: "vertical",
        tableBodyHeight,
        tableBodyMaxHeight,
        rowsPerPageOptions: [5, 10, 20, 50],
        draggableColumns: {
            enabled: true
        },
        download: !editingEnabled,               // Disable some functions if in edit mode
        print: !editingEnabled,
        downloadOptions: {
            filename: {boardID}
        },
        elevation: 6,
        selectableRowsHeader: false,             // Removed selection checkboxes here!!!
        selectableRowsHideCheckboxes: true,
        resizableColumns: true
    });

    const data = fitToDataFormat(trackedJobs);

    return (

            <FullscreenMode
                // Switching off filtering, column selection, printing, rows per page selection when in fullscreen mode. This is a workaround for the UI not showing up in fullscreen mode
                onFullScreenEnter={() => {
                    if (datatableOptions.filter === true) setOptions({...datatableOptions, filter: false, print: false, viewColumns: false, rowsPerPageOptions: [] })}
                }
                onFullScreenExit={() => {
                    if (datatableOptions.filter === false) setOptions({...datatableOptions, filter: true, print: true, viewColumns: true, rowsPerPageOptions: [5, 10, 20, 50] })}
                }
            >
                <Button variant="contained" color="primary" onClick={() => saveCurrBoardState(trackedJobs)}>
                    Save board!!!
                </Button>
                <Button variant="contained" color="primary" onClick={() => setEditingEnabled(!editingEnabled)}>
                    TOGGLE EDIT MODE
                </Button>
                <React.Fragment>
                    <MUIDataTable
                        title={"Tracked Jobs"}
                        data={data}
                        columns={columns}
                        options={datatableOptions}
                    />
                </React.Fragment>
            </FullscreenMode>
    );
}

export default JobSpreadsheet;
