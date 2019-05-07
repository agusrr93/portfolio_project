import React, {Component} from 'react'
import {StyleSheet, View, TextInput} from 'react-native';
import {connect} from 'react-redux'
import searchDataAction from '../store/actions/searchDataAction'

class Search extends Component {

    getKeyword (keyword) {
        this.props.searchdataaction({keyword})
    }

    render () {
        return (
            <View>
               <TextInput
                  style = {styles.search}  
                  onChangeText= {(text) => this.getKeyword(text)}
                  placeholder= 'Input Search here'
               /> 
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return ({
        searchdataaction: (payload) => dispatch(searchDataAction(payload))
    })
}

const mapStateToProps = (state) => {
    return ({
        keyword: state.recipeReducer.keyword
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)

const styles = StyleSheet.create({
    search: {
        width: 350,
        borderColor: 'gray', 
        borderWidth: 1,
        textAlign: 'center',
        marginBottom: 10
    },
})