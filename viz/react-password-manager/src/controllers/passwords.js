import { db } from "../configs/firebase";
import { getNewDateString } from "../helpers/dateHelper";
import { convertObjectToArrayWithId } from "../helpers/dataHelper";

function initialize(userUid) {
	let newDate = getNewDateString();
	return new Promise((resolve, reject) => {
		db.ref("users/" + userUid + "/passwords")
			.once("value")
			.then(data => {
				if (!data.val()) {
					return db
						.ref("users/")
						.child(userUid)
						.set({
							passwords: {
								0: {
									url: "URL",
									username: "USERNAME",
									password: "PASSWORD",
									createdAt: newDate,
									updatedAt: newDate
								}
							}
						});
				}
			})
			.then(response => {
				resolve(response);
			})
			.catch(err => {
				reject(err);
			});
	});
}

function createPasswords(userUid, passwordObj) {
	return new Promise((resolve, reject) => {
		let newDate = getNewDateString();
		getAllPasswords(userUid)
			.then(passwords => {
				let keys = passwords.length ? passwords.map(x => x.id) : ["0"];
				let lastIndex = keys.pop();
				resolve(
					db
						.ref(`users/${userUid}/passwords/${+lastIndex + 1}`)
						.set({ ...passwordObj, createdAt: newDate, updatedAt: newDate })
				);
			})
			.catch(err => {
				reject(err);
			});
	});
}

function getAllPasswords(userUid) {
	return new Promise((resolve, reject) => {
		db.ref("users/" + userUid + "/passwords")
			.once("value")
			.then(data => {
				resolve(convertObjectToArrayWithId(data.val()).slice(1));
			})
			.catch(err => {
				reject(err);
			});
	});
}

function updatePasswords(userUid, passwordId, passwordUpdateObj) {
	return new Promise((resolve, reject) => {
		let newDate = getNewDateString();
		getAllPasswords(userUid)
			.then(data => {
				let keys = data.map(x => x.id);
				if (keys.includes(String(passwordId))) {
					return db
						.ref(`users/${userUid}/passwords/${passwordId}/`)
						.update({ ...passwordUpdateObj, updatedAt: newDate });
				} else {
					reject("No Such Password");
				}
			})
			.then(response => {
				resolve(response);
			})
			.catch(err => {
				reject(err);
			});
	});
}

function getSelectedPasswords(userUid,passId) {
	return new Promise((resolve, reject) => {
		db.ref("users/" + userUid + "/passwords/"+passId)
			.once("value")
			.then(data => {
				// resolve(convertObjectToArrayWithId(data.val()).slice(1));
				resolve(data.val())
			})
			.catch(err => {
				reject(err);
			});
		});
}

function deletePasswords(userUid, passwordIds) {
	let promiseArr = passwordIds.map(x => {
		return db.ref(`users/${userUid}/passwords/${x}`).set(null);
	});
	return Promise.all(promiseArr);
}

export default {
	initialize,
	createPasswords,
	getAllPasswords,
	updatePasswords,
	deletePasswords
};
