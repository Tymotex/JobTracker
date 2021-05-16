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
  const [users, setUsers] = useState([]);
  const [autocompleteItems, setAutocompleteItems] = useState([]);
  const [query, setQuery] = useState("");

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

  // Filtering for all users that match the search query
  const filteredUsers = users.filter(eachUser => {
    let normalisedName = eachUser.username;
    let normalisedQuery = query.toLowerCase();
    normalisedName = normalisedName.toLowerCase();
    return normalisedName.includes(normalisedQuery);
  });
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
              setQuery={setQuery}
              query={query}
              items={autocompleteItems.map((item) => item.label)}
            />
            <Grid container>
              {(filteredUsers && filteredUsers.length > 0) ? (
                filteredUsers.map((user) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                      <ProfileCard 
                        user={user}
                      />
                    </Grid>
                  );
                })) : (
                  <div>
                    No users found for search query: {query}
                  </div>
                )
              }
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
