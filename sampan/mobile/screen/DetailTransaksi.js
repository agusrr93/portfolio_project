import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View, TextInput, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { fetchDetail, setloading } from '../redux/actions/index';
import axios from 'axios'

var id='5cc182870c4b340017f203b3'
let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTYW1wYW4iLCJzdWIiOiJlbGZhbmFzdXRpb25AbWFpbC5jb20iLCJ1c2VybmFtZSI6ImVsZmFuYXN1dGlvbiIsImlkIjoiNWNiZWMwZWMxODQ1MmEwMDE3Mjg0NmE1IiwiaWF0IjoxNTU2MDA1MTIwOTg2LCJleHAiOjE1NTYwOTE1MjA5ODYsInJvbGUiOiJ1c2VyIn0.gN9AxPbNGAkYL9OJMvRwkWShFFX1eGjhYIUyO8o4vEU'

class Detail extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.setloading();
		this.props.getdetail(this.props.id);
	}
	render() {
		rendered = (
			<ScrollView>
				<View style={{ height: 40, backgroundColor: 'green', marginBottom: 10, justifyContent: 'center' }}>
					<TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', margin: 10 }}>
						<Image source={require('../assets/back.png')} style={{ height: 30, width: 30 }} />
						<Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', margin: 5 }}>Detail</Text>
					</TouchableOpacity>
				</View>
				<View
					style={{
						backgroundColor: 'grey',
						height: 40,
						margin: 10,
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<Text style={{ color: 'white' }}>Shipping by Andy Setiawan</Text>
				</View>
				<View style={{ flexDirection: 'column' }}>
					<View style={{ flexDirection: 'row' }}>
						<Image style={styles.product} resizeMode="cover" source={require('../assets/back.png')} />
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
										color: 'black'
									}}
								>
									Nama Barang
								</Text>
								<Text style={{ fontSize: 14, padding: 2, fontWeight: 'normal' }}>
									Seller : Anwar Abdullah
								</Text>
								<Text style={{ fontSize: 14, padding: 2, fontWeight: 'normal' }}>
									Price : Rp. 13.000
								</Text>
								<Text style={{ fontSize: 14, padding: 2, fontWeight: 'normal' }}>Quantity : 10</Text>
							</View>
						</View>
					</View>

					<TouchableOpacity style={styles.priceTotal}>
						<Image
							source={require('../assets/wishlist.png')}
							style={{
								backfaceVisibility: 'hidden',
								width: 30,
								height: 30
							}}
						/>
						<Text style={{ fontWeight: 'bold' }}>Rp. 13.000</Text>
					</TouchableOpacity>

					<View
						style={{
							backgroundColor: 'grey',
							height: 40,
							margin: 10,
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<Text style={{ color: 'white' }}>Total Transaction by Andy Setiawan : Rp 12.000</Text>
					</View>
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
		width: width * 0.8,
		height: 50,
		backgroundColor: 'green',
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center'
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
		width: 15,
		height: 15
	},
	rate: {
		width: 20,
		height: 20
	},
	product: {
		marginLeft: 5,
		marginTop: 5,
		width: 100,
		height: 100,
		backgroundColor: '#cecece',
		borderRadius: 5
	},
	priceTotal: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 5,
		marginTop: 5,
		marginRight: 5,
		marginBottom: 10,
		width: width * 0.96,
		borderRadius: 5,
		backgroundColor: '#DB8300'
	}
});
const mapStateToProps = (state) => ({ detail: state.detail });

const mapDispatchToProps = {
	getdetail: fetchDetail,
	setloading: setloading
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
