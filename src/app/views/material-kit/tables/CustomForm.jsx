import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Button,
  Icon,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  MenuItem
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

class LoanFormStep1 extends Component {
  state = {
    data: {
        loan_amount:"",
        frequency:"",
        loan_group:"",
        start_date:"",
        end_date:"",
        payment_method:"",
        repayment_amount:""
    },
    username: "",
    firstName: "",
    email: "",
    date: new Date(),
    creditCard: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    gender: "",
    agreement: ""
  };

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule("isPasswordMatch");
  }

  handleSubmit = event => {
    // console.log("submitted");
    // console.log(event);
  };

  handleChange = event => {
      const {data} = this.state
    this.setState({ data:{...data, [event.target.name]: event.target.value }});
  };

  handleDateChange = date => {
    // console.log(date);

    this.setState({ date });
  };

  render() {
    let {
      username,
      firstName,
      creditCard,
      mobile,
      password,
      confirmPassword,
      gender,
      date,
      email, data
    } = this.state;
    return (
      <div>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => null}
        >
          <Grid container justify="center" spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="mb-4 w-full"
                label="Amount"
                onChange={this.handleChange}
                type="text"
                name="loan_amount"
                value={data.loan_amount}
                validators={[ "required"]}
                errorMessages={["this field is required"]}
                helperText="Amount"
              />
              <TextValidator
                className="mb-4 w-full"
                label="Repayment Amount"
                onChange={this.handleChange}
                type="number"
                name="repayment_amount"
                value={data.repayment_amount}
                validators={["required"]}
                errorMessages={["this field is required"]}
                helperText="Repayment Amount"
              />
                <TextValidator
                  className="mb-4 w-full"
                  margin="none"
                  inputVariant="standard"
                  type="date"
                  value={data.start_date}
                  validators={["required"]}
                  name="start_name"
                  onChange={this.handleChange}
                  helperText="Pick Start Date"
                />
                <TextValidator
                  className="mb-4 w-full"
                  margin="none"
                  inputVariant="standard"
                  type="date"
                  value={data.end_date}
                  name="endt_name"
                  onChange={this.handleChange}
                  validators={["required"]}
                  helperText="Pick End Date"
                />
              <TextValidator
                className="mb-6 w-full"
                select
                label="Frequency"
                value={data.frequency}
                name="frequency"
                onChange={this.handleChange}
                helperText="Select Frequency"
              >
                  <MenuItem value={""}></MenuItem>
                  <MenuItem value={"Daily"}>Daily</MenuItem>
                  <MenuItem value={"Weekly"}>Weekly</MenuItem>
                  <MenuItem value={"Monthly"}>Monthly</MenuItem>
              </TextValidator>
              <TextValidator
                className="mb-6 w-full"
                select
                label="Loan Group"
                value={data.loan_group}
                name="loan_group"
                onChange={this.handleChange}
                helperText="Select Loan Group"
              >
                  <MenuItem value={""}></MenuItem>
                  <MenuItem value={"Wallet"}>Wallet</MenuItem>
                  <MenuItem value={"Bank Account"}>Bank Account</MenuItem>
              </TextValidator>
              <TextValidator
                className="mb-6 w-full"
                select
                label="Payment Method"
                value={data.payment_method}
                name="payment_method"
                onChange={this.handleChange}
                helperText="Select Payment Method"
              >
                  <MenuItem value={""}></MenuItem>
                  <MenuItem value={"Wallet"}>Wallet</MenuItem>
                  <MenuItem value={"Bank Account"}>Bank Account</MenuItem>
              </TextValidator>
            </Grid>
            </Grid>
        </ValidatorForm>
      </div>
    );
  }
}

