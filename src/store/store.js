import { createStore } from 'redux';
import auth from './reducers';

const initial = {
  auth: {
    isLoggedIn: false,
  },
  cpuStats: {
    current: 0,
    seconds: [],
    minutes: [],
    hours: []
  }
}

const store = createStore(auth, initial);

export default store;