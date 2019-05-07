import { GET_TRAINING_CODE, ERR_MESSAGE, STORE_TRAINING_CODE, EDIT_TRAINING_CODE, DELETE_TRAINING_CODE } from './types';
import api from '../api';

export const getTrainingCode = () => (dispatch) => {
    api
        .get('trainingcode')
        .then((res) =>
            dispatch({
                type: GET_TRAINING_CODE,
                payload: res.data
            })
        )
        .catch((err) =>
            dispatch({
                type: ERR_MESSAGE,
                payload: err.response.data
            })
        );
};

export const storeTrainingCode = (data) => (dispatch) => {
    api
        .post('trainingcode', data)
        .then((res) => {
            dispatch({
                type: STORE_TRAINING_CODE,
                payload: res.data
            });
        })
        .catch((err) =>
            dispatch({
                type: ERR_MESSAGE,
                payload: err.response.data
            })
        );
};

export const editTrainingCode = (data) => (dispatch) => {
    api
        .put(`trainingcode/${data.id}`, data)
        .then((res) => {
            dispatch({
                type: EDIT_TRAINING_CODE,
                payload: res.data
            });
        })
        .catch((err) =>
            dispatch({
                type: ERR_MESSAGE,
                payload: err.response.data
            })
        );
};

export const deleteTrainingCode = (id) => (dispatch) => {
    api
        .delete(`trainingcode/${id}`)
        .then((res) =>
            dispatch({
                type: DELETE_TRAINING_CODE,
                payload: res.data
            })
        )
        .catch((err) =>
            dispatch({
                type: ERR_MESSAGE,
                payload: err.response.data
            })
        );
};
