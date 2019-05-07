import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Text, View, Dimensions, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { fetchGoods, getSlider } from '../redux/actions/index';
import Loading from '../components/loading';
import Card from '../components/card';
import Slide from '../components/Slide';
import axios from 'axios';
import { placeholder } from '@babel/types';

class HomeScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			search: false,
			dataproduk: [],
			dataevent: []
		};
	}

	handleChange = (event) => {
		this.setState(
			{
				text: event
			},
			() => {
				let self = this;
				axios
					.get(`https://sampanhorev1.herokuapp.com/api/v1/item/find?search=${this.state.text}`)
					.then((data) => {
						if (data.data.message === 'Not Found') {
							self.setState({
								dataproduk: [],
								dataevent: []
							});
						} else {
							if (data.data.data.hasOwnProperty('item') && data.data.data.hasOwnProperty('event')) {
								self.setState({
									dataproduk: data.data.data.item,
									dataevent: data.data.data.event
								});
							} else if (
								data.data.data.hasOwnProperty('item') === false ||
								data.data.data.hasOwnProperty('event') === false
							) {
								if (data.data.data.hasOwnProperty('item') === false) {
									self.setState({
										dataproduk: [],
										dataevent: data.data.data.event
									});
								} else if (data.data.data.hasOwnProperty('event') === false) {
									self.setState({
										dataproduk: data.data.data.item,
										dataevent: []
									});
								}
							}
						}
					})
					.catch((err) => {
						self.setState({
							dataproduk: []
						});
					});
			}
		);
	};

	handleClose = () => {
		this.setState({
			search: false
		});
	};

	componentDidMount() {
		this.props.getSlider();
		this.props.getgoods();
	}

	render() {
		let statusloading = this.props.goods.loading;
		let data = this.props.goods.data;
		let rendered;
		if (statusloading === false && this.state.search === false) {
			rendered = (
				<React.Fragment>
					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
						<TextInput
							placeholder="Search"
							onFocus={() => {
								this.setState({
									search: true
								});
							}}
							style={styles.form}
						/>
						<Image style={styles.icon} source={require('../assets/search.png')} />
					</View>
					<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
						<Slide slider={this.props.slider} />
						{data.map((data, i) => (
							<Card
								key={i}
								_id={data._id}
								text={data.name}
								imageUri={{ uri: data.photos[0] }}
								harga={data.price}
								seller="Andy Setiawan"
							/>
						))}
					</View>
				</React.Fragment>
			);
		} else if (statusloading === true) {
			rendered = <Loading loading={statusloading} />;
		} else if (this.state.search === true) {
			rendered = (
				<View>
					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
						<TextInput value={this.state.text} onChangeText={this.handleChange} style={styles.form} />
						<TouchableOpacity onPress={this.handleClose}>
							<Image style={styles.icon} source={require('../assets/close.png')} />
						</TouchableOpacity>
					</View>
					<View style={{ alignItems: 'center', justifyContent: 'center' }}>
						{this.state.dataproduk.map((data, i) => {
							return (
								<TouchableOpacity key={i} style={styles.searchItems}>
									<Image style={styles.icons} source={require('../assets/product.png')} />
									<Text style={{ color: 'black' }}>{data.name}</Text>
								</TouchableOpacity>
							);
						})}
					</View>
					{this.state.dataevent.map((data, i) => {
						return (
							<TouchableOpacity key={i} style={styles.searchItems}>
								<Image style={styles.icons} source={require('../assets/event.png')} />
								<Text style={{ color: 'black' }}>{data.name}</Text>
							</TouchableOpacity>
						);
					})}
				</View>
			);
		}
		return <ScrollView>{rendered}</ScrollView>;
	}
}

var { height, width } = Dimensions.get('window');

var styles = StyleSheet.create({
	icon: {
		width: 35,
		height: 35
	},
	icons: {
		width: 25,
		height: 25
	},
	form: {
		backgroundColor: 'white',
		width: width * 0.85,
		height: 40,
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 1,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10,
		marginBottom: 10
	},
	searchItems: {
		flexDirection: 'row',
		backgroundColor: 'white',
		borderRadius: 20,
		width: width * 0.95,
		height: 40,
		margin: 3,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

const mapStateToProps = (state) => ({
	goods: state.goods,
	loadingSlider: state.goods.loadingSlider,
	slider: state.goods.slider
});

const mapDispatchToProps = {
	getgoods: fetchGoods,
	getSlider: getSlider
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
