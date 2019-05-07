import { GET_SLIDER, ERR_MESSAGE, STORE_SLIDER, DELETE_SLIDER, EDIT_SLIDER } from './types';
import api from '../api';

export const getSlider = () => (dispatch) => {
    api
        .get('slider/all')
        .then((res) =>
            dispatch({
                type: GET_SLIDER,
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

export const storeSlider = (data) => (dispatch) => {
    api
        .post('slider/create', data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then((res) => {
            console.log(res.data);
            dispatch({
                type: STORE_SLIDER,
                payload: res.data
            });
        })
        .catch((err) => {
            console.log(err.response.data);
            dispatch({
                type: ERR_MESSAGE,
                payload: err.response.data
            });
        });
};

export const deleteSlider = (id) => (dispatch) => {
    api
        .delete(`slider/${id}/delete`)
        .then((res) => {
            console.log(res.data);
            dispatch({
                type: DELETE_SLIDER,
                payload: res.data
            });
        })
        .catch((err) => {
            console.log(err.response);
            dispatch({
                type: ERR_MESSAGE,
                payload: err.response.data
            });
        });
};

export const editSlider = (data) => (dispatch) => {
    api
        .put(`slider/${data.get('id')}/update`, data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then((res) =>
            dispatch({
                type: EDIT_SLIDER,
                payload: res.data
            })
        )
        .catch((err) => {
            console.log(err.response);
            dispatch({
                type: ERR_MESSAGE,
                payload: err.response.data
            });
        });
};
