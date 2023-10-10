import React, { useRef } from 'react'
import { Pie, getElementAtEvent } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

const PieChart = ({ chartData }) => {
    const chartRef = useRef(null)
    const onClick = (e) => {
        console.log(e)
    }

    const options = {

    }


    return (
        <div>
            <Pie
                data={chartData}
                options={options}
                onClick={onClick}
            />
        </div>
    )
}


export default PieChart