import {createSlice} from '@reduxjs/toolkit';
import prisma from "../lib/prisma";

const dbUsers = await prisma.user.findMany();
const users = JSON.parse(JSON.stringify(dbUsers));
// console.log(111, users);

export const usersSlice = createSlice({
  name: 'users',
  initialState: users,
  reducers: {},
})

export default usersSlice.reducer;