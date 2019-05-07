import Axios from 'axios';

const setToken = (token) => {
	token
		? (Axios.defaults.headers.common['Authorization'] = token)
		: delete Axios.defaults.headers.common['Authorization'];
};

export default setToken;
