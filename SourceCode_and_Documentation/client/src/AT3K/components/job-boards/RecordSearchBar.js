import React from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

const RecordSearchBar = () => {
    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Search</InputLabel>
            <OutlinedInput
                id="outlined-adornment-amount"
                value={"Test"}
                onChange={function() {}}
                startAdornment={<InputAdornment position="start"></InputAdornment>}
                labelWidth={55}
            />
        </FormControl>
    )
} 

export default RecordSearchBar;
