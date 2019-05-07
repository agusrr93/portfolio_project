import React, { Component } from 'react';  
import {Button} from 'react-native-elements'
import {  
    Text,StyleSheet,ImageBackground,View,TextInput,TouchableHighlight
} from 'react-native';

import axios from 'axios'
import Card from './Card'
import Avalaible from './AvailableRoom'

import { db } from '../src/config';


export default class AddRoom extends Component {  
  state = {
    name: '',
    koderoom:'',
    isLoading:false,
    isWatch:false
  };

  handleChange = e => {
    this.setState({
      name: e.nativeEvent.text
    });
  };

  addRoom = room => {  
    var newRoomKey = db.ref().child('room').push().key;
    db.ref('/room/'+newRoomKey).update({
        name: room,
        player1:{
            name:"user1",
            status:"Not Yet Ready",
            score:0
        },
        player2:{
            name:"",
            status:"Not Yet Avalaible",
            score:0
        }
    });

    this.setState({
        koderoom:newRoomKey,
        isLoading:true
    },function(){  
            axios.get("https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple")
              .then(response =>  {
                  
                  let result=[]
                  for(let i=0;i<response.data.results.length;i++){
                    let obj={}
                    obj.hint=response.data.results[i].question
                    obj.answer=response.data.results[i].correct_answer
      
                    result.push(obj)
                  }
                  
                  db.ref('/room/'+newRoomKey).update({
                     question:JSON.stringify(result)
                  },function(){
                  });
              })
              .catch(error =>  {
                  console.log(error, 'ini error');
              });
    })

  };


  handleBack = ()=>{
    this.setState({
      isLoading:false
    },function(){
      let Ref = db.ref('room/' + this.state.koderoom);
      Ref.off()
      Ref.remove()
      // let Ref = db.ref('room/' + this.state.koderoom);
      // Ref.remove()
    })
  }
  handleSubmit = () => {
    this.addRoom(this.state.name);
  };

  handleWatch =()=>{
    this.setState({
      isLoading:true,
      isWatch:true
    })
  }

  render() {
    
    if(this.state.isLoading===false&&this.state.isWatch===false){
      return (
        <ImageBackground source={{uri:'https://i.pinimg.com/564x/7d/da/a3/7ddaa35c6a23c910757a3a4fca8365c7.jpg'}} style={styles.main}>
        <View style={{position:"relative", zIndex:1}}>
         <View style={styles.titleContainer}>
         <View style={{zIndex:2}}>
          <Text style={styles.title}>Want To Create Some Room : </Text>
         </View>
        </View>
            
         </View>
          
          <TextInput style={styles.itemInput} onChange={this.handleChange} />
          
          <TouchableHighlight
            style={styles.button}
            underlayColor="white"
            onPress={this.handleSubmit}
          >
          <Text style={styles.buttonText}>Create Your Room</Text>
          </TouchableHighlight>
          <Button
              backgroundColor='red'
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 2 }}
              title='Watch Avalaible Room'
              onPress={this.handleWatch}
            />

        </ImageBackground>
      )
    }
    else if(this.state.isLoading===true&&this.state.isWatch===false){
        return(
           <Card kode={this.state.koderoom} status='player1' Back={this.handleBack}></Card>
        )
    }
    else if(this.state.isWatch===true){
        return <Avalaible />
    }
  }
}

const styles = StyleSheet.create({  
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    marginBottom: 20,
    fontSize: 40,
    fontWeight:'bold',
    textAlign: 'center',
    color:'red',
    
  },
  titleContainer:{
     backgroundColor:'pink',
     padding:10,
     margin:10,
     opacity:0.7,
     borderRadius:15
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor:'white',
    borderRadius: 8
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});