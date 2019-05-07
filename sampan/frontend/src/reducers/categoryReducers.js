import { GET_CATEGORY, STORE_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY } from '../actions/types';

const initialState = {
	categories: [],
	category: {},
	msg: ''
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_CATEGORY:
			return {
				...state,
				categories: action.payload.data
			};
		case STORE_CATEGORY:
			return {
				...state,
				category: action.payload.data,
				msg: action.payload.message,
				categories: [ action.payload.data, ...state.categories ]
			};
		case DELETE_CATEGORY:
			const newState = state.categories.filter((category) => category._id !== action.payload.data._id);
			return {
				...state,
				category: action.payload.data,
				msg: action.payload.message,
				categories: newState
			};
		case EDIT_CATEGORY:
			const findIndex = state.categories.findIndex((category) => category._id === action.payload.data._id);
			state.categories.splice(findIndex, 1, action.payload.data);
			return {
				...state,
				category: action.payload.data,
				msg: action.payload.message,
				categories: state.categories
			};
		default:
			return state;
	}
}
