import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./jobPost.module.scss";
import axios from "axios";
import Cookie from "js-cookie";
import api from "../../constants/api";
import { Notification } from "../../components/notification";
import AddIcon from '@material-ui/icons/Add';

const JobPost = ({
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
  const data = {
    title,
    company,
    locations,
    url,
    salary,
    date,
  };

  const searchParams = new URLSearchParams(data);
  const moreInfoURL = `/search/details?${searchParams.toString()}`;

  // ==============================

  return (
    <>
      <Card className={`${styles.card}`}>
        <CardContent className={styles.content} >
          <Typography variant="body2" component="p">
            <div>
              <hr style={{ width: "10%" }} />
              {fieldsToShow && fieldsToShow.title && (
                <Typography variant="h5" component="h2">
                  <Link to={moreInfoURL}>
                    <strong>{title}</strong>
                  </Link>
                </Typography>
              )}

              {fieldsToShow.company && (
                <Link
                  className={styles.field}
                  to={`/search/company?company=${company}`}
                >
                  {company}
                </Link>
              )}
              <hr style={{ width: "10%" }} />

              {fieldsToShow.locations && <div>{locations}</div>}

              {fieldsToShow.url && (
                <div>
                  <a href={url}>Original post link</a>
                </div>
              )}
              {/* {fieldsToShow.salary && (
									<div>
										Salary: {salary}
									</div>
								)} */}
              {/* {fieldsToShow.date && (
									<div>
										Posted date: {date}
									</div>
								)} */}
              {/* {fieldsToShow.description && (
									<div>
										Description: {description}
									</div>
								)} */}
              <br />
            </div>
          </Typography>
          <div style={{textAlign: "center", marginTop: "10px"}}>
            <Button variant="contained" color="info" onClick={trackNewJob}>
              Track 
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default JobPost;
