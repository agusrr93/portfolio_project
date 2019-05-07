import { LOGIN, LOGOUT } from "../../constants/userlogin";

function login(userUid) {
	return {
		type: LOGIN,
		payload: userUid
	};
}

function logout() {
	return {
		type: LOGOUT
	};
}

export { login, logout };
