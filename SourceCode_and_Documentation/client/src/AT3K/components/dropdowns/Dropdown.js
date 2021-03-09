import {
    FormControl, InputLabel,
    MenuItem,
    Select
} from "@material-ui/core";
import React from 'react';
import PropTypes from 'prop-types';

const BoardDropdown = ({ label, text, value, onChange, items }) => {
    return (
        <FormControl variant="outlined">
            <InputLabel id={label}>{label}</InputLabel>
            <Select
                labelId={label}
                value={value.toLowerCase()}
                onChange={onChange}
                label={label}
            >
            {items.map((eachItem) => (
                <MenuItem value={eachItem.toLowerCase()}>{eachItem}</MenuItem>
            ))}
            </Select>
        </FormControl>
    )
}

BoardDropdown.propTypes = {
    label: PropTypes.string, 
    text: PropTypes.string,
    value: PropTypes.string, 
    onChange: PropTypes.func, 
    items: PropTypes.array
};

export default BoardDropdown;
