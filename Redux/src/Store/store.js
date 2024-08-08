import { configureStore } from '@reduxjs/toolkit';
import countdownReducer from '../Reducers/reducers'; 

const store = configureStore({
  reducer: {
    countdown: countdownReducer,
  },
});

export default store;
