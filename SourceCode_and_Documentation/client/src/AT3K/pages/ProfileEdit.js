import { Avatar, Button, TextField } from "@material-ui/core";
import axios from "axios";
import Cookie from "js-cookie";
import React, { useEffect, useState } from "react";
import FadeIn from "react-fade-in";
// import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { Notification } from "../components/notification";
import api from "../constants/api";
import pageStyles from "./Page.module.scss";
import styles from "./ProfileEdit.module.scss";

const ProfileEdit = () => {
  // let { id } = useParams();
  const [profile, setProfile] = useState(null);

  const getUserProfile = () => {
    const userID = Cookie.get("user_id");
    if (userID) {
      axios
        .get(`${api.BASE_URL}/api/user/profile?user_id=${userID}`)
        .then((res) => {
          console.log(res.data);
          setProfile(res.data);
        })
        .catch((err) => {
          Notification.spawnError(err);
        });
    }
  };

  // TODO: Call this function to set the new fields. Should be ready to go
  const setUserProfile = (event) => {
    event.preventDefault();
    const userID = Cookie.get("user_id");
    if (userID) {
      axios
        .post(
          `${api.BASE_URL}/api/user/profile`,
          {
            // FIXME: need default values
            user_id: profile._id || "",
            username: profile.username || "",
            email: profile.email || "",
            password: profile.password || "",
            experience: profile.experience || "",
            education: profile.education || "",
            name: profile.name || "",
            phone: profile.phone || "",
            skills: profile.skills || "",
            image_url: profile.image_url || ""
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
          Notification.spawnSuccess("Successfully updated profile");
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
              defaultValue={profile ? profile.username : ""}
            />

            <TextField
              id="outlined-basic"
              className={styles.field}
              label="Email"
              variant="outlined"
              onChange={(e) => handleChangeText(e, "email")}
              value={profile ? profile.email : ""}
              defaultValue={profile ? profile.email : ""}
            />

            <TextField
              id="outlined-basic"
              className={styles.field}
              label="Experience"
              variant="outlined"
              onChange={(e) => handleChangeText(e, "experience")}
              value={profile ? profile.experience : ""}
              defaultValue={profile ? profile.experience : ""}
            />

            <TextField
              id="outlined-basic"
              className={styles.field}
              label="Education"
              variant="outlined"
              onChange={(e) => handleChangeText(e, "education")}
              value={profile ? profile.education : ""}
              defaultValue={profile ? profile.education : ""}
            />

            <TextField
              id="outlined-basic"
              className={styles.field}
              label="Name"
              variant="outlined"
              onChange={(e) => handleChangeText(e, "name")}
              value={profile ? profile.name : ""}
              defaultValue={profile ? profile.name : ""}
            />

            <TextField
              id="outlined-basic"
              className={styles.field}
              label="Phone"
              variant="outlined"
              onChange={(e) => handleChangeText(e, "phone")}
              value={profile ? profile.phone : ""}
              defaultValue={profile ? profile.phone : ""}
            />

            <TextField
              id="outlined-basic"
              className={styles.field}
              label="Skills"
              variant="outlined"
              onChange={(e) => handleChangeText(e, "skills")}
              value={profile ? profile.skills : ""}
              defaultValue={profile ? profile.skills : ""}
            />

            <TextField
              id="outlined-basic"
              className={styles.field}
              label="Image URL"
              variant="outlined"
              onChange={(e) => handleChangeText(e, "image_url")}
              value={profile ? profile.image_url : ""}
              defaultValue={profile ? profile.image_url : ""}
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
