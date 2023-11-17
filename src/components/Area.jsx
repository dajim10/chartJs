import React, { useState, useEffect } from 'react'

import BarChart from './BarChart';
// import exportToExcel from './ExportToXls';
// import ExportToExcel from './ExportToXls';

const Area = ({ counter }) => {

    const [data, setData] = useState([]);
    const [campus, setCampus] = useState([]);


    useEffect(() => {
        fetch('https://ars.rmutsv.ac.th/json')
            .then(response => response.json())
            .then(data => {
                setData(data.university)
            })
            .catch(error => console.log(error))

    }
        , []);


    return (
        <div className='container-fluid'>
            {/* <div className="container mt-3"> */}
            <BarChart data={data} counter={counter} />
            {/* </div> */}
            {/* <ExportToExcel data={data} filename='exported-data' /> */}

        </div>
    )
}

export default Area