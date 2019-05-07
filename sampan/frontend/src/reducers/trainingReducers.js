import { GET_TRAINING_CODE, STORE_TRAINING_CODE, EDIT_TRAINING_CODE, DELETE_TRAINING_CODE } from '../actions/types';

const initialState = {
	trainings: [],
	training: {},
	msg: ''
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_TRAINING_CODE:
			return {
				...state,
				trainings: action.payload.data
			};
		case STORE_TRAINING_CODE:
			return {
				...state,
				training: action.payload.data,
				msg: action.payload.message,
				trainings: [ action.payload.data, ...state.trainings ]
			};
		case DELETE_TRAINING_CODE:
			const newState = state.trainings.filter((training) => training._id !== action.payload.data._id);
			return {
				...state,
				training: action.payload.data,
				msg: action.payload.message,
				trainings: newState
			};
		case EDIT_TRAINING_CODE:
			const findIndex = state.trainings.findIndex((training) => training._id === action.payload.data._id);
			state.trainings.splice(findIndex, 1, action.payload.data);
			return {
				...state,
				training: action.payload.data,
				msg: action.payload.message,
				trainings: state.trainings
			};
		default:
			return state;
	}
}
