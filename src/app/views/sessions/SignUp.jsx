import React, { Component } from "react";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  CircularProgress
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import swal from 'sweetalert'
import { userActions } from "../../redux/actions/user.actions";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  wrapper: {
    position: "relative"
  },

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

class SignUp extends Component {
  state = {
    data: {
      first_name: '',
      last_name: '',
      middle_name: '',
      password: '',
      email: '',
      phone_no: ''
  },
    confirm_password:"",
    username: "",
    email: "",
    password: "",
    agreement: "" 
  };

  handleChange = event => {
    event.persist();
    const { data} = this.state
    const { name, value} = event.target
    if(name == "confirm_password"){
      this.setState({confirm_password:value})
    }else{
      this.setState({
        data: {
              ...data,
              [name]: value
          }
      });
    }
    
  };

  handleFormSubmit = event => {
    event.preventDefault();
      const { data, confirm_password } = this.state;
    console.log(data)
      if (data.first_name && data.last_name && data.email && data.phone_no && data.password) {
        if(data.password == confirm_password){
          this.props.register(data);
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
  };
  render() {
    let { classes } = this.props;
    const { username, email, password, data, confirm_password } = this.state;
    return (
      <div className="signup flex justify-center w-full h-full-screen">
        <div className="p-8">
          <Card className="signup-card position-relative y-center">
            <Grid container>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <div className="p-8 flex justify-center bg-light-gray items-center h-full">
                  <img
                    src="/assets/images/illustrations/posting_photo.svg"
                    alt=""
                  />
                </div>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <div className="p-9 h-full">
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                    <TextValidator
                      className="mb-6 w-full"
                      variant="outlined"
                      label="First Name"
                      onChange={this.handleChange}
                      type="text"
                      name="first_name"
                      value={data.first_name}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextValidator
                      className="mb-6 w-full"
                      variant="outlined"
                      label="Last Name"
                      onChange={this.handleChange}
                      type="text"
                      name="last_name"
                      value={data.last_name}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextValidator
                      className="mb-4 w-full"
                      label="Phone Number"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="phone_no"
                      type="text"
                      value={data.phone_no}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextValidator
                      className="mb-6 w-full"
                      variant="outlined"
                      label="Email"
                      onChange={this.handleChange}
                      type="email"
                      name="email"
                      value={data.email}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "this field is required",
                        "Email is not valid"
                      ]}
                    />
                    <TextValidator
                      className="mb-4 w-full"
                      label="Password"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="password"
                      type="password"
                      value={data.password}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <TextValidator
                      className="mb-4 w-full"
                      label="Confirm Password"
                      variant="outlined"
                      onChange={this.handleChange}
                      name="confirm_password"
                      type="password"
                      value={confirm_password}
                      validators={["required"]}
                      errorMessages={["this field is required"]}
                    />
                    <FormControlLabel
                      className="mb-4"
                      name="agreement"
                      onChange={this.handleChange}
                      control={<Checkbox />}
                      label="I have read and agree to the terms of service."
                    />
                    <div className="flex items-center">
                      <div className={classes.wrapper}>
                        <Button
                          variant="contained"
                          color="warning"
                          disabled={this.props.registering}
                          type="submit"
                          style={{background:'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'}}
                        >
                          Sign up
                        </Button>
                        {this.props.registering && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                      </div>
                      <span className="mx-2 ml-5">or</span>
                      <Button
                        className="capitalize"
                        onClick={() =>
                          this.props.history.push("/signin")
                        }
                      >
                        Sign in
                      </Button>
                    </div>
                  </ValidatorForm>
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { registering } = state.registration;
  return { registering };
}

const actionCreators = {
  register: userActions.register
}

export default withStyles(styles, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(SignUp))
);
