// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import functionReducer from './reducers';

export default configureStore({
  reducer: {
    function: functionReducer,
  },
})