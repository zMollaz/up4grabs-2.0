import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './usersSlice';
import listingsReducer from './listingsSlice';
import likesReducer from './likesSlice';

export default configureStore({
  reducer: {
    users: usersReducer,
    listings: listingsReducer,
    likes: likesReducer,
  },
});
