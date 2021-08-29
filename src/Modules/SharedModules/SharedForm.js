import { useSelector } from 'react-redux';

function SharedForm(props) {
  const { formValue } = props;
  const dropdownData = useSelector((state) => state.roomReducer.rooms);

  return (
    <>
      <div className='mb16'>
        <label id='date'>Room: </label>
        <select value={formValue.room} onChange={(e) => props.handleChange(e, 'room')}>
          <option>Select Room</option>
          {dropdownData?.length &&
            dropdownData.map((item, index) => (
              <option key={'Room' + item + index} value={item}>
                {item}
              </option>
            ))}
        </select>
      </div>
      <div className='mb16'>
        <label id='date'>Date: </label>
        <input
          type='date'
          htmlFor='date'
          value={formValue.bookdate}
          onChange={(e) => props.handleChange(e, 'bookdate')}
          placeholder='Pick a Date'
          min={new Date().setHours(0, 0, 0)}
        />
      </div>
    </>
  );
}

export default SharedForm;
