import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'
 
export default function CustomSlider(props)
{
    var items = [
        {
            name: "Random Name #1",
            img: "/assets/images/phone1.png"
        },
        {
            name: "Random Name #2",
            img: "/assets/images/phone1.png"
        },
        {
            name: "Random Name #3",
            img: "/assets/images/phone1.png"
        }
    ]
 
    return (
        <Carousel indicators={false} animation="slide">
            {
                items.map( (item, i) => <img key={i} src={item.img} /> )
            }
        </Carousel>
    )
}