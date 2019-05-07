import { GET_CITY, ERR_MESSAGE, STORE_CITY, EDIT_CITY, DELETE_CITY } from './types';
import api from '../api';

export const getCity = () => (dispatch) => {
	api
		.get('city')
		.then((res) =>
			dispatch({
				type: GET_CITY,
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

export const storeCity = (data) => (dispatch) => {
	api
		.post('city', data)
		.then((res) => {
			dispatch({
				type: STORE_CITY,
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

export const editCity = (data) => (dispatch) => {
	api
		.put(`city/${data.id}`, data)
		.then((res) => {
			dispatch({
				type: EDIT_CITY,
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

export const deleteCity = (id) => (dispatch) => {
	api
		.delete(`city/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_CITY,
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
