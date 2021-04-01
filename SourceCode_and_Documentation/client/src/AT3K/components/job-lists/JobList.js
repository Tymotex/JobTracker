import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Dropdown } from "../dropdowns";
import styles from './JobList.module.scss';
import JobListPaginator from './JobListPaginator';
import JobPost from "./JobPost";

const JobList = ({ selectedBoardID, fetchJobPosts, pageNum, searchValue, onSearch }) => {
	// Dropdown states:
	const [detailLevel, setDetailLevel] = useState(1);
	const [sortStrategy, setSortStrategy] = useState(1);
	const [jobList, setJobList] = useState([]);
	// Paginator states 
	// const [offset, setOffset] = useState(0);
	// const [pageCount, setPageCount] = useState(100);
	const pageCount = 10;
	const [itemsPerPage, setItemsPerPage] = useState(10);
	// const [pageNumber, setPageNumber] = useState(1);
	const resultsPerPage = 10;

	
    useEffect(() => {
		alert("RENDERING JOB LIST");
        fetchJobPosts(setJobList, 1, resultsPerPage);
    }, []);

	// Handler for when the user clicks on a different page number
	const handlePageClick = (d) => {
		setJobList([]);
		fetchJobPosts(setJobList, d.selected + 1, resultsPerPage);
		// let newOffset = Math.ceil(selected * itemsPerPage);
		// setOffset(newOffset);
		// setCurrent_data(jobList.slice(newOffset, newOffset + itemsPerPage));
	};

	const isLoading = (jobList && jobList.length <= 0);
	return (
		<>
			<Grid container spacing={2}>
				<Grid className={styles.dropdown} item sm={4}>
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
				<Grid className={styles.dropdown}  item sm={4}>
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
				<Grid className={styles.dropdown}  item sm={4}>
					<Dropdown
						label={"Results per page"}
						value={itemsPerPage}
						onChange={(event) => setItemsPerPage(event.target.value)}
						items={[
							{ value: 1, text: "1" },
							{ value: 3, text: "3" },
							{ value: 10, text: "10" },
							{ value: 20, text: "20" },
							{ value: 30, text: "30" }, // TODO: this could be a typeable field instead of a dropdown
						]}
					/>
				</Grid>
			</Grid>
			<JobListPaginator
				currPage={pageNum} 
				pageCount={pageCount}
				handlePageClick={handlePageClick}
			/>
			<br></br>
			{isLoading && (
				<div>Loading...</div>
			)}
			<Grid className={styles.jobList} container>
				{jobList.map((eachJobPost) => (
					<Grid className={styles.jobCard} item xs={12} sm={6} md={6} lg={4} >
						<JobPost {...eachJobPost} selectedBoardID={selectedBoardID} detailLevel={detailLevel} />
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default JobList;
