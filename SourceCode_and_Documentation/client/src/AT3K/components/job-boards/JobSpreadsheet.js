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

// Documentation: https://adazzle.github.io/react-data-grid/docs/ReactDataGrid

// const JobSpreadsheet = ({ trackedJobs, setTrackedJobs, boardID, fieldsToShow }) => {
//     const [selectedRows, setSelectedRows] = useState(() => new Set());

//     const StatusEditor = ({ row, onRowChange }) => {
//         return (
//             <DropdownEditor.StatusEditor row={row} onRowChange={onRowChange} boardID={boardID} />
//         )
//     }

//     let columns = [
//         { key: "job_id", name: "Job ID", resizable: true },
//         { key: 'company', name: "Company", frozen: true, resizable: true, editor: TextEditor },
//         { key: "title", name: "Title", filterable: true, frozen: true, resizable: true, editor: TextEditor },
//         { key: "date", name: "Date", resizable: true },
//         { key: "description", name: "Description", resizable: true, editor: TextEditor },
//         { key: "url", name: "URL", resizable: true, editor: TextEditor, 
//             formatter({ row }) {    
//                 return (
//                     <strong>
//                         {(row.url && row.url !== "") && (
//                             <a 
//                                 className={styles.link} 
//                                 href={row.url}
//                                 target="_blank" 
//                                 rel="noopener noreferrer"
//                             >
//                                 View Post
//                             </a>
//                         )}
//                     </strong>
//                 );
//             }
//         },
//         { key: "salary", name: "Salary", resizable: true, editor: TextEditor },
//         { key: "locations", name: "Locations", resizable: true, editor: TextEditor },
//         { key: "priority", name: "Priority", sortable: true, sortDescendingFirst: true, sortable: true, resizable: true, editor: DropdownEditor.PriorityEditor },
//         // { key: "key_date", name: "Key Dates", isExpanded: true, ,  resizable: true },
//         { key: "current_status", name: "Current Status",  resizable: true, editor: StatusEditor },
//         { key: "notes", name: "Notes",  resizable: true, editor: TextEditor },
//     ];
//     columns = columns.filter(eachCol => fieldsToShow[eachCol.key]);

//     const onGridRowsUpdated = (newTrackedJobs) => {
//         console.log(newTrackedJobs);
//         const userID = Cookie.get("user_id");
//         if (userID) {
//             // const postData = {
//             //     method: "post",
//             //     url: `${api.BASE_URL}/api/user/board/`,
//             //     data: {
//             //         user_id: userID,
//             //         board_id: boardID,
//             //         tracked_jobs: newTrackedJobs
//             //     },
//             //     headers: {
//             //         "Content-Type": "application/json"
//             //     }
//             // };
//             axios.post(`${api.BASE_URL}/api/user/board`, {
//                 user_id: userID,
//                 board_id: boardID,
//                 tracked_jobs: newTrackedJobs
//             }, {
//                 headers: {
//                   "Content-Type": "application/json"
//                 }
//             })
//                 .then(() => {
//                     Notification.spawnSuccess("Successfully edited");
//                     setTrackedJobs(newTrackedJobs);
//                 })
//                 .catch((err) => {
//                     Notification.spawnError(err);
//                 })
//         }
//     };

//     // TODO: API call: when a field is changed, call POST /api/user/board and give the new trackedJobs
//     // https://www.google.com/search?q=react+data+grid+on+change&oq=react+data+grid+on+change&aqs=chrome..69i57.2423j0j7&sourceid=chrome&ie=UTF-8



//     console.log("COLUMNS");
//     console.log(columns);
//     console.log("ROWS");
//     console.log(trackedJobs);
  
//     const csvColumn = {};
//     columns.forEach(eachCol => {
//         csvColumn[eachCol.key] = eachCol.name;
//     });
//     console.log(csvColumn);
//     const csvRows = [...trackedJobs];

//     return (
//         <>
//             <FullscreenMode>
//                 <DataGrid 
//                     className={styles.spreadsheet}
//                     columns={columns} 
//                     rows={trackedJobs}
//                     enableCellSelect={true}
//                     onRowsChange={onGridRowsUpdated}
//                     // selectedRows={selectedRows}
//                     // onSelectedRowsChange={setSelectedRows}
//                     enableFilterRow
//                     // filters={{title: "", priority: "1", current_status: "ass"}}
//                 />
//             </FullscreenMode>
//         </>
//     );
// };

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
                hint: "Hint here!"
            }
        },
        {
            name: "Title", 
            options: {
                filter: true,
                sort: true,
                draggable: true,
                hint: "Hint here!"
            }
        },
        {
            name: "Date", 
            options: {
                filter: true,
                sort: true,
                draggable: true,
                hint: "Hint here!"
            }
        },
        {
            name: "Description", 
            options: {
                filter: true,
                sort: true,
                draggable: true,
                hint: "Hint here!"
            }
        },
        {
            name: "Status", 
            options: {
                filter: true,
                sort: true,
                draggable: true,
                hint: "Hint here!"
            }
        },
        {
            name: "URL", 
            options: {
                filter: true,
                sort: true,
                draggable: true,
                hint: "Hint here!",
                customBodyRender(value, tableMeta, updateValue) {
                    console.log(tableMeta);
                    console.log(updateValue);
                    return (
                        <>
                            <div>
                                <a href={value} className={styles.link}>View original post</a>
                            </div>
                            <hr />
                            <div>
                                <a href={value} className={styles.link}>View details page</a>
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
                hint: "Hint here!"
            }
        },
        {
            name: "Priority", 
            options: {
                filter: true,
                sort: true,
                draggable: true,
                hint: "Hint here!"
            }
        },
        {
            name: "Salary", 
            options: {
                filter: true,
                sort: true,
                draggable: true,
                hint: "Hint here!"
            }
        },
        {
            name: "Notes", 
            options: {
                filter: true,
                sort: true,
                draggable: true,
                hint: "Hint here!"
            }
        },
        {
            name: "JobID",
            options: {
                filter: true,
                sort: true,
                draggable: true,
                hint: "Hint here!"
            }
        },
    ];

    const options = {
        filter: true,
        filterType: "dropdown",
        responsive,
        tableBodyHeight,
        tableBodyMaxHeight
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
                <InputLabel id="demo-simple-select-label">Responsive Option</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={responsive}
                style={{ width: "200px", marginBottom: "10px", marginRight: 10 }}
                onChange={(e) => setResponsive(e.target.value)}
                >
                <MenuItem value={"vertical"}>vertical</MenuItem>
                <MenuItem value={"standard"}>standard</MenuItem>
                <MenuItem value={"simple"}>simple</MenuItem>

                <MenuItem value={"scroll"}>scroll (deprecated)</MenuItem>
                <MenuItem value={"scrollMaxHeight"}>
                    scrollMaxHeight (deprecated)
                </MenuItem>
                <MenuItem value={"stacked"}>stacked (deprecated)</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Table Body Height</InputLabel>
                <Select
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
