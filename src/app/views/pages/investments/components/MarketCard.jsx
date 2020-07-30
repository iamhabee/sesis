import React from "react";
import { Grid, Card, Icon, IconButton, Tooltip, Typography, Button, CardActionArea, CardActions, CardContent, CardMedia } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { Component } from "react";

class MarketCard extends Component {
  constructor(props){
    super(props)
  }
  render(){
    let { theme, category, data, invest, view} = this.props;
    return (
          <Card style={{maxWidth:250}}>
            <CardActionArea>
              <CardMedia style={{height:140}}
                image={data.investment_pic}
                title={data.investment_type}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {data.investment_type}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {data.news}
                </Typography>
                {data.unit_remaining == 0 ?
                <Typography variant="body2" className="text-error" component="p">
                  Sold Out
                </Typography>:
                <Typography variant="body2" color="textSecondary" component="p">
                 {data.unit_remaining} Slot Remaining  
              </Typography>}
              </CardContent>
            </CardActionArea>
            <CardActions>
              {data.unit_remaining != 0 && <Button onClick={invest}  variant="contained" color="secondary">
                Invest Now
              </Button>}
              <Button onClick={view} variant="outlined" color="secondary">
                See Details
              </Button>
            </CardActions>
          </Card>
    );
  };
  
}

export default withStyles({}, { withTheme: true })(MarketCard);
