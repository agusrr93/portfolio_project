import { ERR_MESSAGE, SET_CURRENT_USER, GET_DASHBOARD, STORE_VERIF, STORE_TRANSACTION } from './types';
import api from '../api';
import setToken from '../utils/setToken';
import jwt_decode from 'jwt-decode';

/* Register User
export const registerUser = (data) => (dispatch) => {
	api
		.post('/public/signup', data)
		.then((res) =>
			dispatch({
				type: ERR_MESSAGE,
				payload: res.data
			})
		)
		.catch((err) => {
			console.log(err.response.data);
			dispatch({
				type: ERR_MESSAGE,
				payload: err.response.data
			});
		});
};
*/
// Login
export const loginAdmin = (data) => (dispatch) => {
	api
		.post('/admin/signin', data)
		.then((res) => {
			console.log(res.data);

			const { token } = res.data;
			localStorage.setItem('token', token);
			setToken(token);

			const decode = jwt_decode(token);
			dispatch(setCurrentUser(decode));
		})
		.catch((err) => {
			console.log(err.response);
			dispatch({
				type: ERR_MESSAGE,
				payload: err.response.data
			});
		});
};

// Set Current User
export const setCurrentUser = (data) => {
	return {
		type: SET_CURRENT_USER,
		payload: data
	};
};

// Set Current User
export const logoutAdmin = () => (dispatch) => {
	localStorage.removeItem('token');
	setToken(false);
	dispatch(setCurrentUser({}));
};

export const getDashboard = () => (dispatch) => {
	api
		.get('/admin/dashboard')
		.then((res) =>
			dispatch({
				type: GET_DASHBOARD,
				payload: res.data.data
			})
		)
		.catch((err) =>
			dispatch({
				type: ERR_MESSAGE,
				payload: err.response.data
			})
		);
};

export const verifUser = (data) => (dispatch) => {
	api
		.put('/admin/verifyuser', data)
		.then((res) =>
			dispatch({
				type: STORE_VERIF,
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

export const verifTrans = (data) => (dispatch) => {
	api
		.put('/admin/transactionpaid', data)
		.then((res) =>
			dispatch({
				type: STORE_TRANSACTION,
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
