import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function GroupedSelect() {
    const classes = useStyles();
    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-native-select">Career Type</InputLabel>
                <Select native defaultValue="" id="grouped-native-select">
                    <option aria-label="None" value="" />
                    <optgroup label="Engineering">
                        <option value={1}>Software engineering</option>
                        <option value={2}>Electrical engineering</option>
                    </optgroup>
                    <optgroup label="Medicine">
                        <option value={3}>Optometrist</option>
                    </optgroup>
                </Select>
            </FormControl>
        </div>
    );
}
