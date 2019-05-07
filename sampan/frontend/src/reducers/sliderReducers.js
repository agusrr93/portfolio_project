import { GET_SLIDER, STORE_SLIDER, EDIT_SLIDER, DELETE_SLIDER } from '../actions/types';

const initialState = {
    sliders: [],
    slider: {},
    msg: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SLIDER:
            return {
                ...state,
                sliders: action.payload.data
            };
        case STORE_SLIDER:
            return {
                ...state,
                slider: action.payload.data,
                msg: action.payload.message,
                sliders: [action.payload.data, ...state.sliders]
            };
        case DELETE_SLIDER:
            const newState = state.sliders.filter((slider) => slider._id !== action.payload.data._id);
            return {
                ...state,
                slider: action.payload.data,
                msg: action.payload.message,
                sliders: newState
            };
        case EDIT_SLIDER:
            const findIndex = state.sliders.findIndex((slider) => slider._id === action.payload.data._id);
            state.sliders.splice(findIndex, 1, action.payload.data);
            return {
                ...state,
                slider: action.payload.data,
                msg: action.payload.message,
                sliders: state.sliders
            };
        default:
            return state;
    }
}
