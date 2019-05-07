import { GET_EVENT, ERR_MESSAGE, STORE_EVENT, EDIT_EVENT, DELETE_EVENT } from './types';
import api from '../api';

export const getEvent = () => (dispatch) => {
	api
		.get('event')
		.then((res) =>
			dispatch({
				type: GET_EVENT,
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

export const storeEvent = (data) => (dispatch) => {
	api
		.post('event', data)
		.then((res) => {
			dispatch({
				type: STORE_EVENT,
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

export const editEvent = (data) => (dispatch) => {
	api
		.put(`event/${data.id}`, data)
		.then((res) => {
			dispatch({
				type: EDIT_EVENT,
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

export const deleteEvent = (id) => (dispatch) => {
	api
		.delete(`event/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_EVENT,
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
