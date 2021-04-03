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

const JobSelectionMenu = ({ onSearch, searchQuery, handleSelectCategory }) => {
  return (
    <>
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
    </>
  );
};
export default JobSelectionMenu;
