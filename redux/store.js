import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './usersSlice';
import listingsReducer from './listingsSlice';

export default configureStore({
  reducer: {
    users: usersReducer,
    listings: listingsReducer,
  },
});
