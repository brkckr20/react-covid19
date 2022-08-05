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
import faker from 'faker';

import { getByCountry } from '../../api'

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

    const [covidDatas, setCovidDatas] = useState([]);

    useEffect(() => {
        getByCountry(country).then(result => setCovidDatas(result));
    }, [country]);

    /*     const max = covidDatas && covidDatas.reduce(function (prev, current) {
            return (prev.y > current.y) ? prev : current
        }); */

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

    const labels = ['2019', '2020', '2021', '2022'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Ölüm',
                data: labels.map(() => faker.datatype.number({ min: -2000, max: 1000 })),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'İyileşme',
                data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };




    return (
        <div className='text-white'>
            <Line options={options} data={data} />
        </div>
    )
}

export default Chart