import React, { Component } from 'react';
import {StyleSheet,Text,TouchableOpacity,Image,Dimensions} from 'react-native'
import {Actions} from 'react-native-router-flux'

export default class Card extends Component{
    constructor(props){
      super(props)

      console.log('ini image',props)
    }

    handlePress=()=>{
      Actions.detail({id:this.props._id})
    }

    render(){
      return(
        <TouchableOpacity onPress={this.handlePress} style={styles.container}>
            <Image resizeMode='contain' style={styles.img} source={this.props.imageUri}></Image>
              <TouchableOpacity style={styles.button}>
                  <Text style={styles.textButton}>{this.props.text}</Text>
                  <Text style={styles.priceButton}>Rp. {this.props.harga}</Text>
                  <Text style={styles.sellerButton}>{this.props.seller}</Text>
              </TouchableOpacity>
        </TouchableOpacity>
      )
    }
}

const {width,height}=Dimensions.get('window')

const styles=StyleSheet.create({
  img:{
    width:width/1.3,
    height:300,
    margin:10
  },
  innerContainer:{
    flexDirection:'row',
    justifyContent:'center'
  },
  icon:{
    width:50,
    height:50
  },
  container:{
    justifyContent:'center',
    alignItems:'center'
  },
  textButton:{
    color:'black'
  },
  priceButton:{
    color:'black',
    fontWeight:'bold'
  },
  sellerButton:{
    paddingTop:10,
    color:'magenta'
  },
  button:{
    width:width/1.3,
    height:60,
    backgroundColor:'white',
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center',
    opacity:0.8
  }
})
