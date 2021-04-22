import {
    Checkbox,
    FormControl,
    FormControlLabel, FormGroup, FormLabel
} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import React from "react";
import styles from "./JobList.module.scss";

const FieldsSelectionForm = ({fieldsToShow, handleFieldsToShow, detailLevel, resultsPerPage, handleSetResultsPerPage}) => {
    return (
        <div className={styles.root}>
        <h4 className={styles.fieldTitle}>Results per page</h4>
        <Slider
            defaultValue={resultsPerPage}
            onChangeCommitted={(_, val) => handleSetResultsPerPage(val)}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={30}
        />
        <FormControl component="fieldset" style={{marginTop: "50px", textAlign: "center", width: "100%"}}>
            <FormLabel component="legend">Select fields to display</FormLabel>
            {/* TODO Can't override formgroup css without using style = {} */}
            <FormGroup
                style={{ flexDirection: "row" }}
            >
                {Object.keys(fieldsToShow).map((eachField) => {
                const alwaysShowFields = ["title", "company", "locations"];
                if (detailLevel === 2 || alwaysShowFields.indexOf(eachField) !== -1 ) {
                    return  <FormControlLabel
                    control={
                    <Checkbox
                        checked={fieldsToShow[eachField]}
                        onChange={handleFieldsToShow}
                        name={eachField}
                    />
                    }
                    label={eachField}
                />
                }
                return null;
                })}
            </FormGroup>
        </FormControl>
        </div>
    );
};

export default FieldsSelectionForm;
