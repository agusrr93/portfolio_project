import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Card extends Component {
	constructor(props) {
		super(props);
	}

	handlePress = () => {
		Actions.detail({ id: this.props._id });
	};

	componentDidMount() {
		console.log('mount ' + this.props);
	}
	render() {
		return (
			<TouchableOpacity onPress={this.handlePress} style={styles.container}>
				<Image resizeMode="cover" style={styles.img} source={this.props.imageUri} />
				<Text style={styles.textButton}>{this.props.text}</Text>
				<Text style={styles.priceButton}>Rp. {this.props.harga}</Text>
				{/* <Text style={styles.sellerButton}>{this.props.seller}</Text> */}
			</TouchableOpacity>
		);
	}
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	img: {
		marginTop: 5,
		marginLeft: 10,
		marginRight: 10,
		width: width * 0.45,
		height: 200,
		borderRadius: 5
	},
	innerContainer: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	icon: {
		width: 50,
		height: 50
	},
	container: {
		borderRadius: 5,
		width: width * 0.46,
		margin: 5,
		backgroundColor: 'white',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	textButton: {
		color: 'black',
		textAlign: 'center'
	},
	priceButton: {
		color: 'black',
		fontWeight: 'bold',
		marginBottom: 10
	},
	sellerButton: {
		paddingTop: 10,
		color: 'magenta'
	},
	button: {
		width: width * 0.45,
		height: 100,
		backgroundColor: 'white',
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		opacity: 0.8
	}
});
