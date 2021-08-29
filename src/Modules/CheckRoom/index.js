import { useState, useCallback } from 'react';
import SharedForm from '../SharedModules/SharedForm';
import { checkBooking } from '../../store/booking/actions';

import { useDispatch } from 'react-redux';

function RoomBook(props) {
  let dispatch = useDispatch();
  const [formValue, setFormValues] = useState({
    surname: '',
    bookdate: null,
    room: null,
  });
  const [error, setError] = useState('');
  const [errorFlag, setErrorFlag] = useState(0);

  const checkRoom = useCallback(() => {
    const { bookdate, room } = formValue;
    if (!bookdate || !room) {
      setError('Please fill data in all the fields.');
      return;
    }

    const payload = {
      room: formValue.room,
      bookingdate: formValue.bookdate,
    };
    const isBooked = dispatch(checkBooking(payload));
    setErrorFlag(isBooked ? 1 : 2);
  }, [dispatch, formValue]);

  const handleChange = useCallback(
    (e, name) => {
      setError('');
      setFormValues({ ...formValue, [name]: e.target.value });
    },
    [formValue],
  );

  return (
    <div>
      <h3>Check Room</h3>
      <hr></hr>
      {!!error && <p style={{ color: 'red' }}>{error}</p>}
      <form>
        <SharedForm formValue={formValue} handleChange={handleChange} />
        <div className='btnContainer'>
          <div className='btnInnerDiv'>
            <button type='button' onClick={() => checkRoom()}>
              Check Room
            </button>
            {errorFlag ? (
              <div className={errorFlag === 1 ? 'checkClass clrred' : 'checkClass clrgreen'}>
                {errorFlag === 1 ? <span>&#10006;</span> : <span>&#10004;</span>}
              </div>
            ) : null}
            <div className="clear"></div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RoomBook;
