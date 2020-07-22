import React from 'react';
import { Breadcrumb, SimpleCard } from "matx";
import { Grid, Card, Button } from '@material-ui/core';
import MarketCard from './components/MarketCard';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import { Component } from 'react';
import {getConfig, numberFormat, payID, checkToken} from '../../../config/config'
import {authHeader} from '../../../redux/logic'


 class Market extends Component {
  constructor(props){
    super(props)
    this.state={
      categories:[],
      tab:true,
      news:[],
      category:[],
      pagination:[],
      Investment:[],
      current_index:0
    }
    this.ongoingTab = this.ongoingTab.bind(this);
    this.completeTab = this.completeTab.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
  let user = JSON.parse(localStorage.getItem('user'));
  fetch(getConfig('getInvestments'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        this.setState({loading: false });
        return Promise.reject(error);
    }
    this.setState({news: data, loading: false, category: data})
})
.catch(error => {
   if (error === "Unauthorized") {
    this.props.logout()
   }
   this.setState({loading:false});
    console.error('There was an error!', error );
});
fetch(getConfig("getInvestmentCat"), requestOptions)
  .then(async (response) => {
    const data = await response.json();
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    this.setState({ categories: data});
  })
  .catch((error) => {
    if (error === "Unauthorized") {
      this.props.logout()
    }
  });
  fetch(getConfig("showMyMarketInvestment"), requestOptions)
  .then(async (response) => {
    const data = await response.json();
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    this.setState({ investment: data.data, pagination:data});
  })
  .catch((error) => {
    if (error === "Unauthorized") {
      this.props.logout()
    }
    this.setState({err:"internet error"});
    console.error("There was an error!", error);
  });
}
  // tab handler
ongoingTab() {
  this.setState({tab:true});
}
completeTab(){
  this.setState({tab:false});
}
tabbed = (id) => {
  this.setState({
    category: id == 0? this.state.news : this.state.news.filter((ne) =>ne.market_investments_id == id),
    current_index: id
  })
};
  render(){
    const {tab, categories, category, current_index} = this.state
    return (
      <div className="m-sm-10">
        <Grid container>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Button size="large"
                variant={tab? "contained" : "outlined"}
                color="secondary"
                onClick={this.ongoingTab}
                >Explore</Button>
            <Button 
                size="large"
                variant={tab? "outlined" : "contained"}
                color="secondary"
                onClick={this.completeTab}
                >My Market</Button>
          </Grid>
        </Grid>
        <div className="py-3" />
        {tab? 
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Button size="small"
                variant={current_index == 0 ?"contained":"outlined"}
                color="secondary"
                onClick={() => this.tabbed(0)}>
                  All
                </Button>
            
                {categories.map((cat) => (
                  <Button size="small"
                  variant={current_index == cat.id ?"contained":"outlined"}
                  color="secondary"
                  onClick={() => this.tabbed(cat.id)}>
                    {cat.category_name}
                </Button>
              ))}
          </Grid>
          {category.map((ne) => (
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <MarketCard />
          </Grid>
          ))}
        </Grid>:
        <Grid container spacing={3}>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <MarketCard />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <MarketCard />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <MarketCard />
          </Grid>
        </Grid>}
      </div>
    );
  }
  }

const actionCreators = {
  logout: userActions.logout,
  deactivateAutoSaveLoan: userActions.deactivateAutoSaveLoan,
  createSaveToLoanSavings: userActions.createSaveToLoanSavings,
  addFundSaveToLoanSavings:userActions.addFundSaveToLoanSavings,
  // withdrawSaveToLoanSavings: userActions.withdrawSaveToLoanSavings
  exitLoanSavings: userActions.exitLoanSavings
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Market))
);