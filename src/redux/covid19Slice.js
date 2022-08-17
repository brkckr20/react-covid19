import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api.covid19api.com";

export const fetchCountries = createAsyncThunk("covid/fetchCountries", async () => {
    const res = await axios.get(`${API_URL}/countries`);
    return res.data
});

export const getByCountryData = createAsyncThunk("covid/getByCountryData", async (country = 'turkey') => {
    const res = await axios.get(`${API_URL}/dayone/country/${country}`);
    return res.data;
})

export const covid19Slice = createSlice({
    name: "covid",
    initialState: {
        countries: [],
        status: "idle",
        error: false,
        selectCountry: "turkey",
        isLoading: false,
        covidData: []
    },
    reducers: {
        changeSelectCountry: (state, action) => {
            state.selectCountry = action.payload
        }
    },
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
        },
        /* fetch data */
        [getByCountryData.pending]: (state, action) => {
            state.isLoading = true
        },
        [getByCountryData.fulfilled]: (state, action) => {
            state.covidData = action.payload
            state.isLoading = false
        }
    }
});

export const { changeSelectCountry } = covid19Slice.actions

export default covid19Slice.reducer;