import React, {Component} from 'react'
import {StyleSheet, View, Text, Button, Modal, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux'
import detailDataAction from '../store/actions/detailDataAction'

class Detail extends Component {

    // componentDidMount () {
    //     console.log('detail modal status', this.props.detailmodalstatus)
    //     console.log('detail modal component detail-----', this.props.detailmeal )
    // }

    _onPress = () => {
        let detailmeal = ''
        const detailmodalstatus = false
        // console.log('onpress close----', detailmeal, detailmodalstatus)
        this.props.detaildataaction({detailmodalstatus,detailmeal})
    }

    render (){
        // console.log('ini modall----', this.props)
        const {detailmeal} = this.props
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.detailmodalstatus}
                onRequestClose={()=> {console.log('modal is closed')}}>
                <ScrollView>
                    <View style={styles.container}>
                        <Button
                                onPress={()=> this._onPress()} 
                                title="Close"
                                color="#841584" />
                        <Text style={styles.welcome}>Resep Mama</Text>
                    </View>
                    <View style={styles.bodycontainer}>
                        <Text style= {styles.randomtitle}>{detailmeal.strMeal}</Text>
                        <Image
                                source= {{
                                    uri: detailmeal.strMealThumb
                                }}
                                style={{width: 350, height: 350}}/>
                        <Text style= {styles.randomtitle}>
                                Instructions: </Text>
                        <Text style= {styles.instruction}>
                            {detailmeal.strInstructions}</Text>
                        <Text style= {styles.randomtitle}>
                            Ingredients: </Text>
                        <View style={styles.ingredient}>
                             <Text>{detailmeal.strIngredient1}</Text>
                             <Text>       </Text>
                             <Text>{detailmeal.strMeasure1}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{detailmeal.strIngredient2}</Text>
                             <Text>       </Text>
                             <Text>{detailmeal.strMeasure2}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{detailmeal.strIngredient3}</Text>
                             <Text>       </Text>
                             <Text>{detailmeal.strMeasure3}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{detailmeal.strIngredient4}</Text>
                             <Text>       </Text>
                             <Text>{detailmeal.strMeasure4}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{detailmeal.strIngredient5}</Text>
                             <Text>       </Text>
                             <Text>{detailmeal.strMeasure5}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{detailmeal.strIngredient6}</Text>
                             <Text>       </Text>
                             <Text>{detailmeal.strMeasure6}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{detailmeal.strIngredient7}</Text>
                             <Text>       </Text>
                             <Text>{detailmeal.strMeasure7}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{detailmeal.strIngredient8}</Text>
                             <Text>       </Text>
                             <Text>{detailmeal.strMeasure8}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{detailmeal.strIngredient9}</Text>
                             <Text>       </Text>
                             <Text>{detailmeal.strMeasure9}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{detailmeal.strIngredient10}</Text>
                             <Text>       </Text>
                             <Text>{detailmeal.strMeasure10}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{detailmeal.strIngredient11}</Text>
                             <Text>       </Text>
                             <Text>{detailmeal.strMeasure11}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{detailmeal.strIngredient12}</Text>
                             <Text>       </Text>
                             <Text>{detailmeal.strMeasure12}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{detailmeal.strIngredient13}</Text>
                             <Text>       </Text>
                             <Text>{detailmeal.strMeasure13}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{detailmeal.strIngredient14}</Text>
                             <Text>       </Text>
                             <Text>{detailmeal.strMeasure14}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{detailmeal.strIngredient15}</Text>
                             <Text>       </Text>
                             <Text>{detailmeal.strMeasure15}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{detailmeal.strIngredient16}</Text>
                             <Text>       </Text>
                             <Text>{detailmeal.strMeasure16}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{detailmeal.strIngredient17}</Text>
                             <Text>       </Text>
                             <Text>{detailmeal.strMeasure17}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{detailmeal.strIngredient18}</Text>
                             <Text>       </Text>
                             <Text>{detailmeal.strMeasure18}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{detailmeal.strIngredient19}</Text>
                             <Text>       </Text>
                             <Text>{detailmeal.strMeasure19}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{detailmeal.strIngredient20}</Text>
                             <Text>       </Text>
                             <Text>{detailmeal.strMeasure20}</Text>   
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return ({
        detaildataaction: (payload) => dispatch(detailDataAction(payload))
    })
}

const mapStateToProps = (state) => {
    return ({
        detailmodalstatus: state.recipeReducer.detailmodalstatus,
        detailmeal: state.recipeReducer.detailmeal
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#cddc39',
      flexDirection: 'row',  
    },
    bodycontainer: {
      flex: 9,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      marginTop: 10,
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      fontWeight: "bold"
    },
    randomtitle: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10
    },
    instruction: {
      margin: 10  
    },
    ingredient: {
        textAlign: "left",
        margin: 10,
        flexDirection: 'row'  
      }
})