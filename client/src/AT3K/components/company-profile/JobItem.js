import React from "react";
import { Link } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import styles from "./JobItem.module.scss";

const JobItem = (props) => {
  const { title, company, date, url, locations, salary } = props;

  const data = {
    title,
    company,
    locations,
    url,
    salary,
    date,
  };

  const searchParams = new URLSearchParams(data);
  const moreInfoURL = `/search/details?${searchParams.toString()}`;

  return (
    <Button
      componenet={Link}
      href={`${moreInfoURL}`}
      variant="outlined"
      style={{ margin: "5px", width: "100%" }}
    >
      <Grid container direction="row">
        <Grid item xs={12} className={styles.jobTitle}>
          <div>{props.title} </div>
        </Grid>
      </Grid>
    </Button>
  );
};

export default JobItem;
