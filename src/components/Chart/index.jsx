import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux'
import { getByCountry } from '../../api'
import { getByCountryData } from '../../redux/covid19Slice'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart = ({ country }) => {

    /* const [covidDatas, setCovidDatas] = useState([]); */

    const dispatch = useDispatch();

    const covidData = useSelector(state => state.covid.covidData);
    const selectCountry = useSelector(state => state.covid.selectCountry)

    useEffect(() => {
        console.log("chart render edildi");
        dispatch(getByCountryData(selectCountry));
        console.log("secilen ulke", selectCountry);
    }, [selectCountry, dispatch]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Covid 19 Verileri',
            },
        },
    };

    const labels = covidData.map(date => moment(date.Date).format('L'));

    const data = {
        labels,
        datasets: [
            {
                label: 'Ölüm',
                data: covidData.map(veri => veri.Deaths),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Vaka',
                data: covidData.map(veri => veri.Confirmed),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'İyileşen',
                data: covidData.map(veri => veri.Recovered),
                borderColor: '	rgb(34,139,34)',
                backgroundColor: 'rgba(34, 139, 34, 0.5)',
            }
        ],
    };




    return (
        <div className='text-white'>
            <Line options={options} data={data} />
        </div>
    )
}

export default Chart