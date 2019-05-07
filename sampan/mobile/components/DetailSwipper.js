import React,{Component} from 'react'
import {StyleSheet,View,Image,Text,Dimensions,ScrollView} from 'react-native'

  const { width, height } = Dimensions.get('window');
  const styles = StyleSheet.create({
    image: {
      height: height/2.5,
    }
  });

  export default class imageDetail extends Component {
    constructor(){
      super()
    }

    render() {
      let data=this.props.data
      return (
        <ScrollView>
            <Image
              style={styles.image}
              source={{uri:'https://kuka.co.id/asset/product_photo/thumb/Turmeric_thumb.jpg'}}
              resizeMode='stretch'
            />
        </ScrollView>
      );
    }
  }
