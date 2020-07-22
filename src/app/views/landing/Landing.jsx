import React from 'react';

import AppAppBar from './shared/AppBar'
import AppFooter from './shared/Footer'
import ProductHero from './shared/ProductHero'
import ProductCategories from './shared/ProductCategory'
import ProductHowItWorks from './shared/ProductHowItWork'
import ProductCTA from './shared/Product'
import ProductSmokingHero from './shared/ProductSmoingHero'
import ProductValues from './shared/ProductValues'

const Landing = () => {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      <ProductCTA />
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  );
}  

export default Landing;