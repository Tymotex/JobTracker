import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { ContentLoader } from "../components/loaders";
import pageStyles from "./Page.module.scss";
import api from "../constants/api";
import { Link } from "react-router-dom";
import { Avatar, Grid, Paper } from "@material-ui/core";
import styles from "./Community.module.scss";

import { makeStyles } from "@material-ui/core/styles";
/*

TODO: make a call to GET /api/users. No parameters necessary

Get back a list of objects containing: 
    { 
        username, 
        image, 
        user_id
    }

Click on user card to go to /user/<id here>

*/

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Community = () => {
  const isLoading = false;
  const [users, setUsers] = useState(null);
  const classes = useStyles();
  // fetch data
  useEffect(() => {
    axios.get(`${api.BASE_URL}/api/users`).then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, []);

  return (
    <Layout>
      <div className={pageStyles.container}>
        {isLoading ? (
          <ContentLoader />
        ) : (
          <>
            <h1>Community</h1>
            <Grid container>
              {users &&
                users.map((user) => {
                  return (
                    <Grid item xs={12} sm={3}>
                      <Paper  elevation={3}>
                        <Link
                          to={`/user/${user._id}`}
                          className={styles.user_link}
                        >
                          <Avatar
                            src={user.image_url}
                            alt="No image"
                            className={classes.large}
                          />
                          <section className={styles.detail}>
                            <h4>{user.username}</h4>
                            <p>{user.experience}</p>
                          </section>
                        </Link>
                      </Paper>
                    </Grid>
                  );
                })}
            </Grid>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Community;
