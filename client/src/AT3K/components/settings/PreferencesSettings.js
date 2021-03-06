import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React from "react";
import styles from "./settings.module.scss";

const boardSettings = [
  {
    name: "spreadsheet",
  },
  {
    name: "Kanban view",
  },
  {
    name: "List view",
  },
  {
    name: "Calendar",
  },
];

const PreferencesSettings = () => {

  return (
    <>
      <h2>Default Board View</h2>
      <p>The selected view would be the view that be shown by default when you enter the job dashboards</p>
      <div className={styles.container}>
        {boardSettings.map((item, index) => {
          return (
            <div key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => {}}
                    name="checkedB"
                    color="primary"
                  />
                }
                label={item.name}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PreferencesSettings;
