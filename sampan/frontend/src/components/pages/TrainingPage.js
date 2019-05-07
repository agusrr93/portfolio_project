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
import { getTrainingCode, storeTrainingCode, editTrainingCode, deleteTrainingCode } from '../../actions/trainingAction';
import ReactLoading from 'react-loading';

class TrainingPage extends Component {
	constructor() {
		super();
		this.state = {
			modal: false,
			code: '',
			description: '',
			msg: '',
			edit_id: '',
			editcode: '',
			editdescription: '',
			status: false,
			forEdit: false
		};
	}

	componentDidMount() {
		this.props.getTrainingCode();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.training.msg) {
			this.setState({ msg: nextProps.training.msg, status: true });
			setTimeout(() => this.setState({ msg: '', status: false }), 5000);
		} else if (nextProps.message.msg) {
			this.setState({ msg: nextProps.message.msg });
			setTimeout(() => this.setState({ msg: '', status: false }), 5000);
		}
	}

	handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

	handleSubmit = (e) => {
		e.preventDefault();
		const { code, description, edit_id, editcode, editdescription, forEdit } = this.state,
			data = { code, description },
			dataEdit = { id: edit_id, code: editcode, description: editdescription };

		forEdit ? this.props.editTrainingCode(dataEdit) : this.props.storeTrainingCode(data);
		this.setState({ code: '', description: '', forEdit: false });
		this.toggle(true);
	};

	toggle = (data) => {
		data && data._id
			? this.setState({
					edit_id: data._id,
					editcode: data.code,
					editdescription: data.description,
					forEdit: true
				})
			: this.setState({ code: '', description: '', forEdit: false });
		this.setState({ modal: !this.state.modal });
	};

	render() {
		const { training } = this.props,
			allTrainings = training.trainings,
			{ msg, status, forEdit } = this.state;

		let rowTrainings = [];
		for (let i = 0; i < allTrainings.length; i++) {
			let data = {
				no: i + 1,
				name: allTrainings[i].code,
				description: allTrainings[i].description,
				actions: (
					<div className="btn-group w-100">
						<MDBBtn size="sm" color="info" onClick={() => this.toggle(allTrainings[i])}>
							<MDBIcon icon="edit" className="mr-1" /> Edit
						</MDBBtn>
						<MDBBtn
							size="sm"
							color="danger"
							onClick={() => this.props.deleteTrainingCode(allTrainings[i]._id)}
						>
							Delete <MDBIcon icon="trash" className="mr-1" />
						</MDBBtn>
					</div>
				)
			};
			rowTrainings = [ ...rowTrainings, data ];
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
					label: 'Code',
					field: 'code',
					sort: 'asc',
					width: 200
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
			rows: rowTrainings
		};

		return (
			<div>
				{msg && <Message color={status ? 'info' : 'danger'} msg={msg} />}
				<MDBRow>
					<MDBCol md="12">
						<MDBCard className="mt-1">
							<MDBView className="gradient-card-header dark-green">
								<h4 className="h4-responsive text-white">Management Training</h4>
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
								{training.trainings.length >= 1 ? (
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
						<MDBModalHeader toggle={this.toggle}>
							{forEdit ? 'Edit Training' : 'Add Training'}
						</MDBModalHeader>
						<MDBModalBody>
							<form onSubmit={this.handleSubmit}>
								<input
									type="text"
									className="form-control"
									placeholder="training name"
									value={forEdit ? this.state.editcode : this.state.code}
									name={forEdit ? 'editcode' : 'code'}
									onChange={this.handleChange}
								/>
								<input type="hidden" value={forEdit && this.state.edit_id} />
								<br />
								<input
									type="text"
									className="form-control"
									placeholder="training description"
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
	getTrainingCode,
	storeTrainingCode,
	editTrainingCode,
	deleteTrainingCode
};

const mapStateToProps = (state) => ({
	training: state.training,
	message: state.message
});

export default connect(mapStateToProps, action)(TrainingPage);
