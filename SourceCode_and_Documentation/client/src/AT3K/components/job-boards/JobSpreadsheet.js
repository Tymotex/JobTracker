import React, { useState } from 'react';
import DataGrid, { SelectColumn, TextEditor } from 'react-data-grid';
import FullscreenMode from './FullscreenMode';
import Cookie from 'js-cookie';


import axios from 'axios';
import api from '../../constants/api';
import styles from './JobSpreadsheet.module.scss';
import { DropdownCell } from '../dropdowns';
import DropdownEditor from '../dropdowns/DropdownEditor';


import { Modal } from '../modals';
import { PrimaryButton } from '../buttons';
import ReactTooltip from 'react-tooltip';
import { Notification } from '../notification';

const issueTypes = [
    { id: "bug", value: "Bug" },
    { id: "epic", value: "Epic" },
    { id: "story", value: "Story" }
];

const columns = [
    SelectColumn,
    { key: "job_id", name: "Job ID", resizable: true },
    { key: 'company', name: "Company", frozen: true, resizable: true, editor: TextEditor },
    { key: "title", name: "Title", filterable: true, frozen: true, resizable: true, editor: TextEditor },
    { key: "date", name: "Date", resizable: true },
    { key: "description", name: "Description", resizable: true, editor: TextEditor },
    { key: "url", name: "URL", resizable: true, editor: TextEditor, 
        formatter({ row }) {    
            return (
                <strong>
                    <a 
                        className={styles.link} 
                        href={row.url}
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        View Post
                    </a>
                </strong>
            );
        }
    },
    { key: "salary", name: "Salary", resizable: true, editor: TextEditor },
    { key: "locations", name: "Locations", resizable: true, editor: TextEditor },
    { key: "priority", name: "Priority", sortable: true, sortDescendingFirst: true, resizable: true, editor: DropdownEditor.PriorityEditor },
    // { key: "key_date", name: "Key Dates", isExpanded: true, ,  resizable: true },
    { key: "current_status", name: "Current Status",  resizable: true, editor: DropdownEditor.StatusEditor },
    { key: "notes", name: "Notes",  resizable: true, editor: TextEditor },
];

// Documentation: https://adazzle.github.io/react-data-grid/docs/ReactDataGrid

const JobSpreadsheet = ({ trackedJobs, setTrackedJobs, boardID }) => {
    const [selectedRows, setSelectedRows] = useState(() => new Set());

    const onGridRowsUpdated = (newTrackedJobs) => {
        console.log(newTrackedJobs);
        const userID = Cookie.get("user_id");
        if (userID) {
            // const postData = {
            //     method: "post",
            //     url: `${api.BASE_URL}/api/user/board/`,
            //     data: {
            //         user_id: userID,
            //         board_id: boardID,
            //         tracked_jobs: newTrackedJobs
            //     },
            //     headers: {
            //         "Content-Type": "application/json"
            //     }
            // };
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

    // TODO: API call: when a field is changed, call POST /api/user/board and give the new trackedJobs
    // https://www.google.com/search?q=react+data+grid+on+change&oq=react+data+grid+on+change&aqs=chrome..69i57.2423j0j7&sourceid=chrome&ie=UTF-8

    return (
        <>
            <FullscreenMode>
                <DataGrid 
                    className={styles.spreadsheet}
                    columns={columns} 
                    rows={trackedJobs}
                    enableCellSelect={true}
                    onRowsChange={onGridRowsUpdated}
                    // selectedRows={selectedRows}
                    // onSelectedRowsChange={setSelectedRows}
                    enableFilterRow
                    // filters={{title: "", priority: "1", current_status: "ass"}}
                />
            </FullscreenMode>
        </>
    );
};

export default JobSpreadsheet;
