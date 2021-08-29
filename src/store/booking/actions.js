import { getUniqueIdForBooking } from '../../utils/strings';
import * as actionTypes from './actionTypes';

export const addBookingDetails = (response) => ({
  type: actionTypes.ADD_BOOKING,
  data: response,
});
export const addBookingError = (response) => ({
  type: actionTypes.ADD_BOOKING_ERROR,
  data: response,
});

export const checkBooking = (payload) => (dispatch, getState) => {
  const id = getUniqueIdForBooking(payload.bookingdate, payload.room);
  const {
    bookingReducer: { bookings },
  } = getState();
  if (bookings[id]) {
    return true;
  }
  return false;
};

export const addRoomBookingAction = (payload) => (dispatch, getState) => {
  const id = getUniqueIdForBooking(payload.bookingdate, payload.room);
  if (checkBooking(payload)(dispatch, getState)) {
    dispatch(addBookingError('Booking already exists.'));
    return;
  }
  dispatch(addBookingError(''));
  dispatch(addBookingDetails({ id, ...payload }));
};
