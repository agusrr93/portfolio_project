import React, { Component } from 'react';
import {
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarNav,
	MDBNavbarToggler,
	MDBCollapse,
	MDBDropdown,
	MDBDropdownToggle,
	MDBDropdownMenu,
	MDBDropdownItem
} from 'mdbreact';
import { connect } from 'react-redux';
import { logoutAdmin } from '../actions/authAction';
class TopNavigation extends Component {
	state = {
		collapse: false
	};

	onClick = () => {
		this.setState({
			collapse: !this.state.collapse
		});
	};

	toggle = () => {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	};

	render() {
		const { user } = this.props.auth;
		return (
			<MDBNavbar className="flexible-navbar" light expand="md" scrolling>
				<MDBNavbarBrand href="/">
					<strong>SampAn</strong>
				</MDBNavbarBrand>
				<MDBNavbarToggler onClick={this.onClick} />
				<MDBCollapse isOpen={this.state.collapse} navbar>
					<MDBNavbarNav right>
						{user && (
							<MDBDropdown size="sm">
								<MDBDropdownToggle caret color="default">
									<span className="text-lowercase">{user.sub}</span>
								</MDBDropdownToggle>
								<MDBDropdownMenu basic>
									{/* <MDBDropdownItem divider /> */}
									<MDBDropdownItem onClick={this.props.logoutAdmin}>Logout</MDBDropdownItem>
								</MDBDropdownMenu>
							</MDBDropdown>
						)}
						{/* <MDBNavItem>
							<a
								className="nav-link navbar-link"
								rel="noopener noreferrer"
								target="_blank"
								href="https://twitter.com/mdbootstrap"
							>
								<MDBIcon fab icon="twitter" />
							</a>
						</MDBNavItem>
						<MDBNavItem>
							<a
								className="border border-light rounded mr-1 nav-link Ripple-parent"
								rel="noopener noreferrer"
								href="https://github.com/mdbootstrap/React-Bootstrap-with-Material-Design"
								target="_blank"
							>
								<MDBIcon fab icon="github" className="mr-2" />MDB GitHub
							</a>
						</MDBNavItem>
						<MDBNavItem>
							<a
								className="border border-light rounded mr-1 nav-link Ripple-parent"
								rel="noopener noreferrer"
								href="https://mdbootstrap.com/products/react-ui-kit/"
								target="_blank"
							>
								<MDBIcon fab icon="github" className="mr-2" />Go Pro
							</a>
						</MDBNavItem> */}
					</MDBNavbarNav>
				</MDBCollapse>
			</MDBNavbar>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutAdmin })(TopNavigation);
