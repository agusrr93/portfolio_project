import React,{Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView,Text,View,Image,TouchableOpacity,Dimensions,StyleSheet} from 'react-native';
import {fetchDetail,setloading} from '../redux/actions/index';
import Loading from '../components/loading'
import Card from '../components/card'

class Detail extends Component{
  constructor(props){
      super(props)
  }

  componentDidMount(){
    this.props.setloading()
    this.props.getdetail(this.props.id)
  }
  render(){
  /*  let statusloading=this.props.detail.loading
    let data=this.props.detail.detail
    let photo=this.props.detail.detail.photos
    let rendered
    if(statusloading===false){*/
    rendered=(
        <ScrollView style={{marginBottom:20}}>
          <View style={{height:40,backgroundColor:'green',margin:10,justifyContent:'center'}}>
              <TouchableOpacity style={{alignItems:'center',flexDirection:'row',margin:10}}>
                  <Image source={require('../assets/back.png')} style={styles.tag}></Image>
                  <Text style={{color:'white',fontSize:18,margin:5}}>Manage Barang</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.middle}>
              <TouchableOpacity style={styles.button}>
                  <Text style={styles.text_white}>Post Barang</Text>
              </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.button,{margin:10}]}>
              <Text style={styles.text_white}>My product</Text>
          </TouchableOpacity>
          <View style={{flexDirection:'row',flexWrap:'wrap'}}>
              <Card text='Tasbih Gaul' imageUri={{uri:'https://kuka.co.id/asset/product_photo/thumb/7fcf267ac52b623860475da4860d33d9_thumb.jpg'}} harga='250000' seller='Idrus Salam'></Card>
              <Card text='Tasbih Santai' imageUri={{uri:'https://kuka.co.id/asset/product_photo/thumb/313316237c29c18538e2d23c41940f51_thumb.jpeg'}} harga='300000' seller='Idrus Salam'></Card>
              <Card text='Tasbih Santai' imageUri={{uri:'https://kuka.co.id/asset/product_photo/thumb/81506039725486fb7d6b4a89b73d44d8_thumb.jpg'}} harga='300000' seller='Idrus Salam'></Card>
                <Card text='Tasbih Santai' imageUri={{uri:'https://kuka.co.id/asset/product_photo/thumb/87c095e116ad54d2e1f2bcacb67bae74_thumb.jpeg'}} harga='300000' seller='Idrus Salam'></Card>
          </View>
        </ScrollView>
      )
    /*}
    else{
       rendered=(<Loading loading={statusloading}></Loading>)
    }*/
    return(
      <ScrollView>
          {rendered}
      </ScrollView>
    )
  }

}

var {height, width} = Dimensions.get('window');
const styles=StyleSheet.create({
   touch:{
      margin:10,
      width:width*0.8,
      height:50,
      backgroundColor:'green',
      borderRadius:10,
      justifyContent:'center',
      alignItems:'center'
   },
   button:{
     width:width*0.5,
     height:40,
     backgroundColor:'green',
     alignItems:'center',
     justifyContent:'center'
   },
   text_white:{
     fontSize:16,
     color:'white'
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
   },
   middle:{
     flex:1,alignItems:'center',height:height*0.5,justifyContent:'center'
   }
})
const mapStateToProps = (state) => ({detail:state.detail})

const mapDispatchToProps = {
    getdetail:fetchDetail,
    setloading:setloading
  };

export default connect(mapStateToProps,mapDispatchToProps)(Detail)
