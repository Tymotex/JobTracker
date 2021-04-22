import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    height: "100%",
    margin: 15,
    position: "relative"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  bottomButton: {
    position: "absolute",
    bottom: "3%"
  }
});

const CompanyCard = ({ name, description, link }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" component="p">
          {description.substring(0, 200) + "..."}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
            className={classes.bottomButton}
            component={Link} 
            variant="outlined"
            to={`${link}?company=${name}`} 
            size="small"
        >
            View Profile
        </Button>
      </CardActions>
    </Card>
  );
}

export default CompanyCard;
