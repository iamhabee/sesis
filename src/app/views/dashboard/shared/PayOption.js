import React, { Component } from 'react'
import { payID, getReference } from '../../../config/config'
import PaystackButton from 'react-paystack';

class PayOption extends Component {
    constructor(props){
        super(props)
        let email =  localStorage.getItem('email');
        this.state = {
            email: email,
            key: payID(),
        }
        this.close = this.close.bind(this);
    }

close = () => {
    console.log("Payment closed");
}
    render() {
        const {email} = this.state
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
                    amount={this.props.repayment_amount * 100}
                    paystackkey={this.state.key}
                    tag="button" 
                />
            </div>
        )
    }
}

export default PayOption
