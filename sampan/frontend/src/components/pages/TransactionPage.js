import React, { Component } from 'react';
import {
	MDBRow,
	MDBCol,
	MDBView,
	MDBCard,
	MDBIcon,
	MDBCardBody,
	MDBContainer,
	MDBDataTable,
	MDBBtn,
	MDBModal,
	MDBModalHeader,
	MDBModalBody
} from 'mdbreact';
import Message from '../Message';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import { getTransaction } from '../../actions/transactionAction';
class Transaction extends Component {
	constructor() {
		super();
		this.state = {
			msg: '',
			status: false,
			imageView: ''
		};
	}

	componentDidMount() {
		this.props.getTransaction();
	}

	toggleImage = (image) => this.setState({ modalImage: !this.state.modalImage, imageView: image });

	render() {
		console.log('this.props', this.props);

		const { msg, status } = this.state,
			{ transaction } = this.props,
			allTransaction = transaction.transactions;
		let rowTransaction = [];
		for (let i = 0; i < allTransaction.length; i++) {
			let data = {
				no: i + 1,
				pembeli: allTransaction[i].userId.local.email,
				totalPrice: allTransaction[i].totalPrice,
				photo: (
					<div className="btn-group w-100">
						<MDBBtn
							size="sm"
							color="success"
							disabled={allTransaction[i].transactionJourney === `not paid`}
							onClick={() => this.toggleImage(allTransaction[i].photo)}
						>
							View <MDBIcon icon="eye" className="mr-1" />
						</MDBBtn>
					</div>
				),
				transaction: (
					<div className="btn-group w-100">
						<MDBBtn size="sm" color="info">
							{allTransaction[i].transactionJourney}
						</MDBBtn>
					</div>
				)
			};
			rowTransaction = [ ...rowTransaction, data ];
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
					label: 'Pembeli',
					field: 'pembeli',
					sort: 'asc',
					width: 150
				},
				{
					label: 'Total Price',
					field: 'totalPrice',
					sort: 'asc',
					width: 150
				},
				{
					label: 'Photo',
					field: 'photo',
					sort: 'asc',
					width: 80
				},
				{
					label: 'Transaction',
					field: 'transaction',
					sort: 'asc',
					width: 80
				}
			],
			rows: rowTransaction
		};

		return (
			<div>
				{msg && <Message id="message-info" color={status ? 'info' : 'danger'} msg={msg} />}
				<MDBRow>
					<MDBCol md="12">
						<MDBCard className="mt-1" data-test="category-card">
							<MDBView className="gradient-card-header dark-green">
								<h4 className="h4-responsive text-white">Management Transaction</h4>
							</MDBView>
							<MDBContainer className="mt-3" />
							<MDBCardBody>
								{transaction.transactions.length >= 1 ? (
									<MDBContainer>
										<MDBDataTable
											striped
											bordered
											hover
											data={data}
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
				</MDBRow>

				<MDBModal size="lg" isOpen={this.state.modalImage} toggle={this.toggleImage}>
					<MDBModalHeader toggle={this.toggleImage}>Verify Transaction</MDBModalHeader>
					<MDBModalBody className="text-center">
						<img src={this.state.imageView} alt="View" height="400" width="400" style={{objectFit:'cover'}}/>
					</MDBModalBody>
				</MDBModal>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	transaction: state.transaction
});

export default connect(mapStateToProps, { getTransaction })(Transaction);
