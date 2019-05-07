import React, { Component } from 'react';
import { Text, Dimensions, Image, StyleSheet, View } from 'react-native';

import SwiperFlatList from 'react-native-swiper-flatlist';

export default class imageDetail extends Component {
  render() {
    return (
      <View>
        <SwiperFlatList
          showPagination
        >
           {this.props.imgDetail.map((data,i)=>{
             return (
               <View key={i} style={styles.image}>
                   <Image
                     style={styles.image}
                     source={{uri:data}}
                     resizeMode='stretch'
                   />
               </View>
             )
           })}

        </SwiperFlatList>
      </View>
    );
  }
}

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'black'
  },
  child: {
    height: height * 0.3,
    width,
    justifyContent: 'center'
  },
  image: {
    height: height * 0.3,
    width,
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center',
    color:'black'
  }
});
