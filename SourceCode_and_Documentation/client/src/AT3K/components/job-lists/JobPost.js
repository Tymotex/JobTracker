import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
const JobPost = ({ position, company, link }) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Position: {position}
          </Typography>
          <Typography variant="body2" component="p">
            Company: {company}
            <br />
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
