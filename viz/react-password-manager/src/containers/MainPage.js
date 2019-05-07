import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { auth } from "../configs/firebase";
import { login, logout } from "../js/actions/userlogin";

import Navbar from "./Navbar";
import SignIn from "./SignIn";
import PasswordSearch from "./PasswordSearch";
import NotFound from "../components/NotFound";
import { connect } from "react-redux";

const mapStateToProps = state => {
	return {
		isLoggedIn: state.login.isLoggedIn
	};
};

const mapDispatchToProps = dispatch => {
	return {
		login: userUid => {
			dispatch(login(userUid));
		},
		logout: () => {
			dispatch(logout());
		}
	};
};

export class MainPage extends Component {
	render() {
		return (
			<Fragment>
				<Navbar isLoggedIn={this.props.isLoggedIn} />
				<BrowserRouter>
					<Switch>
						<Route
							exact
							path="/"
							render={() =>
								this.props.isLoggedIn ? (
									<Redirect to="/dashboard" />
								) : (
									<SignIn />
								)
							}
						/>
						<Route
							path="/dashboard"
							render={() =>
								this.props.isLoggedIn ? <PasswordSearch /> : <Redirect to="/" />
							}
						/>
						<Route component={NotFound} />
					</Switch>
				</BrowserRouter>
			</Fragment>
		);
	}

	componentWillMount() {
		auth.onAuthStateChanged(user => {
			if (user) {
				this.props.login(user.uid);
			} else {
				this.props.logout();
			}
		});
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainPage);
