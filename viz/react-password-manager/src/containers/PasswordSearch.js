import React, { Component, Fragment } from "react";
import {
	DataTable,
	ModalWrapper,
	DataTableSkeleton,
	SkeletonText,
	Button,
	PaginationV2
} from "carbon-components-react";
import "carbon-components/css/carbon-components.min.css";
import { iconDelete } from "carbon-icons";
import PasswordForm from "./PasswordForm";

import {
	getPasswordAction,
	deletePasswordAction,
	initializeAction
} from "../js/actions/passwords";
import { connect } from "react-redux";

const {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
	TableHeader,
	TableToolbar,
	TableToolbarSearch,
	TableToolbarContent,
	TableSelectAll,
	TableSelectRow
} = DataTable;


const mapStateToProps = state => {
	return {
		passwords: state.passwords.data,
		loading: state.passwords.loading,
		error: state.passwords.error,
		useruid: state.login.uid
	};
};


const mapDispatchToProps = dispatch => {
	return {
		deletePassword: (useruid, arrPasswordIds) => {
			dispatch(deletePasswordAction(useruid, arrPasswordIds));
		},
		fetchPassword: useruid => {
			dispatch(getPasswordAction(useruid));
		},
		initialize: useruid => {
			dispatch(initializeAction(useruid));
		}
	};
};

export class PasswordSearch extends Component {
	constructor(props) {
		super(props);
		this.headers = [
			{ key: "url", header: "Link" },
			{ key: "username", header: "Username" },
			{ key: "password", header: "Password" },
			{ key: "createdAt", header: "Created At" },
			{ key: "updatedAt", header: "Saved At" }
		];
		this.title = "Secret List Of Mine";

		this.state = {
			page: 1,
			pageSize: 5
		};
	}


	handleDeletion = selectedRows => {
		this.props.deletePassword(this.props.useruid, selectedRows.map(x => x.id));
	};

	getPaginationSlice = (rows, page, pageSize) => {
		return rows.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
	};

	render() {
		let dataTableFilled = (
			<Fragment>
				<DataTable
					rows={this.getPaginationSlice(
						this.props.passwords,
						this.state.page,
						this.state.pageSize
					)}
					headers={this.headers}
					render={({
						rows,
						headers,
						getHeaderProps,
						getSelectionProps,
						onInputChange,
						selectedRows
					}) => (
						<TableContainer title={this.title}>
							<TableToolbar>
								<TableToolbarSearch onChange={onInputChange} />
								<TableToolbarContent>
										<ModalWrapper
											id="transactional-passive-modal"
											className="some-class"
											passiveModal
											buttonTriggerText="Tambah"
											icon={iconDelete}
											triggerButtonKind="secondary"
											modalLabel="Tambah Kata Sandi"
										>
										<PasswordForm stat="Tambah"/>
									</ModalWrapper>
									{selectedRows.length===1&&
									<ModalWrapper
											id="edit-modal"
											className="some-class"
											passiveModal
											buttonTriggerText="Edit Data"
											icon={iconDelete}
											triggerButtonKind="secondary"
											modalLabel="Edit Kata Sandi"
										>
										<PasswordForm id={selectedRows[0].id} link={selectedRows[0].cells[0].value} name={selectedRows[0].cells[1].value} pass={selectedRows[0].cells[2].value} stat="Edit"/>
										
									</ModalWrapper>
									}
									<Button
										icon={iconDelete}
										onClick={() => this.handleDeletion(selectedRows)}
										kind="danger"
									>
										Hapus
									</Button>
								</TableToolbarContent>
							</TableToolbar>
							<Table zebra={true}>
								<TableHead>
									<TableRow>
										<TableSelectAll {...getSelectionProps()} />
										{headers.map(header => (
											<TableHeader {...getHeaderProps({ header })}>
												{header.header}
											</TableHeader>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{rows.map(row => (
										<TableRow key={row.id}>
											<TableSelectRow {...getSelectionProps({ row })} />
											{row.cells.map(cell => (
												<TableCell key={cell.id}>{cell.value}</TableCell>
											))}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				/>
				<PaginationV2
					totalItems={this.props.passwords.length}
					pageSize={5}
					pageSizes={[5, 10, 15]}
					onChange={({ page, pageSize }) => {
						this.setState({
							page,
							pageSize
						});
					}}
				/>
			</Fragment>
		);

		let dataTableLoading = (
			<Fragment>
				<SkeletonText />
				<DataTableSkeleton />
			</Fragment>
		);

		return !this.props.loading ? dataTableFilled : dataTableLoading;
	}

	componentWillMount() {
		this.props.fetchPassword(this.props.useruid);
		this.props.initialize(this.props.useruid);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PasswordSearch);
