import React from "react";
import { Grid, Card, Icon, IconButton, Tooltip, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { Component } from "react";


class StatCards extends Component {
  constructor(props){
    super(props)
  }
  render(){
    let { theme } = this.props;
    return (
      <Grid container spacing={3} className="mb-3">
        <Grid item xs={12} md={3}>
          <Card className="play-card p-sm-24 bg-paper" elevation={6}>
            <div className="flex items-center">
              <Icon style={{fontSize: "44px", opacity: 0.6, color: theme.palette.primary.main}}>group</Icon>
              <div className="ml-3">
                <small className="text-muted"> Wallet Balance</small>
                <h6 className="m-0 mt-1 text-primary font-medium">{this.props.wallet_balance}</h6>
              </div>
            </div>
            <Tooltip title="View Details" placement="top">
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className="play-card p-sm-24 bg-paper" elevation={6}>
            <div className="flex items-center">
              <Icon style={{fontSize: "44px", opacity: 0.6, color: theme.palette.primary.main}}>attach_money</Icon>
              <div className="ml-3">
                <small className="text-muted">Regular Savings</small>
                <h6 className="m-0 mt-1 text-primary font-medium">{this.props.regular_balance}</h6>
              </div>
            </div>
            <Tooltip title="View Details" placement="top">
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className="play-card p-sm-24 bg-paper" elevation={6}>
            <div className="flex items-center">
              <Icon style={{fontSize: "44px", opacity: 0.6, color: theme.palette.primary.main}}>attach_money</Icon>
              <div className="ml-3">
                <small className="text-muted">Save To Loan</small>
                <h6 className="m-0 mt-1 text-primary font-medium">{this.props.loan_balance}</h6>
              </div>
            </div>
            <Tooltip title="View Details" placement="top">
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className="play-card p-sm-24 bg-paper" elevation={6}>
            <div className="flex items-center">
              <Icon style={{fontSize: "44px", opacity: 0.6, color: theme.palette.primary.main}}>store</Icon>
              <div className="ml-3">
                <small className="text-muted">Target Savings</small>
                <h6 className="m-0 mt-1 text-primary font-medium"> {this.props.target_balance} </h6>
              </div>
            </div>
            <Tooltip title="View Details" placement="top">
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="play-card p-sm-24 bg-paper" elevation={6}>
            <div className="flex items-center">
              <Icon style={{fontSize: "44px", opacity: 0.6, color: theme.palette.primary.main}}>attach_money</Icon>
              <div className="ml-3">
                <small className="text-muted">Halal Investments</small>
                <h6 className="m-0 mt-1 text-primary font-medium">{this.props.halal_balance}</h6>
              </div>
            </div>
            <Tooltip title="View Details" placement="top">
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="play-card p-sm-24 bg-paper" elevation={6}>
            <div className="flex items-center">
              <Icon style={{fontSize: "44px", opacity: 0.6, color: theme.palette.primary.main}}>attach_money</Icon>
              <div className="ml-3">
                <small className="text-muted">Halal Investments</small>
                <h6 className="m-0 mt-1 text-primary font-medium">{this.props.halal_balance}</h6>
              </div>
            </div>
            <Tooltip title="View Details" placement="top">
              <IconButton >
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="play-card p-sm-24 bg-paper" elevation={6}>
            <div className="flex items-center">
              {/* <Icon style={{fontSize: "44px", opacity: 0.6, color: theme.palette.primary.main}}>shopping_cart</Icon> */}
              <div className="ml-3">
                <Button className="uppercase"
            size="large"
            variant="contained"
            color="primary" onClick={this.props.openModal}>Quick Save</Button>
              </div>
            </div>
            <Tooltip title="View Details" placement="top">
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip>
          </Card>
        </Grid>
      </Grid>
    );
  };
  
}

export default withStyles({}, { withTheme: true })(StatCards);
