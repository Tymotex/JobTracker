import {
    Container,
    Grid,
    InputLabel,
    MenuItem
} from '@material-ui/core';
import Select from "@material-ui/core/Select";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Cookie from 'js-cookie';
import moment from 'moment';
import MUIDataTable from "mui-datatables";
import React, { useState } from 'react';
import DatePicker from 'react-datepicker2';
import {
    Link
} from 'react-router-dom';
import api from '../../constants/api';
import { Button } from '../buttons';
import { Notification } from '../notification';
import FullscreenMode from '../fullscreen/FullscreenMode';
import styles from './JobSpreadsheet.module.scss';
import {
    BottomNav
} from '../menus';
import { ModalWithChildren } from '../modals';
import RichTextDisplay from '../richtext/RichTextDisplay';

// Given the current_status, returns a formatted string for displaying
const mapStatusToStr = (currentStatus) => {
    switch (currentStatus) {
        case "application":
            return "Awaiting application";
        case "resume":
            return "Resume sent";
        case "interview":
            return "Interviewing";
        case "final":
            return "Finalised";
        default:
            return "";
    }
    // return currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1); 
    // return currentStatus;
}

// TODO: PREFERNCES THAT SHOULD BE SAVED TO LOCALSTORAGE:
// Columns ordering
// Shown fields
// Rows per page
// Table size

// Given the array of trackedJobs, reshapes it to be compatible with mui-datatable's rendering format
const fitToDataFormat = (trackedJobs) => {
    // Note: the order of this is very important. It must match up exactly with the ordering of columns to be rendered in the right cell
    // The events for each job casted from object to string. When rendering it, make sure to run JSON.parse()
    if (trackedJobs) {
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
            JSON.stringify(eachJob.events),
            eachJob.notes,
            eachJob.job_id,
        ]));
    } else {
        return [];
    }
}

