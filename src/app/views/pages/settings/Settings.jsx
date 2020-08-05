import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Grid, Card, Button,Typography, IconButton, CircularProgress, Toolbar, AppBar, Dialog, Hidden, Icon, Fab, MenuItem, TextField} from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";
import { Breadcrumb } from "matx";
import AccountProfile from './components/AccountProfile';
import AccountDetails from './components/AccountDetails';
import {getConfig, numberFormat, payID, checkToken} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import swal from 'sweetalert'
import Loading from "matx/components/MatxLoading/MatxLoading";


class Settings extends Component{
constructor(props){
  super(props)
  let email = localStorage.getItem('email');
  var currentDate = new Date();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();
  let entry_date = currentDate.getFullYear() + "-" + month + "-" + day;
  this.state ={
    editPassword:false,
    editBankDetails:false,
    withdrawFund:false,
    profile:{
      first_name:"",
      last_name:"",
      address:"",
      phone_no:"",
      email:"",
      kin_last_name:"",
      kin_first_name:"",
      kin_phone_no:"",
      kin_email:"",
      relatioship:"",
      profile_pic:""
    },
    password_data:{
      email:email,
      new_password:"",
      password_confirmation:""
    },
    withdraw_data:{
      amount: "",
      entry_date: entry_date,
      payment_method: "paystack",
      paystack_id: payID()
    },
    bank_data:[],
    banks: [],
    bank_code:'',
    completeness:25,
    loading:true,
    isFetching:true,
    isChecking:false,
    data_checker:false
  }
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
  this.handleSubmitBankDetails = this.handleSubmitBankDetails.bind(this);
  this.handleChangePassword = this.handleChangePassword.bind(this);
  this.handleChangeBankDetails = this.handleChangeBankDetails.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.showEditPassword = this.showEditPassword.bind(this);
  this.showEditBankDetails = this.showEditBankDetails.bind(this);
  this.showWithdraw = this.showWithdraw.bind(this);
  this.closeEditPassword = this.closeEditPassword.bind(this);
  this.closeEditBankDetails = this.closeEditBankDetails.bind(this);
  this.closeWithdraw = this.closeWithdraw.bind(this);
  this.check = this.check.bind(this);
  this.fetchBankDetails = this.fetchBankDetails.bind(this);
}
componentDidMount(){
  const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
      fetch(getConfig('showProfile'), requestOptions)
        .then(async response => {
        const data = await response.json();
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          console.log(data)
        if(data.success == false){
          this.setState({profile: []})
        }else{
          this.setState({profile: data[0]})
          if(data[0].relationship != ""){
            this.setState({completeness: 50}, 
            ()=>fetch(getConfig('getBank'), requestOptions).then(async res=>{
              const dat = await res.json();
              if (!res.ok) {
                const error = (dat && dat.message) || res.statusText;
                return Promise.reject(error);
              }
              if(dat.length == false || dat.length == 0){
                this.setState({isFetching:false, bank_data: []})
              }else{
                this.setState({isFetching:false, bank_data: dat[0], completeness: this.state.completeness+50})
              }
            }).catch(err=>{
                if (err === "Unauthorized") {
                  this.props.logout()
                }
            })
          )
      }else{
        fetch(getConfig('getBank'), requestOptions).then(async res=>{
            const dat = await res.json();
            if (!res.ok) {
              const error = (dat && dat.message) || res.statusText;
              return Promise.reject(error);
            }
            console.log(dat)
            if(dat.success == false || dat.length == 0){
              this.setState({isFetching:false, bank_data: []})
            }else{
              this.setState({isFetching:false, bank_data: dat[0], completeness: this.state.completeness+50})
            }
          }).catch(err=>{
              if (err === "Unauthorized") {
                this.props.logout()
              }
          })
        }
      }
    })
    .catch(error => {
       if (error === "Unauthorized") {
        this.props.logout()
       }
    });
}

fetchBankDetails=()=>{
  const requestOptions = {
    method: 'GET',
    headers: { 'authorization': 'Bearer sk_test_629b392e2345d122b5941f00b27cdd91957ca848', 'Content-Type': 'application/json' },
  };
  fetch('https://api.paystack.co/bank', requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      this.setState({ loading: false})
      return Promise.reject(error);
    }
    this.setState({banks: data.data})
  })
  .catch(error => {
    if (error === "Unauthorized") {
      this.props.logout()
    }
  });
  const requestOpt={
    method: 'GET',
    headers: { ...authHeader, 'Content-Type': 'application/json' },
    }
    fetch(getConfig('getBank'), requestOpt).then(async res=>{
      const dat = await res.json();
      if (!res.ok) {
        const error = (dat && dat.message) || res.statusText;
        return Promise.reject(error);
      }
      if(dat.success == false || dat.length == 0){
        this.setState({bank_data: [], loading: false, data_checker:false})
      }else{
        this.setState({bank_data: dat[0], loading: false, data_checker:true})
      }
    }).catch(err=>{
        if (err === "Unauthorized") {
          this.props.logout()
        }
      })
}

