import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = () => {
    const [state, setState] = useState({
        series: [30, 15, 10, 15, 30],
        options: {
            chart: {
                type: 'donut',
            },
            labels: ['Cardiology', 'Dentistry', 'Orthopedic', 'Pulmonology', 'Gynecology'], // Labels for each section of the donut
            colors: ["#F14400", "#2E823B", "#5461BE", "#66A7B4", "#EAA000"], // Custom colors
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        // legend: {
                        //     position: 'bottom'
                        // }
                    }
                }
            ],
            legend: {
                position: 'top', // Position of the legend
                horizontalAlign: 'center', // Horizontal alignment
                // labels: {
                //     colors: '#25307F', // Change legend label color
                // },
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '60%', // Adjust the size of the donut hole
                    }
                }
            },
            tooltip: {
                enabled: false, // Disable tooltip
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
