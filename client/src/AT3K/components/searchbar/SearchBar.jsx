import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SearchBar({ labelText="Search", items=[], query, setQuery }) {
    return (
        <div>
            <Autocomplete
                freeSolo
                disableClearable
                options={items}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={labelText}
                        margin="normal"
                        variant="outlined"
                        InputProps={{ ...params.InputProps, type: 'search' }}
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                    />
                )}
            />
        </div>
    );
};