check = (e)=>{
  const {name, value} = e.target
  const { bank_data, bank_code } = this.state;
  this.setState({ bank_data:{ ...bank_data, [name]:value }, isChecking:true })
  if(e.target.value.length == 10){
    const requestOptions = {
      method: 'GET',
      headers: { 'authorization': 'Bearer sk_test_629b392e2345d122b5941f00b27cdd91957ca848', 'Content-Type': 'application/json' },
  };
    fetch('https://api.paystack.co/bank/resolve?account_number='+value+'&bank_code='+bank_code, requestOptions)
      .then(async response => {
      const res = await response.json();
      if (!response.ok) {
          const error = (bank_data && res.message) || response.statusText;
          return Promise.reject(error);
      }
      console.log(res)
      this.setState({
        bank_data:{
          ...bank_data, 
          account_no:res.data.account_number, 
          account_name:res.data.account_name, 
          bank_code: bank_code},
        isChecking:false
      })
    })
    .catch(error => {
      console.log(error)
      this.setState({isChecking:false})
      swal(
        `${"Invalid account, please check the account details and try again"}`
      );
    });
  }
}

handleSubmit=()=> {
  const {profile} = this.state
  if(profile.length != 0){
      this.props.updateProfile(profile); 
  }else{
      swal(
          `${"All fields are required"}`
      );
  }   
}
handleSubmitBankDetails(event) {
  event.preventDefault();
  const { bank_data, data_checker } = this.state;
  if (data_checker) {
      this.props.updateBank(bank_data);
  }else{
      this.props.saveBank(bank_data);
  }
}
handleSubmitPassword(event) {
  event.preventDefault();
  const { password_data } = this.state;
  console.log(password_data)
  if (password_data.email && password_data.new_password && password_data.password_confirmation) {
    if(password_data.new_password == password_data.password_confirmation){
      this.props.resetpassword(password_data);
    }else{
      swal(
        `Password Not Match`
      );
    }
  }else{
    swal(
        `${"All fields are required"}`
    );
}
}
handleChange = event => {
  const {profile} = this.state
  this.setState({ profile:{...profile, [event.target.name]: event.target.value} });
};
handleChangePassword = event => {
  const {password_data} = this.state
  this.setState({ password_data:{...password_data, [event.target.name]: event.target.value} });
};
handleChangeBankDetails(event) {
  event.preventDefault();
  const { name, value } = event.target;
  const { bank_data, banks} = this.state;
    this.setState({
      bank_data: {
        ...bank_data,
        [name]: banks[value].name,
        account_no:"",
        account_name:""
      },
      bank_code: banks[value].code,
      disabled:false
    }) 
}
showEditPassword=()=>{
  this.setState({editPassword:true})
}
showEditBankDetails=()=>{
  this.setState({loading:true})
  this.fetchBankDetails()
  this.setState({editBankDetails:true})
}
showWithdraw=()=>{
  this.setState({withdrawFund:true})
}
closeEditPassword=()=>{
  this.setState({editPassword:false})
}
closeEditBankDetails=()=>{
  this.setState({editBankDetails:false})
}
closeWithdraw=()=>{
  this.setState({withdrawFund:false})
}

