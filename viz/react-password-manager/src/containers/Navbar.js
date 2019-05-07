import React, { Component, Fragment } from "react";
import { Button } from "carbon-components-react";
import { auth } from "../configs/firebase";
import { logout } from "../js/actions/userlogin";
import { connect } from "react-redux";
import "../App.css";
import logo from "../logo.svg";

const mapDispatchToProps = dispatch => {
	return {
		logout: () => {
			auth.signOut();
			dispatch(logout());
		}
	};
};
export class Navbar extends Component {
	render() {
		let showLogo = (
			<Fragment>
				<img src={logo} className="App-logo" alt="logo" />
				<h1 className="App-title">Password Manager</h1>
			</Fragment>
		);
		let showLogout = <Button onClick={this.props.logout}>Keluar</Button>;

		return (
			<header className="App-header">
				{this.props.isLoggedIn ? showLogout : showLogo}
			</header>
		);
	}
}

export default connect(
	null,
	mapDispatchToProps
)(Navbar);
