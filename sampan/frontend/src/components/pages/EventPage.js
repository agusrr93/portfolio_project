import React, { Component } from 'react';
import Message from '../Message';
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
import { getEvent, storeEvent, deleteEvent, editEvent } from '../../actions/eventAction';
import DatePicker from 'react-date-picker';
import './EventPage.scss';
// import moment from 'moment';
import ReactLoading from "react-loading";

class Event extends Component {
	constructor() {
		super();
		this.state = {
			eventTitle: '',
			description: '',
			date: '',
			msg: '',
			status: false,
			forEdit: false,
			editDescription: '',
			editEventTitle: '',
			editDate: '',
			startDate: Date.now()
		};
	}

	componentDidMount() {
		this.props.getEvent();
	}

	handleDate = (date) => {
		console.log('date', date);
	};

	handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

	handleSubmit = (e) => {
		e.preventDefault();
		const {
				eventTitle,
				description,
				startDate,
				edit_id,
				editEventTitle,
				editDescription,
				forEdit,
				editDate
			} = this.state,
			data = { eventTitle, description, date: startDate },
			dataEdit = { id: edit_id, eventTitle: editEventTitle, description: editDescription, date: editDate };

		forEdit ? this.props.editEvent(dataEdit) : this.props.storeEvent(data);
		this.setState({
			code: '',
			description: '',
			forEdit: false,
			startDate: Date.now()
		});
		this.toggle(true);
	};

	toggle = (data) => {
		data && data._id
			? this.setState({
					edit_id: data._id,
					editEventTitle: data.eventTitle,
					editDescription: data.description,
					editDate: new Date(data.date),
					forEdit: true
				})
			: this.setState({ eventTitle: '', description: '', forEdit: false, startDate: Date.now() });
		this.setState({ modal: !this.state.modal });
	};

	render() {
		const { msg, status, forEdit } = this.state,
			{ event } = this.props,
			allEvent = event.events;

		let rowEvent = [];

		for (let i = 0; i < allEvent.length; i++) {
			let data = {
				no: i + 1,
				eventTitle: allEvent[i].eventTitle,
				description: allEvent[i].description,
				date: allEvent[i].date,
				actions: (
					<div className="btn-group w-100">
						<MDBBtn size="sm" color="info" onClick={() => this.toggle(allEvent[i])}>
							<MDBIcon icon="edit" className="mr-1" /> Edit
						</MDBBtn>
						<MDBBtn size="sm" color="danger" onClick={() => this.props.deleteEvent(allEvent[i]._id)}>
							Delete <MDBIcon icon="trash" className="mr-1" />
						</MDBBtn>
					</div>
				)
			};
			rowEvent = [ ...rowEvent, data ];
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
					label: 'Event Title',
					field: 'eventTitle',
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
					label: 'Date',
					field: 'date',
					sort: 'asc',
					width: 150
				},
				{
					label: 'Actions',
					field: 'actions',
					sort: 'asc',
					width: 80
				}
			],
			rows: rowEvent
		};

		return (
			<div>
				{msg && <Message color={status ? 'info' : 'danger'} msg={msg} />}
				<MDBRow>
					<MDBCol md="12">
						<MDBCard className="mt-1">
							<MDBView className="gradient-card-header dark-green">
								<h4 className="h4-responsive text-white">Management Event</h4>
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
								{event.events.length >= 1 ? (
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
						<MDBModalHeader toggle={this.toggle}>{forEdit ? 'Edit Training' : 'Add Event'}</MDBModalHeader>
						<MDBModalBody>
							<form onSubmit={this.handleSubmit}>
								<input
									type="text"
									className="form-control"
									placeholder="event name"
									value={forEdit ? this.state.editEventTitle : this.state.eventTitle}
									name={forEdit ? 'editEventTitle' : 'eventTitle'}
									onChange={this.handleChange}
								/>
								<input type="hidden" value={forEdit && this.state.edit_id} />
								<br />
								<input
									type="text"
									className="form-control"
									placeholder="event description"
									value={forEdit ? this.state.editDescription : this.state.description}
									name={forEdit ? 'editDescription' : 'description'}
									onChange={this.handleChange}
								/>
								<br />
								<div className="input-group">
									<DatePicker
										className="form-control"
										value={forEdit ? new Date(this.state.editDate) : new Date(this.state.startDate)}
										onChange={this.handleDate}
										calendarIcon={null}
										clearIcon={null}
										format="dd-MM-y"
									/>
									<div className="input-group-prepend">
										<span className="input-group-text" id="basic-addon">
											<i className="fa fa-calendar-alt prefix" />
										</span>
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
				</MDBRow>
			</div>
		);
	}
}

const actions = {
	getEvent,
	storeEvent,
	editEvent,
	deleteEvent
};

const mapStateToProps = (state) => ({
	event: state.event
});

export default connect(mapStateToProps, actions)(Event);
