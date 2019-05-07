import { GET_TRANSACTION, ERR_MESSAGE } from './types';
import api from '../api';

export const getTransaction = () => (dispatch) => {
	api
		.get('admin/transaction')
		.then((res) =>
			dispatch({
				type: GET_TRANSACTION,
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
