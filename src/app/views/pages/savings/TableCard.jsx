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
    return (
        <Card elevation={4} className="pt-5 mb-6">
          {/* <div className="card-title px-6 mb-3">Latest Transactions</div> */}
          <div className="overflow-auto">
            <Table className="product-table">
              <TableHead>
                <TableRow>
                  <TableCell className="px-6" colSpan={3}>
                  ID
                  </TableCell>
                  <TableCell className="px-0" colSpan={4}>
                  AMOUNT
                  </TableCell>
                  <TableCell className="px-0" colSpan={1}>
                  TYPE
                  </TableCell>
                  <TableCell className="px-0" colSpan={3}>
                  DATE
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.transactions.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-0 capitalize" align="left" colSpan={3}>
                      {product.id}
                    </TableCell>
                    <TableCell className="px-0 capitalize" align="left" colSpan={4}>
                      {numberFormat(product.amount)}
                    </TableCell>
                    <TableCell className="px-0 capitalize" colSpan={1} align="left">
                    {product.transaction_category == 1 ? "Regular Savings": 
                    product.transaction_category == 2 ? "Target Savings":
                    product.transaction_category == 3 ? "Save To Loan":
                    product.transaction_category == 4 ? "Loan":
                    product.transaction_category == 5 ? "Market Investment":
                    product.transaction_category == 6 ? "Halal Financing":
                    product.transaction_category == 7 ? 
                    product.transaction_type == "credit"?"Wallet Funding":" Wallet Withdrawal": ""}
                    </TableCell>
                    <TableCell className="px-0" colSpan={3} >
                      {product.transaction_type}
                    </TableCell>
                    <TableCell className="px-0" colSpan={2}>
                      {product.date_time}
                    </TableCell>
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
