import React, {Component} from 'react';
import { Card,Button, Icon } from 'react-native-elements'
import {Text,View,ScrollView} from 'react-native'
import Loading from './loading'
import { db } from '../src/config';
import Hangman from '../screen/gameScreen'
import RuangTunggu from '../component/Card'

export default class CardImageExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avail:[],
      isData:false,
      isSelected:false,
      roomId:'keisi'
    };
    console.log(this)
    this.handleEnter=this.handleEnter.bind(this)
  }
  handleEnter = (event) =>{
    this.setState({
      isData:false
    },function(){
      this.setState({
        isSelected:true,
        isData:true,
        roomId:event
      },function(){
        
      })
    })
  }
  componentDidMount(){

    db.ref('/room/').on('value',(snapshot)=>{
        var data=[]
        snapshot.forEach((child)=>{
            let obj={}
            obj.key=child.key
            obj.name=child.val().name

            data.push(obj)
        })
        
        this.setState({
            avail:data,
            isData:true
        },function(){
            
        })
    })
  }

  

  render() {
    
    
    if(this.state.isData===true&&this.state.isSelected===false){
        
        return(
            <ScrollView>
                {
                    this.state.avail.map((room)=>{
                        return (<Card key={room.key}
                            title='ROOM'
                            image={{uri: 'https://www.logoarena.com/contestimages/public_new/7027/14449_1462626744_theroom.jpg'}}
                          >
                          <Text style={{ fontSize:25,marginBottom: 10,color:'red',alignSelf:'center' }}>
                            {room.name}
                          </Text>
                          <Button
                            backgroundColor='#03A9F4'
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 2 }}
                            title='ENTER THE ROOM'
                            onPress={() => {
                              this.handleEnter(room.key)
                            }}
                          />
                        </Card>)
                    })
                }
            </ScrollView>
        )
    }
    else if(this.state.isData===false){
        return <Loading></Loading>
    }
    else if(this.state.isSelected===true){
        return <RuangTunggu status='player2' kode={this.state.roomId}></RuangTunggu>
        // return <Hangman status='player2' rid={this.state.roomId}></Hangman>
    }
  }
}