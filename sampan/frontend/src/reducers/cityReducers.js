import { GET_CITY, STORE_CITY, EDIT_CITY, DELETE_CITY } from '../actions/types';

const initialState = {
	cities: [],
	city: {},
	msg: ''
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_CITY:
			return {
				...state,
				cities: action.payload.data
			};
		case STORE_CITY:
			return {
				...state,
				city: action.payload.data,
				msg: action.payload.message,
                cities: [ action.payload.data, ...state.cities ]
            };
        case DELETE_CITY:
            const newState = state.cities.filter((city) => city._id !== action.payload.data._id);
            return {
                ...state,
                city: action.payload.data,
                msg: action.payload.message,
                cities: newState
            };
        case EDIT_CITY:
            const findIndex = state.cities.findIndex((city) => city._id === action.payload.data._id);
            state.cities.splice(findIndex, 1, action.payload.data);
            return {
                ...state,
                city: action.payload.data,
                msg: action.payload.message,
                cities: state.cities
            };
		default:
			return state;
	}
}
