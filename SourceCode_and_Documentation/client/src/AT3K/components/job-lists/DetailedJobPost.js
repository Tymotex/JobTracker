import React, { useState } from "react";
import "./DetailedJobPost.scss";
import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import styles from "./jobPost.module.scss";
import axios from "axios";
import Cookie from "js-cookie";
import api from "../../constants/api";
import { Notification } from "../notification";

const DetailedJobPost = ({
  fieldsToShow,
  selectedBoardID,
  detailLevel,
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

  const moreInfoURL = `/search/details?url=${url}`;

  return (
    <div
      className="card card-1"
      onMouseEnter={mouseEnterHanlder}
      onMouseLeave={mouseLeaveHanlder}
    >
      <Link to={moreInfoURL}>
        {/* <div className="card-img"></div> */}
        {/* <Link to={moreInfoURL} className="card-link">
        <div className="card-img-hovered"></div>
      </Link> */}
        <div className="card-info">
          <div className="card-about">
            {/* <a className="card-tag tag-news">NEWS</a> */}
            <Button
              className="card-tag tag-news"
              variant="contained"
              color="info"
              onClick={trackNewJob}
            >
              Track
            </Button>
            {detailLevel === 2 && fieldsToShow.date && date && date !== "" && (
              <div className="card-time">Posted date: {date}</div>
            )}
            {/* <div className="card-time">6/11/2018</div> */}
          </div>
          {fieldsToShow && fieldsToShow.title && (
            <h1 className="card-title">{title}</h1>
          )}

          <div className="card-creator">
            {detailLevel === 1 && (
              <div>
                {fieldsToShow.company && <span>Company: {company}</span>}
                {fieldsToShow.url && (
                  <div>
                    <a href={url}>Original post link</a>
                  </div>
                )}
                {fieldsToShow.salary && <div>Salary: {salary}</div>}
                {fieldsToShow.locations && <div>Location: {locations}</div>}
                {fieldsToShow.date && <div>Posted date: {date}</div>}
                {fieldsToShow.description && (
                  <div>Description: {description}</div>
                )}
              </div>
            )}
            {detailLevel === 2 && (
              <div>
                {fieldsToShow.company && company && company !== "" && (
                  <span className={styles.field}>Company: {company}</span>
                )}
                {fieldsToShow.url && url && url !== "" && (
                  <div className={styles.field}>
                    <a href={url}>Original post link</a>
                  </div>
                )}
                {fieldsToShow.salary && salary && salary !== "" && (
                  <div className={styles.field}>Salary: {salary}</div>
                )}
                {fieldsToShow.locations && locations && locations !== "" && (
                  <div className={styles.field}>Location: {locations}</div>
                )}
                {fieldsToShow.date && date && date !== "" && (
                  <div className={styles.field}>Posted date: {date}</div>
                )}
                {fieldsToShow.description &&
                  description &&
                  description !== "" && (
                    <div className={styles.field}>
                      Description: {description}
                    </div>
                  )}
              </div>
            )}
          </div>
          {onHover && (
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
          )}
        </div>
      </Link>
    </div>
  );
};

export default DetailedJobPost;
