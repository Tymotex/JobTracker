import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React from "react";

import styles from "./settings.module.scss";

const NotificationsSettings = () => {
  const notiSettings = [
    {
      name: "Enable",
    },
    {
      name: "Job application deadline",
    },
    {
      name: "Custom deadlines",
    },
    {
      name: "New Job postings",
    },
  ];

  return (
    <>
      <h2>Email notifications</h2>
      <p>
        [Some further clarifications about the notification services provided by this platform and
        the rules about the service that the user can manipulate here]
        </p>
      <div className={styles.container}>
        {notiSettings.map((item, index) => {
          return (
            <div key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => { }}
                    name="checkedB"
                    color="primary"
                  // style={{color: "blue"}}
                  />
                }
                label={item.name}
              />
            </div>
          );
        })}
      </div>

      <h2>SMS notifications</h2>
      <div className={styles.container}>
        <p>
          [Some further clarifications about the notification services provided by this platform and
          the rules about the service that the user can manipulate here]
        </p>
        {notiSettings.map((item, index) => {
          return (
            <div key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => { }}
                    name="checkedB"
                    color="primary"
                  // style={{color: "blue"}}
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

export default NotificationsSettings;
