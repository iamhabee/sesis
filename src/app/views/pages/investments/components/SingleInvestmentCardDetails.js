import React, { Component } from 'react'
import { Typography, Grid, CardMedia} from '@material-ui/core';
import {numberFormat} from '../../../../config/config'
import dateFormat from "dateformat"
class SingleInvestmentCardDetails extends Component {
    constructor(props){
        super(props)
        var applicationDate = new Date(this.props.investment.start_date);
        var maturityDate = new Date(this.props.investment.maturity_date);
        let applicationMonth = applicationDate.getMonth()
        let maturityMonth = maturityDate.getMonth()
        this.state ={
            maturityMonth:maturityMonth,
            applicationMonth:applicationMonth
        }
    }
    render() {
        const {investment, } = this.props
        const {maturityMonth, applicationMonth} = this.state
        return (
            <div className="pt-4 mb-4 px-2 bg-default" style={{flexGrow: 1, border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
                <Grid container spacing={2} justify="center" >
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                    <CardMedia style={{height:140}}
                        image={investment.investment_pic}
                        title={investment.investment_type}
                    />
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <Typography variant="p" className="font-bold">Insurance Partner:</Typography> 
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <Typography variant="p" className="font-bold">{investment.insurance_partner}</Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <Typography variant="p" className="font-bold">Expected Return</Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <Typography variant="p" className="font-bold">{numberFormat(investment.expected_returns)}</Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <Typography variant="p" className="font-bold">Start Date:</Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <Typography variant="p" className="font-bold">{dateFormat(investment.start_date, "mmmm dS, yyyy")}</Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <Typography variant="p" className="font-bold">Application Date:</Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <Typography variant="p" className="font-bold">{dateFormat(investment.application_date, "mmmm dS, yyyy")}</Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <Typography variant="p" className="font-bold">Investment Period:</Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <Typography variant="p" className="font-bold">{maturityMonth - applicationMonth} Month </Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default SingleInvestmentCardDetails
