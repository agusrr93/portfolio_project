import { combineReducers } from "redux";
import PasswordReducer from "./passwords";
import LoginReducer from "./userlogin";

export default combineReducers({
	passwords: PasswordReducer,
	login: LoginReducer
});
