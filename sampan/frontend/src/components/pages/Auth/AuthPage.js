import React, { Component } from 'react';
import './AuthPage.scss';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import { loginAdmin } from '../../../actions/authAction';

class AuthPage extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: ''
		};
	}

	componentWillReceiveProps(nextProps) {
		console.log('nextProps', nextProps);
		nextProps.auth.isAuthenticated && this.props.history.push('/dashboard');
	}

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	onSubmit = (e) => {
		e.preventDefault();
		const { email, password } = this.state,
			data = { email, password };
		this.props.loginAdmin(data);
	};

	render() {
		return (
			<MDBContainer className="mt-5">
				<MDBRow>
					<MDBCol md="4" lg="4" sm="12" />
					<MDBCol md="4" lg="4" sm="12">
						<form onSubmit={this.onSubmit}>
							<p className="h5 text-center mb-4">Sign in</p>
							<div className="grey-text">
								<MDBInput
									label="Type your email"
									icon="envelope"
									name="email"
									id="email-input"
									value={this.state.email}
									onChange={this.onChange}
									group
									type="email"
									validate
									error="wrong"
									success="right"
								/>
								<MDBInput
									label="Type your password"
									icon="lock"
									id="password-input"
									group
									type="password"
									onChange={this.onChange}
									value={this.state.password}
									name="password"
									validate
								/>
							</div>
							<div className="text-center">
								<MDBBtn color="indigo" type="submit">Login</MDBBtn>
							</div>
						</form>
					</MDBCol>
					<MDBCol md="4" lg="4" sm="12" />
				</MDBRow>
			</MDBContainer>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { loginAdmin })(AuthPage);
