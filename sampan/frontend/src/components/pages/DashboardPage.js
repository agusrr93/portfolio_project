import React, { Component } from 'react';
import {
	MDBCard,
	MDBCardBody,
	MDBBtn,
	MDBCardTitle,
	MDBCardText,
	MDBCol,
	MDBModal,
	MDBModalBody,
	MDBModalHeader,
	MDBModalFooter,
	MDBView,
	MDBTable,
	MDBTableHead,
	MDBTableBody,
	MDBIcon,
	MDBContainer,
	MDBDataTable
} from 'mdbreact';
import { connect } from 'react-redux';
import Message from '../Message';
import { getDashboard, verifUser, verifTrans } from '../../actions/authAction';
import classnames from 'classnames';
import CanvasJSReact from '../../assets/canvasjs/canvasjs.react';
import './DashboardPage.scss';
import ReactLoading from 'react-loading';

export class DashboardPage extends Component {
	constructor() {
		super();
		this.state = {
			modal: false,
			isVerifUser: true,
			imageView: '', msg:'',
			status: false
		};
	}

	componentDidMount() {
		this.props.getDashboard();
	}

	componentWillReceiveProps(nextProps) {
		console.log('nextProps',nextProps)
		if (nextProps.auth.msg) {
			this.setState({ msg: nextProps.auth.msg, status: true });
			setTimeout(() => this.setState({ msg: '', status: false }), 5000);
		} else if (nextProps.message.msg) {
			this.setState({ msg: nextProps.message.msg });
			setTimeout(() => this.setState({ msg: '', status: false }), 5000);
		} else {

		}
	}

	toggle = (data) =>
		data.isVerifUser
			? this.setState({ isVerifUser: true, modal: !this.state.modal })
			: this.setState({ isVerifUser: false, modal: !this.state.modal });

	toggleImage = (image) => this.setState({ modalImage: !this.state.modalImage, imageView: image });


