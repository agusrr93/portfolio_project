import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import HomeScreen from './screen/HomeScreen';
import Detail from './screen/Detail';
import Cart from './screen/Cart';
import Transaksi from './screen/Transaksi';
import DetailTransaksi from './screen/DetailTransaksi';
import Tagihan from './screen/Tagihan';
import Goods from './screen/ManageBarang';
import PostBarang from './screen/postBarang';
import KonfirmasiBayar from './screen/konfirmasiBayar';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Checkout from './screen/Checkout';

export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
            <Router>
                <Stack key="root" hideNavBar>
                    <Scene key="home" component={HomeScreen} title="HomeScreen"/>
                    <Scene key="transaksidetail" component={DetailTransaksi} title="DetailTransaksi"/>
                    <Scene key="tagihan" component={Tagihan} title="Tagihan"/>
                    <Scene key="checkout" component={Checkout} title="Checkout"/>
                    <Scene key="konfirmasi" component={KonfirmasiBayar} title="Konfirmasi"/>
                    <Scene key="cart" component={Cart} title="Cart"/>
                    <Scene key="transaksi" component={Transaksi} title="Transaksi"/>
                    <Scene key="detail" component={Detail} title="Detail"/>
                    <Scene key="postbarang" component={PostBarang} title="PostBarang"/>
                    <Scene key="goods" component={Goods} title="Goods"/>
                </Stack>
            </Router>
      </Provider>
    );
  }
}
