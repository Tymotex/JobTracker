import {
  Button,
  Grid
} from "@material-ui/core";
import React, { useState } from "react";
import FadeIn from 'react-fade-in';
import { Dropdown } from "../dropdowns";
import { ContentLoader } from "../loaders";
import { Modal } from "../modals";
import DetailedJobPost from "./DetailedJobPost";
import FieldsSelectionForm from './FieldsSelectionForm';
import styles from "./JobList.module.scss";
import JobListPaginator from "./JobListPaginator";
import JobPost from "./JobPost";

const JobList = ({
	selectedBoardID,
	jobList,
	resultsPerPage,
	setResultsPerPage,
	fetchJobPosts,
	pageNum,
	numResults,
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
          <Modal Contents={
              () => <FieldsSelectionForm 
                fieldsToShow={fieldsToShow} 
                detailLevel={detailLevel} 
                handleFieldsToShow={handleFieldsToShow} 
                resultsPerPage={resultsPerPage}
                handleSetResultsPerPage={handleSetResultsPerPage}
              />
            }
          >
            <Button variant="contained" color="info">Customise Fields</Button>
          </Modal>
        </Grid>
      </Grid>
      <div style={{textAlign: "center"}}>
        {numResults} jobs were found
      </div>

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
              <FadeIn
                delay={100}
                transitionDuration={400}
              >
              {detailLevel === 1 ? (
                <JobPost
                  {...eachJobPost}
                  fieldsToShow={fieldsToShow}
                  selectedBoardID={selectedBoardID}
                  detailLevel={detailLevel}
                />  
              ) : (
                <DetailedJobPost
                  {...eachJobPost}
                  fieldsToShow={fieldsToShow}
                  selectedBoardID={selectedBoardID}
                  detailLevel={detailLevel}
                /> 
              )}
              </FadeIn>

              </Grid>
            ))}
        </Grid>
      )}
    </>
  );
};

export default JobList;
