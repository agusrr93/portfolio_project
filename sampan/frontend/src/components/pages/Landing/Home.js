import React, { Component } from 'react';
import './Home.scss';

export default class Home extends Component {
	render() {
		return (
			<section className="header" id="home">
				<div className="row overlay d-flex justify-content-center mx-0">
					<div className="header-content">
						{/* <img className="logo" src={require('./Images/Logo-Square.png')} alt="logo" /> */}
						<h1 className="mt-3 display-3">
							WE <span className="h1-active">CRAFT</span> A WEBSITE <br />FOR YOUR{' '}
							<span className="h1-active">CRAFTED</span> ITEMS.
						</h1>
					</div>
				</div>
			</section>
		);
	}
}
