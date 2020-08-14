import React, { Component } from 'react'
import { Typography, Grid, Card } from '@material-ui/core'
import SimpleForm from 'app/views/material-kit/forms/SimpleForm'
import CustomForm from './CustomForm'

class Section4 extends Component {
    render() {
        const style = {
            typo:{
                fontFamily:"Dancing Script, cursive",
                color:"#000"
            }
        }
        return (
            <Grid container >
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Typography style={style.typo} variant="h5" className="text-gray text-center p-3">
                    Build wealth by aligning your investments with your principles. You don’t have to invest in companies whose activities or operations you fundamentally disagree with, ethical investment gives you that choice.
                    </Typography>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} className="px-20 pt-10">
                    <img src="/assets/images/cubevest inv.jpg"/>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} className="px-20 pt-10">
                    <img src="/assets/images/cubevest inv.jpg"/>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} className="px-20 pt-10">
                    <img src="/assets/images/investment.jpg"/>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} className="px-20 pt-10">
                    <img src="/assets/images/investment.jpg"/>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} className="px-20 pt-10">
                    <img src="/assets/images/cubevest inv.jpg"/>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} className="px-20 pt-10">
                    <img src="/assets/images/investment.jpg"/>
                </Grid>
            </Grid>
        )
    }
}

export default Section4
