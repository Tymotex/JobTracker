import { Button, Container, Grid, Paper } from "@material-ui/core";
import React from "react";
import CategoryCard from "./CategoryCard";
import "./JobListPaginator.css";
import JobPost from "./JobPost";
import styles from "./JobSelectionMenu.module.scss";



const categories = [
  {
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    title: "Software Engineering",
  },
  {
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80",
    title: "Electrical Engineering",
  },
  {
    image: "https://images.unsplash.com/photo-1473643068424-cd2485e1ae3b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    title: "Mechanical Engineering",
  },
  {
    image: "https://images.unsplash.com/photo-1579364965676-a11fbf2810dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1776&q=80",
    title: "Civil Engineering",
  },
  {
    image: "https://images.unsplash.com/photo-1575503802870-45de6a6217c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    title: "Chemical Engineering",
  },
  {
    image: "https://images.unsplash.com/photo-1487875961445-47a00398c267?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    title: "Environmental Engineering",
  },
  {
    image: "https://images.unsplash.com/photo-1579364965676-a11fbf2810dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1776&q=80",
    title: "Aerospace Engineering",
  },
  {
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80",
    title: "Biomedical Engineering",
  },
  {
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80",
    title: "Accounting",
  },
  {
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80",
    title: "Investment banking",
  },
  {
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80",
    title: "Architecture",
  },
  {
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    title: "Teaching",
  }
];

const JobSelectionMenu = ({ onSearch, searchQuery, handleSelectCategory }) => {
  return (
    <Paper elevation={5} style={{padding: "20px"}}>
      <h2 style={{textAlign: "center"}}>Quick select category of job</h2>
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
