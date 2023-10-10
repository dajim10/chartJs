import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

const BarChart = ({ chartData }) => {
    return (
        <div>
            <Bar
                data={chartData}
                options={{
                    onClick: function (evt, element) {
                        var activePoints = ChartJS.getElementAtEvent(evt, element);
                        var firstPoint = activePoints[0];
                        var label = chartData.labels[firstPoint.index];
                        var value = chartData.datasets[firstPoint.datasetIndex].data[firstPoint.index];
                        if (firstPoint !== undefined)
                            alert(label + ": " + value);
                    },
                    responsive: true,
                    scales: {
                        x: {
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }}
            />
        </div>
    )
}


export default BarChart