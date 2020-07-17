import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { Breadcrumb, SimpleCard } from "matx";
import { Grid, Card } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    height: 250,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

  const tileData = [
    {
      img: "/assets/images/products/headphone-3.jpg",
      title: 'Image',
      author: 'author',
    },
    {
      img: "/assets/images/products/headphone-3.jpg",
      title: 'Image',
      author: 'author',
    },
    {
      img: "/assets/images/products/headphone-3.jpg",
      title: 'Image',
      author: 'author',
    },
    {
      img: "/assets/images/products/headphone-3.jpg",
      title: 'Image',
      author: 'author',
    },
  ];
export default function Halal() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Halal" }
          ]}
        />
      </div>
      <Grid container>
          {tileData.map((tile) => (
          <Grid item lg={3} md={3} cellHeight={50} className={classes.gridList}>
          <Card elevation={5} >
            <GridListTile key={tile.img} >
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                subtitle={<span>by: {tile.author}</span>}
                actionIcon={
                  <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          </Card>
          </Grid>
          ))}
      </Grid>
    </div>
  </div>
  );
}
