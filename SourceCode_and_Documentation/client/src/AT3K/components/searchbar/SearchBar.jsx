import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SearchBar({ labelText="Search", items=[] }) {
    return (
        <div>
            <Autocomplete
                freeSolo
                disableClearable
                options={items.map((item) => item.label)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={labelText}
                        margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                )}
            />
        </div>
    );
};
