import { Breadcrumb, SimpleCard } from "matx";
import React,{Component} from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {Typography, Grid, AppBar, Dialog, IconButton, Toolbar, Card, MenuItem, TextField } from "@material-ui/core";
import StatCards2 from "../../dashboard/shared/StatCards2";
import CloseIcon from "@material-ui/icons/Close";
import {getConfig, numberFormat, payID, checkToken} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import TodoList from "./components/TodoList";
import LoanCards from "./components/LoanCards";
import LoanGroupCard from "./components/LoanGroupCard";


class Loan extends Component {
  constructor(props){
    super(props)
    this.state={
      tab:true,
      showLoan:false,
      showGroup:false,
      showManage:false,
      showDetails:false,
      showrepayment:false,
      showManageLoan:false,
    }
    this.ongoingTab = this.ongoingTab.bind(this);
    this.completeTab = this.completeTab.bind(this);
    this.handleCreateLoan = this.handleCreateLoan.bind(this);
    this.handleCreateGroup = this.handleCreateGroup.bind(this);
    this.handleCreateManage = this.handleCreateManage.bind(this);
    this.handleCreateDetails = this.handleCreateDetails.bind(this);
    this.handleCreateRepayment = this.handleCreateRepayment.bind(this);
    this.handleCreateManageLoan = this.handleCreateManageLoan.bind(this);
    this.handleCloseLoan = this.handleCloseLoan.bind(this);
    this.handleCloseGroup = this.handleCloseGroup.bind(this);
    this.handleCloseManage = this.handleCloseManage.bind(this);
    this.handleCloseDetails = this.handleCloseDetails.bind(this);
    this.handleCloseRepayment = this.handleCloseRepayment.bind(this);
    this.handleCloseManageLoan = this.handleCloseManageLoan.bind(this);
  }
  
  componentDidMount() {
    const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
  fetch(getConfig("getLoanGroupName"), requestOptions)
  .then(async response => {
        const data = await response.json();
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            this.setState({loading:false});
            return Promise.reject(error);
        }
        this.setState({group_name:  data, loading:false})
    })
        .catch(error => {
        if (error === "Unauthorized") {
            this.props.logout()
          }
        this.setState({loading:false});
        console.error('There was an error!', error);
    });
}
// modal open handler
handleCreateLoan = () => {
  this.setState({showLoan: true});
}
handleCreateGroup = () => {
  this.setState({showGroup: true});
}
handleCreateManage = () => {
  this.setState({showManage: true});
}
handleCreateDetails = () => {
  this.setState({showDetails: true});
}
handleCreateRepayment = () => {
  this.setState({showrepayment: true});
}
handleCreateManageLoan = () => {
  this.setState({showManageLoan: true});
}

