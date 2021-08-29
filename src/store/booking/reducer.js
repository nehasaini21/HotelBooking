import * as actionTypes from './actionTypes';

const initialState = {
  error: '',
  bookings: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_BOOKING: {
      const { id } = action.data;
      const { bookings } = state;
      return { ...state, bookings: { ...bookings, [id]: action.data } };
    }
    case actionTypes.ADD_BOOKING_ERROR: {
      return { ...state, error: action.data };
    }
    default:
      return state;
  }
};

export default reducer;
