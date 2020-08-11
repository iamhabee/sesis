import React, { Component, Fragment } from "react";
import DoughnutChart from "../charts/echarts/Doughnut";
import { authHeader } from "../../redux/logic";
import ScrollCards from "./shared/ScrollCards";
import StatCards from "./shared/StatCards";
import TableCard from "./shared/TableCard";
import RowCards from "./shared/RowCards";
import { withRouter } from "react-router-dom";
import UpgradeCard from "./shared/UpgradeCard";
import { withStyles } from "@material-ui/styles";
import { payID, getConfig, numberFormat } from '../../config/config'
import swal from 'sweetalert'
import { userActions } from "../../redux/actions/user.actions";
import { connect } from "react-redux";
import Lottie from 'react-lottie';
import cube from "../../../lottiefiles/26519-cube-spinning";
import CloseIcon from "@material-ui/icons/Close";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Icon,
  Select,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  Dialog,
  Grid, Card, Button, TextField, MenuItem, CircularProgress
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "date-fns";
import PaystackButton from 'react-paystack';
import ScrollBar from "react-perfect-scrollbar";
import PayOption from "./shared/PayOption";
import Loading from "matx/components/MatxLoading/MatxLoading";

class Dashboard1 extends Component {
  constructor(props){
    super(props)
    let email =  localStorage.getItem('email');
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let entry_date = currentDate.getFullYear() + "-" + month + "-" + day;
    this.state = { 
                data: {
                  id:"",
                  acct_type:"",
                  amount: "",
                  date_time: entry_date,
                  payment_method: "Wallet",
                  target_name:"",
                  paystack_id: payID()
                },
                key: payID(),
                opened :false, 
                back:false, 
                loading: true, 
                wallet_balance:0 ,
                regular_balance:0,
                market_balance: 0,
                halal_balance: 0,
                loan_balance:0,
                target_balance:0,
                transactions:[],
                error: "",
                show:false,
                continued: false,
                email: email,
                accounts:[]
                } ;
            this.handleClose = this.handleClose.bind(this);
            this.handleClickOpen = this.handleClickOpen.bind(this);
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
}

callback = (response) => {
  this.setState({ submitted: true });
  const { data, key } = this.state;
  
  if (data.acct_type && data.amount) {
    this.setState({data:{...data, paystack_id: response.reference }}, () => {
    if(data.acct_type == "Wallet"){
      this.props.saveWallet(data)
    }else if(data.acct_type == "Regular Savings"){
        this.props.addFundRegularSavings(data);
    }else if(data.acct_type == "Save To Loan"){
        this.props.addFundSaveToLoanSavings(data)
    }else{
        this.props.addFundTargetSavings(data);
    }
  })
     
  }
console.log(response);  
}
getReference = () => {
let text = "";
let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";
for( let i=0; i < 15; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));
return text;
}
close = () => {
console.log("Payment closed");
}

handleSubmit(acct_type) {
  const { data } = this.state;
  if (data.amount && data.acct_type) {
    if(acct_type == "Wallet"){
        this.props.saveWallet(data)
    }else if(acct_type == "Regular Savings"){
        this.props.addFundRegularSavings(data);
    }else if(acct_type == "Save To Loan"){
        this.props.addFundSaveToLoanSavings(data)
    }else{
        this.props.addFundTargetSavings(data);
    }
  }else{
      swal(
          `${"All fields are required"}`
      );
  }
}

handleChange(event) {
const { name, value } = event.target;
const { data, accounts } = this.state;
if(name == "target_name"){
    accounts.forEach(dat => {
      if(dat.target_name == value){
        this.setState({data:{...data, id:dat.id, [name]:dat.target_name}})
      }
    });
}else if(name == "acct_type" && value == "Wallet"){
  this.setState({ data: { ...data, [name]: value, "payment_method": "Bank Account" }});
}else{
  this.setState({ data: { ...data, [name]: value }});
  }
}
handleClickOpen() {
  this.setState({show:true});
}

handleClose() {
  this.setState({show:false});
}
componentDidMount(){
const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
};
fetch(getConfig("showWalletBalance"), requestOptions)
.then(async response => {
    const wal_data = await response.json();
    if (!response.ok) {
        const error = (wal_data && wal_data.message) || response.statusText;
        this.setState({loading:false})
        return Promise.reject(error);
    }
    this.setState({wallet_balance: wal_data})
})
.catch((error) => {
    if (error === "Unauthorized") {
      this.props.logout()
    }
});
fetch(getConfig('fetchAllTarget'), requestOptions)
      .then(async response => {
      const data = await response.json();
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      if(data.success == false){
        this.setState({accounts:[]})  
      }else{
        this.setState({accounts:data[1]}) 
      }
    })
    .catch(error => {
        if (error === "Unauthorized") {
          this.props.logout()
          }
    });
