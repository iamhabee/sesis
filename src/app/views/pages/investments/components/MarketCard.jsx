import React from "react";
import { Grid, Card, Icon, IconButton, Tooltip, Typography, Button, CardActionArea, CardActions, CardContent, CardMedia } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { Component } from "react";

class MarketCard extends Component {
  constructor(props){
    super(props)
  }

  render(){
    let { theme } = this.props;
    return (
      
        <Card style={{maxWidth:250}}>
          <CardActionArea>
            <CardMedia style={{height:140}}
              image="/assets/images/products/iphone-1.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Lizard
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
        
    );
  };
  
}

export default withStyles({}, { withTheme: true })(MarketCard);
