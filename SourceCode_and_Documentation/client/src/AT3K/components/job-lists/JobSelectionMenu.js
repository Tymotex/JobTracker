import { Button, Grid } from "@material-ui/core";
import React from "react";
import CategoryCard from "./CategoryCard";
import "./JobListPaginator.css";
import JobPost from "./JobPost";
import styles from "./JobSelectionMenu.module.scss";



const categories = [
  {
    image: "https://www.atomix.com.au/media/2017/07/StockPhotoBanner.jpg",
    title: "Software Engineering",
  },
  {
    image: "https://www.atomix.com.au/media/2017/07/StockPhotoBanner.jpg",
    title: "Electrical Engineering",
  },
  {
    image: "https://www.atomix.com.au/media/2017/07/StockPhotoBanner.jpg",
    title: "Accounting",
  },
  {
    image: "https://www.atomix.com.au/media/2017/07/StockPhotoBanner.jpg",
    title: "Investment banking",
  },
  {
    image: "https://www.atomix.com.au/media/2017/07/StockPhotoBanner.jpg",
    title: "Architecture",
  },
  {
    image: "https://www.atomix.com.au/media/2017/07/StockPhotoBanner.jpg",
    title: "Teaching",
  },
  {
    image: "https://www.atomix.com.au/media/2017/07/StockPhotoBanner.jpg",
    title: "Architecture",
  },
  {
    image: "https://www.atomix.com.au/media/2017/07/StockPhotoBanner.jpg",
    title: "Teaching",
  },
];

const JobSelectionMenu = ({ data, onSearch, searchQuery, handleSelectCategory }) => {
  const head_data = data.slice(0, 3);

  return (
    <>
      <Grid container>
        <Grid item sm={4}>
          <Button variant="contained" color="primary">Search</Button>
        </Grid>
      </Grid>
      <h3>Quick select category of job</h3>
      <div>
        <Grid container>
          {categories.map((category) => {
            return (
              <Grid 
                className={styles.category} item xs={6} sm={4} md={4} lg={3}
                onClick={() => handleSelectCategory(category.title)}
              >
                <CategoryCard 
                  title={category.title} 
                  image={category.image} 
                />
              </Grid>
            );
          })}
        </Grid>
      </div>

      {/* <h3>Recommended Job Postings</h3>
      <Grid container>
        {head_data.map((eachJobPost) => (
          <Grid item xs={4}>
            <JobPost {...eachJobPost} />
          </Grid>
        ))}
      </Grid> */}
    </>
  );
};
export default JobSelectionMenu;
