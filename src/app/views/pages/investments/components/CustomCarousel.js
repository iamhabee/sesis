import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'
 
export default function CustomCarousel(props)
{
    var items = [
        {
            name: "Random Name #1",
            img: "/assets/images/loan-banner.jpeg"
        },
        {
            name: "Random Name #2",
            img: "/assets/images/saving-banner.jpeg"
        },
        {
            name: "Random Name #3",
            img: "/assets/images/invest-banner.jpeg"
        }
    ]
 
    return (
        <Carousel indicators={false}>
            {
                items.map( (item, i) => <img key={i} src={item.img} /> )
            }
        </Carousel>
    )
}
 
// function Item(props)
// {
//     return (
//         <Paper>
//             <h2>{props.item.name}</h2>
//             <p>{props.item.description}</p>
 
//             <Button className="CheckButton">
//                 Check it out!
//             </Button>
//         </Paper>
//     )
// }