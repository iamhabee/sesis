import React, { Component } from 'react'
import { Typography, Grid, Card } from '@material-ui/core'
import SimpleForm from 'app/views/material-kit/forms/SimpleForm'
import CustomForm from './CustomForm'

class Section2 extends Component {
    render() {
        const style = {
            typo:{
                fontFamily:"Dancing Script, cursive",
                color:"#000"
            }
        }
        return (
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item lg={6} md={6} sm={12} xs={12} className="px-20 pt-10">
                    <img src="/assets/images/investment.jpg"/>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Card className="px-5 pt-10" style={{backgroundColor:"inherit"}}>
                        <Typography variant="h4" className="text-white">
                            Cultivate a habit of Savings
                        </Typography>
                        <Typography style={style.typo} variant="h4" className="text-gray pt-3">
                        Fast, secure and reliable. Saving and withdrawing your money at your convinient and also make a target .
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}

export default Section2
