import { GET_CATEGORY, ERR_MESSAGE, STORE_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY } from './types';
import api from '../api';

export const getCategory = () => (dispatch) => {
	api
		.get('category')
		.then((res) =>
			dispatch({
				type: GET_CATEGORY,
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

export const storeCategory = (data) => (dispatch) => {
	api
		.post('category', data, {
			headers: {
				'content-type': 'multipart/form-data'
			}
		})
		.then((res) => {
			console.log(res.data);
			dispatch({
				type: STORE_CATEGORY,
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

export const deleteCategory = (id) => (dispatch) => {
	api
		.delete(`category/${id}/delete`)
		.then((res) => {
			console.log(res.data);
			dispatch({
				type: DELETE_CATEGORY,
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

export const editCategory = (data) => (dispatch) => {
	api
		.put(`category/${data.get('id')}/update`, data, {
			headers: {
				'content-type': 'multipart/form-data'
			}
		})
		.then((res) =>
			dispatch({
				type: EDIT_CATEGORY,
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
