import { combineReducers } from 'redux';
import authReducers from './authReducers';
import categoryReducers from './categoryReducers';
import eventReducers from './eventReducers';
import messageReducers from './messageReducers';
import cityReducers from './cityReducers';
import trainingReducers from './trainingReducers';
import sliderReducers from './sliderReducers';
import transactionReducers from './transactionReducers';

export default combineReducers({
	auth: authReducers,
	category: categoryReducers,
	message: messageReducers,
	training: trainingReducers,
	event: eventReducers,
	city: cityReducers,
	slider: sliderReducers,
	transaction: transactionReducers
});
