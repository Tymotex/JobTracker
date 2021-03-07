import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import JobPost from "./JobPost";
import Searchbar from "./searchbar";
import BoardDropdown from "./detailsToggle";
const JobList = ({ data }) => {
  const [boardType, setBoardType] = useState("less".toLowerCase());

  const handleChangeBoard = (event) => {
    setBoardType(event.target.value);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={2}>
          <Searchbar placeholder="Job Search"></Searchbar>
        </Grid>

        <Grid item xs={2}>
          <BoardDropdown
            label={"Sort by"}
            boardType={boardType}
            handleChangeBoard={null}
            menuItems={[
              { value: "less", text: "Less Details" },
              { value: "more", text: "More Details" },
            ]}
          />
        </Grid>
        <Grid item xs={2}>
          <BoardDropdown
            label={"toggle detail"}
            boardType={boardType}
            handleChangeBoard={handleChangeBoard}
            menuItems={[
              { value: "less", text: "Less Details" },
              { value: "more", text: "More Details" },
            ]}
          />
        </Grid>

        <Grid item xs={2}>
          <Button>Search</Button>
        </Grid>
      </Grid>
      <br></br>
      <Grid container>
        {data.map((eachJobPost) => (
          <Grid item xs={boardType == "less" ? 4 : 12}>
            <JobPost {...eachJobPost} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default JobList;
