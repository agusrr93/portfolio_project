import React, { Component } from "react";
import { MDBTable, MDBTableBody, MDBTableHead, Container, MDBInput } from "mdbreact";

export default class Cart extends Component {
  render() {
    return (
      <div>
        <Container>
          <MDBTable hover>
            <MDBTableHead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th style={{width:"100px"}}>Quantity</th>
                <th>Quantity</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td><MDBInput type="number" /></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </Container>
      </div>
    );
  }
}
