import { Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";

import styles from "./jobPost.module.scss";

const useStyles = makeStyles({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const JobPost = ({ position, company, link, detail, description, salary, deadline, location, postedDate, missingSkills }) => {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;
  return (
    <>
      <Card className={`${styles.card}`}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {position}
          </Typography>
          <Typography variant="body2" component="p">
            {detail == 1 && (
              <div>
                Company: {company}
                <div>
                  <a href={link}>Original post link</a>
                </div>
                <div>
                  Salary: {salary}
                </div>
                <div>
                  Deadline: {deadline}
                </div>
                <div>
                  Location: {location} 
                </div>
                <div>
                  Posted date: {postedDate}
                </div>
              </div>
            )}
            {detail == 2 && (
              <div>
                <div>
                  <a href={link}>Original post link</a>
                </div>
                <span className={styles.field}>Company: </span>{company}
                <div>
                  <span className={styles.field}>Salary:</span> {salary}
                </div>
                <div>
                  <span className={styles.field}>Deadline:</span> {deadline}
                </div>
                <div>
                  <span className={styles.field}>Location:</span> {location} 
                </div>
                <div>
                  <span className={styles.field}>Posted date:</span> {postedDate}
                </div>
                <div>
                  <span className={styles.field}>Description:</span> {description}
                </div>
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
                  )}
              </div>
            )}
            <div>
              <Link to={`/search/details?id=${"JOB_POST_ID_HERE"}`}>
                <strong style={{"font-size": "200%"}}>See more details</strong>
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
