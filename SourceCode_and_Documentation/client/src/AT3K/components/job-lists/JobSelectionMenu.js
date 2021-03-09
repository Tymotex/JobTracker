import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import BoardDropdown from "./detailsToggle";
import ImgMediaCard from "./imgMediaCard";
import "./JobList.css";
import Searchbar from "./searchbar";

export default ({ handleSelectCategory }) => {
  const [jobSearch, jobsetSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const onSearch = () => {};
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
  ];

  return (
    <>
      <Grid container>
        <Grid item sm={4}>
          <Searchbar
            placeholder="Job Search"
            value={jobSearch}
            onSearch={onSearch}
          />
        </Grid>

        <Grid item sm={4}>
          <Searchbar
            placeholder="Location"
            value={locationSearch}
            onSearch={onSearch}
          />
        </Grid>

        <Grid item sm={4}>
          <Button>Search</Button>
        </Grid>
      </Grid>
      <h3>Quick Select category of job</h3>
      <div onClick={handleSelectCategory}>
        <Grid container>
          {categories.map((category) => {
            return (
              <grid item sm={3}>
                <ImgMediaCard title={category.title} image={category.image} />
              </grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
};
