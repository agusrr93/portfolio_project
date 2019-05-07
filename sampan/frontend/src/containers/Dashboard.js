import React, { Component } from 'react';

import TopNavigation from '../components/TopNavigation';
import SideNavigation from '../components/SideNavigation';
import Routes from '../components/Routes';
import Footer from '../components/Footer';

import './Dashboard.scss';
import '../components/pages/pages.scss';
class Dashboard extends Component {
	render() {
		return (
			<div className="flexible-content" data-test="dashboard-container">
				<TopNavigation data-test="top-navigation" />
				<SideNavigation data-test="sidebar-navigation" />
				<main id="content" className="p-5" data-test="main-content">
					<Routes />
				</main>
				<Footer data-test="footer-component" />
			</div>
		);
	}
}

export default Dashboard;
