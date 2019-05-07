import { REGISTER_USER, SET_CURRENT_USER, GET_DASHBOARD, STORE_VERIF , STORE_TRANSACTION} from '../actions/types';
import isEmpty from '../utils/isEmpty';

const initialState = {
	isAuthenticated: false,
	user: {},
	total: [],
	transaction: [],
	lastEvents: [],
	nextEvents: [],
	lastUsers: [],
	lastItems: [],
	userUnverified: [],
	pendingTransaction: [],
	msg: ''
};

export default function(state = initialState, action) {
	switch (action.type) {
		case REGISTER_USER:
			return {
				...state,
				user: action.payload
			};
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			};
		case GET_DASHBOARD:
			return {
				...state,
				total: action.payload['Total'],
				transaction: action.payload['Transaction'],
				lastEvents: action.payload['Last Events'],
				nextEvents: action.payload['Next Events'],
				lastUsers: action.payload['Last Users'],
				lastItems: action.payload['Last Items'],
				userUnverified: action.payload['User Unverified'],
				pendingTransaction: action.payload['Pending Transactions']
			};
		case STORE_VERIF:
			const newState = state.userUnverified.filter((user) => user._id !== action.payload.data._id);
			return {
				...state,
				msg: action.payload.message,
				userUnverified: newState
			};
		case STORE_TRANSACTION:
			const newStateTransaction = state.pendingTransaction.filter((transaction) => transaction._id !== action.payload.data._id);
			return {
				...state,
				msg: action.payload.message,
				pendingTransaction: newStateTransaction
			};
		default:
			return state;
	}
}
