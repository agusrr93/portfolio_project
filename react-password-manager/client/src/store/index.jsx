import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import dataCUD from './middlewares/dataCUD'

import currentUser from './reducer/currentUser'
import userData from './reducer/userData'
import validationInput from './reducer/validationInput'
import inputData from './reducer/inputData'
import showAction from './reducer/showAction'
import selectedData from './reducer/selectedData'
import createFormatData from './reducer/createFormatData'

const MainReducer = combineReducers({
  currentUser: currentUser,
  userData: userData,
  validationInput: validationInput,
  inputData: inputData,
  showAction: showAction,
  selectedData: selectedData,
  createFormatData: createFormatData
})

const store = createStore(MainReducer, applyMiddleware(thunk, dataCUD))

export default store
