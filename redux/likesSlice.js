import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getLikesAsync = createAsyncThunk(
  "likes/getLikesAsync",
  async (payload) => {
    const dbLikes = await axios.get("/api/likes");
    const likes = dbLikes.data.likes;
    return { likes };
  }
);

export const likesSlice = createSlice({
  name: "likes",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getLikesAsync.fulfilled]: (state, action) => {
      const likes = action.payload.likes;
      return likes;
    },
  },
});

// export const {} = favoritesSlice.actions;
export default likesSlice.reducer;
