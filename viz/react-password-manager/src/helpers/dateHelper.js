import moment from "moment";

export function getNewDateString() {
	return moment(new Date().toISOString()).format(" D MMMM YYYY, HH:mm ");
}
