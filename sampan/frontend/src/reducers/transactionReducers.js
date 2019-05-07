import { GET_TRANSACTION } from '../actions/types';

const initialState = {
	transactions: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_TRANSACTION:
			return {
				...state,
				transactions: action.payload.data
			};
		default:
			return state;
	}
}
