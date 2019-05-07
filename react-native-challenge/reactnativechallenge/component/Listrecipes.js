import React, {Component, Fragment} from 'react'
import {StyleSheet, Text, FlatList} from 'react-native';
import {connect} from 'react-redux'
import ListItemMeal from './ListItemMeal'
import Search from './Search'
import allDataAction from '../store/actions/allDataAction'
import Detail from './Detail'

class Listrecipes extends Component {

    componentDidMount () {
        this.props.alldataaction()
      }

    render () {
        return (
        <Fragment>
            <Text style= {styles.welcomelist}>List Recipes</Text>
            <Search/>
            <FlatList
                horizontal
                data={this.props.listmeals}   
                renderItem={({item})=>(
                    <ListItemMeal
                      detaildata={item}  
                      title= {item.strMeal}
                      avatar= {item.strMealThumb}
                    />  
                )}/>
            <Detail/>        
        </Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return ({
        alldataaction: () => dispatch(allDataAction())
    })
}

const mapStateToProps = (state) => {
    return ({
        listmeals: state.recipeReducer.listmeals
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Listrecipes)

const styles = StyleSheet.create({
    welcomelist: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
})

