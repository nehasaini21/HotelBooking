import { useState, useEffect, useCallback } from 'react';
import SharedForm from '../SharedModules/SharedForm';
import { addRoomBookingAction, addBookingError } from '../../store/booking/actions';

import { useDispatch, useSelector } from 'react-redux';
import { getUniqueIdForBooking } from '../../utils/strings';

const initialFormValues = {
  surname: '',
  bookdate: '',
  room: 0,
};

function RoomBook(props) {
  let dispatch = useDispatch();
  const [formValue, setFormValues] = useState(initialFormValues);
  const [error, setError] = useState('');
  const bookingError = useSelector((state) => state.bookingReducer.error);
  const bookings = useSelector((state) => state.bookingReducer.bookings);

  useEffect(() => {
    dispatch(addBookingError(''));
  }, [dispatch]);

  useEffect(() => {
    const bookingId = getUniqueIdForBooking(formValue.bookdate, formValue.room);
    if (bookings[bookingId]) {
      setError('Room booking done successfully.');
      setFormValues({ ...initialFormValues });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookings]);

  const addBooking = useCallback(() => {
    const { bookdate, surname, room } = formValue;
    if (!bookdate || !surname || !room) {
      setError('Please fill data in all the fields.');
      return;
    } else if (new Date(bookdate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
      setError('Booking date should be equal or greater than current date');
      return;
    }
    const payload = {
      user: formValue.surname,
      room: formValue.room,
      bookingdate: formValue.bookdate,
    };
    setError('');
    dispatch(addRoomBookingAction(payload));
  }, [formValue, dispatch]);

  const handleChange = useCallback(
    (e, name) => {
      setFormValues({ ...formValue, [name]: e.target.value });
    },
    [formValue],
  );

  return (
    <div>
      <h3>Add Booking</h3>
      <hr></hr>
      {!!(error || bookingError) && (
        <p className={error.includes('successfully') ? 'clrgreen' : 'clrred'}>
          {error || bookingError}
        </p>
      )}
      <form>
        <div className='mb16'>
          <label id='surname'>Surname: </label>
          <input
            htmlFor='surname'
            value={formValue.surname}
            onChange={(e) => handleChange(e, 'surname')}
          />
        </div>
        <SharedForm formValue={formValue} handleChange={handleChange} />
        <div className='btnContainer'>
          <div className='btnInnerDiv'>
            <button type='button' onClick={() => addBooking()}>
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RoomBook;
