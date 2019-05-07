import React, { Component } from 'react';
import Navbar from '../components/pages/Landing/Navbar';
import Footer from '../components/pages/Landing/Footer';
import Home from '../components/pages/Landing/Home';
import Partnership from '../components/pages/Landing/Partnership';
import Faq from '../components/pages/Landing/Faq';
import OurTeam from '../components/pages/Landing/OurTeam';

class Landing extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<Home />
				<Partnership />
				<Faq />
				<OurTeam />
				<Footer />
			</div>
		);
	}
}

export default Landing;
