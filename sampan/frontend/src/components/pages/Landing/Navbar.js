import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import { MDBNavbar, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBContainer } from 'mdbreact';

import './Navbar.scss';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapse: false
		};
	}

	onClick = () => this.setState({ collapse: !this.state.collapse });

	render() {
		const background = { backgroundColor: '#f5f5f5' };
		return (
			<div>
				<header>
					<MDBNavbar style={background} light expand="md" scrolling fixed="top">
						<MDBContainer>
							<AnchorLink href="#home">
								<img
									src={require('../../../assets/logo-dark-full.png')}
									alt="logo"
									height="40"
									width="100"
								/>
							</AnchorLink>
							<MDBNavbarToggler onClick={this.onClick} />
							<MDBCollapse isOpen={this.state.collapse} navbar>
								<MDBNavbarNav right>
									<MDBNavItem className="nav-item-landing my-2 mx-2" active>
										<AnchorLink className="text-success" offset={() => 100} href="#home">
											Home
										</AnchorLink>
									</MDBNavItem>
									<MDBNavItem className="nav-item-landing my-2 mx-2">
										<AnchorLink className="text-success" offset={() => 150} href="#partner">
											Partnership
										</AnchorLink>
									</MDBNavItem>
									<MDBNavItem className="nav-item-landing my-2 mx-2">
										<AnchorLink className="text-success" offset={() => 150} href="#faq">
											FAQ
										</AnchorLink>
									</MDBNavItem>
									<MDBNavItem className="nav-item-landing my-2 mx-2">
										<AnchorLink className="text-success" offset={() => 100} href="#ourteam">
											Our Team
										</AnchorLink>
									</MDBNavItem>
									<MDBNavItem className="nav-item-landing my-2 mx-2">
										<AnchorLink className="text-success" offset={() => 100} href="#footer">
											Contact Us
										</AnchorLink>
									</MDBNavItem>
								</MDBNavbarNav>
							</MDBCollapse>
						</MDBContainer>
					</MDBNavbar>
				</header>
			</div>
		);
	}
}

export default Navbar;
