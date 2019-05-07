import React, { Component } from 'react';
import {
	MDBRow,
	MDBCol,
	MDBView,
	MDBModalHeader,
	MDBModalBody,
	MDBCard,
	MDBIcon,
	MDBCardBody,
	MDBContainer,
	MDBDataTable,
	MDBBtn,
	MDBModal
} from 'mdbreact';
import Message from '../Message';
import { connect } from 'react-redux';
import { getSlider, storeSlider, deleteSlider, editSlider } from '../../actions/sliderAction';
import ReactLoading from 'react-loading';

class ImageSliderPage extends Component {
	constructor() {
		super();
		this.state = {
			modal: false,
			msg: '',
			title: '',
			image: null,
			description: '',
			status: false,
			forEdit: false,
			imageView: '',
			fileName: 'choose file',
			edit_id: '',
			edit_title: '',
			edit_description: '',
			edit_image: ''
		};
	}

	componentDidMount() {
		this.props.getSlider();
	}

	componentWillReceiveProps(nextProps) {
		console.log('nextProps', nextProps);
		if (nextProps.slider.msg) {
			this.setState({ msg: nextProps.slider.msg, status: true });
			setTimeout(() => this.setState({ msg: '', status: false }), 5000);
		} else if (nextProps.message.msg) {
			this.setState({ msg: nextProps.message.msg });
			setTimeout(() => this.setState({ msg: '', status: false }), 5000);
		}
	}

	handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

	fileHandle = (e) =>
		!this.state.forEdit
			? this.setState({ fileName: e.target.files[0].name, image: e.target.files[0] })
			: this.setState({ fileName: e.target.files[0].name, edit_image: e.target.files[0] });

	handleSubmit = (e) => {
		e.preventDefault();
		const { title, description, edit_id, edit_title, edit_description, forEdit, image, edit_image } = this.state;

		let data = new FormData();
		data.append('title', title);
		data.append('description', description);
		data.append('image', image);

		let dataEdit = new FormData();
		dataEdit.append('id', edit_id);
		dataEdit.append('title', edit_title);
		dataEdit.append('description', edit_description);
		edit_image === null ? dataEdit.append('data', null) : dataEdit.append('image', edit_image);

		forEdit ? this.props.editSlider(dataEdit) : this.props.storeSlider(data);
		this.setState({ title: '', description: '', forEdit: false, edit_image: null });
		this.toggle(true);
	};

	toggle = (data) => {
		data && data._id
			? this.setState({
					edit_id: data._id,
					edit_title: data.title,
					edit_description: data.description,
					forEdit: true,
					fileName: 'choose file'
				})
			: this.setState({
					name: '',
					description: '',
					forEdit: false,
					fileName: 'choose file'
				});
		this.setState({ modal: !this.state.modal });
	};

	toggleImage = (image) => this.setState({ modalImage: !this.state.modalImage, imageView: image });

