import axios from "axios";
import { Notification } from "../notification";
import Cookie from 'js-cookie';
import api from '../../constants/api';

const updateTrackedJobStatus = (user_id, board_id, job_id, updated_job, newStatus) => {
    // Update tracked job's status as a special case (since we need to push the statistic to the
    // board document)
    updated_job.current_status = newStatus;
    const putData = {
        method: "put",
        url: `${api.BASE_URL}/api/tracker/`,
        data: {
            user_id: user_id, 
            board_id: board_id, 
            job_id: job_id, 
            updated_job: updated_job
        },
        headers: {
            "Content-Type": "application/json"
        }
    };
    axios(putData)
        .then((res) => {
            Notification.spawnSuccess("Updated job status!");
        })
        .catch((err) => {
            Notification.spawnError(err);
        });
};

const Selector = ({ row, customKey, onRowChange, options, boardID }) => {
    const setNewObject = (row, key, value) => {
        const newObj = {
            ...row,
        }
        newObj[key] = value;
        return newObj;
    };
    
    const userID = Cookie.get("user_id");
    if (!userID) Notification.spawnRegisterError();
    return (
        <select
            value={row.title}
            onChange={event => {
                onRowChange(setNewObject(row, customKey, event.target.value), true);
                if (customKey === "current_status") {
                    updateTrackedJobStatus(userID, boardID, row.job_id, row, event.target.value);
                }
            }}
            autoFocus
        >
            {options.map(item => (
                <option key={item} value={item}>
                    {item}
                </option>
            ))}
        </select>
    );
};



export default {
    StatusEditor({ row, onRowChange, boardID }) {
        const options = ['', 'application', 'resume', 'interview', 'final'];
        return (
            <>
                <Selector row={row} customKey="current_status" onRowChange={onRowChange} boardID={boardID} options={options} />
            </>
        );
    },
    PriorityEditor({ row, onRowChange }) {
        const options = ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        return (
            <Selector row={row} customKey="priority" onRowChange={onRowChange} options={options} />
        );
    },

};