const JobSpreadsheet = ({ trackedJobs, setTrackedJobs, boardID }) => {
    const tableBodyHeight = "100%";
    const tableBodyMaxHeight = "";
    const [editingEnabled, setEditingEnabled] = useState(false);

    console.log(trackedJobs);

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
                    Notification.spawnSuccess("Saved changes");
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
            .then(() => {
                Notification.spawnSuccess(`Set a new status for '${updatedJob.title}'`);
            })
            .catch((err) => {
                Notification.spawnError(err);
            });
    };

    const deleteJob = (rowsDeleted, newTableData) => {
        const newJobs = Array.from(trackedJobs);
        let numDeleted = 0;
        rowsDeleted.data.forEach(deletionTarget => {
            newJobs.splice(deletionTarget.index - numDeleted, 1);
            numDeleted++;
        });
        trackedJobs = newJobs;
        saveCurrBoardState(newJobs);
    }

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
            const userID = Cookie.get("user_id");
            if (userID) {
                trackedJobs[row][fieldName] = event.target.value;
                console.log(trackedJobs[row].job_id);
                updateTrackedJobStatus(userID, boardID, trackedJobs[row].job_id, trackedJobs[row], event.target.value)
            } else {
                Notification.spawnRegisterError();
            }
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
    
    function DateSelector({ time, name, onConfirm, onDelete }) {
        const [selectedTime, setSelectedTime] = useState(time);
        
        const handleSelectTime = (newTime) => {
            setSelectedTime(newTime);
        }

        const submit = (e, name, selectedtime) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            onConfirm(name, formData.get("name"), selectedtime);
        }
        
        return (
            <>
                <form onSubmit={(e) => submit(e, name, selectedTime)}>
                    <TextField 
                        name="name"
                        defaultValue={name}
                        label="Event Name"
                        autoComplete="off"
                        variant="outlined"
                    />
                    <DatePicker 
                        value={selectedTime} 
                        onChange={handleSelectTime} 
                        showTodayButton={false}
                    />
                    <button type="submit">Confirm</button>
                    {onDelete && (
                        <button onClick={() => onDelete(name)}>Delete</button>
                    )}
                </form>
            </>
        );
    }

    const AddEvent = ({ rowIndex }) => {
        const createNewEvent = (_, name, time) => {
            if (!time) Notification.spawnInvalid("Please select a time");
            else {
                Notification.spawnSuccess(`Created a new event: '${name}' at ${time}`);
                trackedJobs[rowIndex].events.push({
                    name: name,
                    time: time.unix()
                });
                saveCurrBoardState([...trackedJobs]);
            }
        }

        return (
            <div style={{textAlign: "center"}}>
                <h4>Add New Event {rowIndex}</h4>
                <DateSelector 
                    time={0}
                    name={""}
                    onConfirm={createNewEvent}
                />
            </div>
        )
    }

    const EventsSetter = (eventsJSON, tableMeta) => {
        
        const row = tableMeta.rowIndex;
        const editDeadline = (oldName, newName, newTime) => {
            // FIXME: Find the event with the given name and set the new time. Not robust. Should use ID
            trackedJobs[row].events.forEach(event => {
                if (event.name === oldName) {
                    event.time = newTime.unix();
                    event.name = newName;
                    saveCurrBoardState([...trackedJobs]);
                }
            });
        };

        const deleteDeadline = (oldName) => {
            trackedJobs[row].events = trackedJobs[row].events.filter(e => e.name !== oldName);
            saveCurrBoardState([...trackedJobs]);
        }
        
        if (eventsJSON) {
            const events = JSON.parse(eventsJSON);
            events.sort((a, b) => a.time - b.time);
            moment.locale("en");

            return (
                <div style={{ maxHeight: "250px", overflow: "auto" }}>
                    {events.map(event => (
                        <div style={{textAlign: "center"}}>
                            <br />
                            <DateSelector 
                                time={moment.unix(event.time)}
                                name={event.name}
                                onConfirm={editDeadline}
                                onDelete={deleteDeadline}
                            />
                        </div>
                    ))}     
                    <AddEvent 
                        rowIndex={row}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <AddEvent 
                        rowIndex={row}
                    />
                </div>
            )
        }
        
    }

    const EventsDisplay = (eventsJSON) => {
        if (eventsJSON) {
            const currTime = parseInt(new Date() / 1000);
            const events = JSON.parse(eventsJSON);
            events.sort((a, b) => a.time - b.time);
            return (
                <div>
                    {events.map(e => (
                        <div>
                            <h4>
                                {e.name}:
                            </h4> 
                            <span style={{
                                textDecoration: (currTime > e.time) ? "line-through" : "none"
                            }}>
                                {moment.unix(e.time).format("MM/DD/YYYY (HH:mm A)")}
                            </span>
                        </div>
                    ))}
                </div>
            )
        } else {
            return "";
        }
    };

    const NotesDisplay = (_, tableMeta) => {
        const rowNum = tableMeta.rowIndex;
        const oldJob = trackedJobs[rowNum];
        // Update notes for this job post
        const updateNotes = (newNotes) => {
            const userID = Cookie.get('user_id');
            if (userID) {
                const jobID = oldJob.job_id;
                const updatedJob = {...oldJob, notes: newNotes};
                console.log(updatedJob);
                const putData = {
                    method: 'put',
                    url: `${api.BASE_URL}/api/tracker/`,
                    data: {
                        user_id: userID,
                        board_id: boardID,
                        job_id: jobID,
                        updated_job: updatedJob
                    }
                };
                axios(putData)
                    .then(() => {
                        console.log(oldJob);
                        Notification.spawnSuccess("Successfully updated notes")
                    })
                    .catch(err => Notification.spawnError(err))
            }
        }

        return (
            <div>
                <ModalWithChildren Button={() => <Button>View</Button>}>
                    <Container style={{ marginTop: '20px' }}>
                        <RichTextDisplay 
                            value={(oldJob.notes) ? (oldJob.notes) : ({
                                document: {
                                  nodes: [
                                    {
                                      object: "block",
                                      type: "paragraph",
                                      nodes: []
                                    }
                                  ]
                                }
                            })}
                            buttonText="Save"
                            onSubmit={updateNotes}
                        />
                    </Container>
                </ModalWithChildren>
            </div>
        )
    }

    const columns = [
        {
            name: "company", 
            label: "Company",
            options: {
                filter: true,
                sort: true,
                draggable: true,
                customBodyRender(companyName) {
                    return (
                        <div style={{maxWidth: "125px"}}>
                            <Link to={`/search/company?company=${companyName}`}>
                                {companyName}
                            </Link>
                        </div>
                    );
                }                
            },
        },
        {
            name: "title", 
            label: "Title", 
            options: {
                filter: false,
                sort: true,
                draggable: true,
                customBodyRender(title) {
                    return (
                        <div style={{maxWidth: "150px"}}>
                            {title}
                        </div>
                    );                    
                }
            }
        },
        {
            name: "date", 
            label: "Date", 
            options: {
                filter: false,
                sort: true,
                draggable: true,
                hint: "When the job was posted",
                customBodyRender(date) {
                    return (
                        <div style={{maxWidth: "125px"}}>
                            {date}
                        </div>
                    )
                }
            }
        },
        {
            name: "description", 
            label: "Description", 
            options: {
                filter: false,
                draggable: true,
                display: false
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
                    if (value) {
                        // Take a subset of an object's properties. See: https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties
                        const data = (({
                            title,
                            company,
                            locations,
                            url,
                            description,     // FIXME: This may be too long. Alternatives to passing data to a route?
                            salary,
                            date
                        }) => ({
                            title,
                            company,
                            locations,
                            url,
                            description,     // FIXME: This may be too long. Alternatives to passing data to a route?
                            salary,
                            date
                        }))(trackedJobs[tableMeta.rowIndex]);
                        const searchParams = new URLSearchParams(data);
                        const moreInfoURL = `/search/details?${searchParams.toString()}`;
    
                        return (
                            <>
                                <div>
                                    <a href={value} className={styles.link}>Original post</a>
                                </div>
                                <br />
                                <div>
                                    <Link to={moreInfoURL}>
                                        Job details page
                                    </Link>
                                </div>
                            </>
                        );
                    } else {
                        return value;
                    }
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
                display: false,
                draggable: true,
            }
        },
        {
            name: "events", 
            label: "Events", 
            options: {
                filter: false,
                sort: true,
                draggable: true,
                customBodyRender: EventsDisplay
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
                customBodyRender: NotesDisplay
            }
        },
        {
            name: "job_id",
            label: "JobID",
            options: {
                filter: false,
                sort: true,
                draggable: true,
                hint: "This is for debugging. You shouldn't be able to see this!",
                display: false
            }
        },
    ];

    // Augmenting columns depending on whether editing is enabled
    columns.forEach(col => {
        if (editingEnabled) col.options.sort = false;
        else col.options.sort = true;

        if (editingEnabled) {
            if (col.name === "current_status") {
                col.options.customBodyRender = DropdownField;
            } else if (col.name === "events") {
                col.options.customBodyRender = EventsSetter;
            } else if (col.name === "notes") { 
                col.options.customBodyRender = NotesDisplay;
            } else {
                col.options.customBodyRender = EditableField;
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
        download: !editingEnabled,     // Disabling some functions if in edit mode
        print: !editingEnabled,
        downloadOptions: {
            filename: `${boardID}.csv`
        },
        elevation: 6,
        selectableRowsHeader: true,             
        selectableRowsHideCheckboxes: false,
        // resizableColumns: true,
        // fixedSelectColumn: true,
        selectableRows: "multiple",
        onRowsDelete: deleteJob
    });

    const data = fitToDataFormat(trackedJobs);

    

    return (
        <FullscreenMode
            // Switching off filtering, column selection, printing, rows per page selection when in fullscreen mode. 
            // This is a workaround for the UI not showing up in fullscreen mode
            onFullScreenEnter={() => {
                if (datatableOptions.filter === true) setOptions({...datatableOptions, filter: false, print: false, viewColumns: false, rowsPerPageOptions: [] })}
            }
            onFullScreenExit={() => {
                if (datatableOptions.filter === false) setOptions({...datatableOptions, filter: true, print: true, viewColumns: true, rowsPerPageOptions: [5, 10, 20, 50] })}
            }
        >
            <React.Fragment>
                <MUIDataTable
                    title={"Tracked Jobs"}
                    data={data}
                    columns={columns}
                    options={datatableOptions}
                />
                <div style={{marginBottom: "50px"}} />
                <BottomNav>
                    <Grid container className={styles.buttonGroup}>
                        <Grid item xs={6} className={styles.buttonContainer}>
                            <Button variant="contained" color="primary" onClick={() => saveCurrBoardState(trackedJobs)} style={{marginRight: "20px"}}>
                                Save
                            </Button>
                        </Grid>
                        <Grid item xs={6} className={styles.buttonContainer}>
                            <Button variant="contained" color="primary" onClick={() => setEditingEnabled(!editingEnabled)}>
                                {(!editingEnabled) ? ("Enable Edit") : ("Disable Edit")}
                            </Button>
                        </Grid>
                    </Grid>
                </BottomNav>
            </React.Fragment>
        </FullscreenMode>
    );
}

export default JobSpreadsheet;
