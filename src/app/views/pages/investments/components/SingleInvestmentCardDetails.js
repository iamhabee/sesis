import React, { Component } from 'react'
import { Typography, Grid, CardMedia} from '@material-ui/core';
import {numberFormat} from '../../../../config/config'

class SingleInvestmentCardDetails extends Component {
    render() {
        const {investment, } = this.props
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
                        <Typography variant="p" className="font-bold">{investment.start_date}</Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <Typography variant="p" className="font-bold">Application Date:</Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <Typography variant="p" className="font-bold">{investment.application_date}</Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <Typography variant="p" className="font-bold">Maturity Date:</Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <Typography variant="p" className="font-bold">{investment.maturity_date}</Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default SingleInvestmentCardDetails
