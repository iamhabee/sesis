import React, { Component } from "react";
import PaginationTable from "./PaginationTable";
import { Breadcrumb, SimpleCard } from "matx";
import StatCards2 from "../../dashboard/shared/StatCards2";
import {getConfig, payID, numberFormat} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import Lottie from 'react-lottie';
import cube from "../../../../lottiefiles/26519-cube-spinning";
import CloseIcon from "@material-ui/icons/Close";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Loading from "matx/components/MatxLoading/MatxLoading";
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
import "date-fns";
import PayOption from "app/views/dashboard/shared/PayOption";
class Wallet extends Component{
  constructor(props){
    super(props)
    let email =  localStorage.getItem('email');
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let entry_date = currentDate.getFullYear() + "-" + month + "-" + day;
    this.state = {
      data: {
        amount: "",
        date_time: entry_date,
        payment_method: "Bank Account",
        paystack_id: payID()
    },
      key: payID(),
      savings: [],
      loading: true,
      wallet_bal: "0.00",
      wallet: [],
      pagination:[],
      show: false,
      show_withdraw: false,
      email:email,
      bank_details:null
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClickOpenWithdraw = this.handleClickOpenWithdraw.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseWithdraw = this.handleCloseWithdraw.bind(this);
    this.handleChange = this.handleChange.bind(this);
    const requestOptions = {
      method: "GET",
      headers: { ...authHeader(), "Content-Type": "application/json" },
    };
    let user = JSON.parse(localStorage.getItem("user"));
    fetch(getConfig("showWalletBalance"), requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          this.setState({bad_response:true, loading: false });
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        this.setState({ wallet_bal: data});
      })
      .catch((error) => {
        if (error === "Unauthorized") {
          this.props.logout()
        }
      });
      fetch(getConfig('getBank'), requestOptions)
            .then(async response => {
            const res = await response.json();
            if (!response.ok) {
              this.setState({loading: false });
              const error = (res && res.message) || response.statusText;
              return Promise.reject(error);
            }
            console.log(res)
              this.setState({bank_details: res[0]})
          })
          .catch(error => {
          if (error === "Unauthorized") {
            this.props.logout()
          }
        });
      fetch(getConfig("showWallet"), requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        this.setState({ wallet: data.data, pagination: data, loading: false });
      })
      .catch((error) => {
        if (error === "Unauthorized") {
          this.props.logout()
        }
        if(error == "Sorry, No Record found!"){
          this.setState({loading:false});
         }else{
          this.setState({loading:false});
         }
      });
  }

  callback = (response) => {
    this.setState({ submitted: true });
    const { data, key } = this.state;
    
    if (data.amount) {
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
handleClickOpenWithdraw() {
  this.setState({show_withdraw:true});
}

handleCloseWithdraw() {
  this.setState({show_withdraw:false});
}
  render(){
    let {theme} = this.props
    const {pagination,wallet_bal, wallet, bank_details, loading, show, show_withdraw, data, email} = this.state
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Wallet" }
            ]}
          />
        </div>
        {loading ?
        <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
          <Loading />
        </div>:
        <>
        <div className="pb-7 pt-7 px-8 bg-secondary">
        <Grid container spacing={3}>
            <Grid item lg={9} md={9} sm={12} xs={12}>
              <StatCards2 title={"Wallet Balance"} icon={"account_balance_wallet"} amount={numberFormat(wallet_bal)}/>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <Button className="uppercase"
                size="large"
                variant="contained"
                style={{backgroundColor:"#222a45", color:"white"}}  onClick={this.handleClickOpen}>Add Fund</Button>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <Button className="uppercase"
                size="small"
                variant="contained"
                style={{backgroundColor:"#222a45", color:"white"}}  onClick={this.handleClickOpenWithdraw}>Withdraw</Button>
            </Grid>
        </Grid>
        </div>
        <div className="py-3" />
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
              <SimpleCard title="Wallet Table">
                <PaginationTable transactions={wallet} pagination={pagination}/>
              </SimpleCard>
          </Grid>
        </Grid>
        
        <Dialog
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
            onError={errors => null}>
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
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Card className="px-6 pt-2 pb-4">
                  <Typography variant="h6" gutterBottom>
                    {numberFormat(data.amount)}
                  </Typography>
                </Card>
                <PayOption callback={()=>this.callback} amount={data.amount}/>
              </Grid>
            </Grid>
          </ValidatorForm>
        </Card>
      </Dialog>
        {/* withdraw Dialog start */}
        <Dialog
                open={show_withdraw}
                onClose={this.handleCloseWithdraw}
              >
                <AppBar style={{position: "relative"}}>
                  <Toolbar>
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={this.handleCloseWithdraw}
                      aria-label="Close"
                    >
                      <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" style={{marginLeft: theme.spacing(2), flex: 1}}>
                      Withdraw To Bank Account
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
                        <Grid container lg={6} md={6} sm={12} xs={12}>
                            {bank_details == null ?
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <Typography variant="subtitle1">
                                Please Go to settings to add Bank details
                              </Typography>
                            </Grid>:
                            <>
                            <Grid item lg={8} md={8} sm={6} xs={6}>
                              <Typography variant="subtitle1">
                              Bank Name:
                              </Typography>
                            </Grid>
                            <Grid item lg={4} md={4} sm={6} xs={6}>
                              <Typography variant="subtitle1">
                                {bank_details.bank_name}
                              </Typography>
                            </Grid>
                            <Grid item lg={8} md={8} sm={6} xs={6}>
                              <Typography variant="subtitle1">
                              Account Name:
                              </Typography>
                            </Grid>
                            <Grid item lg={4} md={4} sm={6} xs={6}>
                              <Typography variant="subtitle1">
                                {bank_details.account_name}
                              </Typography>
                            </Grid>
                            <Grid item lg={8} md={8} sm={6} xs={6}>
                              <Typography variant="subtitle1">
                              Account Number:
                              </Typography>
                            </Grid>
                            <Grid item lg={4} md={4} sm={6} xs={6}>
                              <Typography variant="subtitle1">
                                {bank_details.account_no}
                              </Typography>
                            </Grid>
                            </>}
                        </Grid>
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Card className="px-6 pt-2 pb-4">
                        <Typography variant="h6" gutterBottom>
                          {numberFormat(data.amount)}
                        </Typography>
                      </Card>
                    </Grid>
                  </Grid>
                </ValidatorForm>
                </Card>
              </Dialog>
        {/* withdraw dialog end */}
        </>
  }
     </div>
    );
  };
}

// export default Wallet;
const actionCreators = {
  logout: userActions.logout,
  saveWallet: userActions.saveWallet
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Wallet))
);
