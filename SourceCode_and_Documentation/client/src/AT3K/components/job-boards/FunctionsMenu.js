import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import styles from "./FunctionsMenu.module.scss";

import { Planet } from 'react-planet';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const options = [
    "Add new job",
    "Clear board"
];



function Test() {
  return (
      <Planet
          centerContent={
              <div
                  style={{
                      height: 30,
                      width: 30,
                      borderRadius: '50%',
                      backgroundColor: '#0008a4',
                  }}
              />
          }
          open
          dragablePlanet
          dragRadiusPlanet={20}
          bounce
          autoClose
      >
          <div
              style={{
                  height: 25,
                  width: 25,
                  borderRadius: '50%',
                  backgroundColor: '#9257ad',
              }}
          />
          <div
              style={{
                  height: 25,
                  width: 25,
                  borderRadius: '50%',
                  backgroundColor: '#9257ad',
              }}
          />
      </Planet>
  );
}

export default function SimpleListMenu({ saveBoard }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Button className={styles.button} variant="outlined" onClick={handleClickListItem}>
        Board Functions
      </Button>
      <Test />
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      
    </div>
  );
}