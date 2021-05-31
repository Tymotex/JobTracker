import { Grid, Paper } from "@material-ui/core";
import React from "react";
import categories from './categories';
import CategoryCard from "./CategoryCard";
import styles from "./JobSelectionMenu.module.scss";

const JobSelectionMenu = ({ handleSelectCategory }) => {
  return (
    <Paper elevation={5} style={{padding: "20px"}}>
      <h1 style={{textAlign: "center"}}>Quick Selection of Job Category</h1>
      <hr />
      <div>
        <Grid container>
          {categories.map((category) => {
            return (
              <Grid 
                className={styles.category} item xs={6} sm={4} md={4} lg={3}
                onClick={() => handleSelectCategory(category.title)}
              >
                <CategoryCard
                  className={styles.categoryCard}
                  title={category.title} 
                  image={category.image} 
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Paper>
  );
};

export default JobSelectionMenu;
