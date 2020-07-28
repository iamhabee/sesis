import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography, Divider, Grid, Box, ButtonGroup, Button} from '@material-ui/core';
import {numberFormat} from '../../../../config/config'
import TableCard from './TableCard';
// import moment from 'moment';
export default function LoanDetailsCard(props) {

  return (
    <>
    <Typography variant="h6" className="text-green" >Group Loans</Typography>
    {props.data.length == 0 ?
    <Typography variant="subtitle" className="font-bold text-green" >Sorry You Currently Do Not Have any Standing Loan</Typography>:
    props.data.map((dat, index) => (
      <div key={index} className="pt-4 mb-4 px-2 bg-default" style={{flexGrow: 1, border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
      <Grid container spacing={2} >
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h6"> {dat.last_name + " " + dat.first_name} </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <Typography variant="subtitle" color="text-secondary" className="font-medium">Guaranteed Amount</Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <Typography variant="subtitle" color="text-secondary" className="font-medium">{numberFormat(dat.guaranteed_amount)} </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <Typography variant="subtitle" color="text-secondary" className="font-medium">Status </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <Typography variant="subtitle" className={dat.status==0? "text-gray":dat.status==1?"text-green":"text-error"}> {dat.status !=1? "Pending":"Active"} </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          {dat.status!=1? 
          <Button variant="contained">Resend Notification</Button>: 
          <Button variant="outlined">Done</Button>}
        </Grid>
      </Grid>
    </div>
    ))}
    <div className="py-2" />
    <Divider variant="middle" />
    <div className="py-2" />
    <Typography variant="h6" className="font-bold text-green">Loan Repayment Transactions </Typography>
    <TableCard details={props.approvals} />
    </>
  );
}
