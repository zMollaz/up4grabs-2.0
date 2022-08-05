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
    getFilteredListings: (state, action) => {
      console.log("listings slice", action.payload === "");
      // return state.filter((listing) => {
      const filtered = state.filter((listing) => {
        if (action.payload === "") {
          return true;
        } else {
          return listing.title
            .toLowerCase()
            .includes(action.payload.toLowerCase());
        }
      });
      return filtered;
    },
  },
  extraReducers: {
    [getListingsAsync.fulfilled]: (state, action) => {
      const listings = action.payload.listings;
      return listings;
    },
  },
});

export const { getFilteredListings } = listingsSlice.actions;
export default listingsSlice.reducer;
