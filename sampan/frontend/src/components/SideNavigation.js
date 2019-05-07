import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const TopNavigation = () => {
	return (
		<div className="sidebar-fixed position-fixed">
			<MDBListGroup className="list-group-flush mt-5">
				<NavLink exact={true} to="/dashboard" activeClassName="activeClass">
					<MDBListGroupItem className="font-green">
						<MDBIcon icon="chart-pie" className="mr-3" />
						Dashboard
					</MDBListGroupItem>
				</NavLink>
				<NavLink to="/category" activeClassName="activeClass" id="category-nav">
					<MDBListGroupItem className="font-green">
						<MDBIcon icon="cube" className="mr-3" />
						Category
					</MDBListGroupItem>
				</NavLink>
				<NavLink to="/transaction" activeClassName="activeClass" id="category-nav">
					<MDBListGroupItem className="font-green">
						<MDBIcon icon="money-bill-wave" className="mr-3" />
						Transaction
					</MDBListGroupItem>
				</NavLink>
				<NavLink to="/city" activeClassName="activeClass">
					<MDBListGroupItem className="font-green">
						<MDBIcon icon="table" className="mr-3" />
						City
					</MDBListGroupItem>
				</NavLink>
				<NavLink to="/training" activeClassName="activeClass">
					<MDBListGroupItem className="font-green">
						<MDBIcon icon="user" className="mr-3" />
						Training
					</MDBListGroupItem>
				</NavLink>
				<NavLink to="/event" activeClassName="activeClass">
					<MDBListGroupItem className="font-green">
						<MDBIcon icon="calendar-alt" className="mr-3" />
						Event
					</MDBListGroupItem>
				</NavLink>
				<NavLink to="/slider" activeClassName="activeClass">
					<MDBListGroupItem className="font-green">
						<MDBIcon icon="feather-alt" className="mr-3" />
						Slider
					</MDBListGroupItem>
				</NavLink>
			</MDBListGroup>
		</div>
	);
};

export default TopNavigation;
