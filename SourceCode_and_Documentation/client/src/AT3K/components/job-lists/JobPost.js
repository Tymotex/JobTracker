import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";

import styles from "./jobPost.module.scss";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
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

const JobPost = ({ position, company, link, detail, description }) => {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;
  return (
    <>
      <Card className={`${classes.root} ${styles.card}`}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Position: {position}
          </Typography>
          <Typography variant="body2" component="p">
            Company: {company}
            <br />
            {detail === "more" && description}
            <div>
              <a href={link}>Link to details</a>
            </div>
            <div>
              <Link to={`/search/details?id=${"JOB_POST_ID_HERE"}`}>
                See more details
              </Link>
            </div>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default JobPost;
