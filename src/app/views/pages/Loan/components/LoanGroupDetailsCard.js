import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography, Divider, Grid, Box, ButtonGroup, Button} from '@material-ui/core';
import {numberFormat} from '../../../../config/config'
// import moment from 'moment';
export default function LoanGroupDetailsCard(props) {

  return (
    <>
    <Typography variant="h6" className="font-bold text-green" >Group Loans</Typography>
    {props.data.length == 0 ?
    <Typography variant="h6" className="font-bold text-green" >Sorry You Currently Do Not Have any Standing Loan</Typography>:
    props.data.map((dat, index) => (
      <div key={index} className="pt-4 mb-4 px-2 bg-default" style={{flexGrow: 1, border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
      <Grid container spacing={2} >
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography variant="h6">Loan Collected By</Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography variant="h6"> {dat.last_name + " " + dat.first_name} </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <Typography variant="subtitle" color="text-secondary" className="font-medium">Loan Amount</Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <Typography variant="subtitle" color="text-secondary" className="font-medium">{numberFormat(dat.loan_amount)} </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <Typography variant="subtitle" color="text-secondary" className="font-medium">Amount Repaid </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <Typography variant="subtitle"> {numberFormat(dat.amount_repaid)} </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <Typography variant="subtitle" color="text-secondary" className="font-medium">Loan Due Date </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <Typography variant="subtitle">  {dat.loan_due_date} </Typography>
        </Grid>
      </Grid>
    </div>
    ))}
    <Divider variant="middle" />
    <Typography variant="h6" className="font-bold text-green">Group Members</Typography>
    {props.members.map((member, index) => (
      <div key={index} className="pt-4 mb-4 px-2 bg-default" style={{flexGrow: 1, border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography variant="h6"> User Name </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography variant="h6"> {member.name } </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={3} xs={3}>
          <Typography variant="subtitle"> Email </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={9} xs={9}>
          <Typography variant="subtitle"> {member.email} </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <Typography variant="subtitle"> Status </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6}>
          <Typography variant="subtitle" className={member.status == 0?"text-gray":member.status == 1?"text-green":"text-error"}> {member.status == 0? "Pending":member.status == 1?"Approved":member.status == 2?"Rejected":"Exited"} </Typography>
        </Grid>
      </Grid>
    </div>
    ))}
    </>
  );
}
