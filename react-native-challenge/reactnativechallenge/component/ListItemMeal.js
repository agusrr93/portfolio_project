import React, {Component} from 'react'
import {StyleSheet, Text, View, Image, TouchableOpacity, Button} from 'react-native';
import {connect} from 'react-redux'
import detailDataAction from '../store/actions/detailDataAction'

class ListItemMeal extends Component {
    constructor (props) {
        super (props)
        this._onPress = this._onPress.bind(this)
    }

    _onPress = (detailmeal) => {
        const detailmodalstatus = true
        this.props.detaildataaction({detailmodalstatus,detailmeal})
      };

    render () {
        return (
            <TouchableOpacity>
                <View style={styles.meallist}>
                    <View style={styles.mealitem}
                        >
                        <Image
                            source= {{
                                uri: this.props.avatar
                            }}
                            style={{width: 250, height: 250}}/>
                        <View
                            style={styles.mealdetail}>
                            <Text style={styles.mealtext}>
                                {this.props.title}
                            </Text>
                            <View>
                                <Button
                                    onPress={()=> this._onPress(this.props.detaildata)} 
                                    title="Detail"
                                    color="#841584" />
                                <Text
                                   style={styles.infoswipe}>
                                    {'<--  Swipe left or right  -->'}</Text>    
                            </View>
                        </View>    
                    </View>    
                </View>
            </TouchableOpacity>
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

export default connect(mapStateToProps,mapDispatchToProps)(ListItemMeal)

const styles = StyleSheet.create({
    meallist: {
        flex: 1,
        width: 350,
        // height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cddc39', 
        borderBottomWidth: 1,
    },
    mealitem: {
        width: 300,
        // height: 80,
        // marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        // flexDirection: 'row',
    },
    mealdetail: {
        width: 300,
        marginTop: 10,
        marginLeft: 5,
        justifyContent: 'center',
    },
    mealtext: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
    },
    mealimage: {
        marginRight: 10,
    },
    infoswipe: {
        marginTop: 15,
        fontSize: 15,
        textAlign: 'center'
    }
})