import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = () => {
    const [state, setState] = useState({
        series: [44, 55, 41, 17, 15],
        options: {
            chart: {
                type: 'donut',
            },
            labels: ['Cardiology', 'Dentistry', 'Orthopedic', 'Pulmonology', 'Gynecology'], // Labels for each section of the donut
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            ],
            legend: {
                position: 'top', // Position of the legend
                horizontalAlign: 'center', // Horizontal alignment
                labels: {
                    colors: '#25307F', // Change legend label color
                },
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '60%', // Adjust the size of the donut hole
                    }
                }
            },
        },
    });

    return (
        <div style={{height:'18.1rem'}}>
            <div id="chart">
                <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="donut"
                    height={300} // Adjust the height of the chart
                />
            </div>
        </div>
    );
}

export default DonutChart;
