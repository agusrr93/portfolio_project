export function convertObjectToArrayWithId(Obj) {
	let array = [];
	for (let key in Obj) {
		array.push({ id: key, ...Obj[key] });
	}
	return array;
}
