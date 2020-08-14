import React, { Component } from 'react'
import { Typography, Grid, Card, Button, CardActions, Hidden } from '@material-ui/core'
import CustomSlider from './CustomSlider';
import SimpleForm from 'app/views/material-kit/forms/SimpleForm'
import CustomForm from './CustomForm'

class Section1 extends Component {
 
    render() {
       const style = {
            typo:{
                fontFamily:"Lobster, cursive",
                color:"#000"
            }
        }
        return (
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item lg={6} md={6} sm={8} xs={8}>
                    <Card className="p-20 pt-10" style={{backgroundColor:"inherit"}}>
                        <Typography style={style.typo} variant="h2">
                        Download Cubevest Mobile App
                        </Typography>
                    <img src="/assets/images/download.png" />
                    </Card>
                </Grid>
                <Hidden smDown>
                    <Grid item lg={4} md={4} sm={4} xs={4}>
                        <img src="/assets/images/phone1.png" />
                    </Grid>
                </Hidden>
                {/* <Grid item lg={2} md={2} sm={6} xs={6}>
                <CustomSlider image1={"/assets/images/01.png"} image2={"/assets/images/02.png"} image3={"/assets/images/03.png"}/>
                </Grid> */}
            </Grid>
        )
    }
}

export default Section1
