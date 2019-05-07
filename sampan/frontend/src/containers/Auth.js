import React, { Component } from 'react';
import AuthPage from '../components/pages/Auth/AuthPage';
import { connect } from 'react-redux';
import { setCurrentUser } from '../actions/authAction';

class Auth extends Component {
	componentDidMount() {
		this.props.auth.isAuthenticated && this.props.history.push('/dashboard');
	}

	render() {
		return (
			<div>
				<AuthPage history={this.props.history} />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { setCurrentUser })(Auth);
