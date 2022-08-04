import axios from "axios";

const api = "https://api.covid19api.com"

export const getCountries = async () => {
    const { data } = await axios.get(`${api}/countries`);
    return data;
}

export const getByCountry = async (country) => {
    const { data } = await axios.get(`${api}/country/${country}`);
    return data;
}