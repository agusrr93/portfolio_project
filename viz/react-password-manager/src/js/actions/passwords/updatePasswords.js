import {
	UPDATE_PASSWORD_LOADING,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_FAILED
} from "../../constants/passwords";
import { passwordController } from "../../../controllers/index";

function updatePasswordLoading() {
	return {
		type: UPDATE_PASSWORD_LOADING
	};
}

function updatePasswordSuccess(dataAfterUpdate) {
	return {
		type: UPDATE_PASSWORD_SUCCESS,
		payload: dataAfterUpdate
	};
}

function updatePasswordFailed(error) {
	return {
		type: UPDATE_PASSWORD_FAILED,
		payload: error
	};
}

function updatePasswordAction(userUid, passwordId, passwordupdateObj) {
	return dispatch => {
		dispatch(updatePasswordLoading());
		passwordController
			.updatePasswords(userUid, passwordId, passwordupdateObj)
			.then(() => {
				return passwordController.getAllPasswords(userUid);
			})
			.then(dataAfterDeletion => {
				dispatch(updatePasswordSuccess(dataAfterDeletion));
			})
			.catch(err => {
				dispatch(updatePasswordFailed(err));
			});
	};
}

export {
	updatePasswordLoading,
	updatePasswordSuccess,
	updatePasswordFailed,
	updatePasswordAction
};
