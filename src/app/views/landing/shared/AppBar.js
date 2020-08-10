import React from 'react';
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom:10
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(5),
  },
}));

export default function AppAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar style={{backgroundColor:"inherit", }} position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="secondary" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <img src="/assets/images/cubevest.png" alt="company-logo" />
          <Typography variant="h6" className="text-white" style={{color:"#fff", flexGrow: 1, marginLeft: 25,}}>
            News
          </Typography>
          <Link to="/signin"><Button variant="outlined" color="secondary" style={{color:"#fff"}}>Login</Button></Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
