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
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Card className="p-10 pt-10" style={{backgroundColor:"inherit"}}>
                        <Typography variant="h4" className="text-white">
                        Get 0% non interest based loans
                        </Typography>
                        <Typography style={style.typo} variant="h4" className="text-gray pt-3">
                        Say bye-bye to high interest rates. Get access to zero interest Personal or Business loans to take care of your most pressing needs, loans with workable payback periods. Build your credit ratings to unlock larger loan amounts.
                        </Typography>
                    </Card>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} className="px-20 pt-10">
                    <img src="/assets/images/saving.jpg"/>
                </Grid>
            </Grid>
        )
    }
}

export default Section2
