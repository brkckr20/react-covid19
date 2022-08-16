import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api.covid19api.com";

export const fetchCountries = createAsyncThunk("covid/fetchCountries", async () => {
    const res = await axios.get(`${API_URL}/countries`);
    return res.data
});

export const covid19Slice = createSlice({
    name: "covid",
    initialState: {
        countries: [],
        status: "idle",
        error: false,
    },
    reducers: {},
    extraReducers: {
        [fetchCountries.fulfilled]: (state, action) => {
            state.countries = action.payload
            state.status = "succeeded"
        },
        [fetchCountries.pending]: (state, action) => {
            state.status = "loading"
        },
        [fetchCountries.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message
        }
    }
});


export default covid19Slice.reducer;