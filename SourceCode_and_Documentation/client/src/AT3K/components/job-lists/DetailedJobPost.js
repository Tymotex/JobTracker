import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import api from "../../constants/api";
import { Notification } from "../notification";

import styles from "./DetailedJobPost.module.scss";

const DetailedJobPost = ({
  fieldsToShow,
  selectedBoardID,
  // detailLevel,
  title,
  company,
  locations,
  url,
  description,
  salary,
  date,
}) => {
  // ===== POST /api/tracker ======

  const trackNewJob = () => {
    const userID = Cookie.get("user_id");
    if (userID) {
      if (!selectedBoardID) {
        Notification.spawnInvalid("Please select a board first");
      } else {
        const jobToTrack = {
          title,
          company,
          locations,
          url,
          description,
          salary,
          date,
        };
        const postData = {
          method: "post",
          url: `${api.BASE_URL}/api/tracker/`,
          data: {
            user_id: userID,
            board_id: selectedBoardID,
            job_to_track: jobToTrack,
          },
          headers: { "Content-Type": "text/plain" },
        };
        axios
          .post(
            `${api.BASE_URL}/api/tracker/`,
            {
              user_id: userID,
              board_id: selectedBoardID,
              job_to_track: jobToTrack,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            Notification.spawnSuccess(`Tracking '${response.data.title}'`);
          })
          .catch((err) => {
            Notification.spawnError(err);
          });
      }
    } else {
      Notification.spawnRegisterError();
    }
  };

  const [onHover, setOnHover] = useState(false);

  const mouseEnterHanlder = () => {
    setOnHover(true);
  };

  const mouseLeaveHanlder = () => {
    setOnHover(false);
  };

  const data = {
    title,
    company,
    locations,
    url,
    description,     // FIXME: This may be too long. Alternatives to passing data to a route?
    salary,
    date
  };

  const searchParams = new URLSearchParams(data);
  const moreInfoURL = `/search/details?${searchParams.toString()}`;

  return (
    <div
      className={styles.card}
      // className="card card-1"
      onMouseEnter={mouseEnterHanlder}
      onMouseLeave={mouseLeaveHanlder}
    >
      {/* <Link to={moreInfoURL}> */}
      {/* <div className="card-img"></div> */}
      {/* <Link to={moreInfoURL} className="card-link">
        <div className="card-img-hovered"></div>
      </Link> */}
      <div className={styles.cardInfo}>
        <div className={styles.cardAbout}>
          {/* <a className="card-tag tag-news">NEWS</a> */}
          <Button
            className={`${styles.cardTag} ${styles.tagNews}`}
            variant="contained"
            color="info"
            onClick={trackNewJob}
          >
            Track
          </Button>
          {fieldsToShow.date && date && date !== "" && (
            <div className={styles.cardTime}>Posted date: {date}</div>
          )}
          {/* <div className="card-time">6/11/2018</div> */}
        </div>
        {fieldsToShow && fieldsToShow.title && (
          <>
            <h1 className={styles.cardTitle}>
              <Link to={moreInfoURL}>
                <strong>{title}</strong>
              </Link>
            </h1>
          </>
        )}
        {fieldsToShow.company && company && company !== "" && (
          <span className={styles.field}>
            Company:{" "}
            <Link
              className={styles.field}
              to={`/search/company?company=${company}`}
            >
              <strong>{company}</strong>
            </Link>
          </span>
        )}
        {fieldsToShow.url && url && url !== "" && (
          <div className={styles.field}>
            <a href={url}>Original post link</a>
          </div>
        )}
        
        <div className={styles.cardCreator}>
          <div>
            {fieldsToShow.salary && salary && salary !== "" && (
              <div className={styles.field}>Salary: {salary}</div>
            )}
            {fieldsToShow.locations && locations && locations !== "" && (
              <div className={styles.field}>Location: {locations}</div>
            )}
            {fieldsToShow.date && date && date !== "" && (
              <div className={styles.field}>Posted date: {date}</div>
            )}
            {fieldsToShow.description && description && description !== "" && (
              <div className={styles.field}>Description: {description}</div>
            )}
          </div>
        </div>
        {/* {onHover && (
          <div className={styles.spaced_container}>
            <Link to={moreInfoURL}>
              <strong style={{ "font-size": "150%" }}>View more here</strong>
            </Link>
            <Link
              className={styles.field}
              to={`/search/company?company=${company}`}
            >
              <strong style={{ "font-size": "150%" }}>{company}</strong>
            </Link>
          </div>
        )} */}
      </div>
      {/* </Link> */}
    </div>
  );
};

export default DetailedJobPost;