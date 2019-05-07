import {
	ADD_PASSWORD_LOADING,
	ADD_PASSWORD_SUCCESS,
	ADD_PASSWORD_FAILED
} from "../../constants/passwords";
import { passwordController } from "../../../controllers/index";

function createPasswordLoading() {
	return {
		type: ADD_PASSWORD_LOADING
	};
}

function createPasswordSuccess(dataAfterCreate) {
	return {
		type: ADD_PASSWORD_SUCCESS,
		payload: dataAfterCreate
	};
}

function createPasswordFailed(error) {
	return {
		type: ADD_PASSWORD_FAILED,
		payload: error
	};
}

function createPasswordAction(userUid, passwordObj) {
	return dispatch => {
		dispatch(createPasswordLoading());
		passwordController
			.createPasswords(userUid, passwordObj)
			.then(() => {
				return passwordController.getAllPasswords(userUid);
			})
			.then(dataAfterCreate => {
				console.log('ini data after create',dataAfterCreate)
				dispatch(createPasswordSuccess(dataAfterCreate));
			})
			.catch(err => {
				dispatch(createPasswordFailed(err));
			});
	};
}

export {
	createPasswordAction,
	createPasswordFailed,
	createPasswordSuccess,
	createPasswordLoading
};
