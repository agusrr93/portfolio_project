import React from 'react';
    TextInput
import { StyleSheet, Text, TextInput, View, Button, TouchableHighlight, Alert } from 'react-native';

import { db } from '../src/config';

class GameScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      "answer":"",
      "hint":"",
      "correct":0,
      "wrong":0,
      "usedLetters":[],
      "lettersLeft":[],
      "collection":[],
      "input":"",
      "score1":0,
      "score2":0,
      "score":0,
      "stage":0,
      "wrong1":0,
      "wrong2":0,
      "status":0
    }
    
    this.init = this.init.bind(this);
  } 

  componentDidMount(){
    let status=this.props.status
    this.setState({
      status:status
    },function(){
          this.getQuestionFromApiAsync()
          if(this.state.status==='player1'){
            db.ref('/room/'+this.props.rid).update({
                player1:{
                    score:0,
                    wrong:0
                }
            });
          }
          else if(this.state.status==='player2'){
            db.ref('/room/'+this.props.rid).update({
              player2:{
                  score:0,
                  wrong:0
              }
            });
          }

          db.ref('/room/'+this.props.rid).on('value',(snapshot)=>{
            this.setState({
              score1:snapshot.val().player1.score,
              score2:snapshot.val().player2.score,
              wrong1:snapshot.val().player1.wrong,
              wrong2:snapshot.val().player2.wrong
            })
       })
    })
    
  }

  getQuestionFromApiAsync() {
      db.ref('/room/' + this.props.rid).once('value').then((snapshot)=>{
            this.setState({
                collection:JSON.parse(snapshot.val().question)
            },function(){
               this.init();
            })
      });
  }

  static navigationOptions = {
    title: 'Back',
  };
  init(){
    let puzzle = this.state.collection[this.state.stage];
    let answer = puzzle.answer.replace(/[^a-zA-Z]/gmi, " ").trim();
    let hint = puzzle.hint;
    let lettersLeft = Array(answer.length);
    for(let index=0;index<answer.length;index++){
      lettersLeft[index] = answer[index]==" "?"*":" ";
    }
    this.setState({
      answer:answer,
      hint:hint,
      correct:0,
      wrong:0,
      usedLetters:[],
      lettersLeft:lettersLeft,
      input:""
    });
  }

  validate(usedLetters,letter){
    usedLetters.push(letter);
    let correct = this.state.correct,
      wrong = this.state.wrong,
      answer = this.state.answer,
      lettersLeft = this.state.lettersLeft,

      score = this.state.score;
        if(answer.toUpperCase().indexOf(letter)==-1){
        wrong++;
        if(score>0){
            score --;
        }
        } else{
        answer.toUpperCase().split("").map((value,index)=>{
            if(value==letter){
            lettersLeft[index] = letter;
            correct ++;
            score++;
            }
        });
        }
        
        if(lettersLeft.join("").replace(/\*/g," ").toUpperCase() == answer.toUpperCase()){
            if(this.state.stage===10){
                Alert.alert(
                    'You win',
                    'You have gussed all the correct answer',
                    [
                    {text: 'OK', onPress: () => this.init()},
                    ],
                    { cancelable: false }
                )
            }else{
                this.setState({
                    stage:this.state.stage+1
                },
                function(){
                      Alert.alert(
                        'Congratulation Your Answer Correct : '+answer,
                        'Welcome to stage - '+ (this.state.stage+1),
                        [
                        {text: 'OK', onPress: () => this.init()},
                        ],
                        { cancelable: false }
                    )
                    this.init()
                })
            }
        }
        if(wrong>10){
        Alert.alert(
            'You Lost',
            'Answer: '+answer.toUpperCase() +" "+" , Hint : "+this.state.hint,
            [
            {text: 'OK', onPress: () => this.init()},
            ],
            { cancelable: false }
        )
        }
        
        //dimari
        if(this.state.status==='player1'){
            db.ref('/room/'+this.props.rid).update({
                player1:{
                    score:score,
                    wrong:wrong
                }
            });
        }
        else if(this.state.status==='player2'){
          db.ref('/room/'+this.props.rid).update({
            player2:{
                score:score,
                wrong:wrong
            }
          });
        }
        

        this.setState({
            usedLetters:usedLetters,
            correct:correct,
            wrong:wrong,
            lettersLeft:lettersLeft,
            score:score
        });
  }
  render(){
    return(
    
      <View style={styles.container}>
      
      <Text style={styles.scoreText}>P1 Score: {this.state.score1}</Text>
      <Text style={styles.scoreText}>P2 Score: {this.state.score2}</Text>
      <Text style={styles.scoreText}>P1 Wrong: {this.state.wrong1}/10</Text>
      <Text style={styles.scoreText}>P2 Wrong: {this.state.wrong2}/10</Text>
      
        {this.renderDashes()}
        <View style={styles.hintContainer}><Text style={styles.hintText}>Hint : {this.state.hint}</Text></View>
        {this.renderKeyBoard()}
      </View>
    )
  }
  renderDashes(){
    return(
      <View style={styles.dashes}>
        {this.state.lettersLeft.map((letter,index)=>{
          if(letter=="*"){
            return (<View style={styles.dashItemContainer} key={index}><Text style={styles.dashBlankItem}>  </Text></View>)
          }else{
            return(<View style={styles.dashItemContainer} key={index}><Text style={styles.dashItem}>{letter}</Text></View>)
          }
        })}
      </View>
    )
  }
  onKeyPress(letter){
    let usedLetters = this.state.usedLetters;
    if(usedLetters.indexOf(letter)==-1){
      this.validate(usedLetters,letter);
    }else{
      return;
    }
  }
  renderKeyBoard(){
    const keysRows = [
      ["Q","W","E","R","T","Y","U","I","O","P"],
      ["A","S","D","F","G","H","J","K","L"],
      [" ","Z","X","C","V","B","N","M"," "]]
    return(
      <View style={styles.keyboard}>
        {keysRows.map((keys,rowIndex)=>{
          return(
            <View key={rowIndex} style={styles.keyboardRow}>
              {keys.map((letter,index)=>{
                if(letter==" "){
                  return <Text key={index}> </Text>
                }else if(this.state.usedLetters.indexOf(letter)!=-1){
                   if(this.state.answer.toUpperCase().indexOf(letter)!=-1){
                        return <View style={styles.keyItem} key={index}><Text key={index} style={styles.rightKey}>{letter}</Text></View>
                   }
                   else{
                        return <View style={styles.keyItem} key={index}><Text key={index} style={styles.usedKey}>{letter}</Text></View>
                   } 
                }else{
                  return <TouchableHighlight
                   onPress={this.onKeyPress.bind(this,letter)} style={styles.keyItem} key={index}><Text style={styles.letter}>{letter}</Text></TouchableHighlight>
                }
              })}
            </View>
          )
        })}
      </View>
    )
  }
}

