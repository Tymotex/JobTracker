import React from 'react'
import {
    FormControl, InputLabel,
    MenuItem,
    Select
} from "@material-ui/core";
import styles from "./detailsToggle.module.scss";

const detailsToggle = ({label, boardType, handleChangeBoard, menuItems}) => {
    return (
        <div>
         <FormControl variant="outlined">
            <InputLabel id="board-dropdown">{label}</InputLabel>
            <Select
                className={styles.boardDropdown}
                labelId="board-dropdown"
                value={boardType}
                onChange={handleChangeBoard}
                label="Board Type"
            >
            {menuItems.map((item, index) => {
                return <MenuItem key={index} value={item.value}>{item.text}</MenuItem>
            })}
            {/* <MenuItem value={"less"}>Less Detail</MenuItem>
            <MenuItem value={"more"}>More Detail</MenuItem> */}
            </Select>
        </FormControl>     
        </div>
    )
}

export default detailsToggle