	render() {
		let chart = this.chart,
			CanvasJSChart = CanvasJSReact.CanvasJSChart,
			dataTransaction = [],
			rowUnverif = [],
			rowTrans = [];

		const { transaction, total, nextEvents, lastEvents, userUnverified, pendingTransaction } = this.props.auth,
			{ isVerifUser, msg, status } = this.state;

		for (let i = 0; i < pendingTransaction.length; i++) {
			let data = {
				no: i + 1,
				email: pendingTransaction[i].userId.local.email,
				actions: (
					<div className="btn-group w-100">
						<MDBBtn
							size="sm"
							color="info"
							onClick={() => {
								this.props.verifTrans({ transactionId: pendingTransaction[i]._id });
								this.toggle({isVerifUser: false})
							}}
						>
							<MDBIcon icon="edit" className="mr-1" /> Verif
						</MDBBtn>
						<MDBBtn size="sm" color="success" onClick={() => this.toggleImage(pendingTransaction[i].photo)}>
							View <MDBIcon icon="eye" className="mr-1" />
						</MDBBtn>
					</div>
				)
			};
			rowTrans = [ ...rowTrans, data ];
		}

		const dataTrans = {
			columns: [
				{
					label: 'No',
					field: 'no',
					sort: 'asc',
					width: 40
				},
				{
					label: 'Email',
					field: 'email',
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
			rows: rowTrans
		};

		for (let i = 0; i < userUnverified.length; i++) {
			let data = {
				no: i + 1,
				email: userUnverified[i].local.email,
				actions: (
					<div className="btn-group w-100">
						<MDBBtn
							size="sm"
							color="info"
							onClick={() => {
								this.props.verifUser({ userId: userUnverified[i]._id, verify: true })
								this.toggle({isVerifUser: false})
								}}
						>
							<MDBIcon icon="edit" className="mr-1" /> Verif
						</MDBBtn>
						<MDBBtn
							size="sm"
							color="danger"
							onClick={() => {this.props.verifUser({ userId: userUnverified[i]._id, verify: false }); this.toggle({isVerifUser: false})}}
						>
							Unverif <MDBIcon icon="trash" className="mr-1" />
						</MDBBtn>
					</div>
				)
			};
			rowUnverif = [ ...rowUnverif, data ];
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
					label: 'Email',
					field: 'email',
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
			rows: rowUnverif
		};

		for (let i = 0; i < transaction.length; i++) {
			dataTransaction.push({ label: transaction[i].name, y: transaction[i].total });
		}
		const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: 'Transaction'
			},
			data: [
				{
					type: 'pie',
					startAngle: 75,
					toolTipContent: '<b>{label}</b>: {y}%',
					showInLegend: 'true',
					legendText: '{label}',
					indexLabelFontSize: 16,
					indexLabel: '{label} - {y}%',
					dataPoints: dataTransaction
				}
			]
		};
		chart && chart.render();

		const cardTotal =
			total &&
			total.map(({ name, total }, i) => (
				<MDBCol sm="12" lg="4" md="6" className="my-2" key={name + i + total}>
					<MDBCard className={`total-card${i}`}>
						<MDBCardBody>
							<MDBCardText
								className="text-center"
								style={{
									color: '#fff',
									fontSize: '16px',
									backgroundColor: '#cecece50',
									paddingRight: '30px',
									paddingLeft: '30px',
									marginBottom: '0px'
								}}
							>
								Total {name}
							</MDBCardText>
							<div className="row mb-0">
								<div className="col-lg-4 d-flex justify-content-center align-items-center">
									<i
										className={classnames(
											'fas',
											{
												'fa-city': name === `City`,
												'fa-pencil-ruler': name === `Training`,
												'fa-user-alt': name === `User`,
												'fa-user-tag': name === `Seller`,
												'fa-archive': name === `Item`,
												'fa-calendar-alt': name === `Event`
											},
											'fa-2x',
											'icons-card'
										)}
									/>
								</div>
								<div className="col-lg-8 d-flex justify-content-center align-items-center">
									<MDBCardTitle className="mt-2" style={{ color: '#fff' }}>
										{total}
									</MDBCardTitle>
								</div>
							</div>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			));

		const cardNextEvent =
			nextEvents &&
			nextEvents.map((nEvent, i) => (
				<tr key={i}>
					<td>{i + 1}</td>
					<td>{nEvent.eventTitle}</td>
					<td>{nEvent.date}</td>
				</tr>
			));

		const cardLastEvent =
			lastEvents &&
			lastEvents.map((nEvent, i) => (
				<tr key={i}>
					<td>{i + 1}</td>
					<td>{nEvent.eventTitle}</td>
					<td>{nEvent.date}</td>
				</tr>
			));

		return (
			<div>
			{msg && <Message id="message-info" color={status ? 'info' : 'danger'} msg={msg} />}
				<div className="row">{cardTotal}</div>
				<div className="row my-4">
					<div className="col-lg-8 col-md-8 col-sm-12">
						<MDBCard>
							{transaction.length > 1 ? (
								<div className="mt-3">
									<CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
								</div>
							) : (
								<div className="container d-flex justify-content-center m-5">
									<ReactLoading type="spin" color="#B2CA45" height={'30%'} width={'30%'} />
								</div>
							)}
						</MDBCard>
					</div>
					<div className="col-lg-4 col-md-4 col-sm-12">
						<MDBCard
							onClick={() => this.toggle({ isVerifUser: true })}
							className="my-4"
							style={{ backgroundColor: '#1d4350' }}
						>
							<MDBCardBody>
								<MDBCardText
									className="text-center"
									style={{
										color: '#fff',
										fontSize: '27px',
										cursor:'pointer'
									}}
								>
									{' '}
									VERIF USER{' '}
								</MDBCardText>
							</MDBCardBody>
						</MDBCard>
						<MDBCard
							onClick={() => this.toggle({ isVerifUser: false })}
							className="my-4"
							style={{ backgroundColor: '#bd3a68' }}
						>
							<MDBCardBody>
								<MDBCardText
									className="text-center"
									style={{
										color: '#fff',
										fontSize: '27px',
										cursor:'pointer'
									}}
								>
									{' '}
									VERIF PAYMENT {' '}
								</MDBCardText>
							</MDBCardBody>
						</MDBCard>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6">
						<MDBCard className="mt-3">
							<MDBView className="gradient-card-header dark-green">
								<h4 className="h4-responsive text-white">5 Next Event</h4>
							</MDBView>
							<MDBCardBody>
								<MDBTable responsive>
									<MDBTableHead>
										<tr>
											<th>No</th>
											<th>Title</th>
											<th>Date</th>
										</tr>
									</MDBTableHead>
									<MDBTableBody>{cardNextEvent}</MDBTableBody>
								</MDBTable>
							</MDBCardBody>
						</MDBCard>
					</div>
					<div className="col-lg-6">
						<MDBCard className="mt-3">
							<MDBView className="gradient-card-header dark-green">
								<h4 className="h4-responsive text-white">5 Last Event</h4>
							</MDBView>
							<MDBCardBody>
								<MDBTable responsive>
									<MDBTableHead>
										<tr>
											<th>No</th>
											<th>Title</th>
											<th>Date</th>
										</tr>
									</MDBTableHead>
									<MDBTableBody>{cardLastEvent}</MDBTableBody>
								</MDBTable>
							</MDBCardBody>
						</MDBCard>
					</div>
					<MDBModal
						size="lg"
						isOpen={this.state.modal}
						toggle={() =>
							isVerifUser ? this.toggle({ isVerifUser: true }) : this.toggle({ isVerifUser: false })}
					>
						<MDBModalHeader toggle={this.toggle}>
							{isVerifUser ? 'Verify User' : 'Verify Transaction'}
						</MDBModalHeader>
						<MDBModalBody>
							<MDBContainer>
								<MDBDataTable
									striped
									bordered
									hover
									data={isVerifUser && userUnverified ? data : dataTrans}
								/>
							</MDBContainer>
						</MDBModalBody>
						<MDBModalFooter>
							<MDBBtn
								color="secondary"
								onClick={() =>
									isVerifUser
										? this.toggle({ isVerifUser: true })
										: this.toggle({ isVerifUser: false })}
							>
								Close
							</MDBBtn>
							<MDBBtn color="primary">Save changes</MDBBtn>
						</MDBModalFooter>
					</MDBModal>
					<MDBModal size="lg" isOpen={this.state.modalImage} toggle={this.toggleImage}>
						<MDBModalHeader toggle={this.toggleImage}>Verify Transaction</MDBModalHeader>
						<MDBModalBody className="text-center">
							<img src={this.state.imageView} alt="View" height="400" width="400" style={{objectFit:'cover'}}/>
						</MDBModalBody>
					</MDBModal>
				</div>
			</div>
		);
	}
}

const action = {
	getDashboard,
	verifUser,
	verifTrans
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	message: state.message
});

export default connect(mapStateToProps, action)(DashboardPage);
