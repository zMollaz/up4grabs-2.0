import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getListingsAsync = createAsyncThunk(
  "listings/getListingsAsync",
  async () => {
    const listings = await axios.get("api/listings");
    return { listings };
  }
);
export const listingsSlice = createSlice({
  name: "listings",
  initialState: [],
  reducers: {
    getFilteredListings: (state, action) => {
      
    }
  },
  extraReducers: {
    [getListingsAsync.fulfilled]: (state, action) => {
      const listings = action.payload.listings.data.listings;
      return listings;
    },
  },
});

// export const {} = listingsSlice.actions;
export default listingsSlice.reducer;
