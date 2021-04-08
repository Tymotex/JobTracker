import {
	Grid,
	Checkbox,
	FormLabel,
	FormControl,
	FormGroup,
	FormControlLabel,
	FormHelperText,
	Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Dropdown } from "../dropdowns";
import styles from "./JobList.module.scss";
import JobListPaginator from "./JobListPaginator";
import JobPost from "./JobPost";
import { ContentLoader } from "../loaders";
import Slider from "@material-ui/core/Slider";
import TempJobPost from "./TempJobPost";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";

const JobList = ({
	selectedBoardID,
	jobList,
	resultsPerPage,
	setResultsPerPage,
	fetchJobPosts,
	pageNum,
	numResults,
	searchValue,
	onSearch,
	pageCount,
	sortStrategy,
	handleSetSortStrategy
}) => {
	// Dropdown states:
	const [detailLevel, setDetailLevel] = useState(1);
	// Paginator states
	// const [offset, setOffset] = useState(0);
	// const [itemsPerPage, setItemsPerPage] = useState(10);
	const [pageNumber, setPageNumber] = useState(1);

	const [fieldsToShow, setFields] = useState({
		title: true,
		company: true,
		locations: true,
		url: true,
		description: true,
		salary: true,
		date: true,
	});

	// useEffect(() => {
	//   fetchJobPosts(pageNumber, resultsPerPage);
	// }, []);

	// Handler for when the user clicks on a different page number
	const handlePageClick = (d) => {
		setPageNumber(d.selected + 1);
		fetchJobPosts(d.selected + 1, resultsPerPage);
		// let newOffset = Math.ceil(selected * itemsPerPage);
		// setOffset(newOffset);
		// setCurrent_data(jobList.slice(newOffset, newOffset + itemsPerPage));
	};

	// Handler for setting which fields to show
	const handleFieldsToShow = (event) => {
		setFields({
			...fieldsToShow,
			[event.target.name]: event.target.checked,
		});
	};

	const handleSetResultsPerPage = (val) => {
		setResultsPerPage(val);
		fetchJobPosts(pageNumber, val);
	};

	const isLoading = jobList && jobList.length <= 0 ? true : false;
	return (
		<>
			<Grid container spacing={2}>
				<Grid className={styles.dropdown} item sm={4}>
					<Dropdown
						label={"Sort by"}
						value={sortStrategy}
						onChange={(event) => handleSetSortStrategy(event.target.value)}
						items={[
							{ value: "relevance", text: "Relevance (highest to lowest)" },
							{ value: "date", text: "Posted date (most recent to least recent)" },
							{ value: "salary", text: "Salary (highest to lowest)" },
						]}
					/>
				</Grid>
				<Grid className={styles.dropdown} item sm={4}>
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
				<Grid className={styles.dropdown} item sm={4}>
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
			{/* TODO: Show search results summary - how many jobs were found */}
			<p>{numResults} jobs were found</p>
			<FormControl component="fieldset">
				<FormLabel component="legend">Select fields to display</FormLabel>
				{/* TODO Can't override formgroup css without using style = {} */}
				<FormGroup
					classes={{ root: styles.fields }}
					style={{ flexDirection: "row" }}
				>
					{Object.keys(fieldsToShow).map((eachField) => (
						<FormControlLabel
							control={
								<Checkbox
									checked={fieldsToShow[eachField]}
									onChange={handleFieldsToShow}
									name={eachField}
								/>
							}
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
			{isLoading ? (
				[...Array(resultsPerPage)].map((elem, i) => <ContentLoader />)
			) : (
				<Grid className={styles.jobList} container>
					{jobList &&
						jobList.map((eachJobPost) => (
							<Grid
								className={styles.jobCard}
								item
								xs={12}
								sm={6}
								md={6}
								lg={4}
							>
								<TempJobPost
									{...eachJobPost}
									fieldsToShow={fieldsToShow}
									selectedBoardID={selectedBoardID}
									detailLevel={detailLevel}
								/>
								{/* 
                <JobPost
                  {...eachJobPost}
                  fieldsToShow={fieldsToShow}
                  selectedBoardID={selectedBoardID}
                  detailLevel={detailLevel}
                /> */}
							</Grid>
						))}
				</Grid>
			)}
		</>
	);
};

export default JobList;
