import React,{Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView,Text,TextInput,View,Image,Picker,TouchableOpacity,Dimensions,StyleSheet} from 'react-native';
import {getCategory} from '../redux/actions/index';
import Loading from '../components/loading'
import Card from '../components/card'
import  ImagePicker from 'react-native-image-picker';
import axios from 'axios'

class Detail extends Component{
  constructor(props){
      super(props)

      this.state={
        photos:null,
        verify:true,
        data:['','','','',''],
        choose:''
      }
  }


  handleUploadPhoto = (data) => {
      let config={
        headers:{
          Authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTYW1wYW4iLCJzdWIiOiJhbWlubGFsYUBtYWlsLmNvbSIsInVzZXJuYW1lIjoiYW53YXJhbWllbmxhbGEiLCJpZCI6IjVjYmViZTc3ZTg5OTM4MDAxNzBiMzNiYyIsImlhdCI6MTU1NjAwNDU1NDYxMCwiZXhwIjoxNTU2MDkwOTU0NjEwLCJyb2xlIjoidXNlciJ9.SyUZoTJV0PpRQ4OIQTke1fjH-69eEKIda51lZENOvHo',
          'content-type':'multipart/form-data'
        }
      }
      let form=this.createFormData(this.state.photos,data)
      
      axios.post("https://sampanhorev1.herokuapp.com/api/v1/item/create",form,config)
        .then(response => {
            alert("Upload success!");
            console.log(response)
            this.setState({ photo: null });
        })
        .catch(error => {
            console.log('ini error',error)
            alert("Upload failed!");
        });
  };

  createFormData = (photo, body) => {
      const data = new FormData();

      data.append("photos", {
        name: photo.fileName,
        type: photo.type,
        uri:photo.uri
      });

      data.append('name',body.name)
      data.append('stock',body.stock)
      data.append('tags',body.tags)
      data.append('price',body.price)
      data.append('categoryId',body.categoryId)
      data.append('description',body.description)

      return data;
  };

  handlePost=()=>{
     let body={
       categoryId:this.state.choose,
       name:this.state.data[0],
       price:this.state.data[1],
       stock:this.state.data[2],
       tags:this.state.data[3],
       description:this.state.data[4]
     }

     this.handleUploadPhoto(body)
  }

  handleChange(data){
      let arrcopy=[...this.state.data]
      arrcopy[data.indeks]=data.event

      this.setState({
         data:arrcopy
      })
  }

  componentDidMount(){
    this.props.getcategory()
  }
  render(){
      const {category}=this.props.detail
      let dataMap=category.length===0?<Text>Loading...</Text>:<Picker
              selectedValue={this.state.choose}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({choose: itemValue})
              }>
              {category.data.map((data,indeks)=>
                  <Picker.Item key={indeks} label={data.name} value={data._id} />
              )}
            </Picker>
      rendered=(
          <ScrollView style={{marginBottom:20}}>

            <View style={{flex:1,flexDirection:'column'}}>
                 <View style={{height:40,backgroundColor:'green',margin:10,justifyContent:'center'}}>
                    <TouchableOpacity style={{alignItems:'center',flexDirection:'row',margin:10}}>
                        <Image source={require('../assets/back.png')} style={styles.tag}></Image>
                        <Text style={{color:'white',fontSize:18,margin:5}}>Isi Data Barang</Text>
                    </TouchableOpacity>
                 </View>
                 <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                     <View style={styles.flexLeft}>
                         <Text style={styles.label}>Nama Barang</Text>
                     </View>
                     <View style={styles.flexRight}>
                          <TextInput value={this.state.data[0]} onChangeText={(e) => this.handleChange({event:e,indeks:0})} style={styles.form}></TextInput>
                     </View>
                 </View>
                 <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                     <View style={styles.flexLeft}>
                         <Text style={styles.label}>Price</Text>
                     </View>
                     <View style={styles.flexRight}>
                          <TextInput value={this.state.data[1]} onChangeText={(e) => this.handleChange({event:e,indeks:1})} style={styles.form}></TextInput>
                     </View>
                 </View>
                 <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                     <View style={styles.flexLeft}>
                         <Text style={styles.label}>Stock</Text>
                     </View>
                     <View style={styles.flexRight}>
                          <TextInput value={this.state.data[2]} onChangeText={(e) => this.handleChange({event:e,indeks:2})} style={styles.form}></TextInput>
                     </View>
                 </View>
                 <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                     <View style={styles.flexLeft}>
                         <Text style={styles.label}>Tags</Text>
                     </View>
                     <View style={styles.flexRight}>
                          <TextInput value={this.state.data[3]} onChangeText={(e) => this.handleChange({event:e,indeks:3})} style={styles.form}></TextInput>
                     </View>
                 </View>
                 <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                     <View style={styles.flexLeft}>
                         <Text style={styles.label}>Deskripsi</Text>
                     </View>
                     <View style={styles.flexRight}>
                          <TextInput value={this.state.data[4]} onChangeText={(e) => this.handleChange({event:e,indeks:4})} style={styles.form}></TextInput>
                     </View>
                 </View>
                 <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                     <View style={styles.flexLeft}>
                         <Text style={styles.label}>Category</Text>
                     </View>
                     <View style={styles.flexRight}>
                          {dataMap}
                     </View>
                 </View>

                 <View style={{justifyContent:'center',alignContent:'center',flexDirection:'row'}}>
                   <TouchableOpacity onPress={this.handlePost} style={{backgroundColor:'green',alignItems:'center',justifyContent:'center',width:130,height:40,flexDirection:'row',alignItems:'center',margin:10}}>
                     <Text style={{margin:5,fontWeight:'bold',color:'white'}}>Submit Form</Text>
                   </TouchableOpacity>
                     <TouchableOpacity onPress={()=>{
                         var options = {
                            title: 'Select Image',
                            storageOptions: {
                               skipBackup: true,
                               path: 'images'
                            }
                          };
                          ImagePicker.showImagePicker(options, (response) => {
                               console.log('Response = ', response);
                               if (response.didCancel) {
                                 console.log('User cancelled image picker');
                               }else if (response.error) {
                                 console.log('ImagePicker Error: ', response.error);
                               }else if (response.customButton) {
                                 console.log('User tapped custom button: ', response.customButton);
                               }else {
                                 console.log('User selected a file form camera or gallery', response.uri);
                                 this.setState({ photos: response })
                               }
                             })
                            }
                          }

                          style={{width:200,height:50}}
                    >
                    <Image style={{width:50,height:50}}source={require('../assets/imupload.jpeg')}></Image>
                   </TouchableOpacity>
               </View>
               <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {this.state.photos && (
                     <Image
                        source={{ uri: this.state.photos.uri }}
                        style={{ width: 300, height: 300 }}
                     />
                  )}
                 </View>
             </View>
          </ScrollView>
        )

    return(
      <ScrollView>
          {rendered}
      </ScrollView>
    )
  }

}

var {height, width} = Dimensions.get('window');
const styles=StyleSheet.create({
    label:{
      fontWeight:'bold',fontSize:13,margin:3
    },
    flexRight:{
      margin:10,width:width*0.7
    },
    flexLeft:{
      width:width*0.3,paddingLeft:30
    },
    picker:{
        width:width*0.6,
        height:50
    },
    form:{
        width:width*0.6,
        height:40,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 35,
        marginTop: 10,
        marginBottom:10
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
const mapStateToProps = (state) => ({detail:state.category})

const mapDispatchToProps = {
    getcategory:getCategory
  };

export default connect(mapStateToProps,mapDispatchToProps)(Detail)
