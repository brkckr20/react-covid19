import React, { useEffect/* , useState */ } from 'react'
//import { getCountries } from '../../api'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCountries } from '../../redux/covid19Slice'


const Header = ({ /* country, */ setCountry }) => {

    /* const [countries, setCountries] = useState([]); */
    const allCountries = useSelector(state => state.covid.countries);
    const status = useSelector(state => state.covid.status);


    const dispatch = useDispatch();

    useEffect(() => {
        /* getCountries().then(data => setCountries(data)); */
        dispatch(fetchCountries())
        console.log(allCountries);
    }, [dispatch])

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
                        allCountries && allCountries.map(c => (
                            status === 'loading' ? (
                                <option key={c.ISO2}>Yükleniyor</option>
                            ) : (
                                <option key={c.ISO2} value={c.Slug}>{c.Country}</option>
                            )

                        ))
                    }

                </select>
                {

                }
            </div>

        </div>
    )
}

export default Header