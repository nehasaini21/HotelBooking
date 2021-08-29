import * as actionTypes from './actionTypes';

const initialState = {
  rooms: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ROOMS:
      return { ...state, rooms: action.data };
    default:
      return state;
  }
};

export default reducer;
