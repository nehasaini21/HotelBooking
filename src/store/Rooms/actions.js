import * as actionTypes from './actionTypes';
import { rooms as mockRoomData } from './__mocks__/room';

export const dispatchRoomBooking = (response) => ({
  type: actionTypes.ADD_ROOMS,
  data: response,
});

// TODO: hit api to get rooms data.
export const getRoomsData = () => (dispatch) => {
  dispatch(dispatchRoomBooking(mockRoomData));
};
