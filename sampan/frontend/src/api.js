import Axios from 'axios';

export default Axios.create({
	// baseURL: `http://localhost:8000/api/v1`
	baseURL: `https://sampanhorev1.herokuapp.com/api/v1`
});
