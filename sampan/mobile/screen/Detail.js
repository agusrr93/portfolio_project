import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { fetchDetail, setloading, addToCart, setWishlist } from '../redux/actions/index';
import Loading from '../components/loading';
import { Actions } from 'react-native-router-flux';

var token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTYW1wYW4iLCJzdWIiOiJlbGZhbmFzdXRpb25AbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVsZmFuYXN1dGlvbiIsImlkIjoiNWNiZWMwZWMxODQ1MmEwMDE3Mjg0NmE1IiwiaWF0IjoxNTU2MDA1MTIwOTg2LCJleHAiOjE1NTYwOTE1MjA5ODYsInJvbGUiOiJ1c2VyIn0.gN9AxPbNGAkYL9OJMvRwkWShFFX1eGjhYIUyO8o4vEU';

class Detail extends Component {
	constructor(props) {
		super(props);
	}

	handleBack = () => {
		Actions.home();
	};

	componentDidMount() {
		this.props.setloading();
		this.props.getdetail(this.props.id);
	}
	render() {
		let statusloading = this.props.detail.loading;
		let dataImage =
			statusloading === true || this.props.detail.detail.length === 0 ? (
				<View style={styles.imagecontainer}>
					<Image
						style={styles.image}
						source={{ uri: 'https://kuka.co.id/asset/product_photo/thumb/Turmeric_thumb.jpg' }}
						resizeMode="cover"
					/>
				</View>
			) : (
				<View style={styles.imagecontainer}>
					<Image
						style={styles.image}
						source={{ uri: this.props.detail.detail.photos[0] }}
						resizeMode="cover"
					/>
				</View>
			);

		let Title =
			statusloading === true || this.props.detail.detail.length === 0 ? (
				<View>
					<Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 8, color: 'black' }}>
						..................
					</Text>
					<Text style={{ fontSize: 18, fontWeight: 'normal' }}>... ........</Text>
				</View>
			) : (
				<View>
					<Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 8, color: 'black' }}>
						{this.props.detail.detail.name}
					</Text>
					<Text style={{ fontSize: 18, fontWeight: 'normal' }}>Rp. {this.props.detail.detail.price}</Text>
				</View>
			);

		let dataDetail =
			this.props.detail.detail.length === 0 ? (
				<View>
					<View style={{ width: width * 0.8 }}>
						<Text style={{ fontSize: 15, fontWeight: 'normal' }}>Loading...</Text>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
						<TouchableOpacity style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
							<Image source={require('../assets/stock.png')} style={styles.tag} />
							<Text style={{ fontWeight: 'bold' }}>..</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
							<Image source={require('../assets/buy.png')} style={styles.tag} />
							<Text style={{ fontWeight: 'bold' }}>...</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
							<Image source={require('../assets/tag.png')} style={styles.tag} />
							<Text style={{ fontWeight: 'bold' }}>....</Text>
						</TouchableOpacity>
					</View>
				</View>
			) : (
				<View>
					<View style={{ width: width * 0.8 }}>
						<Text style={{ fontSize: 15, fontWeight: 'normal' }}>
							Description : {this.props.detail.detail.description}
						</Text>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
						<TouchableOpacity style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
							<Image source={require('../assets/stock.png')} style={styles.tag} />
							<Text style={{ fontWeight: 'bold' }}>{this.props.detail.detail.stock}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
							<Image source={require('../assets/buy.png')} style={styles.tag} />
							<Text style={{ fontWeight: 'bold' }}>{this.props.detail.detail.bought}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{ marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
							<Image source={require('../assets/tag.png')} style={styles.tag} />
							<Text style={{ fontWeight: 'bold' }}>
								{this.props.detail.detail.tag ? this.props.detail.detail.tag : 'No Tag'}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			);

		let rendered;
		rendered = (
			<ScrollView>
				<View style={{ flex: 1, flexDirection: 'column' }}>
					<TouchableOpacity
						onPress={this.handleBack}
						style={{
							zIndex: 3,
							position: 'absolute',
							alignItems: 'center',
							justifyContent: 'center',
							top: 10,
							left: 10,
							borderRadius: 50,
							backgroundColor: '#dce4f2'
						}}
					>
						<Image source={require('../assets/back.png')} style={{ height: 30, width: 30 }} />
					</TouchableOpacity>

					{dataImage}
					<TouchableOpacity
						onPress={() => {
							Actions.cart();
						}}
						style={styles.myCart}
					>
						<Image source={require('../assets/mycart.png')} style={styles.icon} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							this.props.addToCart({ token: token, itemId: this.props.id });
						}}
						style={styles.myCart1}
					>
						<Image source={require('../assets/cart.png')} style={styles.icon} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							this.props.addWishList({ token: token, itemId: this.props.id });
						}}
						style={styles.myWish}
					>
						<Image source={require('../assets/wishlist.png')} style={{ width: 35, height: 35 }} />
					</TouchableOpacity>
					<View style={{ justifyContent: 'flex-start', marginTop: 10, marginLeft: 18 }}>
						{Title}
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'flex-start',
								alignItems: 'center',
								margin: 5
							}}
						>
							<Image source={require('../assets/leaf.png')} style={styles.rate} />
							<TouchableOpacity style={{ margin: 2, flexDirection: 'row' }}>
								<Image source={require('../assets/leaf.png')} style={styles.rate} />
								<Image source={require('../assets/leaf.png')} style={styles.rate} />
								<Image source={require('../assets/leaf.png')} style={styles.rate} />
								<Image source={require('../assets/leafnull.png')} style={styles.rate} />
							</TouchableOpacity>
							<Text style={{ margin: 10, color: 'green', fontWeight: 'bold', fontSize: 13 }}>
								4.2/5 (From 20 User)
							</Text>
						</View>
						{dataDetail}
					</View>
					{this.props.atc === false ? (
					<View style={{justifyContent:'center',alignItems:'center'}}>
						<Text style={{ color: 'green' }}>{this.props.message}</Text>
					</View>
					) : (
						<Text>Loading...</Text>
					)}
				</View>
				<View
					style={{
						flex: 1,
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: 10
					}}
				>
					<TouchableOpacity style={styles.touch}>
						<Text style={styles.bold}>Buy Product</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
		/*}
    else{
       rendered=(<Loading loading={statusloading}></Loading>)
    }*/
		return <ScrollView>{rendered}</ScrollView>;
	}
}

var { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
	touch: {
		margin: 10,
		width: width * 0.9,
		height: 50,
		backgroundColor: 'green',
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	imagecontainer: {
		width: width,
		height: height * 0.4
	},
	image: {
		width: width,
		height: height * 0.4
	},
	bold: {
		fontWeight: 'bold',
		fontSize: 18,
		color: 'white'
	},
	icon: {
		width: 40,
		height: 40,
		padding: 10
	},
	tag: {
		width: 35,
		height: 35
	},
	rate: {
		width: 20,
		height: 20
	},
	myCart: {
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		top: height * 0.36,
		left: width * 0.05,
		borderRadius: 50,
		backgroundColor: '#dce4f2',
		height: 40,
		width: 40
	},
	myCart1: {
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		top: height * 0.36,
		right: width * 0.18,
		borderRadius: 50,
		backgroundColor: '#FCBB27',
		height: 40,
		width: 40
	},
	myWish: {
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		top: height * 0.36,
		right: width * 0.05,
		borderRadius: 50,
		backgroundColor: '#6CB470',
		height: 40,
		width: 40
	}
});
const mapStateToProps = (state) => ({
	atc: state.goods.loadingatc,
	message: state.goods.message,
	detail: state.detail
});

const mapDispatchToProps = {
	addToCart,
	getdetail: fetchDetail,
	setloading,
	addWishList: setWishlist
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
