import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    FormControlLabel,
    Checkbox,
    Grid
} from '@material-ui/core';
import styles from "./FunctionsMenu.module.scss";
import {
	Modal
} from '../modals';
import axios from 'axios';
import api from '../../constants/api';
import Cookie from 'js-cookie';
import { Notification } from '../notification';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
	},
}));

const CustomiseView = ({ boardType, fieldsToShow, setFields }) => {
	const classes = useStyles();

    // Handler for setting which fields to show
    const handleFieldsToShow = (event) => {
        setFields({
            ...fieldsToShow,
            [event.target.name]: event.target.checked,
        });
    };

	const FieldsForm = () => {
		return (
            <div>
                <FormControl component="fieldset">
                    <FormLabel>Select fields to be shown</FormLabel>
                    <FormGroup
                        classes={{ root: styles.fields }}
                        style={{ flexDirection: "row" }}
                    >
                        <Grid container>
                            {(boardType) === "spreadsheet" && (
                                Object.keys(fieldsToShow).map((eachField) => (
                                    <Grid item xs={12} md={6}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={fieldsToShow[eachField]}
                                                    onChange={handleFieldsToShow}
                                                    name={eachField}
                                                />
                                            }
                                            label={eachField}
                                        />
                                    </Grid>
                                ))
                            )}
                            {(boardType) === "board" && (
                                <>Unimplemented</>
                            )}
                            {(boardType) === "calendar" && (
                                <>Unimplemented</>
                            )}
                            {(boardType) === "list" && (
                                <>Unimplemented</>
                            )}
                        </Grid>
                    </FormGroup>
                </FormControl>
                <hr />
                <FormControl component="fieldset">
                    <FormLabel>Styling</FormLabel>
                    <FormGroup
                        classes={{ root: styles.fields }}
                        style={{ flexDirection: "row" }}
                    >
                        Unimplemented
                    </FormGroup>
                </FormControl>
            </div>
		)
	};

	return (
		<div className={classes.root}>
			<Modal title={`Customise '${boardType}' view`} Contents={FieldsForm}>
				<Button className={styles.button} variant="contained">
					Customise
				</Button>
			</Modal>
		</div>
	);
}

export default CustomiseView;