// modal close handler
handleCloseLoan() {
  this.setState({showLoan:false});
}
handleCloseGroup() {
  this.setState({showGroup:false});
}
handleCloseManage() {
  this.setState({showManage:false});
}
handleCloseDetails() {
  this.setState({showDetails:false});
}
handleCloseRepayment() {
  this.setState({showrepayment:false});
}
handleCloseManageLoan() {
  this.setState({showManageLoan:false});
}
// tab handler
ongoingTab() {
  this.setState({tab:true});

}
completeTab(){
this.setState({tab:false});
}
render(){
  const {tab, showLoan, showManage, showGroup, showDetails, showrepayment, showManageLoan} = this.state
  return (
    <div className="m-sm-30">
       <div className="mb-sm-30">
         <Breadcrumb
           routeSegments={[
             { name: "Loan" }
           ]}
         />
       </div>
       <div className="pb-5 pt-7 px-8 bg-default" style={{border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20,
             borderTopLeftRadius:20,}} >
          <Grid container spacing={10} direction="row" justify="space-between">
              <Grid item lg={9} md={9} sm={12} xs={12}>
                <TodoList />
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12} >
                <Button className="uppercase"
                  size="large"
                  variant="contained"
                  style={{backgroundColor:"#04956a", color:"white", borderBottomRightRadius:10, borderTopLeftRadius:10}}
                  onClick={this.handleCreateLoan}>
                   Request Loan
                </Button>
              </Grid>
          </Grid>
          <Grid container spacing={8}>
              <Grid item lg={8} md={8} sm={4} xs={4}>
                <Button className="uppercase"
                  size="large"
                  variant="contained"
                  style={{borderBottomRightRadius:10, borderTopLeftRadius:10, backgroundColor:"#04956a",color:"white"}}
                  onClick={this.handleCreateGroup}>
                    Create Group
                </Button>
              </Grid>
          </Grid>
        </div>
        <div className="py-3" />
        <Grid container >
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography variant="h6">My Groups</Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={12} xs={12}>
            <div className="pb-5 pt-7 px-2 bg-default" style={{border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20,
                borderTopLeftRadius:20}}>
              <LoanGroupCard details={this.handleCreateDetails} manage={this.handleCreateManage}/>
            </div>
            </Grid>
        </Grid>
        <div className="py-3" />
        <Grid container >
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h6">My Loans</Typography>
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <div className="pb-5 px-2 bg-default" style={{border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20,
                  borderTopLeftRadius:20}}>
              <Grid item lg={8} md={8} sm={12} xs={12}>
                <Button size="small"
                    variant={tab? "contained" : "outlined"}
                    style={{backgroundColor: tab ? "#04956a":"", color:tab? "#fff":"#000"}}
                    onClick={this.ongoingTab}
                    >Ongoing</Button>
                <Button 
                    size="small"
                    variant={tab? "outlined" : "contained"}
                    style={{backgroundColor: tab ? "":"#04956a", color:tab? "#000":"#fff"}}
                    onClick={this.completeTab}
                    >Completed</Button>
              </Grid>
              <div className="py-3" />
              <LoanCards repayment={this.handleCreateRepayment} view={this.handleCreateManageLoan}/>
            </div>
          </Grid>
        </Grid>
    {/* Quick Loan Dialog Start */}
    <Dialog
      open={showLoan}
      onClose={this.handleCloseLoan} >
      <AppBar style={{position: "relative", backgroundColor:"#e74398"}}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={this.handleCloseLoan}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
            Create Loan Request
          </Typography>
        </Toolbar>
      </AppBar>
      <Card className="px-6 pt-2 pb-4">
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => null}
              >
                <TextValidator
                className="mb-4 w-full"
                label="Enter Target Name"
                onChange={this.handleChange}
                type="text"
                name="target_name"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                label="Frequent Savings Amount"
                onChange={this.handleChange}
                type="number"
                name="amount"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                label="Overall Targeted Amount"
                onChange={this.handleChange}
                type="number"
                name="targeted_amount"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextField
               className="mb-4 w-full"
                select
                label="Select Frequency"
                name="frequency"
                onChange={this.handleChange}
                helperText="Please select frequency"
              >
                  <MenuItem value={"Daily"}>Daily</MenuItem>
                  <MenuItem value={"Weekly"}> Weekly</MenuItem>
                  <MenuItem value={"Monthly"}> Monthly </MenuItem>
              </TextField>
              
              <TextField
                className="mb-4 w-full"
                select
                label=" Day of the Week"
                name="transaction_day"
                onChange={this.handleChange}
                helperText="Please select Day"
              >
                  <MenuItem value={"1"}>Monday</MenuItem>
                  <MenuItem value={"2"}>Tuesday</MenuItem>
                  <MenuItem value={"3"}>Wednesday</MenuItem>
                  <MenuItem value={"4"}>Thursday</MenuItem>
                  <MenuItem value={"5"}>Friday</MenuItem>
                  <MenuItem value={"6"}>Saturday</MenuItem>
                  <MenuItem value={"7"}>Sunday</MenuItem>
              </TextField>
              <TextValidator
                className="mb-4 w-full"
                onChange={this.handleChange}
                type="time"
                name="transaction_time"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                onChange={this.handleChange}
                type="date"
                name="start_date"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                onChange={this.handleChange}
                type="date"
                name="end_date"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextField
               className="mb-4 w-full"
                id="standard-select-currency"
                select
                label="Select Payment Method"
                name="payment_method"
                onChange={this.handleChange}
                helperText="Please select Payment Method"
              >
                  <MenuItem value={""}></MenuItem>
                  <MenuItem value={"Wallet"}> Wallet</MenuItem>
                  <MenuItem value={"Bank Account"}> Bank Account </MenuItem>
              </TextField>
              {this.props.savings &&
               <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }
              <Button className="uppercase"
                  type="submit"
                  size="large"
                  variant="contained"
                 style={{backgroundColor:"#e74398", color:"white"}}>Create Target Plan</Button>
                 </ValidatorForm>
            </Grid>

            <Grid container lg={6} md={6} sm={12} xs={12}>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Target Name
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Amount
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Target Amount
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Frequency
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Payment Method
                    </Typography>
                  </Grid>
                  
                </Grid>
            </Grid>
          </Grid>
        </Card>

    </Dialog>
    {/* Quick Loan Dialog End */}

    {/* Loan group Dialog Start */}
    <Dialog
      open={showGroup}
      onClose={this.handleCloseGroup} >
      <AppBar style={{position: "relative", backgroundColor:"#e74398"}}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={this.handleCloseGroup}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
            Create Group
          </Typography>
        </Toolbar>
      </AppBar>
      <Card className="px-6 pt-2 pb-4">
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => null}
              >
                <TextValidator
                className="mb-4 w-full"
                label="Enter Target Name"
                onChange={this.handleChange}
                type="text"
                name="target_name"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                label="Frequent Savings Amount"
                onChange={this.handleChange}
                type="number"
                name="amount"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                label="Overall Targeted Amount"
                onChange={this.handleChange}
                type="number"
                name="targeted_amount"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextField
               className="mb-4 w-full"
                select
                label="Select Frequency"
                name="frequency"
                onChange={this.handleChange}
                helperText="Please select frequency"
              >
                  <MenuItem value={"Daily"}>Daily</MenuItem>
                  <MenuItem value={"Weekly"}> Weekly</MenuItem>
                  <MenuItem value={"Monthly"}> Monthly </MenuItem>
              </TextField>
              
              <TextField
                className="mb-4 w-full"
                select
                label=" Day of the Week"
                name="transaction_day"
                onChange={this.handleChange}
                helperText="Please select Day"
              >
                  <MenuItem value={"1"}>Monday</MenuItem>
                  <MenuItem value={"2"}>Tuesday</MenuItem>
                  <MenuItem value={"3"}>Wednesday</MenuItem>
                  <MenuItem value={"4"}>Thursday</MenuItem>
                  <MenuItem value={"5"}>Friday</MenuItem>
                  <MenuItem value={"6"}>Saturday</MenuItem>
                  <MenuItem value={"7"}>Sunday</MenuItem>
              </TextField>
              <TextValidator
                className="mb-4 w-full"
                onChange={this.handleChange}
                type="time"
                name="transaction_time"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                onChange={this.handleChange}
                type="date"
                name="start_date"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                onChange={this.handleChange}
                type="date"
                name="end_date"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextField
               className="mb-4 w-full"
                id="standard-select-currency"
                select
                label="Select Payment Method"
                name="payment_method"
                onChange={this.handleChange}
                helperText="Please select Payment Method"
              >
                  <MenuItem value={""}></MenuItem>
                  <MenuItem value={"Wallet"}> Wallet</MenuItem>
                  <MenuItem value={"Bank Account"}> Bank Account </MenuItem>
              </TextField>
              {this.props.savings &&
               <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }
              <Button className="uppercase"
                  type="submit"
                  size="large"
                  variant="contained"
                 style={{backgroundColor:"#e74398", color:"white"}}>Create Target Plan</Button>
                 </ValidatorForm>
            </Grid>

            <Grid container lg={6} md={6} sm={12} xs={12}>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Target Name
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Amount
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Target Amount
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Frequency
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Payment Method
                    </Typography>
                  </Grid>
                  
                </Grid>
            </Grid>
          </Grid>
        </Card>

    </Dialog>
    {/* Loan group Dialog End */}

    {/* Manage Group Dialog Start */}
    <Dialog
      open={showManage}
      onClose={this.handleCloseManage} >
      <AppBar style={{position: "relative", backgroundColor:"#e74398"}}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={this.handleCloseManage}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
            Manage Group
          </Typography>
        </Toolbar>
      </AppBar>
      <Card className="px-6 pt-2 pb-4">
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => null}
              >
                <TextValidator
                className="mb-4 w-full"
                label="Enter Target Name"
                onChange={this.handleChange}
                type="text"
                name="target_name"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                label="Frequent Savings Amount"
                onChange={this.handleChange}
                type="number"
                name="amount"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                label="Overall Targeted Amount"
                onChange={this.handleChange}
                type="number"
                name="targeted_amount"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextField
               className="mb-4 w-full"
                select
                label="Select Frequency"
                name="frequency"
                onChange={this.handleChange}
                helperText="Please select frequency"
              >
                  <MenuItem value={"Daily"}>Daily</MenuItem>
                  <MenuItem value={"Weekly"}> Weekly</MenuItem>
                  <MenuItem value={"Monthly"}> Monthly </MenuItem>
              </TextField>
              
              <TextField
                className="mb-4 w-full"
                select
                label=" Day of the Week"
                name="transaction_day"
                onChange={this.handleChange}
                helperText="Please select Day"
              >
                  <MenuItem value={"1"}>Monday</MenuItem>
                  <MenuItem value={"2"}>Tuesday</MenuItem>
                  <MenuItem value={"3"}>Wednesday</MenuItem>
                  <MenuItem value={"4"}>Thursday</MenuItem>
                  <MenuItem value={"5"}>Friday</MenuItem>
                  <MenuItem value={"6"}>Saturday</MenuItem>
                  <MenuItem value={"7"}>Sunday</MenuItem>
              </TextField>
              <TextValidator
                className="mb-4 w-full"
                onChange={this.handleChange}
                type="time"
                name="transaction_time"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                onChange={this.handleChange}
                type="date"
                name="start_date"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                onChange={this.handleChange}
                type="date"
                name="end_date"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextField
               className="mb-4 w-full"
                id="standard-select-currency"
                select
                label="Select Payment Method"
                name="payment_method"
                onChange={this.handleChange}
                helperText="Please select Payment Method"
              >
                  <MenuItem value={""}></MenuItem>
                  <MenuItem value={"Wallet"}> Wallet</MenuItem>
                  <MenuItem value={"Bank Account"}> Bank Account </MenuItem>
              </TextField>
              {this.props.savings &&
               <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }
              <Button className="uppercase"
                  type="submit"
                  size="large"
                  variant="contained"
                 style={{backgroundColor:"#e74398", color:"white"}}>Create Target Plan</Button>
                 </ValidatorForm>
            </Grid>

            <Grid container lg={6} md={6} sm={12} xs={12}>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Target Name
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Amount
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Target Amount
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Frequency
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Payment Method
                    </Typography>
                  </Grid>
                  
                </Grid>
            </Grid>
          </Grid>
        </Card>

    </Dialog>
    {/* Manage Group Dialog End */}

    {/* Loan Details Dialog Start */}
    <Dialog
      open={showDetails}
      onClose={this.handleCloseDetails} >
      <AppBar style={{position: "relative", backgroundColor:"#e74398"}}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={this.handleCloseDetails}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
            Loan Details
          </Typography>
        </Toolbar>
      </AppBar>
      <Card className="px-6 pt-2 pb-4">
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => null}
              >
                <TextValidator
                className="mb-4 w-full"
                label="Enter Target Name"
                onChange={this.handleChange}
                type="text"
                name="target_name"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                label="Frequent Savings Amount"
                onChange={this.handleChange}
                type="number"
                name="amount"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                label="Overall Targeted Amount"
                onChange={this.handleChange}
                type="number"
                name="targeted_amount"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextField
               className="mb-4 w-full"
                select
                label="Select Frequency"
                name="frequency"
                onChange={this.handleChange}
                helperText="Please select frequency"
              >
                  <MenuItem value={"Daily"}>Daily</MenuItem>
                  <MenuItem value={"Weekly"}> Weekly</MenuItem>
                  <MenuItem value={"Monthly"}> Monthly </MenuItem>
              </TextField>
              
              <TextField
                className="mb-4 w-full"
                select
                label=" Day of the Week"
                name="transaction_day"
                onChange={this.handleChange}
                helperText="Please select Day"
              >
                  <MenuItem value={"1"}>Monday</MenuItem>
                  <MenuItem value={"2"}>Tuesday</MenuItem>
                  <MenuItem value={"3"}>Wednesday</MenuItem>
                  <MenuItem value={"4"}>Thursday</MenuItem>
                  <MenuItem value={"5"}>Friday</MenuItem>
                  <MenuItem value={"6"}>Saturday</MenuItem>
                  <MenuItem value={"7"}>Sunday</MenuItem>
              </TextField>
              <TextValidator
                className="mb-4 w-full"
                onChange={this.handleChange}
                type="time"
                name="transaction_time"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                onChange={this.handleChange}
                type="date"
                name="start_date"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                onChange={this.handleChange}
                type="date"
                name="end_date"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextField
               className="mb-4 w-full"
                id="standard-select-currency"
                select
                label="Select Payment Method"
                name="payment_method"
                onChange={this.handleChange}
                helperText="Please select Payment Method"
              >
                  <MenuItem value={""}></MenuItem>
                  <MenuItem value={"Wallet"}> Wallet</MenuItem>
                  <MenuItem value={"Bank Account"}> Bank Account </MenuItem>
              </TextField>
              {this.props.savings &&
               <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }
              <Button className="uppercase"
                  type="submit"
                  size="large"
                  variant="contained"
                 style={{backgroundColor:"#e74398", color:"white"}}>Create Target Plan</Button>
                 </ValidatorForm>
            </Grid>

            <Grid container lg={6} md={6} sm={12} xs={12}>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Target Name
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Amount
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Target Amount
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Frequency
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Payment Method
                    </Typography>
                  </Grid>
                  
                </Grid>
            </Grid>
          </Grid>
        </Card>

    </Dialog>
    {/* Loan Details Dialog End */}

    {/* Loan repayment Dialog Start */}
    <Dialog
      open={showrepayment}
      onClose={this.handleCloseRepayment} >
      <AppBar style={{position: "relative", backgroundColor:"#e74398"}}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={this.handleCloseRepayment}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
            Loan Details
          </Typography>
        </Toolbar>
      </AppBar>
      <Card className="px-6 pt-2 pb-4">
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => null}
              >
                <TextValidator
                className="mb-4 w-full"
                label="Enter Target Name"
                onChange={this.handleChange}
                type="text"
                name="target_name"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                label="Frequent Savings Amount"
                onChange={this.handleChange}
                type="number"
                name="amount"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                label="Overall Targeted Amount"
                onChange={this.handleChange}
                type="number"
                name="targeted_amount"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextField
               className="mb-4 w-full"
                select
                label="Select Frequency"
                name="frequency"
                onChange={this.handleChange}
                helperText="Please select frequency"
              >
                  <MenuItem value={"Daily"}>Daily</MenuItem>
                  <MenuItem value={"Weekly"}> Weekly</MenuItem>
                  <MenuItem value={"Monthly"}> Monthly </MenuItem>
              </TextField>
              
              <TextField
                className="mb-4 w-full"
                select
                label=" Day of the Week"
                name="transaction_day"
                onChange={this.handleChange}
                helperText="Please select Day"
              >
                  <MenuItem value={"1"}>Monday</MenuItem>
                  <MenuItem value={"2"}>Tuesday</MenuItem>
                  <MenuItem value={"3"}>Wednesday</MenuItem>
                  <MenuItem value={"4"}>Thursday</MenuItem>
                  <MenuItem value={"5"}>Friday</MenuItem>
                  <MenuItem value={"6"}>Saturday</MenuItem>
                  <MenuItem value={"7"}>Sunday</MenuItem>
              </TextField>
              <TextValidator
                className="mb-4 w-full"
                onChange={this.handleChange}
                type="time"
                name="transaction_time"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                onChange={this.handleChange}
                type="date"
                name="start_date"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                onChange={this.handleChange}
                type="date"
                name="end_date"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextField
               className="mb-4 w-full"
                id="standard-select-currency"
                select
                label="Select Payment Method"
                name="payment_method"
                onChange={this.handleChange}
                helperText="Please select Payment Method"
              >
                  <MenuItem value={""}></MenuItem>
                  <MenuItem value={"Wallet"}> Wallet</MenuItem>
                  <MenuItem value={"Bank Account"}> Bank Account </MenuItem>
              </TextField>
              {this.props.savings &&
               <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }
              <Button className="uppercase"
                  type="submit"
                  size="large"
                  variant="contained"
                 style={{backgroundColor:"#e74398", color:"white"}}>Create Target Plan</Button>
                 </ValidatorForm>
            </Grid>

            <Grid container lg={6} md={6} sm={12} xs={12}>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Target Name
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Amount
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Target Amount
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Frequency
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Payment Method
                    </Typography>
                  </Grid>
                  
                </Grid>
            </Grid>
          </Grid>
        </Card>

    </Dialog>
    {/* Loan repayment Dialog End */}

    {/* Loan Manage Dialog Start */}
    <Dialog
      open={showManageLoan}
      onClose={this.handleCloseManageLoan} >
      <AppBar style={{position: "relative", backgroundColor:"#e74398"}}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={this.handleCloseManageLoan}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
            Loan Details
          </Typography>
        </Toolbar>
      </AppBar>
      <Card className="px-6 pt-2 pb-4">
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => null}
              >
                <TextValidator
                className="mb-4 w-full"
                label="Enter Target Name"
                onChange={this.handleChange}
                type="text"
                name="target_name"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                label="Frequent Savings Amount"
                onChange={this.handleChange}
                type="number"
                name="amount"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                label="Overall Targeted Amount"
                onChange={this.handleChange}
                type="number"
                name="targeted_amount"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextField
               className="mb-4 w-full"
                select
                label="Select Frequency"
                name="frequency"
                onChange={this.handleChange}
                helperText="Please select frequency"
              >
                  <MenuItem value={"Daily"}>Daily</MenuItem>
                  <MenuItem value={"Weekly"}> Weekly</MenuItem>
                  <MenuItem value={"Monthly"}> Monthly </MenuItem>
              </TextField>
              
              <TextField
                className="mb-4 w-full"
                select
                label=" Day of the Week"
                name="transaction_day"
                onChange={this.handleChange}
                helperText="Please select Day"
              >
                  <MenuItem value={"1"}>Monday</MenuItem>
                  <MenuItem value={"2"}>Tuesday</MenuItem>
                  <MenuItem value={"3"}>Wednesday</MenuItem>
                  <MenuItem value={"4"}>Thursday</MenuItem>
                  <MenuItem value={"5"}>Friday</MenuItem>
                  <MenuItem value={"6"}>Saturday</MenuItem>
                  <MenuItem value={"7"}>Sunday</MenuItem>
              </TextField>
              <TextValidator
                className="mb-4 w-full"
                onChange={this.handleChange}
                type="time"
                name="transaction_time"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                onChange={this.handleChange}
                type="date"
                name="start_date"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                onChange={this.handleChange}
                type="date"
                name="end_date"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextField
               className="mb-4 w-full"
                id="standard-select-currency"
                select
                label="Select Payment Method"
                name="payment_method"
                onChange={this.handleChange}
                helperText="Please select Payment Method"
              >
                  <MenuItem value={""}></MenuItem>
                  <MenuItem value={"Wallet"}> Wallet</MenuItem>
                  <MenuItem value={"Bank Account"}> Bank Account </MenuItem>
              </TextField>
              {this.props.savings &&
               <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }
              <Button className="uppercase"
                  type="submit"
                  size="large"
                  variant="contained"
                 style={{backgroundColor:"#e74398", color:"white"}}>Create Target Plan</Button>
                 </ValidatorForm>
            </Grid>

            <Grid container lg={6} md={6} sm={12} xs={12}>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Target Name
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Amount
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Target Amount
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Frequency
                    </Typography>
                  </Grid>
                  
                </Grid>
                <Grid container item lg={12} md={12} sm={12} xs={12} >
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Typography variant="subtitle1">
                      Payment Method
                    </Typography>
                  </Grid>
                  
                </Grid>
            </Grid>
          </Grid>
        </Card>

    </Dialog>
    {/* Loan Manage Dialog End */}
    </div>
  );
}
}
// export default Regular;
const actionCreators = {
  logout: userActions.logout,
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Loan))
);