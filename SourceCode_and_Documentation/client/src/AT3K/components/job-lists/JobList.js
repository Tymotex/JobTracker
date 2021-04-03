import { Grid, Checkbox, FormLabel, FormControl, FormGroup, FormControlLabel, FormHelperText } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Dropdown } from "../dropdowns";
import styles from './JobList.module.scss';
import JobListPaginator from './JobListPaginator';
import JobPost from "./JobPost";
import { ContentLoader } from '../loaders';
import Slider from '@material-ui/core/Slider';

const JobList = ({ selectedBoardID, fetchJobPosts, pageNum, searchValue, onSearch }) => {
	// Dropdown states:
	const [detailLevel, setDetailLevel] = useState(1);
	const [sortStrategy, setSortStrategy] = useState(1);
	const [jobList, setJobList] = useState([]);
	// Paginator states 
	// const [offset, setOffset] = useState(0);
	// const [pageCount, setPageCount] = useState(100);
	const pageCount = 10;
	// const [itemsPerPage, setItemsPerPage] = useState(10);
	const [pageNumber, setPageNumber] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(9);

	const [fieldsToShow, setFields] = useState({
		title: true,
		company: true,
		locations: true,
		url: true,
		description: true,
		salary: true,
		date: true
	});
	
    useEffect(() => {
        fetchJobPosts(setJobList, pageNumber, resultsPerPage);
    }, []);

	// Handler for when the user clicks on a different page number
	const handlePageClick = (d) => {
		setJobList([]);
		setPageNumber(d.selected + 1);
		fetchJobPosts(setJobList, d.selected + 1, resultsPerPage);
		// let newOffset = Math.ceil(selected * itemsPerPage);
		// setOffset(newOffset);
		// setCurrent_data(jobList.slice(newOffset, newOffset + itemsPerPage));
	};

	// Handler for setting which fields to show
	const handleFieldsToShow = (event) => {
		setFields(
			{
				...fieldsToShow, 
				[event.target.name]: event.target.checked
			}
		)
	}

    const handleSetResultsPerPage = (val) => {
		setResultsPerPage(val);
        fetchJobPosts(setJobList, pageNumber, val);
    }

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
				</Grid>
			</Grid>
			<FormControl component="fieldset">
				<FormLabel component="legend">Select fields to display</FormLabel>
				<FormGroup>
				{Object.keys(fieldsToShow).map(eachField => (
					<FormControlLabel
						control={<Checkbox checked={fieldsToShow[eachField]} onChange={handleFieldsToShow} name={eachField} />}
						label={eachField}
					/>
				))}
				</FormGroup>
			</FormControl>
			<JobListPaginator
				currPage={pageNum} 
				pageCount={pageCount}
				handlePageClick={handlePageClick}
			/>
			<br></br>
			{isLoading && (
				[...Array(resultsPerPage)].map((elem, i) => (
					<ContentLoader />
				))
			)}
			<Grid className={styles.jobList} container>
				{jobList.map((eachJobPost) => (
					<Grid className={styles.jobCard} item xs={12} sm={6} md={6} lg={4} >
						<JobPost 
							{...eachJobPost} 
							fieldsToShow={fieldsToShow}
							selectedBoardID={selectedBoardID} 
							detailLevel={detailLevel} 
						/>
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default JobList;
