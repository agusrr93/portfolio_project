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
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import { getCategory, storeCategory, deleteCategory, editCategory } from '../../actions/categoryAction';
import Message from '../Message';
export class Category extends Component {
	constructor() {
		super();
		this.state = {
			modal: false,
			modalImage: false,
			name: '',
			description: '',
			msg: '',
			edit_id: '',
			editname: '',
			editdescription: '',
			status: false,
			forEdit: false,
			fileName: 'choose file',
			image: null,
			edit_image: null,
			imageView: ''
		};
	}
	componentDidMount() {
		this.props.getCategory();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.category.msg) {
			this.setState({ msg: nextProps.category.msg, status: true });
			setTimeout(() => this.setState({ msg: '', status: false }), 5000);
		} else if (nextProps.message.msg) {
			this.setState({ msg: nextProps.message.msg });
			setTimeout(() => this.setState({ msg: '', status: false }), 5000);
		} else {
		}
	}

	handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

	handleSubmit = (e) => {
		e.preventDefault();
		const { name, description, edit_id, editname, editdescription, forEdit, image, edit_image } = this.state;

		let data = new FormData();
		data.append('name', name);
		data.append('description', description);
		data.append('image', image);

		let dataEdit = new FormData();
		dataEdit.append('id', edit_id);
		dataEdit.append('name', editname);
		dataEdit.append('description', editdescription);
		edit_image === null ? dataEdit.append('data', null) : dataEdit.append('image', edit_image);

		forEdit ? this.props.editCategory(dataEdit) : this.props.storeCategory(data);
		this.setState({ name: '', description: '', forEdit: false, edit_image: null });
		this.toggle(true);
	};

	fileHandle = (e) =>
		!this.state.forEdit
			? this.setState({ fileName: e.target.files[0].name, image: e.target.files[0] })
			: this.setState({ fileName: e.target.files[0].name, edit_image: e.target.files[0] });

	toggleImage = (image) => this.setState({ modalImage: !this.state.modalImage, imageView: image });

	toggle = (data) => {
		data && data._id
			? this.setState({
					edit_id: data._id,
					editname: data.name,
					editdescription: data.description,
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

	render() {
		const { category } = this.props,
			allCategories = category.categories,
			{ msg, status, forEdit } = this.state;
		let rowCategories = [];
		for (let i = 0; i < allCategories.length; i++) {
			let data = {
				no: i + 1,
				name: allCategories[i].name,
				description: allCategories[i].description,
				actions: (
					<div className="btn-group w-100">
						<MDBBtn
							size="sm"
							id={`edit-category${i}`}
							color="info"
							onClick={() => this.toggle(allCategories[i])}
						>
							<MDBIcon icon="edit" className="mr-1" /> Edit
						</MDBBtn>
						<MDBBtn
							size="sm"
							color="danger"
							id={`delete-category${i}`}
							onClick={() => this.props.deleteCategory(allCategories[i]._id)}
						>
							Delete <MDBIcon icon="trash" className="mr-1" />
						</MDBBtn>
						<MDBBtn size="sm" color="success" onClick={() => this.toggleImage(allCategories[i].image)}>
							View <MDBIcon icon="eye" className="mr-1" />
						</MDBBtn>
					</div>
				)
			};
			rowCategories = [ ...rowCategories, data ];
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
					label: 'Name',
					field: 'name',
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
			rows: rowCategories
		};

		return (
			<div>
				{msg && <Message id="message-info" color={status ? 'info' : 'danger'} msg={msg} />}
				<MDBRow>
					<MDBCol md="12">
						<MDBCard className="mt-1" data-test="category-card">
							<MDBView className="gradient-card-header dark-green">
								<h4 className="h4-responsive text-white">Management Category</h4>
							</MDBView>
							<MDBContainer className="mt-3">
								<MDBCol />
								<MDBCol>
									<MDBBtn
										size="md"
										color="primary"
										className="float-right"
										onClick={this.toggle}
										id="category-modal-button"
										data-test="category-modal-button"
									>
										<MDBIcon icon="plus" className="mr-1" /> Add
									</MDBBtn>
								</MDBCol>
							</MDBContainer>
							<MDBCardBody>
								{category.categories.length >= 1 ? (
									<MDBContainer>
										<MDBDataTable
											striped
											bordered
											hover
											data={data}
											id="category-datatable"
											data-test="category-datatable"
										/>
									</MDBContainer>
								) : (
									<MDBContainer className="d-flex justify-content-center">
										<ReactLoading type="spin" color="#B2CA45" height={'10%'} width={'10%'} />
									</MDBContainer>
								)}
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
					<MDBModal isOpen={this.state.modal} toggle={this.toggle} data-test="category-modal">
						<MDBModalHeader toggle={this.toggle}>
							{forEdit ? 'Edit Category' : 'Add Category'}
						</MDBModalHeader>
						<MDBModalBody>
							<form onSubmit={this.handleSubmit} data-test="category-submit" id="category-submit">
								<input
									type="text"
									className="form-control"
									placeholder="category name"
									id="category-name"
									value={forEdit ? this.state.editname : this.state.name}
									name={forEdit ? 'editname' : 'name'}
									onChange={this.handleChange}
								/>
								<input type="hidden" value={forEdit && this.state.edit_id} />
								<br />
								<input
									type="text"
									className="form-control"
									placeholder="category description"
									id="category-description"
									value={forEdit ? this.state.editdescription : this.state.description}
									name={forEdit ? 'editdescription' : 'description'}
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
					<MDBModal isOpen={this.state.modalImage} toggle={this.toggleImage}>
						<MDBModalHeader toggle={this.toggleImage}>Category Image</MDBModalHeader>
						<MDBModalBody className="text-center">
							<img src={this.state.imageView} alt="View" />
						</MDBModalBody>
					</MDBModal>
				</MDBRow>
			</div>
		);
	}
}

const action = {
	getCategory,
	storeCategory,
	deleteCategory,
	editCategory
};

const mapStateToProps = (state) => ({
	category: state.category,
	message: state.message
});

export default connect(mapStateToProps, action)(Category);
