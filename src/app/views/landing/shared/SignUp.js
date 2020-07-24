import React, { Component } from 'react'
import { Typography, Grid, Card } from '@material-ui/core'
import SimpleForm from 'app/views/material-kit/forms/SimpleForm'
import CustomForm from './CustomForm'

class SignUp extends Component {
    render() {
        return (
            <div>
                <Grid container >
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <Card className="px-20 pt-10" style={{backgroundColor:"inherit"}}>
                            <Typography variant="h2" className="text-white">
                                Dial *9015# on your Airtel, MTN or Etisalat to open an account!
                            </Typography>
                            <Typography variant="h6" className="text-white px-5 pt-3">
                                Non Interest Loan for SMEs and Personal Use; Ethical Investment for All
                            </Typography>
                            <CustomForm />
                        </Card>
                        
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <img src="" />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default SignUp
