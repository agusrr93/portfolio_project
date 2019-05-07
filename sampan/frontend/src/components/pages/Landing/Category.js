import React, { Component } from 'react';
import './Category.scss';
import classnames from 'classnames';
export default class Category extends Component {
	constructor() {
		super();
		this.state = {
			items: [
				{
					picture: 'https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/7.jpg',
					coverLight: false,
					name: 'Flannel'
				},
        { picture: 'https://mdbootstrap.com/img/Photos/Others/men.jpg', coverLight: true, 
        name: 'Cardbox' },
				{
					picture:
						'https://images.pexels.com/photos/1845534/pexels-photo-1845534.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
					coverLight: false,
					name: 'Rag'
				},
				{
					picture:
						'https://images.pexels.com/photos/1599980/pexels-photo-1599980.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
					coverLight: true,
					name: 'Cans'
				},
				{
					picture:
						'https://images.pexels.com/photos/764529/pexels-photo-764529.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
					coverLight: true,
					name: 'Paper'
				},
				{
					picture:
						'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
					coverLight: false,
					name: 'Plastic'
				}
			]
		};
	}
	render() {
		const categoryList = this.state.items.map((item, index) => {
			return (
				<div key={index} className="col-no-pad col-md-2 col-lg-2 col-sm-2" >
					<div className="m-2">
						<div className="card2">
							<img
								src={item.picture}
								className="card-img-top"
								alt="category-images"
								width="100%"
								height="250px"
							/>

							<div className={classnames(item.coverLight ? 'card-themes-light' : 'card-themes-dark')}>
								<h5 className="text-center">
									{item.name}
									{'`'}
								</h5>
							</div>
						</div>
					</div>
				</div>
			);
		});
		return (
			<div className="container my-5" >
				<div className="row mb-3">
					<small>
						<h3 className="text-dark font-bree-serif" id="category">Category</h3>
					</small>
				</div>
				<div className="row m-auto p-0">{categoryList}</div>
			</div>
		);
	}
}
