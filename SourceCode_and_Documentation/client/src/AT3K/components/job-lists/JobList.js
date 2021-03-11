import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import JobPost from "./JobPost";
import Searchbar from "./searchbar";
import { Dropdown } from "../dropdowns";
// import './JobListPaginator.css';      
import styles from './JobList.module.scss';
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";

const JobList = ({ data, searchValue, onSearch }) => {
	// Dropdown states:
	const [detailLevel, setDetailLevel] = useState(1);
	const [sortStrategy, setSortStrategy] = useState(1);

	// Paginator states 
	const [offset, setOffset] = useState(0);
	const [pageCount, setPageCount] = useState(100);
	const itemsPpage = 3;


	const [currentData, setCurrent_data] = useState(
		data.slice(offset, offset + itemsPpage)
	);


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
				<Grid item sm={4}>
					<Searchbar placeholder="Job Search" value={searchValue} onSearch={onSearch} />
				</Grid>
				<Grid item sm={2}>
					<Button variant="contained" color="primary">Search</Button>
				</Grid>

				<Grid item sm={3}>
					<Dropdown
						label={"Sort by"}
						value={sortStrategy}
						onChange={(event) => setSortStrategy(event.target.value)}
						items={[
				            { value: "0", text: "Sort by" },
				            { value: "1", text: "Posted Date (earliest to latest)" },
				            { value: "2", text: "Posted Date (latest to earliest)" },
				            { value: "3", text: "Deadline (earliest to latest)" },
				            { value: "4", text: "Deadline (latest to earliest)" },
				            { value: "5", text: "Salary (Hi-lo)" },
				            { value: "6", text: "Salary (lo-hi)" },
						]}
					/>
				</Grid>
				<Grid item sm={3}>
					<Dropdown
						label={"Toggle detail"}
						value={detailLevel}
						onChange={(event) => setDetailLevel(event.target.value)}
						items={[
							{ value: 1, text: "Less detail" },
							{ value: 2, text: "More detail" },
						]}
					/>
				</Grid>
			</Grid>
			<div>
				<ReactPaginate
					previousLabel={<ChevronLeft />}
					nextLabel={<ChevronRight />}
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
			<Grid className={styles.jobList} container>
				{currentData.map((eachJobPost) => (
					<Grid className={styles.jobCard} item xs={12} sm={6} md={6} lg={4} >
						<JobPost {...eachJobPost} detail={detailLevel} />
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default JobList;
