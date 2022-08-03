import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Header = () => {

    const [country, setCountry] = useState("");
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const getCountries = async () => {
            const { data } = await axios.get("https://api.covid19api.com/countries");
            setCountries(data);
        }
        getCountries();
    }, [country])

    return (
        <div
            className='row mt-4'
        >
            <div className="col-lg-2">
                <div>
                    <img width="50%" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/SARS-CoV-2_without_background.png/765px-SARS-CoV-2_without_background.png" alt="covid 19 logo" />
                </div>
            </div>
            <div className="col-lg-10 d-flex align-items-center">
                <select className="custom-select custom-select-lg" onChange={(e) => setCountry(e.target.value)}>
                    {
                        countries && countries.sort().map(c => (
                            <option key={c.ISO2} value={c.Slug}>{c.Country}</option>
                        ))
                    }

                </select>
                <span className='text-white'>{country}</span>
            </div>

        </div>
    )
}

export default Header