import React, {Component} from 'react';
import { Card,Button, Icon } from 'react-native-elements'
import {Text,View} from 'react-native'
import Loading from './loading'
import { db } from '../src/config';
import Hangman from '../screen/gameScreen'

export default class CardImageExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countp1:0,
      countp2:0,
      isData:false,
      status1:'',
      status2:'',
      key:'',
      isPushRoom:false
    };

    this.shuffle1=this.shuffle1.bind(this)
    this.shuffle2=this.shuffle2.bind(this)
    this.ready1=this.ready1.bind(this)
    this.ready2=this.ready2.bind(this)
  }
  
  componentWillMount(){
    if(this.props.status==='player1'){
        db.ref('/room/'+this.props.kode).update({
          player1:{
              wrong:0,
              score:0,
              status:"Ready",
          },
          player2:{
            wrong:0,
            score:0,
            status:"Not Yet Avalaible",
          }
        });
    }
    if(this.props.status==='player2'){
      db.ref('/room/'+this.props.kode).update({
        player1:{
            wrong:0,
            score:0,
            status:"Ready",
        },
        player2:{
          wrong:0,
          score:0,
          status:"Not Yet Ready",
        }
      });
    }
    
    db.ref('/room/'+this.props.kode).on('value',(snapshot)=>{
         
        this.setState({
           status1:snapshot.val().player1.status,
           status2:snapshot.val().player2.status
         },function(){
            this.setState({
              isData:true
            })
         })

        if(snapshot.val().player2.status==='Ready'&&snapshot.val().player1.status==='Ready'){
           this.setState({
              isPushRoom:true
           })
        }
    })
  }
  shuffle1(){
    if(this.state.countp1===5){
      this.setState({
        countp1:0
     })
    }
    else{
      this.setState({
        countp1:this.state.countp1+1
     })
    } 
  }

  shuffle2(){
    if(this.state.countp2===5){
      this.setState({
        countp2:0
     })
    }
    else{
      this.setState({
        countp2:this.state.countp2+1
     })
    } 
  }

  ready1(){
      if(this.state.status1==='Not Yet Ready'){
        db.ref('/room/'+this.props.kode).update({
            player1:{
                wrong:0,
                score:0,
                status:"Ready",
            }
        });
      }
      else if(this.state.status1==='Ready'){
        db.ref('/room/'+this.props.kode).update({
          player1:{
              wrong:0,
              score:0,
              status:"Not Yet Ready",
          }
        });
      }
  }

  ready2(){
    if(this.state.status2==='Not Yet Ready'){
      db.ref('/room/'+this.props.kode).update({
          player2:{
              wrong:0,
              score:0,
              status:"Ready",
          }
      });
    }
    else if(this.state.status2==='Ready'){
      db.ref('/room/'+this.props.kode).update({
        player2:{
            wrong:0,
            score:0,
            status:"Not Yet Ready",
        }
      });
    }
  }

  render() {
    var imageArr=['https://cdn0.iconfinder.com/data/icons/avatars-3/512/avatar_beanie_girl-512.png',
    'https://banner2.kisspng.com/20180626/fhs/kisspng-avatar-user-computer-icons-software-developer-5b327cc98b5780.5684824215300354015708.jpg',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-ocKSXOKrWxedxOnRCPwMiLRB6wCtyRjbE6sI-iUOZ-DKL-207A',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSshE_u-MMzF0p-NhQNTNJb9ZYooZ83XYKCjzYCJJflKnGc2YoQg',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSmNjk78ZsmP8asETEbXaWBfCHZOmeHapOHwFpNIVoRb9DJiNl',
'https://cdn.pixabay.com/photo/2016/08/20/05/36/avatar-1606914_960_720.png']
    if(this.state.isData===true&&this.state.isPushRoom===false){
      return (
        <View>
          <Button
              backgroundColor='red'
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 2 }}
              title='Back'
              onPress={this.props.Back}
            />
          <Card
              title='PLAYER 1'
              image={{uri: imageArr[this.state.countp1]}}
            >
            <Text style={{ fontSize:25,marginBottom: 10,color:'red',alignSelf:'center' }}>
              {this.state.status1}
            </Text>
            <Button
              backgroundColor='#03A9F4'
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 2 }}
              title='READY'
              onPress={this.ready1}
            />
            <Button
              backgroundColor='blue'
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
              title='SHUFFLE'
              onPress={this.shuffle1}
            />
          </Card>
  
          <Card
              title='PLAYER 2'
              image={{uri: imageArr[this.state.countp2]}}
              >
              <Text style={{ marginBottom: 10,fontSize:25,color:'red',alignSelf:'center' }}>
                {this.state.status2}
              </Text>
              <Button
              backgroundColor='#03A9F4'
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 2 }}
              title='READY'
              onPress={this.ready2}
              />
              <Button
              backgroundColor='blue'
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
              title='SHUFFLE'
              onPress={this.shuffle2}
            />
          </Card>
        </View>       
      );
    }
    else if(this.state.isData===false&&this.state.isPushRoom===false){
        return <Loading></Loading>
    }
    else if(this.state.isPushRoom===true){
        return <Hangman status={this.props.status} rid={this.props.kode}></Hangman>
    }
  }
}