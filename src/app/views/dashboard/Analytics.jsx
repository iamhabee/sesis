import React, { Component, Fragment } from "react";
import DoughnutChart from "../charts/echarts/Doughnut";
import { authHeader } from "../../redux/logic";
import StatCards from "./shared/StatCards";
import TableCard from "./shared/TableCard";
import RowCards from "./shared/RowCards";
import { withRouter } from "react-router-dom";
import UpgradeCard from "./shared/UpgradeCard";
import { withStyles } from "@material-ui/styles";
import { checkToken, payID, getConfig, numberFormat } from '../../config/config'
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
  Grid, Card, Button, TextField, MenuItem
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "date-fns";
import PaystackButton from 'react-paystack';

class Dashboard1 extends Component {
  constructor(props){
    super(props)
    checkToken()
    let email =  localStorage.getItem('email');
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let entry_date = currentDate.getFullYear() + "-" + month + "-" + day;
    this.state = { 
                data: {
                    acct_type:"",
                    amount: "",
                    entry_date: entry_date,
                    payment_method: "",
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
                email: email
                } ;
            this.handleClose = this.handleClose.bind(this);
            this.handleClickOpen = this.handleClickOpen.bind(this);
            this.handleChange = this.handleChange.bind(this);
}

callback = (response) => {
  this.setState({ submitted: true });
  const { data, key } = this.state;
  
  if (data.entry_date && data.amount) {
     this.props.saveWallet(data); 
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

handleChange(event) {
const { name, value } = event.target;
const { data } = this.state;
this.setState({
    data: {
        ...data,
        [name]: value
    }
});
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
fetch(getConfig("totalFundSaveToLoanSavings"), requestOptions)
.then(async response => {
    const loan_data = await response.json();
    if (!response.ok) {
        const error = (loan_data && loan_data.message) || response.statusText;
        this.setState({loading:false})
        return Promise.reject(error);
    }
    this.setState({loan_balance: loan_data[1]}) 
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
    console.log(target_balance)
    this.setState({target_balance: target_balance}) 
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
    this.setState({ market_balance: market_data});
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
        this.setState({ halal_balance: halal_data});
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
            this.setState({ transactions: data.data});
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
    this.setState({regular_balance: reg_data, loading:false})
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
    const {error, show, wallet_balance, data, email, loading, transactions, target_balance, continued, regular_balance, market_balance, loan_balance, halal_balance} = this.state
    return (
      <div >
        {loading ?
        <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: cube,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }}
          height={80}
          width={80}
        />
        Loading...
        </div>:
        <Fragment>
        <div className="pb-24 pt-7 px-8 bg-secondary">
        </div>
        <div className="analytics m-sm-30 mt--18">
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
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <h4 className="card-title text-muted mb-4">Todo List</h4>
              <RowCards />
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
              <h4 className="card-title text-muted mb-4">Latest Transactions</h4>
              <TableCard transactions={transactions}/>

              <UpgradeCard />

              {/* <Campaigns /> */}
            </Grid>
          </Grid>
        </div>
        <Dialog
        fullScreen
        open={show}
        onClose={this.handleClose}
      >
        <AppBar style={{position: "relative"}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={this.handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" style={{marginLeft: theme.spacing(2), flex: 1}}>
              Fund Your Account
            </Typography>
          </Toolbar>
        </AppBar>
        <Card className="px-6 pt-2 pb-4">
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
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
                  <MenuItem value={"Save To Loan Savings"}> Save To Loan Savings</MenuItem>
                  <MenuItem value={"Wallet"}> Wallet </MenuItem>
              </TextField>
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
              </TextField>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Card className="px-6 pt-2 pb-4">
                <Typography variant="h6" gutterBottom>
                  {numberFormat(data.amount)}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {data.acct_type}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {data.payment_method}
                </Typography>
              </Card>
              {data.payment_method == "Bank Account" && 
              <PaystackButton
                  text="Make Payment"
                  className="payButton"
                  callback={this.callback}
                  close={this.close}
                  disabled={true}  
                  embed={true}  
                  reference={this.getReference()}
                  email={email}
                  amount={data.amount * 100}
                  paystackkey={this.state.key}
                  tag="button" 
              />}
            </Grid>
          </Grid>
          <Button color="primary" variant="contained" type="submit">
            <Icon>send</Icon>
            <span className="pl-2 capitalize">Submit</span>
          </Button>
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
  logout: userActions.logout,
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Dashboard1))
);