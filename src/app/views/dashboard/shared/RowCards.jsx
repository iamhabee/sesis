import React, { Fragment, Component } from "react";
import { format } from "date-fns";
import {
  Grid,
  Card,
  Icon,
  IconButton,
  Checkbox,
  Fab,
  Avatar,
  Hidden
} from "@material-ui/core";
import { Link } from "react-router-dom";

class RowCards extends Component {
  render(){
    const rows = [
      {id: 1, name: "Fund Wallet", desc:"Fund Wallet to continue Transaction", link:"/wallet"}, 
      {id: 2, name:"Bank Details", desc:"Add Your Bank Details", link:"/settings"}, 
      {id: 3, name:"Update Profile", desc:"Edit Your Profile", link:"/profile"}
    ]
    return rows.map((id, index) => (
    <Fragment key={index}>
      <Link to={id.link}>
      <Card className="py-2 px-4 project-card">
        <Grid container alignItems="center">
          <Grid item md={6} xs={7}>
            <div className="flex items-center">
              <Checkbox />
              <Hidden smDown>
                  <Fab
                    className="ml-4 bg-green box-shadow-none text-white"
                    size="small"
                  >
                    <Icon>star_outline</Icon>
                  </Fab>
              </Hidden>
              <span className="card__roject-name font-medium">
                {id.name}
              </span>
            </div>
          </Grid>

          <Grid item md={6} xs={4}>
            <div className="text-muted">
              {id.desc}
            </div>
          </Grid>

          {/* <Hidden smDown>
            <Grid item xs={3}>
              <div className="flex position-relative face-group">
                <Avatar className="avatar" src="/assets/images/face-4.jpg" />
                <Avatar className="avatar" src="/assets/images/face-4.jpg" />
                <Avatar className="avatar" src="/assets/images/face-4.jpg" />
                <Avatar className="number-avatar avatar">+3</Avatar>
              </div>
            </Grid>
          </Hidden> */}

          {/* <Grid item xs={1}>
            <div className="flex justify-end">
              <IconButton>
                <Icon>more_vert</Icon>
              </IconButton>
            </div>
          </Grid> */}
        </Grid>
      </Card>
      </Link>
      <div className="py-2" />
    </Fragment>
  ));
};
  }
  

export default RowCards;
