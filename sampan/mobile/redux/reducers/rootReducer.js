import { combineReducers } from 'redux'
import {goodsReducer} from './goods'
import {authReducer} from './auth'
import {detailReducer} from './detail'
import {categoryReducer} from './category'

export const rootReducer = combineReducers(
                {
                    goods: goodsReducer,auth:authReducer,detail:detailReducer,category:categoryReducer
                }
              )
