import React,{Component} from 'react';

import AppAppBar from './shared/AppBar'
import AppFooter from './shared/Footer'
import ProductHero from './shared/ProductHero'
import ProductCategories from './shared/ProductCategory'
import ProductHowItWorks from './shared/ProductHowItWork'
import ProductCTA from './shared/Product'
import ProductSmokingHero from './shared/ProductSmoingHero'
import ProductValues from './shared/ProductValues'
import {Grid} from "@material-ui/core"
import CustomSlider from './shared/CustomSlider';
import SignUp from './shared/SignUp';

class Landing extends Component {
  constructor(props){
    super(props)
    this.state ={
      showLogin:false,
    }

  }

  render(){
    return (
      <div style={{
        backgroundImage: `url(${"/assets/images/new-bg.jpeg"})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100%"
        }}>
          <AppAppBar login={this.handleShowLogin} />
          <Grid container spacing={2}>
            <Grid item lg={9} md={9} sm={12} xs={12}>
              <SignUp />
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CustomSlider />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item lg={9} md={9} sm={12} xs={12}>
              
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <CustomSlider />
            </Grid>
          </Grid>
      </div>
    );
  }  
  }
  

export default Landing;