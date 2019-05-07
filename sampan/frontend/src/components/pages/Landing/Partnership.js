import React, { Component } from 'react';
import '../Landing/Partnership.scss';

export default class Partnership extends Component {
	constructor() {
		super();
		this.state = {
			items: [
				{ picture: require('./Images/p1.png'), name: '' },
				{ picture: require('./Images/p2.png'), name: '' },
				{ picture: require('./Images/p3.jpg'), name: '' },
				{ picture: require('./Images/p4.jpg'), name: '' },
				{ picture: require('./Images/p5.jpg'), name: '' }
			]
		};
	}

	render() {
		const noRadius = {
			borderRadius: '0px !important'
		};
		const itemList = this.state.items.map((item, index) => {
			return (
				<div key={index} className="col-md-2 col-lg-2 col-sm-5 mb-5 px-2 pt-5">
					<div className="card">
						<img src={item.picture} className="card-img-top m-auto" alt="..." />
					</div>
				</div>
			);
		});

		return (
			<div className="container my-5" >
				<div className="row" id="partner">
					<div className="col-md-2 col-lg-2 col-sm-5 mb-5 px-2 pt-5">
						<div className="card-no-radius bg-success h-100" style={noRadius}>
							<span className="d-flex justify-content-center">
								Our <br /> Partners
							</span>
						</div>
					</div>
					{itemList}
				</div>
			</div>
		);
	}
}
