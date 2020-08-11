import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography, Divider, Grid, Box, ButtonGroup, Button, CardMedia} from '@material-ui/core';
import {numberFormat} from '../../../../config/config'

export default function SingleInvestmentcard(props) {

  const {news, investment, } = props
  return (
    <>
      <div className="pt-4 mb-4 px-2 bg-default" style={{flexGrow: 1, border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
      <Grid container spacing={2} >
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <CardMedia style={{height:140}}
            image={investment.investment_pic}
            title={investment.investment_type}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <Typography variant="subtitle">Insurance Partner: {investment.insurance_partner} </Typography><br/>
          <Typography variant="subtitle">Current Value: {numberFormat(investment.current_values)} </Typography><br/>
          <Typography variant="subtitle" color="text-secondary" className="font-medium">Expected Ret. {numberFormat(investment.expected_returns)} </Typography><br/>
          <Typography variant="subtitle" color="text-secondary" className="font-medium">Start Date: {investment.start_date} </Typography><br/>
          <Typography variant="subtitle" color="text-secondary" className="font-medium">Application Date: {investment.application_date} </Typography><br/>
          <Typography variant="subtitle" color="text-secondary" className="font-medium">Maturity Date: {investment.maturity_date} </Typography><br/>
        </Grid>
      </Grid>
    </div>
    <Divider variant="middle" />
    <Typography variant="h6" className="font-bold text-green">Investment News</Typography>
    {news.map((newz, index) => (
      <div key={index} className="pt-4 mb-4 px-2 bg-default" style={{flexGrow: 1, border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
      <Typography variant="subtitle" className="text-small font-bold" style={{fontStyle:"italic"}}>Posted Date( {newz.posted_date} )</Typography><br />
      <Typography variant="subtitle" className="">{newz.news} </Typography>
      
    </div>
    ))}
    </>
  );
}
