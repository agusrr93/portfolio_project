import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';

import Landing from './containers/Landing';
import Auth from './containers/Auth';
import Dashboard from './containers/Dashboard';

import PrivateRoute from './utils/privateRoute';
import setToken from './utils/setToken';
import { setCurrentUser, logoutAdmin } from './actions/authAction';
import jwt_decode from 'jwt-decode';

if (localStorage.token) {
	setToken(localStorage.token);
	const decode = jwt_decode(localStorage.token),
		currentTime = Date.now() / 1000;
	store.dispatch(setCurrentUser(decode));
	decode.exp < currentTime && store.dispatch(logoutAdmin());
}

class App extends Component {
	render() {
		return (
			<Router>
				<Provider store={store}>
					<Route path="/" component={Landing} exact />
					<Route path="/admin" component={Auth} exact />
					<Switch>
						<PrivateRoute path="/dashboard" component={Dashboard} exact />
						<PrivateRoute path="/transaction" component={Dashboard} exact />
						<PrivateRoute path="/category" component={Dashboard} exact />
						<PrivateRoute path="/city" component={Dashboard} exact />
						<PrivateRoute path="/training" component={Dashboard} exact />
						<PrivateRoute path="/event" component={Dashboard} exact />
						<PrivateRoute path="/slider" component={Dashboard} exact />
					</Switch>
				</Provider>
			</Router>
		);
	}
}

export default App;
