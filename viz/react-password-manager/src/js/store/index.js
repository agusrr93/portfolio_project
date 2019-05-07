import { createStore,compose,applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import thunk from "redux-thunk";
import masterReducer from "../reducers";

export default createStore(
	masterReducer,
	composeWithDevTools(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()||compose
	)
);