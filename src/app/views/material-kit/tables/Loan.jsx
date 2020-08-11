import { Breadcrumb, SimpleCard } from "matx";
import React,{Component} from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SimpleForm from "../forms/SimpleForm";
import {LoanFormStep1, LoanFormStep2, SummaryForm} from './CustomForm'
import {getConfig, numberFormat, payID} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";

function getSteps() {
  return [
    "Apply For Loan",
    "Add Guarantor",
    "Summary"
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <LoanFormStep1 />;
    case 1:
      return <LoanFormStep2 />;
    case 2:
      return <SummaryForm />;
    default:
      return <div/>;
  }
}

class Loan extends Component {
  constructor(props){
    super(props)
    this.state={
      activeStep:0
    }
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

   handleNext = () => {
    this.setState({activeStep: this.state.activeStep +1})
    // setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

   handleBack = () => {
     this.setState({activeStep: this.state.activeStep -1})
    // setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

   handleReset = () => {
    this.setState({activeStep: 0})
  };
render(){
  const steps = getSteps();
  const {activeStep} = this.state
  return (
    <div className="m-sm-30">
       <div className="mb-sm-30">
         <Breadcrumb
           routeSegments={[
             { name: "Loan" }
           ]}
         />
       </div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography>All steps completed</Typography>
            <Button
              className="mt-4"
              variant="contained"
              color="secondary"
              onClick={this.handleReset}
            >
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography>
              {getStepContent(activeStep)}
            </Typography>
            <div className="pt-4">
              <Button
                variant="contained"
                color="secondary"
                disabled={activeStep === 0}
                onClick={this.handleBack}
              >
                Back
              </Button>
              <Button
                className="ml-4"
                variant="contained"
                color="primary"
                onClick={this.handleNext}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
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