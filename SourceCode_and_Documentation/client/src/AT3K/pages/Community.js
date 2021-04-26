import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { ProfileCard } from '../components/commmunity';
import { ContentLoader } from "../components/loaders";
import api from "../constants/api";
import pageStyles from "./Page.module.scss";

const Community = () => {
  const isLoading = false;
  const [users, setUsers] = useState(null);

  // ===== GET /api/users/ =====
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
            {/* [Search bar here] */}
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
          </>
        )}
      </div>
    </Layout>
  );
};

export default Community;
