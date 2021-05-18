import { Button } from "@material-ui/core";
import axios from "axios";
import Cookie from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";
import api from "../../constants/api";
import { Notification } from "../notification";
import styles from "./DetailedJobPost.module.scss";
import LinkIcon from "@material-ui/icons/Link";

const DetailedJobPost = ({
    fieldsToShow,
    selectedBoardID,
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
                        Notification.spawnSuccess(
                            `Tracking '${response.data.title}'`
                        );
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
        // FIXME: This may be too long. Alternatives to passing data to a route?
        description,
        salary,
        date,
    };

    const searchParams = new URLSearchParams(data);
    const moreInfoURL = `/search/details?${searchParams.toString()}`;

    return (
        <div className={styles.card}>
            <div className={styles.cardInfo}>
                <div className={styles.cardAbout}>
                    <Button
                        className={`${styles.cardTag} ${styles.tagNews}`}
                        variant="contained"
                        color="info"
                        onClick={trackNewJob}
                    >
                        Track
                    </Button>
                    {fieldsToShow.date && date && date !== "" && (
                        <span>
                            Posted date:
                            <div className={styles.cardTime}>{date}</div>
                        </span>
                    )}
                </div>
                {fieldsToShow && fieldsToShow.title && (
                    <>
                        <h1 className={styles.cardTitle}>
                            <Link to={moreInfoURL}>{title}</Link>
                        </h1>
                    </>
                )}
                {fieldsToShow.url && url && url !== "" && (
                    <div className={styles.field}>
                        <a href={url}>
                            <LinkIcon />
                        </a>
                    </div>
                )}
                {fieldsToShow.company && company && company !== "" && (
                    <span className={styles.field}>
                        <strong>Company: </strong>
                        <Link
                            className={styles.field}
                            to={`/search/company?company=${company}`}
                        >
                            {company}
                        </Link>
                    </span>
                )}

                <div className={styles.cardCreator}>
                    <div>
                        {fieldsToShow.salary && salary && salary !== "" && (
                            <div>
                                <strong>Salary: </strong>
                                <div className={styles.field}>{salary}</div>
                            </div>
                        )}
                        {fieldsToShow.locations &&
                            locations &&
                            locations !== "" && (
                                <div className={styles.field}>
                                    <strong>Location:</strong> {locations}
                                </div>
                            )}
                        {fieldsToShow.date && date && date !== "" && (
                            <div className={styles.field}>
                                <strong>Posted date:</strong> {date}
                            </div>
                        )}
                        {fieldsToShow.description &&
                            description &&
                            description !== "" && (
                                <div className={styles.field}>
                                    <strong>Description:</strong> {description}
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailedJobPost;
