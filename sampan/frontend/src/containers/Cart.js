import React, { Component } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Carts from "../components/Carts";

export default class Cart extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Carts />
        <Footer />
      </div>
    );
  }
}
