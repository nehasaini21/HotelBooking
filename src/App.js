import { useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RoomBook from './Modules/RoomBook';
import CheckRoom from './Modules/CheckRoom';
import { getRoomsData } from './store/Rooms/actions';
import { useLocation } from 'react-router-dom';
import './App.css';

function App() {
  let dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location ? location : {};
  const splitLocation = pathname.split('/');

  useEffect(() => {
    dispatch(getRoomsData());
  }, [dispatch]);

  return (
    <div className='App'>
      <header>
        <h1>Hotel Booking</h1>
      </header>
      <div className='parent'>
        <div className='side'>
          <Link to='/' className={splitLocation[1] === '' ? 'active' : ''}>
            Home
          </Link>
          <Link to='/book' className={splitLocation[1] === 'book' ? 'active' : ''}>
            Add Booking
          </Link>
          <Link to='/checkRoom' className={splitLocation[1] === 'checkRoom' ? 'active' : ''}>
            Check Room
          </Link>
        </div>
        <div className='main'>
          <Switch>
            <Route path='/book'>
              <RoomBook />
            </Route>
            <Route path='/checkRoom'>
              <CheckRoom />
            </Route>
            <Route path='/'>
              <RoomBook />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
