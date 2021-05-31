import {
    FormControl, InputLabel,
    MenuItem,
    Select
} from "@material-ui/core";
import React from 'react';
import boardManagerStyles from "./BoardManager.module.scss";
import toolbarStyles from "./BoardToolbar.module.scss";

const BoardDropdown = ({ boardType, handleChangeBoard }) => {
    return (
        <FormControl variant="outlined">
            <InputLabel id="board-dropdown">Board Type</InputLabel>
            <Select
                className={`${boardManagerStyles.boardDropdown} ${toolbarStyles.dropdown}`}
                labelId="board-dropdown"
                value={boardType}
                onChange={handleChangeBoard}
                label="Board Type"
            >
            <MenuItem value={"spreadsheet"}>Spreadsheet</MenuItem>
            <MenuItem value={"board"}>Kanban Board</MenuItem>
            <MenuItem value={"calendar"}>Calendar</MenuItem>
            <MenuItem value={"list"}>List</MenuItem>
            </Select>
        </FormControl>
    )
};

export default BoardDropdown;
