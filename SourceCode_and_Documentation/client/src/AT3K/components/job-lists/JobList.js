import { Button, Grid } from "@material-ui/core";
import React from "react";
import JobPost from "./JobPost";
import Searchbar from "./searchbar";

const JobList = ({ data }) => {
  return (
    <>
      <Grid container>
        <Grid item xs={2}>
          <Searchbar placeholder="Job Search"></Searchbar>
        </Grid>
        <Grid item xs={2}>
          <Searchbar placeholder="Location"></Searchbar>
        </Grid>
        <Grid item xs={2}>
          <Button>Search</Button>
        </Grid>
      </Grid>
      <br></br>
      <Grid container>
        {data.map((eachJobPost) => (
          <Grid item xs={3}>
          <JobPost {...eachJobPost} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default JobList;
