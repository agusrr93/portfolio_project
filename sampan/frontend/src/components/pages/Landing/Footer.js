import React, { Component } from 'react';
import '../Landing/Footer.scss';

export default class Footer extends Component {
	render() {
		return (
			<div className="mt-3 bg-color" id="footer">
				<div className="container">
					<div className="row">
						<div className="col-lg-9 col-sm-9 col-md-6 my-3">
							<small>
								<h3 className="mb-3 text-light font-bree-serif">Contacts</h3>
							</small>
							<div className="list ml-2 mt-2" style={{ listStyleType: 'none' }}>
								<li>
									<i className="fa fa-phone" aria-hidden="true">
										{' '}
										<span className="display-6 font-nanum-gothic">+62 831 6555 0896</span>
									</i>
								</li>
								<br />
								<li>
									<i className="fa fa-envelope" aria-hidden="true">
										{' '}
										<span className="display-6 font-nanum-gothic">sampan@info.com</span>
									</i>
								</li>
								<br />
								<li>
									<i className="fa fa-location-arrow" aria-hidden="true">
										{' '}
										<span className="display-6 font-nanum-gothic">Nongsa Digital Park, Batam.</span>
									</i>
								</li>
							</div>
						</div>
						<div lg={4} sm={12} md={4} className="my-4">
							<div className="display-5">
								<br />
								<p>Stay connected with us</p>
							</div>
							<i className="icon-fab mx-2 fab fa-2x fa-facebook-f" />
							<i className="icon-fab mx-2 fab fa-2x fa-instagram" />
							<i className="icon-fab mx-2 fab fa-2x fa-twitter" />
							<i className="icon-fab mx-2 fab fa-2x fa-google-plus-square" />
						</div>
					</div>
				</div>

				<div className="container d-flex bg-color-dark justify-content-center mt-3 py-2">
					<img
						src={require('./Images/Logo-Square.png')}
						width="50"
						height="50"
						alt="Logos"
						style={{ marginRight: '2px', position: 'relative', top: '-5px' }}
					/>
					<span>© 2019<br/>Trash is treasure</span>
				</div>
			</div>
		);
	}
}
// function topFunction() {
//   document.body.scrollTop = 0;
//   document.documentElement.scrollTop = 0;
