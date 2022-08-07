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

// export const addListingAsync = createAsyncThunk("listings/addListingsAsync", async(payload) => {
//   const resp = await fetch("/api/new", {
//     body: JSON.stringify({ state, user, startDate }),
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     method: "POST",
//   });

//   const newListing = await response.json();

// })

export const listingsSlice = createSlice({
  name: "listings",
  initialState: [],
  reducers: {
    addListing: (state, action) => {
      // return [action.payload.newListing, ...state];
      state.unshift(action.payload.newListing);
    }
  },
  extraReducers: {
    [getListingsAsync.fulfilled]: (state, action) => {
      const listings = action.payload.listings;
      return listings;
    },
  },
});

export const { addListing } = listingsSlice.actions;
export default listingsSlice.reducer;
