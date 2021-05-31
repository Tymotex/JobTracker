import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles({
  root: {
    margin: 10,
    display: 'flex',
    height: '93%',
  },
  actionArea: {
    flexDirection: 'column',
    height: '100%',
  },
});

export default function ImgMediaCard({ image, title }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea className={classes.actionArea}>
        <CardMedia
          component="img"
          alt={title}
          height="140"
          image={image}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" style={{textAlign: "center"}}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
