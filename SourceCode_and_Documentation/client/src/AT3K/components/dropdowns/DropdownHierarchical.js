import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function GroupedSelect({ label, options, onChange, value }) {
    const classes = useStyles();
    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-native-select">{label}</InputLabel>
                <Select native defaultValue={value} id="grouped-native-select" onChange={onChange}>
                    {options.map(eachGroup => (
                        <optgroup label={eachGroup.label}>
                            {eachGroup.options.map(eachOption => (
                                <option value={eachOption.value}>{eachOption.name}</option>
                            ))}
                        </optgroup>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};
