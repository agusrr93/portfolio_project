import {
	DELETE_PASSWORDS_LOADING,
	DELETE_PASSWORDS_FAILED,
	DELETE_PASSWORDS_SUCCESS
} from "../../constants/passwords";
import { passwordController } from "../../../controllers/index";

function deletePasswordLoading() {
	return {
		type: DELETE_PASSWORDS_LOADING
	};
}

function deletePasswordFailed(error) {
	return {
		type: DELETE_PASSWORDS_FAILED,
		payload: error
	};
}

function deletePasswordSuccess(dataAfterDeletion) {
	return {
		type: DELETE_PASSWORDS_SUCCESS,
		payload: dataAfterDeletion
	};
}

function deletePasswordAction(userUid, arrOfPWDid) {
	return dispatch => {
		dispatch(deletePasswordLoading());
		passwordController
			.deletePasswords(userUid, arrOfPWDid)
			.then(() => {
				return passwordController.getAllPasswords(userUid);
			})
			.then(dataAfterDeletion => {
				dispatch(deletePasswordSuccess(dataAfterDeletion));
			})
			.catch(err => {
				dispatch(deletePasswordFailed(err));
			});
	};
}

export {
	deletePasswordLoading,
	deletePasswordFailed,
	deletePasswordSuccess,
	deletePasswordAction
};
