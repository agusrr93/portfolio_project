import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import recipeReducer from './reducers/recipeReducer'

const reducers = combineReducers({
    recipeReducer
})

const store = createStore(
    reducers,
    applyMiddleware(thunk)
)

export default store