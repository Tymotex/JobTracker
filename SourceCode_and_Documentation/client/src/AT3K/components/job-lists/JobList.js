import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import JobPost from "./JobPost";
import Searchbar from "./searchbar";
import BoardDropdown from "./detailsToggle";
import './JobList.css';
import ReactPaginate from "react-paginate";

const JobList = ({ data, searchValue, onSearch }) => {
  const [boardType, setBoardType] = useState("less".toLowerCase());
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(100);
  const itemsPpage = 3;
  const [current_data, setCurrent_data] = useState(
    data.slice(offset, offset + itemsPpage)
  );

  const handleChangeBoard = (event) => {
    setBoardType(event.target.value);
  };

  const handlePageClick = (d) => {
    console.log(d);
    let selected = d.selected;
    let newOffset = Math.ceil(selected * itemsPpage);
    setOffset(newOffset);
    setCurrent_data(data.slice(newOffset, newOffset + itemsPpage));
  };

  return (
    <>
      <Grid container>
        <Grid item sm={3}>
          <Searchbar placeholder="Job Search" value={searchValue} onSearch={onSearch} />
        </Grid>

        <Grid item sm={3}>
          <BoardDropdown
            label={"Sort by"}
            boardType={"0"}
            handleChangeBoard={null}
            menuItems={[
              { value: "0", text: "Sort by" },
              { value: "1", text: "Posted Date (Hi-lo)" },
              { value: "2", text: "Posted Date (lo-hi)" },
              { value: "3", text: "Deadline (Hi-lo)" },
              { value: "4", text: "Deadline (lo-hi)" },
              { value: "5", text: "Salary (Hi-lo)" },
              { value: "6", text: "Salary (lo-hi)" },
            ]}
          />
        </Grid>
        <Grid item sm={3}>
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

        <Grid item sm={3}>
          <Button>Search</Button>
        </Grid>
      </Grid>
      <div>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
      <br></br>
      <Grid container>
        {current_data.map((eachJobPost) => (
          <Grid item xs={boardType === "less" ? 4 : 12}>
            <JobPost {...eachJobPost} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default JobList;