render(){
    const {theme} = this.props
    const {profile, editPassword, isChecking, editBankDetails, withdrawFund, completeness, isFetching, withdraw_data, password_data, bank_data, banks, loading} = this.state
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Settings" }
            ]}
          />
        </div>
        {isFetching ?
        <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
          <Loading />
        </div>:
        <div >
          <Grid container spacing={4} >
            <Grid item lg={4} md={6} xl={4} xs={12} >
              <AccountProfile data={profile} completeness={completeness}/>

              <Card onClick={this.showEditPassword} className="py-2 px-4 project-card">
                <Grid container alignItems="center">
                  <Grid item md={6} xs={7}>
                    <div className="flex items-center">
                      <Hidden smDown>
                          <Fab
                            className="ml-4 bg-green box-shadow-none text-white"
                            size="small"
                          >
                            <Icon>star_outline</Icon>
                          </Fab>
                      </Hidden>
                    </div>
                  </Grid>
                  <Grid item md={6} xs={4}>
                    <div className="text-muted">
                      Change Password
                    </div>
                  </Grid>
                </Grid>
              </Card>
              <div className="py-2" />
              <Card onClick={this.showEditBankDetails} className="py-2 px-4 project-card">
                <Grid container alignItems="center">
                  <Grid item md={6} xs={7}>
                    <div className="flex items-center">
                      <Hidden smDown>
                          <Fab
                            className="ml-4 bg-green box-shadow-none text-white"
                            size="small"
                          >
                            <Icon>star_outline</Icon>
                          </Fab>
                      </Hidden>
                    </div>
                  </Grid>
                  <Grid item md={6} xs={4}>
                    <div className="text-muted">
                      Add Bank Details
                    </div>
                  </Grid>
                </Grid>
              </Card>
              <div className="py-2" />
              <Card onClick={this.showWithdraw} className="py-2 px-4 project-card">
                <Grid container alignItems="center">
                  <Grid item md={6} xs={7}>
                    <div className="flex items-center">
                      <Hidden smDown>
                          <Fab
                            className="ml-4 bg-green box-shadow-none text-white"
                            size="small"
                          >
                            <Icon>star_outline</Icon>
                          </Fab>
                      </Hidden>
                    </div>
                  </Grid>
                  <Grid item md={6} xs={4}>
                    <div className="text-muted">
                      Withdraw Fund
                    </div>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid  item lg={8} md={6} xl={8} xs={12} >
              <AccountDetails 
                savings={this.props.savings}
                profile={profile}
                handleChange={this.handleChange} 
                handleSubmit={this.handleSubmit}/>
            </Grid>
          </Grid>
        </div>}
        {/* Change Password Dialog Start */}
        <Dialog
          open={editPassword}
          onClose={this.closeEditPassword}>
          <AppBar color="secondary" style={{position: "relative"}}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.closeEditPassword}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className="text-white" style={{marginLeft: theme.spacing(2), flex: 1, color:"#fff"}}>
                Change Password
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-6 pt-2 pb-4">
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmitPassword}
              onError={errors => null}>
              <Grid container spacing={6}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextValidator
                    className="mb-4 w-full"
                    label="Enter New Password"
                    onChange={this.handleChangePassword}
                    type="password"
                    name="new_password"
                    value={password_data.new_password}
                    validators={[
                      "required"
                    ]}
                    errorMessages={["this field is required"]}
                  />
                  <TextValidator
                    className="mb-4 w-full"
                    label="Confirm New Password"
                    onChange={this.handleChangePassword}
                    type="password"
                    name="password_confirmation"
                    value={password_data.password_confirmation}
                    validators={[
                      "required"
                    ]}
                    errorMessages={["this field is required"]}
                  />
                {this.props.savings &&
                <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
                  <Button className="uppercase"
                    type="submit"
                    size="large"
                    color="secondary"
                    variant="contained"
                    style={{ color:"#fff"}}>
                    Change Password
                  </Button>
                </Grid>
              </Grid>
            </ValidatorForm>
          </Card>
        </Dialog>
        {/* Change Password Dialog End */}

        {/*Bank Details Dialog Start */}
        <Dialog
          open={editBankDetails}
          onClose={this.closeEditBankDetails}>
          <AppBar color="secondary" style={{position: "relative"}}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.closeEditBankDetails}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className="text-white" style={{marginLeft: theme.spacing(2), flex: 1, color:"#fff"}}>
                Change Bank details
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-6 pt-2 pb-4">
            {loading ? 
            <Typography>Loading...</Typography>:
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmitBankDetails}
              onError={errors => null}>
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    className="mb-4 w-full"
                    select
                    label="Select Frequency"
                    name="bank_name"
                    onChange={this.handleChangeBankDetails}
                    helperText="Please select Bank Name">
                    {banks.map((bank, index)=>(
                      <MenuItem key={index} value={index}>{bank.name}</MenuItem>
                    ))}
                  </TextField>
                  <TextValidator
                    className="mb-4 w-full"
                    label="Account Number"
                    onChange={this.check}
                    type="text"
                    name="account_no"
                    value={bank_data.account_no}
                    validators={[
                      "required"
                    ]}
                    errorMessages={["this field is required"]}
                  />
                  {isChecking && (
                    <CircularProgress
                      size={24}
                    />)}
                  <TextValidator
                    className="mb-4 w-full"
                    label="Account Name"
                    type="text"
                    name="account_name"
                    value={bank_data.account_name}
                    validators={[
                      "required"
                    ]}
                    errorMessages={["this field is required"]}
                  />
                  {this.props.savings &&
                  <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  }
                  <Button className="uppercase"
                    type="submit"
                    size="large"
                    variant="contained"
                    color="secondary"
                    style={{color:"#fff"}}>
                    Save 
                  </Button>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography variant="subtitle1">{bank_data.bank_name}</Typography>
                  <Typography variant="subtitle1">{bank_data.account_name}</Typography>
                  <Typography variant="subtitle1">{bank_data.account_no}</Typography>
                </Grid>
              </Grid>
            </ValidatorForm>}
          </Card>
        </Dialog>
        {/* Bank Details Dialog End */}

        {/* withdraw Dialog start */}
        <Dialog
          open={withdrawFund}
          onClose={this.closeWithdraw}>
          <AppBar color="secondary" style={{position: "relative"}}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.closeWithdraw}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" style={{marginLeft: theme.spacing(2), flex: 1, color:"#fff"}}>
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
                  value={withdraw_data.amount}
                  validators={[
                    "required"
                  ]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Card className="px-6 pt-2 pb-4">
                  <Typography variant="h6" gutterBottom>
                    {numberFormat(withdraw_data.amount)}
                  </Typography>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
                {bank_data.length == 0 ?
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Typography variant="subtitle1">
                    Please Go to settings to add Bank details
                  </Typography>
                </Grid>:
                <>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography variant="subtitle1">
                  Bank Name:
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography variant="subtitle1">
                    {bank_data.bank_name}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography variant="subtitle1">
                  Account Name:
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography variant="subtitle1">
                    {bank_data.account_name}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography variant="subtitle1">
                  Account Number:
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography variant="subtitle1">
                    {bank_data.account_no}
                  </Typography>
                </Grid>
                </>}
            </Grid>
            
          </ValidatorForm>
          </Card>
        </Dialog>
        {/* withdraw dialog end */}
      </div>
    );
  };
  
  }
const actionCreators = {
  logout: userActions.logout,
  updatePicture: userActions.updatePicture,
  updateProfile: userActions.updateProfile,
  resetpassword: userActions.resetpassword,
  saveBank: userActions.saveBank,
  updateBank: userActions.updateBank
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Settings))
);