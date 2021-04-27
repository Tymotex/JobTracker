import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { ProfileCard } from '../components/commmunity';
import { ContentLoader } from "../components/loaders";
import api from "../constants/api";
import pageStyles from "./Page.module.scss";
import {
  SearchBar
} from '../components/searchbar';
import { Notification } from '../components/notification';
import { JobListPaginator } from '../components/job-lists';    // TODO: Shouldn't be name JobListPaginator. It's a general purpose paginator

const Community = () => {
  const isLoading = false;
  const [users, setUsers] = useState(null);
  const [autocompleteItems, setAutocompleteItems] = useState([]);

  // ===== GET /api/users/ =====
  useEffect(() => {
    axios.get(`${api.BASE_URL}/api/users`)
      .then((res) => {
        setUsers(res.data);
        setAutocompleteItems(res.data.map(eachUser => ({
          label: eachUser.username,
          id:    eachUser._id 
        })));
      })
      .catch(err => Notification.spawnError(err));
  }, []);

  // Extract a list of all users and their usernames and IDs

  return (
    <Layout>
      <div className={pageStyles.container}>
        {isLoading ? (
          <ContentLoader />
        ) : (
          <>
            <h1>Community</h1>
            {/* [Search bar here] */}
            <SearchBar 
              labelText="User Search"
              items={autocompleteItems}
            />
            <Grid container>
              {users &&
                users.map((user) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                      <ProfileCard 
                        user={user}
                      />
                    </Grid>
                  );
                })}
            </Grid>
            {/* [Paginator here] */}
            <JobListPaginator 
              
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Community;
