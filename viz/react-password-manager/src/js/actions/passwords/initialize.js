import {
	INITIALIZE_LOADING,
	INITIALIZE_SUCCESS,
	INITIALIZE_FAILED
} from "../../constants/passwords";
import { passwordController } from "../../../controllers";

function initializeLoading() {
	return {
		type: INITIALIZE_LOADING
	};
}

function initializeSuccess(dataAfterInitialize) {
	return {
		type: INITIALIZE_SUCCESS,
		payload: dataAfterInitialize
	};
}

function initializefailed(error) {
	return {
		type: INITIALIZE_FAILED,
		payload: error
	};
}

function initializeAction(useruid) {
	return dispatch => {
		dispatch(initializeLoading());
		passwordController
			.initialize(useruid)
			.then(() => {
				return passwordController.getAllPasswords(useruid);
			})
			.then(dataAfterInitialize => {
				dispatch(initializeSuccess(dataAfterInitialize));
			})
			.catch(err => {
				dispatch(initializefailed(err));
			});
	};
}

export { initializeLoading, initializeSuccess, initializefailed, initializeAction };
