import { GET_EVENT, STORE_EVENT, EDIT_EVENT, DELETE_EVENT } from '../actions/types';

const initialState = {
	events: [],
	event: {},
	msg: ''
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_EVENT:
			return {
				...state,
				events: action.payload.data
			};
		case STORE_EVENT:
			return {
				...state,
				event: action.payload.data,
				msg: action.payload.message,
				events: [ action.payload.data, ...state.events ]
			};
		case DELETE_EVENT:
			const newState = state.events.filter((event) => event._id !== action.payload.data._id);
			return {
				...state,
				event: action.payload.data,
				msg: action.payload.message,
				events: newState
			};
		case EDIT_EVENT:
			const findIndex = state.events.findIndex((event) => event._id === action.payload.data._id);
			state.events.splice(findIndex, 1, action.payload.data);
			return {
				...state,
				event: action.payload.data,
				msg: action.payload.message,
				events: state.events
			};
		default:
			return state;
	}
}
