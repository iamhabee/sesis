import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Card, Button, ButtonGroup, Hidden, Icon, Fab } from '@material-ui/core';
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
class Settings extends Component{
constructor(props){
  super(props)
  this.state ={
    editPassword:false,
    editBankDetails:false,
    withdrawFund:false,
    profile:[]
  }
  this.handleSubmit = this.handleSubmit.bind(this);
  this.showEditPassword = this.showEditPassword.bind(this);
  this.showEditBankDetails = this.showEditBankDetails.bind(this);
  this.showWithdraw = this.showWithdraw.bind(this);
  this.closeEditPassword = this.closeEditPassword.bind(this);
  this.closeEditBankDetails = this.closeEditBankDetails.bind(this);
  this.closeWithdraw = this.closeWithdraw.bind(this);
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
            this.setState({loading:false, profile:data});
            return Promise.reject(error);
          }
          console.log(data)
        if(data.success == false){
          this.setState({profile: []})
        }else{
          this.setState({profile: data[0]})
        }
        
    })
    .catch(error => {
       if (error === "Unauthorized") {
        this.props.logout()
       }
    });
}
handleSubmit=()=> {
  const {profile} = this.state
  console.log(profile)
  // if(profile.length != 0){
  //     this.props.updateProfile(profile); 
  // }else{
  //     swal(
  //         `${"All fields are required"}`
  //     );
  // }   
}
showEditPassword=()=>{
  this.setState({editPassword:true})
}
showEditBankDetails=()=>{
  this.setState({editBankDetails:true})
}
showWithdraw=()=>{
  this.setState({withdrawFund:true})
}
closeEditPassword=()=>{
  this.setState({editPassword:true})
}
closeEditBankDetails=()=>{
  this.setState({editBankDetails:true})
}
closeWithdraw=()=>{
  this.setState({withdrawFund:true})
}

render(){
    const {theme} = this.props
    const {profile} = this.state
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Settings" }
            ]}
          />
        </div>
        <div >
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              lg={4}
              md={6}
              xl={4}
              xs={12}
            >
              <AccountProfile />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xl={8}
              xs={12}
            >
              <AccountDetails profile={profile} handleSubmit={this.handleSubmit}/>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              lg={4}
              md={6}
              xl={6}
              sm={12}
              xs={12}
            >
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
            {/* </Card> */}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };
  
  }
  
// export default Settings;
const actionCreators = {
  logout: userActions.logout,
  updatePicture: userActions.updatePicture,
  updateProfile: userActions.updateProfile
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Settings))
);