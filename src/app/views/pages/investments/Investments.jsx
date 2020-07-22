import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Breadcrumb, SimpleCard } from "matx";
import {Grid, Card, Icon, Typography } from "@material-ui/core"
import CustomCard from "./components/CustomCard";
import {Link} from 'react-router-dom';
import SavingsBalanceCard from "./components/SavingsBalanceCard";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import { Component } from "react";
import {getConfig, numberFormat, payID, checkToken} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import CustomCarousel from "./components/CustomCarousel";

class Investments extends Component {
  constructor(props){
    super(props)
    this.state = {
      total: 0.00,
      target:0.00,
      regular:0.00,
      loan:0.00
    }
    this.fetchBalances = this.fetchBalances.bind(this);
  }
  
  componentDidMount(){
    this.fetchBalances();
  }
  fetchBalances=()=>{
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
    fetch(getConfig('fetchAllBalances'), requestOptions)
      .then(async response => {
      const dat = await response.json();
      if (!response.ok) {
          const error = (dat && dat.message) || response.statusText;
          return Promise.reject(error);
      }
      console.log(dat)
      this.setState({total: dat[0], regular: dat[1], target: dat[2], loan: dat[3]})
      })
      .catch(error => {
        if (error === "Unauthorized") {
          this.props.logout()
        }
        this.setState({loading:false});
      });
  }

render(){
 const {total, target, regular, loan} = this.state
  return (
    <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Investments" }
            ]}
          />
        </div>
    <div style={{width:"100%"}}>
      <Grid container spacing={2} >
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Card>
            <SavingsBalanceCard title={"Investments"} amount={numberFormat(total)}/>
          </Card>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          {/* <Card> */}
            <Link to="/investment/market"><CustomCarousel /></Link>
          {/* </Card> */}
        </Grid>
      </Grid>
      <div className="py-5" />
      <Grid container spacing={3} >
        <Grid item lg={4} md={4} >
          <Link to="/investment/market">
            <CustomCard icon={"money"} colors={"#e686d6"} textcolor={"#000"} amount={numberFormat(regular)} title={"Market Investments"} subtitle={"Save regularly on Daily, Weekly or Monthly timeframe."} />
          </Link>
        </Grid>
        <Grid item lg={4} md={4} >
          <Link to="/investment/halal">
          <CustomCard icon={"track_changes"} colors={"#b7c75e"} textcolor={"#000"} amount={numberFormat(target)} title={"Halal Investments"} subtitle={"Save to achieve monetary goals, with flexible timeframe."}/>
          </Link>
        </Grid>
        <Grid item lg={4} md={4} >
          <Link to="/investment/finance">
            <CustomCard icon={"business_center"} colors={"#5ec7ad"} textcolor={"#000"} amount={numberFormat(loan)} title={"Sme Financing Investments"} subtitle={"Flexible savings to get our free interest loan"}/>
          </Link>
        </Grid>
      </Grid>
    </div>
  </div>
  );
}
}

const actionCreators = {
  logout: userActions.logout,
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Investments))
);