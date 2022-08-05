import axios from "axios";

const api = "https://api.covid19api.com"

//https://api.covid19api.com/dayone/country/south-africa

export const getCountries = async () => {
    const { data } = await axios.get(`${api}/countries`);
    return data;
}

export const getByCountry = async (country) => {
    const { data } = await axios.get(`${api}/dayone/country/${country}`);
    return data;
}