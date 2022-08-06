import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getListingsAsync = createAsyncThunk(
  "listings/getListingsAsync",
  async () => {
    const dbListings = await axios.get("api/listings");
    const listings = dbListings.data.listings;
    return { listings };
  }
);

export const listingsSlice = createSlice({
  name: "listings",
  initialState: [],
  reducers: {

  },
  extraReducers: {
    [getListingsAsync.fulfilled]: (state, action) => {
      const listings = action.payload.listings;
      return listings;
    },
  },
});

// export const { } = listingsSlice.actions;
export default listingsSlice.reducer;