import React from "react";
import {
  Card,
  Icon,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { Component } from "react";
import { numberFormat } from '../../../config/config'

class TableCard extends Component{
  constructor(props){
    super(props)
  }


  render(){
  const productList = [
    {
      imgUrl: "/assets/images/products/headphone-2.jpg",
      name: "earphone",
      price: 100,
      available: 15
    },
    {
      imgUrl: "/assets/images/products/headphone-3.jpg",
      name: "earphone",
      price: 1500,
      available: 30
    },
    {
      imgUrl: "/assets/images/products/iphone-2.jpg",
      name: "iPhone x",
      price: 1900,
      available: 35
    },
    {
      imgUrl: "/assets/images/products/iphone-1.jpg",
      name: "iPhone x",
      price: 100,
      available: 0
    },
    {
      imgUrl: "/assets/images/products/headphone-3.jpg",
      name: "Head phone",
      price: 1190,
      available: 5
    }
  ];
    return (
        <Card elevation={3} className="pt-5 mb-6">
          {/* <div className="card-title px-6 mb-3">Latest Transactions</div> */}
          <div className="overflow-auto">
            <Table className="product-table">
              <TableHead>
                <TableRow>
                  <TableCell className="px-6" colSpan={4}>
                  CATEGORY
                  </TableCell>
                  <TableCell className="px-0" colSpan={2}>
                  TYPE
                  </TableCell>
                  <TableCell className="px-0" colSpan={4}>
                  AMOUNT
                  </TableCell>
                  <TableCell className="px-0" colSpan={2}>
                  DATE
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.transactions.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-0 capitalize" colSpan={4} align="left">
                    {product.transaction_category == 1 ? "Regular Savings": 
                                  (product.transaction_category == 2) ? "Target Savings":
                                  (product.transaction_category == 3) ? "Save To Loan":
                                  (product.transaction_category == 4) ? "Loan":
                                  (product.transaction_category == 5) ? "Market Investment":
                                  (product.transaction_category == 6) ? "Halal Financing":
                                  (product.transaction_category == 7) ? (product.transaction_type == "credit")?"Wallet Funding":" Wallet Withdrawal": ""}
                    </TableCell>
                    <TableCell className="px-0" colSpan={2} >
                      {product.transaction_type}
                    </TableCell>
                    <TableCell className="px-0 capitalize" align="left" colSpan={4}>
                      {numberFormat(product.amount)}
                    </TableCell>
                    <TableCell className="px-0" colSpan={2}>
                      {product.entry_date}
                    </TableCell>
                    {/* <TableCell className="px-0" align="left" colSpan={2}>
                      {product.available ? (
                        product.available < 20 ? (
                          <small className="border-radius-4 bg-secondary text-white px-2 py-2px ">
                            {product.available} available
                          </small>
                        ) : (
                          <small className="border-radius-4 bg-primary text-white px-2 py-2px ">
                            in stock
                          </small>
                        )
                      ) : (
                        <small className="border-radius-4 bg-error text-white px-2 py-2px ">
                          out of stock
                        </small>
                      )}
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      );
    };
  }


export default TableCard;