import {
  configureStore,
  applyMiddleware,
  createAsyncThunk,
} from "@reduxjs/toolkit";
// import thunk from 'redux-thunk'
import taskReducer from "./tasks";


const store = configureStore(
  {
    reducer: {
      taskStore: taskReducer,
    },
  },
  applyMiddleware(createAsyncThunk)
);

export default store;
