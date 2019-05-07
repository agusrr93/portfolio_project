import firebase from "firebase/app";
import firebaseui from "firebaseui";
import { auth } from "./firebase";
// require("firebase/auth")

const connect=()=>{
	return new Promise((resolve, reject) => {
		auth.setPersistence(firebase.auth.Auth.Persistence.NONE)
		  .then(function() {
			let ui = firebaseui.auth.AuthUI.getInstance()

			if(!ui){
				ui= new firebaseui.auth.AuthUI(firebase.auth())
			}
			resolve(ui)
		  })
		  .catch(function(error) {
			reject(error)
		  });
	  })
}

export const uiConfig = {
	signInFlow:"popup",
	signInOptions:[
		firebase.auth.EmailAuthProvider.PROVIDER_ID,
		firebase.auth.GoogleAuthProvider.PROVIDER_ID
	]
};

export const ui = async () => {
	const firebaseConnect = await connect()
	return firebaseConnect
}
// export const ui = new firebaseui.auth.AuthUI(auth);