	render() {
		const { msg, title, description, status, forEdit, edit_title, edit_id, edit_description } = this.state,
			{ slider } = this.props,
			allSliders = slider.sliders;

		let rowSliders = [];
		for (let i = 0; i < allSliders.length; i++) {
			let data = {
				no: i + 1,
				title: allSliders[i].title,
				description: allSliders[i].description,
				actions: (
					<div className="btn-group w-100">
						<MDBBtn size="sm" color="info" onClick={() => this.toggle(allSliders[i])}>
							<MDBIcon icon="edit" className="mr-1" /> Edit
						</MDBBtn>
						<MDBBtn size="sm" color="danger" onClick={() => this.props.deleteSlider(allSliders[i]._id)}>
							Delete <MDBIcon icon="trash" className="mr-1" />
						</MDBBtn>
						<MDBBtn size="sm" color="success" onClick={() => this.toggleImage(allSliders[i].image)}>
							View <MDBIcon icon="eye" className="mr-1" />
						</MDBBtn>
					</div>
				)
			};
			rowSliders = [ ...rowSliders, data ];
		}

		const data = {
			columns: [
				{
					label: 'No',
					field: 'no',
					sort: 'asc',
					width: 40
				},
				{
					label: 'Title',
					field: 'title',
					sort: 'asc',
					width: 150
				},
				{
					label: 'Description',
					field: 'description',
					sort: 'asc',
					width: 270
				},
				{
					label: 'Actions',
					field: 'actions',
					sort: 'asc',
					width: 80
				}
			],
			rows: rowSliders
		};
		return (
			<div>
				{msg && <Message color={status ? 'info' : 'danger'} msg={msg} />}
				<MDBRow>
					<MDBCol md="12">
						<MDBCard className="mt-1">
							<MDBView className="gradient-card-header dark-green">
								<h4 className="h4-responsive text-white">Management Slider</h4>
							</MDBView>
							<MDBContainer className="mt-3">
								<MDBCol />
								<MDBCol>
									<MDBBtn size="md" color="primary" className="float-right" onClick={this.toggle}>
										<MDBIcon icon="plus" className="mr-1" /> Add
									</MDBBtn>
								</MDBCol>
							</MDBContainer>
							<MDBCardBody>
								{slider.sliders.length >= 1 ? (
									<MDBContainer>
										<MDBDataTable striped bordered hover data={data} />
									</MDBContainer>
								) : (
									<MDBContainer className="d-flex justify-content-center">
										<ReactLoading type="spin" color="#B2CA45" height={'10%'} width={'10%'} />
									</MDBContainer>
								)}
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
					<MDBModal isOpen={this.state.modal} toggle={this.toggle}>
						<MDBModalHeader toggle={this.toggle}>{forEdit ? 'Edit Slider' : 'Add Slider'}</MDBModalHeader>
						<MDBModalBody>
							<form onSubmit={this.handleSubmit}>
								<input
									type="text"
									className="form-control"
									placeholder="slider name"
									value={forEdit ? edit_title : title}
									name={forEdit ? 'edit_title' : 'title'}
									onChange={this.handleChange}
								/>
								<input type="hidden" value={forEdit && edit_id} />
								<br />
								<input
									type="text"
									className="form-control"
									placeholder="slider description"
									value={forEdit ? edit_description : description}
									name={forEdit ? 'edit_description' : 'description'}
									onChange={this.handleChange}
								/>
								<br />
								<div className="input-group">
									<div className="input-group-prepend">
										<span className="input-group-text" id="inputGroupFileAddon01">
											Upload
										</span>
									</div>
									<div className="custom-file">
										<input
											type="file"
											className="custom-file-input"
											id="inputGroupFile01"
											onChange={this.fileHandle}
											aria-describedby="inputGroupFileAddon01"
										/>
										<label className="custom-file-label" htmlFor="inputGroupFile01">
											{this.state.fileName}
										</label>
									</div>
								</div>
								<div className="mt-4 float-right">
									<MDBBtn color="secondary" onClick={this.toggle}>
										Close
									</MDBBtn>
									<MDBBtn color="primary" type="submit">
										Save
									</MDBBtn>
								</div>
							</form>
						</MDBModalBody>
					</MDBModal>
					<MDBModal size="lg" isOpen={this.state.modalImage} toggle={this.toggleImage}>
						<MDBModalHeader toggle={this.toggleImage}>Slider Image</MDBModalHeader>
						<MDBModalBody className="text-center d-flex justify-content-center">
							<img src={this.state.imageView} alt="View" height="400" width="750" style={{objectFit:'cover'}}/>
						</MDBModalBody>
					</MDBModal>
				</MDBRow>
			</div>
		);
	}
}
const action = {
	getSlider,
	storeSlider,
	deleteSlider,
	editSlider
};

const mapStateToProps = (state) => ({
	slider: state.slider,
	message: state.message
});

export default connect(mapStateToProps, action)(ImageSliderPage);
