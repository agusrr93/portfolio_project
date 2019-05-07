import { ERR_MESSAGE} from '../actions/types';

const initialState = {
    msg: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ERR_MESSAGE:
            return {
                ...state,
                msg: action.payload.message
            };
        default:
            return state;
    }
}