export default class App extends React.Component {
  render() {
    return <GameScreen rid={this.props.rid} status={this.props.status}/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeContainer: {
    flex: 1,
    flexDirection:"column",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameTitleView:{
    flexDirection:"row"
  },
  gameTitle:{
    fontSize:35,
    borderBottomWidth:1,
    margin:10
  },
  keyboard: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection:"column"
  },
  keyboardRow: {
    flex: 1,
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyItem:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:16,
    margin:2
  },
  usedKey:{
    backgroundColor:'red',
    color:"white",
    fontSize:20,
    width:30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightKey:{
    backgroundColor:'green',
    color:"white",
    fontSize:20,
    width:30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  letter:{
    backgroundColor:'blue',
    color:"white",
    fontSize:20,
    width:30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startGameBtn: {
    color: '#841584',
    fontSize:25,
    margin:10
  },
  dashInputStyle:{
    height: 40, 
  },
  dashes:{
    flex: 1,
    flexDirection:"row",
    alignItems: 'center',
    alignSelf:"auto",
    justifyContent: 'center',
    flexWrap:"wrap"
  },
  dashItemContainer:{
    flex:0,
    padding:5,
    margin:2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashItem:{
    width:20,
    color: '#841584',
    fontSize:20,
    borderBottomWidth:1,
    borderBottomColor:"black"
  },
  dashBlankItem:{
    width:30,
    fontSize:20,
  },
  hintContainer:{
    flexWrap: 'wrap',
    alignItems: "flex-start",
    padding:10,
    backgroundColor:"lightgrey"
  },
  hintText:{
    fontSize:20,
    fontWeight:"500",
  },
  scoreText:{
    padding:5,
    fontSize:18,
    textAlign:"right",
    fontWeight:"500",
    justifyContent:"flex-end",
    width:"100%"
  }
});