class LoanFormStep2 extends Component {
  state = {
    username: "",
    firstName: "",
    email: "",
    date: new Date(),
    creditCard: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    gender: "",
    agreement: ""
  };

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule("isPasswordMatch");
  }

  handleSubmit = event => {
    // console.log("submitted");
    // console.log(event);
  };

  handleChange = event => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDateChange = date => {
    // console.log(date);

    this.setState({ date });
  };

  render() {
    let {
      username,
      firstName,
      creditCard,
      date,
      email
    } = this.state;
    return (
      <div>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => null}
        >
          <Grid container justify="center" spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="mb-4 w-full"
                label="Username (Min length 4, Max length 9)"
                onChange={this.handleChange}
                type="text"
                name="username"
                value={username}
                validators={[
                  "required",
                  "minStringLength: 4",
                  "maxStringLength: 9"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                label="First Name"
                onChange={this.handleChange}
                type="text"
                name="firstName"
                value={firstName}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                label="Email"
                onChange={this.handleChange}
                type="email"
                name="email"
                value={email}
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "email is not valid"]}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className="mb-4 w-full"
                  margin="none"
                  id="mui-pickers-date"
                  label="Date picker"
                  inputVariant="standard"
                  type="text"
                  autoOk={true}
                  value={date}
                  onChange={this.handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </MuiPickersUtilsProvider>
              <TextValidator
                className="mb-8 w-full"
                label="Credit Card"
                onChange={this.handleChange}
                type="number"
                name="creditCard"
                value={creditCard}
                validators={[
                  "required",
                  "minStringLength:16",
                  "maxStringLength: 16"
                ]}
                errorMessages={["this field is required"]}
              />
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
    );
  }
}

class SummaryForm extends Component {
  state = {
    data: {
        loan_amount:"",
        frequency:"",
        loan_group:"",
        start_date:"",
        end_date:"",
        payment_method:"",
        repayment_amount:""
    },
    username: "",
    firstName: "",
    email: "",
    date: new Date(),
    creditCard: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    gender: "",
    agreement: ""
  };

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule("isPasswordMatch");
  }

  handleSubmit = event => {
    // console.log("submitted");
    // console.log(event);
  };

  handleChange = event => {
      const {data} = this.state
    this.setState({ data:{...data, [event.target.name]: event.target.value }});
  };

  handleDateChange = date => {
    // console.log(date);

    this.setState({ date });
  };

  render() {
    let {
      username,
      firstName,
      creditCard,
      mobile,
      password,
      confirmPassword,
      gender,
      date,
      email, data
    } = this.state;
    return (
      <div>
        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={errors => null}
        >
          <Grid container justify="center" spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="mb-4 w-full"
                label="Amount"
                onChange={this.handleChange}
                type="text"
                name="loan_amount"
                value={data.loan_amount}
                validators={[ "required"]}
                errorMessages={["this field is required"]}
                helperText="Amount"
              />
              <TextValidator
                className="mb-4 w-full"
                label="Repayment Amount"
                onChange={this.handleChange}
                type="number"
                name="repayment_amount"
                value={data.repayment_amount}
                validators={["required"]}
                errorMessages={["this field is required"]}
                helperText="Repayment Amount"
              />
                <TextValidator
                  className="mb-4 w-full"
                  margin="none"
                  inputVariant="standard"
                  type="date"
                  value={data.start_date}
                  validators={["required"]}
                  name="start_name"
                  onChange={this.handleChange}
                  helperText="Pick Start Date"
                />
                <TextValidator
                  className="mb-4 w-full"
                  margin="none"
                  inputVariant="standard"
                  type="date"
                  value={data.end_date}
                  name="endt_name"
                  onChange={this.handleChange}
                  validators={["required"]}
                  helperText="Pick End Date"
                />
              <TextValidator
                className="mb-6 w-full"
                select
                label="Frequency"
                value={data.frequency}
                name="frequency"
                onChange={this.handleChange}
                helperText="Select Frequency"
              >
                  <MenuItem value={""}></MenuItem>
                  <MenuItem value={"Daily"}>Daily</MenuItem>
                  <MenuItem value={"Weekly"}>Weekly</MenuItem>
                  <MenuItem value={"Monthly"}>Monthly</MenuItem>
              </TextValidator>
              <TextValidator
                className="mb-6 w-full"
                select
                label="Loan Group"
                value={data.loan_group}
                name="loan_group"
                onChange={this.handleChange}
                helperText="Select Loan Group"
              >
                  <MenuItem value={""}></MenuItem>
                  <MenuItem value={"Wallet"}>Wallet</MenuItem>
                  <MenuItem value={"Bank Account"}>Bank Account</MenuItem>
              </TextValidator>
              <TextValidator
                className="mb-6 w-full"
                select
                label="Payment Method"
                value={data.payment_method}
                name="payment_method"
                onChange={this.handleChange}
                helperText="Select Payment Method"
              >
                  <MenuItem value={""}></MenuItem>
                  <MenuItem value={"Wallet"}>Wallet</MenuItem>
                  <MenuItem value={"Bank Account"}>Bank Account</MenuItem>
              </TextValidator>
            </Grid>
            </Grid>
        </ValidatorForm>
      </div>
    );
  }
}
export  {
  LoanFormStep1,
  LoanFormStep2,
  SummaryForm
};
