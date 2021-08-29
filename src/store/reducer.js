import { combineReducers } from 'redux';
import roomReducer from './Rooms/reducer';
import bookingReducer from './booking/reducer';

export default combineReducers({
  roomReducer,
  bookingReducer,
});
