import React,{Component} from 'react';
import {ScrollView,Text,View,Image,TouchableOpacity,Dimensions,StyleSheet,TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux'

export default class TransactionStatus extends Component{
  constructor(props){
      super(props)
  }

  handleConfirm=()=>{
    Actions.konfirmasi({id:this.props.id})
  }

  render(){
    let rendered
      if(this.props.status==='not paid'){
        rendered=(
          <View style={{justifyContent:'space-between',flexDirection:'row',margin:20,alignItems:'center',flexWrap:'wrap'}}>
              <TouchableOpacity style={{alignItems:'center',justifyContent:'center',width:130,height:40,flexDirection:'row',alignItems:'center',margin:10}}>
                 <Text style={{margin:5,fontWeight:'bold',color:'black'}}>Status Pembelian : {this.props.status}</Text>
              </TouchableOpacity>
              <Image source={require('../assets/process.png')} style={styles.inactive}></Image>
              <Image source={require('../assets/send.png')} style={styles.inactive}></Image>
              <Image source={require('../assets/done.png')} style={styles.inactive}></Image>
              <TouchableOpacity style={{backgroundColor:'green',alignItems:'center',justifyContent:'center',width:130,height:40,flexDirection:'row',alignItems:'center',margin:5}}>
                <Text style={{margin:5,fontWeight:'bold',color:'white'}}>Lihat Detail</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleConfirm} style={{backgroundColor:'green',alignItems:'center',justifyContent:'center',width:130,height:40,flexDirection:'row',alignItems:'center',margin:5}}>
                <Text style={{margin:5,fontWeight:'bold',color:'white'}}>Konfirmasi</Text>
              </TouchableOpacity>
          </View>
        )
      }
      if(this.props.status==='done'){
        rendered=(<View style={{justifyContent:'space-between',flexDirection:'row',margin:20,alignItems:'center',flexWrap:'wrap'}}>
            <TouchableOpacity style={{alignItems:'center',justifyContent:'center',width:130,height:40,flexDirection:'row',alignItems:'center',margin:10}}>
              <Text style={{margin:5,fontWeight:'bold',color:'black'}}>Status Pembelian : {this.props.status}</Text>
            </TouchableOpacity>
            <Image source={require('../assets/process.png')} style={styles.active}></Image>
            <Image source={require('../assets/send.png')} style={styles.active}></Image>
            <Image source={require('../assets/done.png')} style={styles.active}></Image>
            <TouchableOpacity style={{backgroundColor:'green',alignItems:'center',justifyContent:'center',width:130,height:40,flexDirection:'row',alignItems:'center',margin:5}}>
              <Text style={{margin:5,fontWeight:'bold',color:'white'}}>Lihat Detail</Text>
            </TouchableOpacity>
        </View>)
      }
      if(this.props.status==='paid'){
        rendered=(<View style={{justifyContent:'space-between',flexDirection:'row',margin:20,alignItems:'center',flexWrap:'wrap'}}>
            <TouchableOpacity style={{alignItems:'center',justifyContent:'center',width:130,height:40,flexDirection:'row',alignItems:'center',margin:10}}>
              <Text style={{margin:5,fontWeight:'bold',color:'black'}}>Status Pembelian : {this.props.status}</Text>
            </TouchableOpacity>
            <Image source={require('../assets/process.png')} style={styles.inactive}></Image>
            <Image source={require('../assets/send.png')} style={styles.inactive}></Image>
            <Image source={require('../assets/done.png')} style={styles.inactive}></Image>
            <TouchableOpacity style={{backgroundColor:'green',alignItems:'center',justifyContent:'center',width:130,height:40,flexDirection:'row',alignItems:'center',margin:5}}>
              <Text style={{margin:5,fontWeight:'bold',color:'white'}}>Lihat Detail</Text>
            </TouchableOpacity>
        </View>)
      }
      if(this.props.status==='pending'){
        rendered=(<View style={{justifyContent:'space-between',flexDirection:'row',margin:20,alignItems:'center',flexWrap:'wrap'}}>
            <TouchableOpacity style={{alignItems:'center',justifyContent:'center',width:130,height:40,flexDirection:'row',alignItems:'center',margin:10}}>
              <Text style={{margin:5,fontWeight:'bold',color:'black'}}>Status Pembelian : {this.props.status}</Text>
            </TouchableOpacity>
            <Image source={require('../assets/process.png')} style={styles.inactive}></Image>
            <Image source={require('../assets/send.png')} style={styles.inactive}></Image>
            <Image source={require('../assets/done.png')} style={styles.inactive}></Image>
            <TouchableOpacity style={{backgroundColor:'green',alignItems:'center',justifyContent:'center',width:130,height:40,flexDirection:'row',alignItems:'center',margin:5}}>
              <Text style={{margin:5,fontWeight:'bold',color:'white'}}>Lihat Detail</Text>
            </TouchableOpacity>
        </View>)
      }
      if(this.props.status==='on process'){
        rendered=(<View style={{justifyContent:'space-between',flexDirection:'row',margin:20,alignItems:'center',flexWrap:'wrap'}}>
            <TouchableOpacity style={{alignItems:'center',justifyContent:'center',width:130,height:40,flexDirection:'row',alignItems:'center',margin:10}}>
              <Text style={{margin:5,fontWeight:'bold',color:'black'}}>Status Pembelian : {this.props.status}</Text>
            </TouchableOpacity>
            <Image source={require('../assets/process.png')} style={styles.active}></Image>
            <Image source={require('../assets/send.png')} style={styles.inactive}></Image>
            <Image source={require('../assets/done.png')} style={styles.inactive}></Image>
            <TouchableOpacity style={{backgroundColor:'green',alignItems:'center',justifyContent:'center',width:130,height:40,flexDirection:'row',alignItems:'center',margin:5}}>
              <Text style={{margin:5,fontWeight:'bold',color:'white'}}>Lihat Detail</Text>
            </TouchableOpacity>
        </View>)
      }
      if(this.props.status==='cancelled'){
        rendered=(<View style={{justifyContent:'space-between',flexDirection:'row',margin:20,alignItems:'center',flexWrap:'wrap'}}>
            <TouchableOpacity style={{alignItems:'center',justifyContent:'center',width:130,height:40,flexDirection:'row',alignItems:'center',margin:10}}>
              <Text style={{margin:5,fontWeight:'bold',color:'black'}}>Status Pembelian : {this.props.status}</Text>
            </TouchableOpacity>
            <Image source={require('../assets/process.png')} style={styles.inactive}></Image>
            <Image source={require('../assets/send.png')} style={styles.inactive}></Image>
            <Image source={require('../assets/done.png')} style={styles.inactive}></Image>
            <TouchableOpacity style={{backgroundColor:'green',alignItems:'center',justifyContent:'center',width:130,height:40,flexDirection:'row',alignItems:'center',margin:5}}>
              <Text style={{margin:5,fontWeight:'bold',color:'white'}}>Lihat Detail</Text>
            </TouchableOpacity>
        </View>)
      }
      if(this.props.status==='shipping'){
        rendered=(<View>
          <View style={{justifyContent:'space-between',flexDirection:'row',margin:20,alignItems:'center',flexWrap:'wrap'}}>
              <TouchableOpacity style={{alignItems:'center',justifyContent:'center',width:130,height:40,flexDirection:'row',alignItems:'center',margin:10}}>
                <Text style={{margin:5,fontWeight:'bold',color:'black'}}>Status Pembelian : {this.props.status}</Text>
              </TouchableOpacity>
              <Image source={require('../assets/process.png')} style={styles.active}></Image>
              <Image source={require('../assets/send.png')} style={styles.active}></Image>
              <Image source={require('../assets/done.png')} style={styles.inactive}></Image>
              <TouchableOpacity style={{backgroundColor:'green',alignItems:'center',justifyContent:'center',width:130,height:40,flexDirection:'row',alignItems:'center',margin:5}}>
                <Text style={{margin:5,fontWeight:'bold',color:'white'}}>Lihat Detail</Text>
              </TouchableOpacity>
          </View>
          <View style={{justifyContent:'space-between',flexDirection:'row',margin:20,alignItems:'center'}}>
              <TouchableOpacity style={{alignItems:'center',justifyContent:'center',backgroundColor:'green',width:130,height:40,flexDirection:'row',alignItems:'center',margin:10}}>
                <Text style={{margin:5,fontWeight:'bold',color:'white'}}>Terima Barang</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor:'red',alignItems:'center',justifyContent:'center',width:130,height:40,flexDirection:'row',alignItems:'center',margin:10}}>
                <Text style={{margin:5,fontWeight:'bold',color:'white'}}>Komplain</Text>
              </TouchableOpacity>
          </View>
        </View>
        )
      }
      if(this.props.status==='paid'&&this.props.role==='seller'){
        rendered=(
          <View>
              <View style={{justifyContent:'space-between',flexDirection:'row',margin:20,alignItems:'center',flexWrap:'wrap'}}>
                <TouchableOpacity style={{alignItems:'center',justifyContent:'center',width:130,height:40,flexDirection:'row',alignItems:'center',margin:10}}>
                  <Text style={{margin:5,fontWeight:'bold',color:'black'}}>Status Pembelian : Dibayar</Text>
                </TouchableOpacity>
                <Image source={require('../assets/process.png')} style={styles.inactive}></Image>
                <Image source={require('../assets/send.png')} style={styles.inactive}></Image>
                <Image source={require('../assets/done.png')} style={styles.inactive}></Image>
                <TouchableOpacity style={{backgroundColor:'green',alignItems:'center',justifyContent:'center',width:130,height:40,flexDirection:'row',alignItems:'center',margin:5}}>
                  <Text style={{margin:5,fontWeight:'bold',color:'white'}}>Lihat Detail</Text>
                </TouchableOpacity>
            </View>
            <View style={{justifyContent:'space-between',flexDirection:'row',margin:20,alignItems:'center'}}>
                <TouchableOpacity style={{alignItems:'center',justifyContent:'center',backgroundColor:'green',width:130,height:40,flexDirection:'row',alignItems:'center',margin:10}}>
                  <Text style={{margin:5,fontWeight:'bold',color:'white'}}>Terima Pesanan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:'red',alignItems:'center',justifyContent:'center',width:130,height:40,flexDirection:'row',alignItems:'center',margin:10}}>
                  <Text style={{margin:5,fontWeight:'bold',color:'white'}}>Tolak Pesanan</Text>
                </TouchableOpacity>
            </View>
          </View>)
      }
      if(this.props.status==='on process'&&this.props.role==='seller'){
            rendered=(<View>
                <View style={{justifyContent:'space-between',flexDirection:'row',margin:20,alignItems:'center',flexWrap:'wrap'}}>
                  <TouchableOpacity style={{alignItems:'center',justifyContent:'center',width:130,height:40,flexDirection:'row',alignItems:'center',margin:10}}>
                    <Text style={{margin:5,fontWeight:'bold',color:'black'}}>Status Pembelian : Dibayar</Text>
                  </TouchableOpacity>
                  <Image source={require('../assets/process.png')} style={styles.active}></Image>
                  <Image source={require('../assets/send.png')} style={styles.inactive}></Image>
                  <Image source={require('../assets/done.png')} style={styles.inactive}></Image>
                  <TouchableOpacity style={{backgroundColor:'green',alignItems:'center',justifyContent:'center',width:130,height:40,flexDirection:'row',alignItems:'center',margin:5}}>
                    <Text style={{margin:5,fontWeight:'bold',color:'white'}}>Lihat Detail</Text>
                  </TouchableOpacity>
              </View>
              <View style={{justifyContent:'space-between',flexDirection:'row',margin:20,alignItems:'center'}}>
                  <TouchableOpacity style={{alignItems:'center',justifyContent:'center',backgroundColor:'green',width:130,height:40,flexDirection:'row',alignItems:'center',margin:10}}>
                    <Text style={{margin:5,fontWeight:'bold',color:'white'}}>Submit Resi</Text>
                  </TouchableOpacity>
                  <TextInput style={{width:180,borderWidth:1,backgroundColor:'white',height:40}}></TextInput>
              </View>
          </View>
          )
      }

    return(
      <View>
          {rendered}
      </View>
    )
  }
}

var {height, width} = Dimensions.get('window');
const styles=StyleSheet.create({
  active:{
    width:30,
    height:30,
    margin:5
  },
  inactive:{
    width:30,
    height:30,
    opacity:0.2,
    margin:5
  },
   width:{
     width:width*0.5
   },
   touch:{
      margin:10,
      width:width*0.8,
      height:50,
      backgroundColor:'green',
      borderRadius:10,
      justifyContent:'center',
      alignItems:'center'
   },
   productBg:{
     backgroundColor:'grey',width:width*0.3,height:height*0.2,padding:5,margin:10
   },
   product:{
     width:width*0.28,height:height*0.2
   },
   bold:{
     fontWeight:'bold',
     fontSize:18,
     color:'white'
   },
   icon:{
     width:40,
     height:40
   },
   tag:{
     width:30,
     height:30
   },
   rate:{
     width:20,
     height:20
   }
})