fetch(getConfig("totalFundSaveToLoanSavings"), requestOptions)
.then(async response => {
    const loan_data = await response.json();
    if (!response.ok) {
        const error = (loan_data && loan_data.message) || response.statusText;
        this.setState({loading:false})
        return Promise.reject(error);
    }
    if(loan_data.success == false){
      this.setState({loan_balance: 0})  
    }else{
      this.setState({loan_balance: loan_data[1]})  
    }
})
.catch((error) => {
    if (error === "Unauthorized") {
      this.props.logout()
    }
});
fetch(getConfig("totalTargetFund"), requestOptions)
.then(async response => {
    const target_balance = await response.json();
    if (!response.ok) {
        const error = (target_balance && target_balance.message) || response.statusText;
        this.setState({loading:false})
        return Promise.reject(error);
    }
    if(target_balance.success == false){
      this.setState({target_balance: 0}) 
    }else{
      this.setState({target_balance: target_balance}) 
    }
})
.catch((error) => {
    if (error === "Unauthorized") {
      this.props.logout()
    }
});
fetch(getConfig("getTotalMarketFund"), requestOptions)
.then(async (response) => {
    const market_data = await response.json();
    if (!response.ok) {
    const error = (market_data && market_data.message) || response.statusText;
    this.setState({loading: false });
    return Promise.reject(error);
    }
    if(market_data.success == false){
      this.setState({ market_balance: 0});
    }else{
      this.setState({ market_balance: market_data});
    }
    
})
.catch((error) => {
    if (error === "Unauthorized") {
      this.props.logout()
    }
});
fetch(getConfig("getTotalHalalFund"), requestOptions)
.then(async (response) => {
        const halal_data = await response.json();
        if (!response.ok) {
        const error = (halal_data && halal_data.message) || response.statusText;
        this.setState({loading: false });
        return Promise.reject(error);
        }
        if(halal_data.success == false){
          this.setState({ halal_balance: 0});
        }else{
          this.setState({ halal_balance: halal_data});
        }
})
.catch((error) => {
    if (error === "Unauthorized") {
      this.props.logout()
    }
});
fetch(getConfig("showTransaction"), requestOptions)
.then(async (response) => {
            const data = await response.json();
            if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            this.setState({loading: false });
            return Promise.reject(error);
            }
            if(data.success == false){
              this.setState({ transactions: []});
            }else{
              this.setState({ transactions: data.data});
            }
})
.catch((error) => {
        if (error === "Unauthorized") {
          this.props.logout()
        }
});
fetch(getConfig("totalFundRegularSavings"), requestOptions)
.then(async response => {
    const reg_data = await response.json();
    if (!response.ok) {
        const error = (reg_data && reg_data.message) || response.statusText;
        this.setState({loading:false})
        return Promise.reject(error);
    }
    if(reg_data.success == false){
      this.setState({regular_balance: 0, loading:false})
    }else{
      this.setState({regular_balance: reg_data, loading:false})
    }
})
.catch(error => {
    if (error === "Unauthorized") {
        swal(
            `${"Authentication Token Expired"}`
          );
          this.props.logout()
      }else if(error === "Sorry, No records found"){
        this.setState({loading:false});
      }else{
        this.setState({loading:false, error:"internet error"});
        swal(
            `${"No internet, please check your internet and try again"}`
        );
      }
    
});
}

  render() {
    let { theme } = this.props;
    const {error, accounts, show, wallet_balance, data, email, loading, transactions, target_balance, continued, regular_balance, market_balance, loan_balance, halal_balance} = this.state
    return (
      <div >
        {loading ?
        <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
          <Loading />
        </div>:
        <Fragment>
        <div className="pb-24 pt-7 px-8 bg-default">
        </div>
        <div className="analytics pt-7 m-sm-30 mt--18">
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <StatCards
                  wallet_balance={numberFormat(wallet_balance)} 
                  halal_balance={numberFormat(halal_balance)}
                  market_balance={numberFormat(market_balance)}
                  regular_balance={numberFormat(regular_balance)}
                  target_balance={numberFormat(target_balance)}
                  loan_balance={numberFormat(loan_balance)}
                  openModal={this.handleClickOpen}/>
                  {/* <ScrollCards /> */}
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <h4 className="card-title text-muted mb-4">Todo List</h4>
              <RowCards wallet={wallet_balance}/>
              <Card className="px-6 py-4 mb-6">
                <div className="card-title">My Acounts</div>
                {/* <div className="card-subtitle">Last 30 days</div> */}
                <DoughnutChart
                  height="300px"
                  color={[
                    theme.palette.primary.dark,
                    theme.palette.primary.main,
                    theme.palette.primary.light
                  ]}
                  regular_value={regular_balance} 
                  target_value={regular_balance} 
                  loan_value={loan_balance}
                />
              </Card>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <UpgradeCard />
              <h4 className="card-title text-muted mb-4">Latest Transactions</h4>
              <TableCard transactions={transactions}/>
              {/* <Campaigns /> */}
            </Grid>
          </Grid>
        </div>
        <Dialog
        open={show}
        onClose={this.handleClose}
      >
        <AppBar style={{position: "relative", backgroundColor:"#d8b71e"}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="white"
              onClick={this.handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography className="text-white" variant="h6" style={{marginLeft: theme.spacing(2), flex: 1}}>
              Fund Your Account
            </Typography>
          </Toolbar>
        </AppBar>
        <Card className="px-6 pt-2 pb-4">
        <ValidatorForm
          ref="form"
          onSubmit={()=>this.handleSubmit(data.acct_type)}
          onError={errors => null}
        >
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="mb-4 w-full"
                label="Enter Amount"
                onChange={this.handleChange}
                type="number"
                name="amount"
                value={data.amount}
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
               <TextField
               className="mb-4 w-full"
                id="standard-select-currency"
                select
                label="Select Package"
                value={data.acct_type}
                name="acct_type"
                onChange={this.handleChange}
                helperText="Please select a Package"
              >
                <MenuItem value={"Regular Savings"}> Regular Savings</MenuItem>
                <MenuItem value={"Save To Loan"}> Save To Loan</MenuItem>
                <MenuItem value={"Target Savings"}> Target Savings</MenuItem>
                <MenuItem value={"Wallet"}> Wallet </MenuItem>
              </TextField>
              {data.acct_type == "Target Savings" &&
              <TextField
               className="mb-4 w-full"
                id="standard-select-currency"
                select
                label="Select Target Plan"
                value={data.target_name}
                name="target_name"
                onChange={this.handleChange}
                helperText="Please select a Target Plan"
              >
                <MenuItem value={""}> </MenuItem>
                {accounts.map((data, index)=>(
                  <MenuItem key={index} value={data.target_name}> {data.target_name} </MenuItem>
                ))}
              </TextField>}
              {data.acct_type != "Wallet" &&
              <TextField
               className="mb-4 w-full"
                id="standard-select-currency"
                select
                label="Select payment method"
                value={data.payment_method}
                name="payment_method"
                onChange={this.handleChange}
                helperText="Please select Payment Method"
              >
                  <MenuItem value={"Wallet"}> Wallet</MenuItem>
                  <MenuItem value={"Bank Account"}> Bank Account</MenuItem>
              </TextField>}
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Card className="px-6 pt-2 pb-4">
                <Typography variant="h6" gutterBottom>
                  {numberFormat(data.amount)}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {data.acct_type}
                </Typography>
              </Card>
              {data.payment_method == "Bank Account" && 
              <PayOption callback={this.callback} amount={data.amount}/>}
            </Grid>
          </Grid>
          {this.props.savings &&
            <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          }
          {data.payment_method == "Wallet" &&
          <Button color="secondary" className="text-white" variant="contained" type="submit">
            <Icon>send</Icon>
            <span className="pl-2 capitalize">Save</span>
          </Button>}
        </ValidatorForm>
        </Card>
      </Dialog>
    </Fragment>
    }
  </div>
    );
  }
}

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
// export default withStyles({}, { withTheme: true })(Dashboard1);
const actionCreators = {
  saveWallet: userActions.saveWallet,
  addFundRegularSavings: userActions.addFundRegularSavings,
  addFundTargetSavings: userActions.addFundTargetSavings,
  addFundSaveToLoanSavings: userActions.addFundSaveToLoanSavings,
  logout: userActions.logout,
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Dashboard1))
);