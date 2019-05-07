import React, { Component } from 'react';
import './Faq.scss';
export default class Faq extends Component {
	render() {
		return (
			<div className="my-5 faq-bg" id="faq">
				<div className="row py-5 overlay">
					<div className="container">
						<div className="row teks">
							<div className="col-lg-4 col-sm-12 col-md-12 my-3">
								<small>
									<h4 className="display-5 font-nanum-gothic">
										SampAn
									</h4>

									<p className="card-text">
										Digital intelligence, Value oriented, Uniqueness, and Go-green movement.
									</p>
								</small>
							</div>
							<div className="col-lg-4 col-sm-12 col-md-12 my-3">
								<small>
									<h4 className="display-5 font-nanum-gothic">About Us</h4>
									<p className="card-text">
										As innovation accelerates, the day may not be far off where waste goes from trash to cash, as well. How will this change play out? SampAn is coming as the answer of our prayers.
									</p>
								</small>
							</div>
							<div className="col-lg-4 col-sm-12 col-md-12 my-3">
								<small>
									<h4 className="display-5 font-nanum-gothic">
										Keen to join SampAn?
									</h4>
									<p className="card-text">
										You can either join or participate as a participant, mentor, or investor in SampAn by contacting the person in charge below.
									</p>
								</small>
							</div>
							<br />
						</div>
						<div className="row justify-content-center">
							<button className="btn btn-success">Find Out More</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
