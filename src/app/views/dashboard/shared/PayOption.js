import React, { Component } from 'react'
import {getReference, getConfig, payID } from '../../../config/config'
import PaystackButton from 'react-paystack';
import { authHeader } from "../../../redux/logic";
import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";

class PayOption extends Component {
    constructor(props){
        super(props)
        let email =  localStorage.getItem('email');
        this.state = {
            email: email,
            key: "",
        }
        this.close = this.close.bind(this);
    }
componentDidMount(){
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
    fetch(getConfig("getPayStackId"), requestOptions)
    .then(async response => {
        const data = await response.json();
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        this.setState({key: data[0].public_key})
    })
    .catch((error) => {
        if (error === "Unauthorized") {
          this.props.timeOut()
        }
    });
}

close = () => {
    console.log("Payment closed");
}
    render() {
        const {email, key} = this.state
        return (
            <div>
                <PaystackButton
                    text="Make Payment"
                    className="payButton"
                    callback={this.props.callback}
                    close={this.close}
                    disabled={true}  
                    embed={true}  
                    reference={getReference()}
                    email={email}
                    amount={this.props.amount * 100}
                    paystackkey={key}
                    tag="button" 
                />
            </div>
        )
    }
}

// export default PayOption
function mapState(state) {
    const { savings } = state.savings;
    return { savings };
  }
  const actionCreators = {
    timeOut: userActions.timeOut,
  };
  
  export default withStyles({}, { withTheme: true })(
    withRouter(connect(mapState,  actionCreators)(PayOption))
  );