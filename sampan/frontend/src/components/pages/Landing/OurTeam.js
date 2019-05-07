import React, { Component } from 'react';
import Image1 from './Images/anwar.jpg';
import Image2 from './Images/andre.jpg';
import Image3 from './Images/muklas.jpg';
import Image4 from './Images/idrus.jpg';
import Image5 from './Images/agus.jpg';
import Image6 from './Images/el.jpg';
import Image7 from './Images/febri.jpg';
import Image8 from './Images/nike.jpg';

export default class OurTeam extends Component {
	render() {
		return (
			<div className="container my-5 mx-auto tex" id="ourteam">
				<h3 className="text-dark font-bree-serif bold">Our Team</h3>
				<div className="row mx-auto text-center mt-5">
					<div className="col-md-3 col-lg-3 col-sm-3">
						<img
							alt="avatar1"
							className="rounded-circle z-depth-2 bd-placeholder-img rounded-circle"
							width="140"
							height="140"
							src={Image1}
						/>
						<h2>Anwar</h2>
						<p>Front-end Developer</p>
					</div>
					<div className="col-md-3 col-lg-3 col-sm-3">
						<img
							alt="avatar2"
							className="rounded-circle z-depth-2 bd-placeholder-img rounded-circle"
							width="140"
							height="140"
							src={Image2}
						/>
						<h2>Andre</h2>
						<p>Front-end Developer</p>
					</div>
					<div className="col-md-3 col-lg-3 col-sm-3">
						<img
							alt="avatar3"
							className="rounded-circle z-depth-2 bd-placeholder-img rounded-circle"
							width="140"
							height="140"
							src={Image3}
						/>
						<h2>Muklas</h2>
						<p>Front-end Developer</p>
					</div>
					<div className="col-md-3 col-lg-3 col-sm-3">
						<img
							alt="avatar4"
							className="rounded-circle z-depth-2 bd-placeholder-img rounded-circle"
							width="140"
							height="140"
							src={Image5}
						/>
						<h2>Agus</h2>
						<p>React-Native Developer</p>
					</div>
					<div className="col-md-3 col-lg-3 col-sm-3">
						<img
							alt="avatar5"
							className="rounded-circle z-depth-2 bd-placeholder-img rounded-circle"
							width="140"
							height="140"
							src={Image4}
						/>
						<h2>Idrus</h2>
						<p>Back-end Developer</p>
					</div>
					<div className="col-md-3 col-lg-3 col-sm-3">
						<img
							alt="avatar6"
							className="rounded-circle z-depth-2 bd-placeholder-img rounded-circle"
							width="140"
							height="140"
							src={Image6}
						/>
						<h2>Elfarabi</h2>
						<p>Back-end Developer</p>
					</div>
					<div className="col-md-3 col-lg-3 col-sm-3">
						<img
							alt="avatar7"
							className="rounded-circle z-depth-2 bd-placeholder-img rounded-circle"
							width="140"
							height="140"
							src={Image7}
						/>
						<h2>Febrina</h2>
						<p>Back-end Developer</p>
					</div>
					<div className="col-md-3 col-lg-3 col-sm-3">
						<img
							alt="avatar8"
							className="rounded-circle z-depth-2 bd-placeholder-img rounded-circle"
							width="140"
							height="140"
							src={Image8}
						/>
						<h2>Nike</h2>
						<p>React-Native Developer</p>
					</div>
				</div>
			</div>
		);
	}
}
