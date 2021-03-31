import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./jobPost.module.scss";


const JobPost = ({
  detailLevel,
  title,
  company,
  locations,
  url,
  description,
  salary,
  // deadline,
  date,
  // requiredSkills,
  // missingSkills
}) => {
  // const bull = <span className={classes.bullet}>•</span>;
  return (
    <>
      <Card className={`${styles.card}`}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" component="p">
            {detailLevel === 1 && (
              <div>
                Company: {company}
                <div>
                  <a href={url}>Original post link</a>
                </div>
                <div>
                  Salary: {salary}
                </div>
                {/* <div>
                  Deadline: {deadline}
                </div> */}
                <div>
                  Location: {locations}
                </div>
                <div>
                  Posted date: {date}
                </div>
              </div>
            )}
            {detailLevel === 2 && (
              <div>
                <div>
                  <a href={url}>Original post link</a>
                </div>
                <span className={styles.field}>Company: </span>{company}
                <div>
                  <span className={styles.field}>Salary:</span> {salary}
                </div>
                {/* <div>
                  <span className={styles.field}>Deadline:</span> {deadline}
                </div> */}
                <div>
                  <span className={styles.field}>Location:</span> {locations}
                </div>
                <div>
                  <span className={styles.field}>Posted date:</span> {date}
                </div>
                <div>
                  <span className={styles.field}>Description:</span> {description}
                </div>
                {/* {requiredSkills && (
                  <div>
                    <span className={styles.field}>Required skills:</span>
                    <ul>
                      {requiredSkills.map((eachSkill) => (
                        <li>
                          {eachSkill}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {missingSkills && (
                  <div>
                    <span className={styles.field}>Missing skills:</span>
                    <ul>
                      {missingSkills.map((eachSkill) => (
                        <li>
                          {eachSkill}
                        </li>
                      ))}
                    </ul>
                  </div>
                )} */}
              </div>
            )}
            <div>
              <Link to={`/search/details?id=${"JOB_POST_ID_HERE"}`}>
                <strong style={{ "font-size": "200%" }}>See more details</strong>
              </Link>
            </div>
            <div>
              <Button variant="contained" color="info">
                Track
              </Button>
            </div>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default JobPost;
