import React, {Component, Fragment} from 'react'
import {StyleSheet, View, Text, Button, Image, ScrollView} from 'react-native';
import {connect} from 'react-redux'
import randomDataAction from '../store/actions/randomDataAction'

class Random extends Component {
    
    componentDidMount() {
        this.props.randomdataaction()
    }

    randomNow = () => {
        this.props.randomdataaction()
    }

    render (){
        const {randomdata} = this.props
        return (
            <Fragment>
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.welcome}>Resep Mama</Text>
                    </View>
                    <View style={styles.bodycontainer}>
                        <Button 
                            title="Get Random Recipes"
                            color="#841584"
                            onPress={this.randomNow}
                            style= {styles.randomtitle}/>
                        <Text style= {styles.randomtitle}>{randomdata.strMeal}</Text>
                        <Image
                                source= {{
                                    uri: randomdata.strMealThumb
                                }}
                                style={{width: 350, height: 350}}/>
                        <Text style= {styles.randomtitle}>
                                Instructions: </Text>
                        <Text style= {styles.instruction}>
                            {randomdata.strInstructions}</Text>
                        <Text style= {styles.randomtitle}>
                            Ingredients: </Text>
                        <View style={styles.ingredient}>
                             <Text>{randomdata.strIngredient1}</Text>
                             <Text>       </Text>
                             <Text>{randomdata.strMeasure1}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{randomdata.strIngredient2}</Text>
                             <Text>       </Text>
                             <Text>{randomdata.strMeasure2}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{randomdata.strIngredient3}</Text>
                             <Text>       </Text>
                             <Text>{randomdata.strMeasure3}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{randomdata.strIngredient4}</Text>
                             <Text>       </Text>
                             <Text>{randomdata.strMeasure4}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{randomdata.strIngredient5}</Text>
                             <Text>       </Text>
                             <Text>{randomdata.strMeasure5}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{randomdata.strIngredient6}</Text>
                             <Text>       </Text>
                             <Text>{randomdata.strMeasure6}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{randomdata.strIngredient7}</Text>
                             <Text>       </Text>
                             <Text>{randomdata.strMeasure7}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{randomdata.strIngredient8}</Text>
                             <Text>       </Text>
                             <Text>{randomdata.strMeasure8}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{randomdata.strIngredient9}</Text>
                             <Text>       </Text>
                             <Text>{randomdata.strMeasure9}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{randomdata.strIngredient10}</Text>
                             <Text>       </Text>
                             <Text>{randomdata.strMeasure10}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{randomdata.strIngredient11}</Text>
                             <Text>       </Text>
                             <Text>{randomdata.strMeasure11}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{randomdata.strIngredient12}</Text>
                             <Text>       </Text>
                             <Text>{randomdata.strMeasure12}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{randomdata.strIngredient13}</Text>
                             <Text>       </Text>
                             <Text>{randomdata.strMeasure13}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{randomdata.strIngredient14}</Text>
                             <Text>       </Text>
                             <Text>{randomdata.strMeasure14}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{randomdata.strIngredient15}</Text>
                             <Text>       </Text>
                             <Text>{randomdata.strMeasure15}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{randomdata.strIngredient16}</Text>
                             <Text>       </Text>
                             <Text>{randomdata.strMeasure16}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{randomdata.strIngredient17}</Text>
                             <Text>       </Text>
                             <Text>{randomdata.strMeasure17}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{randomdata.strIngredient18}</Text>
                             <Text>       </Text>
                             <Text>{randomdata.strMeasure18}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{randomdata.strIngredient19}</Text>
                             <Text>       </Text>
                             <Text>{randomdata.strMeasure19}</Text>   
                        </View>
                        <View style={styles.ingredient}>
                             <Text>{randomdata.strIngredient20}</Text>
                             <Text>       </Text>
                             <Text>{randomdata.strMeasure20}</Text>   
                        </View>
                    </View>
                </ScrollView>
            </Fragment>
            
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return ({
        randomdataaction: () => dispatch(randomDataAction())
    })
}

const mapStateToProps = (state) => {
    return ({
        randomdata: state.recipeReducer.randomdata
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(Random)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#cddc39',
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
      fontWeight: "bold",
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