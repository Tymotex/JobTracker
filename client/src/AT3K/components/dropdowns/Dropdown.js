import {
    FormControl, InputLabel,
    MenuItem,
    Select
} from "@material-ui/core";
import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ label, value, onChange, items }) => {
    return (
        <FormControl className="form-control" variant="outlined" style={{ width: "100%" }}>
            <InputLabel id={label}>{label}</InputLabel>
            <Select
                labelId={label}
                value={value ? value.toString().toLowerCase() : ""}
                onChange={onChange}
                style={{"min-width": "200px" }}
                label={label}
            >
                {items && items.map((eachItem) => (
                    <MenuItem value={eachItem.value}>{eachItem.text}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
};

Dropdown.propTypes = {
    label: PropTypes.string, 
    value: PropTypes.string, 
    onChange: PropTypes.func, 
    items: PropTypes.array
};

export default Dropdown;
