import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import api from "../constants/api";
import { Notification } from "../components/notification";
import pageStyles from "./Page.module.scss";
import { Avatar, Box, Button, Container, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import styles from "./ProfileEdit.module.scss";
import FadeIn from "react-fade-in";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const ProfileEdit = () => {
  const classes = useStyles();
  let { id } = useParams();
  const [profile, setProfile] = useState(null);

  const getUserProfile = () => {
    const userID = Cookie.get("user_id");
    if (userID) {
      axios
        .get(`${api.BASE_URL}/api/user/profile?user_id=${userID}`)
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => {
          Notification.spawnError(err);
        });
    }
  };

  // TODO: Call this function to set the new fields. Should be ready to go
  const setUserProfile = (event) => {
    console.log("Sending deatils");
    console.log("==>", profile);
    event.preventDefault();
    const formData = new FormData(event.target);
    const userID = Cookie.get("user_id");
    if (userID) {
      axios
        .post(
          `${api.BASE_URL}/api/user/profile`,
          {
            user_id: profile._id,
            username: profile.username,
            email: profile.email,
            password: profile.password,
            experience: profile.experience,
            phone: profile.phone,
            skills: profile.skills,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setProfile(res.data);
        })
        .catch((err) => {
          Notification.spawnError(err);
        });
    }
  };

  const handleChangeText = (event, key) => {
    let newProfile = { ...profile };
    // profileprev[key] = event.target.value
    newProfile[key] = event.target.value;
    console.log(newProfile);
    setProfile(newProfile);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <Layout>
      <FadeIn>
        <div className={pageStyles.container}>
          <h3>Edit your details here</h3>
          <form className={styles.form} onSubmit={setUserProfile}>
            <Avatar className={styles.field}/>

            <TextField
              id="outlined-basic"
              label="Username"
              className={styles.field}
              variant="outlined"
              onChange={(e) => handleChangeText(e, "username")}
              value={profile ? profile.username : ""}
            />

            <TextField
              id="outlined-basic"
              className={styles.field}
              label="Email"
              variant="outlined"
              onChange={(e) => handleChangeText(e, "email")}
              value={profile ? profile.email : ""}
            />

            <TextField
              id="outlined-basic"
              className={styles.field}
              label="Education"
              variant="outlined"
              onChange={(e) => handleChangeText(e, "education")}
              value={profile ? profile.education : ""}
            />

            <TextField
              id="outlined-basic"
              className={styles.field}
              label="Experience"
              variant="outlined"
              onChange={(e) => handleChangeText(e, "experience")}
              value={profile ? profile.experience : ""}
            />

            <TextField
              id="outlined-basic"
              className={styles.field}
              label="Name"
              variant="outlined"
              onChange={(e) => handleChangeText(e, "name")}
              value={profile ? profile.name : ""}
            />

            <TextField
              id="outlined-basic"
              className={styles.field}
              label="Phone"
              variant="outlined"
              onChange={(e) => handleChangeText(e, "phone")}
              value={profile ? profile.phone : ""}
            />

            <TextField
              id="outlined-basic"
              className={styles.field}
              label="Skills"
              variant="outlined"
              onChange={(e) => handleChangeText(e, "skills")}
              value={profile ? profile.skills : ""}
            />
            <hr />
            <div>
              <Button
                type="submit"
                value="Submit"
                variant="contained"
                style={{ marginLeft: "20px" }}
              >
                Save changes
              </Button>
            </div>
          </form>
        </div>
      </FadeIn>
    </Layout>
  );
};

export default ProfileEdit;
