import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View, Image, TouchableOpacity, Dimensions, StyleSheet, TextInput } from 'react-native';
import { fetchDetail, setloading, getCart } from '../redux/actions/index';
import Loading from '../components/loading';
import { Actions } from 'react-native-router-flux';

var token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTYW1wYW4iLCJzdWIiOiJlbGZhbmFzdXRpb25AbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVsZmFuYXN1dGlvbiIsImlkIjoiNWNiZWMwZWMxODQ1MmEwMDE3Mjg0NmE1IiwiaWF0IjoxNTU2MDA1MTIwOTg2LCJleHAiOjE1NTYwOTE1MjA5ODYsInJvbGUiOiJ1c2VyIn0.gN9AxPbNGAkYL9OJMvRwkWShFFX1eGjhYIUyO8o4vEU';

class Cart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formValue: [],
			total: 0
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			this.setState({
				formValue: this.props.form
			});
		}
	}

	componentDidMount() {
		this.props.getCart(token);
	}

	handleChange = (data) => {
		let newformValue = [ ...this.state.formValue ];
		newformValue[data.indeks] = data.event;
		this.setState({
			formValue: newformValue
		});
	};

	handlePress = () => {
		let data = this.state.formValue.map((data) => {
			return parseInt(data);
		});

		Actions.checkout({ form: data });
	};

	render() {
		let statusloading = this.props.loading;

		var dataTotal = 0;
		if (statusloading === false) {
			let sum = 0;
			this.props.cart.forEach((data, i) => {
				sum = sum + data.itemId.price * parseInt(this.state.formValue[i]);
			});
			dataTotal = sum;
		}

		let dataCart =
			statusloading === true ? (
				<View style={{ alignItems: 'center', justifyContent: 'center' }}>
					<Text style={{ fontWeight: 'bold', color: 'green' }}>Now Loading....</Text>
				</View>
			) : (
				<View>
					{this.props.cart.map((data, i) => (
						<View
							key={i}
							style={{ flexDirection: 'column', backgroundColor: 'white', margin: 5, borderRadius: 5 }}
						>
							<View style={{ flexDirection: 'row' }}>
								<Image
									style={styles.product}
									resizeMode="cover"
									source={{ uri: data.itemId.photos[0] }}
								/>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										marginLeft: 10,
										justifyContent: 'space-evenly'
									}}
								>
									<View>
										<Text
											style={{
												fontSize: 20,
												fontWeight: 'bold',
												padding: 2,
												color: 'black',
												alignItems: 'center',
												justifyContent: 'center'
											}}
										>
											{data.itemId.name}
										</Text>
										<Text style={{ fontSize: 16, padding: 2, fontWeight: 'normal' }}>
											Seller : {data.itemId.userId.local.username}
										</Text>
										<Text style={{ fontSize: 14, padding: 2, fontWeight: 'normal' }}>
											Stock : {data.itemId.stock}
										</Text>
										<View style={{ flexDirection: 'row', marginBottom: 10 }}>
											<Text style={{ fontSize: 14, padding: 2, fontWeight: 'normal' }}>
												Buy :
											</Text>
											<TextInput
												onChangeText={(e) => this.handleChange({ event: e, indeks: i })}
												style={styles.formInput}
												value={this.state.formValue[i]}
											/>
										</View>
									</View>
								</View>
							</View>
							<View
								style={{
									justifyContent: 'space-between',
									flexDirection: 'row',
									alignItems: 'center',
									marginLeft: 5,
									marginRight: 5,
									marginBottom: 10
								}}
							>
								<TouchableOpacity
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										padding: 5,
										borderRadius: 5,
										backgroundColor: '#B80448'
									}}
								>
									<Image source={require('../assets/close.png')} style={styles.tag} />
									<Text style={{ fontWeight: 'bold', color: 'white', marginRight: 10 }}>Remove</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										padding: 5,
										borderRadius: 5,
										backgroundColor: '#68A8AD'
									}}
								>
									<Image source={require('../assets/wishlist.png')} style={styles.tag} />
									<Text style={{ fontWeight: 'bold', marginRight: 10 }}>Add Wishlist</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										padding: 5,
										borderRadius: 5,
										backgroundColor: '#DB8300'
									}}
								>
									<Image
										source={require('../assets/wishlist.png')}
										style={{
											backfaceVisibility: 'hidden',
											width: 30,
											height: 30
										}}
									/>
									<Text style={{ fontWeight: 'bold' }}>
										Rp. {parseInt(this.state.formValue[i]) * data.itemId.price}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					))}
				</View>
			);

		let rendered;
		rendered = (
			<ScrollView>
				<View style={{ height: 40, backgroundColor: 'green', marginBottom: 10, justifyContent: 'center' }}>
					<TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', margin: 10 }}>
						<Image source={require('../assets/back.png')} style={{ height: 30, width: 30 }} />
						<Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', margin: 5 }}>Cart</Text>
					</TouchableOpacity>
				</View>
				{dataCart}
				<View
					style={{ borderWidth: 1, height: 40, margin: 20, alignItems: 'center', justifyContent: 'center' }}
				>
					<Text style={{ fontSize: 22, fontWeight: 'bold' }}>Grand Total: {dataTotal}</Text>
				</View>
				<View style={{ alignItems: 'center', justifyContent: 'center' }}>
					<TouchableOpacity onPress={this.handlePress} style={styles.touch}>
						<Text style={styles.bold}>Checkout Now</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
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
	icon: {
		width: 40,
		height: 40
	},
	tag: {
		width: 30,
		height: 30
	},
	rate: {
		width: 20,
		height: 20
	},
	formInput: {
		width: width * 0.5,
		height: 30,
		backgroundColor: 'white',
		padding: 5,
		borderWidth: 0.8,
		color: 'grey'
	}
});
const mapStateToProps = (state) => ({ cart: state.goods.cart, form: state.goods.form, loading: state.goods.loading });

const mapDispatchToProps = {
	getdetail: fetchDetail,
	setloading: setloading,
	getCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
