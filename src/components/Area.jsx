import React, { useState, useEffect } from 'react'

import BarChart from './BarChart';

const Area = () => {

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
            <BarChart data={data} />
            {/* </div> */}



        </div>
    )
}

export default Area