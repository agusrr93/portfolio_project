import React,{Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView,Text,View,Image,TouchableOpacity,Dimensions,StyleSheet,TextInput} from 'react-native';
import {fetchDetail,setloading,getUserTransaction,getMitraTransaction} from '../redux/actions/index';
import TransactionStatus from './TransactionStatus'
import moment from 'moment'

var token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTYW1wYW4iLCJzdWIiOiJlbGZhbmFzdXRpb25AbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVsZmFuYXN1dGlvbiIsImlkIjoiNWNiZWMwZWMxODQ1MmEwMDE3Mjg0NmE1IiwiaWF0IjoxNTU2MDA1MTIwOTg2LCJleHAiOjE1NTYwOTE1MjA5ODYsInJvbGUiOiJ1c2VyIn0.gN9AxPbNGAkYL9OJMvRwkWShFFX1eGjhYIUyO8o4vEU';

class Tagihan extends Component {
	constructor(props) {
		super(props);

		this.state = {
			status: 0,
			databeli: [ 'a' ],
			datajual: [ 'b' ]
		};
	}

	componentDidMount() {
		this.props.setloading();
		this.props.getUserTransaction(token);
		this.props.getMitraTransaction(token);
	}
	render() {
		let rendered;
		if (this.state.status === 0) {
			if (this.state.databeli.length === 0) {
				rendered = (
					<ScrollView>
						<View
							style={{ height: 40, backgroundColor: 'green', marginBottom: 10, justifyContent: 'center' }}
						>
							<TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', margin: 10 }}>
								<Image source={require('../assets/back.png')} style={{ height: 30, width: 30 }} />
								<Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', margin: 5 }}>
									Tagihan dan History
								</Text>
							</TouchableOpacity>
						</View>
						<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
							<TouchableOpacity
								style={styles.tabactive}
								onPress={() => {
									this.setState({
										status: 0
									});
								}}
							>
								<Text style={{ color: 'white' }}>Tagihan</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.tab}
								onPress={() => {
									this.setState({
										status: 1
									});
								}}
							>
								<Text style={{ color: 'white' }}>History</Text>
							</TouchableOpacity>
						</View>
						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<Image
								style={styles.noitem}
								source={require('../assets/noitem.png')}
								resizeMode="contain"
							/>
						</View>
					</ScrollView>
				);
			} else if (this.state.databeli.length > 0) {
				rendered = (
					<ScrollView>
						<View
							style={{ height: 40, backgroundColor: 'green', marginBottom: 10, justifyContent: 'center' }}
						>
							<TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', margin: 10 }}>
								<Image source={require('../assets/back.png')} style={{ height: 30, width: 30 }} />
								<Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', margin: 5 }}>
									Tagihan dan History
								</Text>
							</TouchableOpacity>
						</View>
						<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
							<TouchableOpacity
								style={styles.tabactive}
								onPress={() => {
									this.setState({
										status: 0
									});
								}}
							>
								<Text style={{ color: 'white' }}>Tagihan</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.tab}
								onPress={() => {
									this.setState({
										status: 1
									});
								}}
							>
								<Text style={{ color: 'white' }}>History</Text>
							</TouchableOpacity>
						</View>

						{this.props.loading === true ? (
							<Text style={styles.textLoading}>Now Loading</Text>
						) : (
							this.props.userData
								.filter((data) => {
									return (
										data.transactionJourney === 'not paid' || data.transactionJourney === 'pending'
									);
								})
								.map((data, i) => (
									<TouchableOpacity
										key={i}
										style={{
											flexDirection: 'column',
											borderWidth: 1,
											margin: 10,
											borderColor: 'green'
										}}
									>
										<View
											style={{
												flexDirection: 'row',
												alignItems: 'center',
												justifyContent: 'space-evenly'
											}}
										>
											<Image
												style={styles.product}
												resizeMode="cover"
												source={{ uri: data.itemId[0].photos[0] }}
											/>

											<View style={{ alignItems: 'center', justifyContent: 'center' }}>
												<Text style={{ fontSize: 15, fontWeight: 'bold', padding: 2 }}>
													{data._id}
												</Text>
												<Text style={{ fontSize: 13, padding: 2, fontWeight: 'bold' }}>
												  {moment(data.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
												</Text>
												<Text style={{ fontSize: 13, padding: 2, fontWeight: 'bold' }}>
													Total Transaction : {data.totalPrice}
												</Text>
												<Text style={{ fontSize: 12, padding: 2 }}>
													Seller : {data.sellerId.local.username}
												</Text>
											</View>
										</View>
										<TransactionStatus status={data.transactionJourney} />
									</TouchableOpacity>
								))
						)}
					</ScrollView>
				);
			}
		} else if (this.state.status === 1) {
			if (this.state.datajual.length === 0) {
				rendered = (
					<ScrollView>
						<View
							style={{ height: 40, backgroundColor: 'green', marginBottom: 10, justifyContent: 'center' }}
						>
							<TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', margin: 10 }}>
								<Image source={require('../assets/back.png')} style={{ height: 30, width: 30 }} />
								<Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', margin: 5 }}>
									Tagihan dan History
								</Text>
							</TouchableOpacity>
						</View>
						<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
							<TouchableOpacity
								style={styles.tab}
								onPress={() => {
									this.setState({
										status: 0
									});
								}}
							>
								<Text style={{ color: 'white' }}>Tagihan</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.tabactive}
								onPress={() => {
									this.setState({
										status: 1
									});
								}}
							>
								<Text style={{ color: 'white' }}>History</Text>
							</TouchableOpacity>
						</View>
						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<Image
								style={styles.noitem}
								source={require('../assets/noitem.png')}
								resizeMode="contain"
							/>
						</View>
					</ScrollView>
				);
			} else if (this.state.datajual.length) {
				rendered = (
					<ScrollView>
						<View
							style={{ height: 40, backgroundColor: 'green', marginBottom: 10, justifyContent: 'center' }}
						>
							<TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', margin: 10 }}>
								<Image source={require('../assets/back.png')} style={{ height: 30, width: 30 }} />
								<Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', margin: 5 }}>
									Tagihan dan History
								</Text>
							</TouchableOpacity>
						</View>
						<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
							<TouchableOpacity
								style={styles.tab}
								onPress={() => {
									this.setState({
										status: 0
									});
								}}
							>
								<Text style={{ color: 'white' }}>Tagihan</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.tabactive}
								onPress={() => {
									this.setState({
										status: 0
									});
								}}
							>
								<Text style={{ color: 'white' }}>History</Text>
							</TouchableOpacity>
						</View>

						{this.props.loading === true ? (
							<View style={styles.textLoading}>
							<Text style={styles.textLoading}>Now Loading</Text>
							</View>
						) : (
							this.props.userData
								.filter((data) => {
									return (
										data.transactionJourney === 'done' || data.transactionJourney === 'cancelled'
									);
								})
								.map((data, i) => (
									<TouchableOpacity
										key={i}
										style={{
											flexDirection: 'column',
											borderWidth: 1,
											margin: 10,
											borderColor: 'green'
										}}
									>
										<View
											style={{
												flexDirection: 'row',
												alignItems: 'center',
												justifyContent: 'space-evenly'
											}}
										>
											<Image
												style={styles.product}
												resizeMode="contain"
												source={{ uri: data.itemId[0].photos[0] }}
											/>
											<View style={{ alignItems: 'center', justifyContent: 'center' }}>
												<Text style={{ fontSize: 15, fontWeight: 'bold', padding: 2 }}>
													{data._id}
												</Text>
												<Text style={{ fontSize: 13, padding: 2, fontWeight: 'bold' }}>
												  {moment(data.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
												</Text>
												<Text style={{ fontSize: 13, padding: 2, fontWeight: 'bold' }}>
													Total Transaction : {data.totalPrice}
												</Text>
												<Text style={{ fontSize: 12, padding: 2 }}>
													Seller : {data.sellerId.local.username}
												</Text>
											</View>
										</View>
										<TransactionStatus status={data.transactionJourney} />
									</TouchableOpacity>
								))
						)}
					</ScrollView>
				);
			}
		}

		return <ScrollView>{rendered}</ScrollView>;
	}
}

var { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
	touch: {
		margin: 10,
		width: width * 0.8,
		height: 50,
		backgroundColor: 'green',
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	productBg: {
		backgroundColor: 'grey',
		width: width * 0.3,
		height: height * 0.2,
		padding: 5,
		margin: 10
	},
	tab: {
		backgroundColor: 'grey',
		height: 40,
		margin: 10,
		width: width * 0.4,
		alignItems: 'center',
		justifyContent: 'center'
	},
	tabactive: {
		backgroundColor: 'green',
		height: 40,
		margin: 10,
		width: width * 0.4,
		alignItems: 'center',
		justifyContent: 'center'
	},
	product: {
		marginLeft: 5,
		marginTop: 5,
		width: 100,
		height: 100,
		backgroundColor: '#cecece',
		borderRadius: 5
	},
	bold: {
		fontWeight: 'bold',
		fontSize: 18,
		color: 'white'
	},
	noitem: {
		width: width * 0.8
	},
	icon: {
		width: 40,
		height: 40
	},
	tag: {
		width: 30,
		height: 30
	},
	active: {
		width: 30,
		height: 30,
		margin: 5
	},
	inactive: {
		width: 30,
		height: 30,
		opacity: 0.2,
		margin: 5
	},
	rate: {
		width: 20,
		height: 20
	},
	textLoading: {
		width: width * 0.9,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
const mapStateToProps = (state) => ({
	loading: state.goods.loading,
	userData: state.goods.userData,
	mitraData: state.goods.mitraData
});

const mapDispatchToProps = {
	getdetail: fetchDetail,
	setloading: setloading,
	getMitraTransaction,
	getUserTransaction
};

export default connect(mapStateToProps, mapDispatchToProps)(Tagihan);
