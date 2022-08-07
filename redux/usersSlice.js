import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsersAsync = createAsyncThunk(
  "users/getUsersAsync",
  async () => {
    const dbUsers = await axios.get("http://localhost:3000/api/users");
    // console.log(111, dbUser);
    const users = JSON.parse(JSON.stringify(dbUsers));
    return { users };
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    getUsers: (state, action) => {
      // return action.payload.users;
    },
  },
  extraReducers: {
    [getUsersAsync.fulfilled]: (state, action) => {
      const users = action.payload.users.data.users;
      return users;
    },
  },
});

export const { getUsers } = usersSlice.actions;

export default usersSlice.reducer;
