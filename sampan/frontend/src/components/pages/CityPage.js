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
import ReactLoading from "react-loading";
import { getCity, storeCity, editCity, deleteCity } from '../../actions/cityAction';
class CityPage extends Component {
	constructor() {
		super();
		this.state = {
			modal: false,
			name: '',
			description: '',
			msg: '',
			edit_id: '',
			editname: '',
			editdescription: '',
			status: false,
			forEdit: false
		};
	}

	componentDidMount() {
		this.props.getCity();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.city.msg) {
			this.setState({ msg: nextProps.city.msg, status: true });
			setTimeout(() => this.setState({ msg: '', status: false }), 5000);
		} else if (nextProps.message.msg) {
			this.setState({ msg: nextProps.message.msg });
			setTimeout(() => this.setState({ msg: '', status: false }), 5000);
		}
	}

	handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

	handleSubmit = (e) => {
		e.preventDefault();
		const { name, description, edit_id, editname, editdescription, forEdit } = this.state,
			data = { name, description },
			dataEdit = { id: edit_id, name: editname, description: editdescription };

		forEdit ? this.props.editCity(dataEdit) : this.props.storeCity(data);
		this.setState({ name: '', description: '', forEdit: false });
		this.toggle(true);
	};

	toggle = (data) => {
		data && data._id
			? this.setState({
					edit_id: data._id,
					editname: data.name,
					editdescription: data.description,
					forEdit: true
				})
			: this.setState({ name: '', description: '', forEdit: false });
		this.setState({ modal: !this.state.modal });
	};

	render() {
		const { city } = this.props,
			allCities = city.cities,
			{ msg, status, forEdit } = this.state;

		let rowCities = [];
		for (let i = 0; i < allCities.length; i++) {
			let data = {
				no: i + 1,
				name: allCities[i].name,
				description: allCities[i].description,
				actions: (
					<div className="btn-group w-100">
						<MDBBtn size="sm" color="info" onClick={() => this.toggle(allCities[i])}>
							<MDBIcon icon="edit" className="mr-1" /> Edit
						</MDBBtn>
						<MDBBtn size="sm" color="danger" onClick={() => this.props.deleteCity(allCities[i]._id)}>
							Delete <MDBIcon icon="trash" className="mr-1" />
						</MDBBtn>
					</div>
				)
			};
			rowCities = [ ...rowCities, data ];
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
			rows: rowCities
		};

		return (
			<div>
				{msg && <Message color={status ? 'info' : 'danger'} msg={msg} />}
				<MDBRow>
					<MDBCol md="12">
						<MDBCard className="mt-1">
                            <MDBView className="gradient-card-header dark-green">
								<h4 className="h4-responsive text-white">Management City</h4>
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
								{city.cities.length >= 1 ? (
									<MDBContainer>
										<MDBDataTable
											striped
											bordered
											hover
											data={data}
										/>
									</MDBContainer>
								) : (
										<MDBContainer className="d-flex justify-content-center">
											<ReactLoading
												type="spin"
												color="#B2CA45"
												height={'10%'}
												width={'10%'}
											/>
										</MDBContainer>
									)}
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
					<MDBModal isOpen={this.state.modal} toggle={this.toggle}>
						<MDBModalHeader toggle={this.toggle}>{forEdit ? 'Edit City' : 'Add City'}</MDBModalHeader>
						<MDBModalBody>
							<form onSubmit={this.handleSubmit}>
								<input
									type="text"
									className="form-control"
									placeholder="city name"
									value={forEdit ? this.state.editname : this.state.name}
									name={forEdit ? 'editname' : 'name'}
									onChange={this.handleChange}
								/>
								<input type="hidden" value={forEdit && this.state.edit_id} />
								<br />
								<input
									type="text"
									className="form-control"
									placeholder="city description"
									value={forEdit ? this.state.editdescription : this.state.description}
									name={forEdit ? 'editdescription' : 'description'}
									onChange={this.handleChange}
								/>
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
				</MDBRow>
			</div>
		);
	}
}

const action = {
	getCity,
	storeCity,
	editCity,
	deleteCity
};

const mapStateToProps = (state) => ({
	city: state.city,
	message: state.message
});

export default connect(mapStateToProps, action)(CityPage);
