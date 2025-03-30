import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = () => {
    const [state, setState] = useState({
        series: [30, 15, 10, 15, 30],
        options: {
            chart: {
                type: 'donut',
            },
            labels: ["Cardiology", "Dentistry", "Orthopedic", "Pulmonology", "Gynecology"], // Add meaningful labels
            colors: ["#F14400", "#2E823B", "#5461BE", "#66A7B4", "#EAA000"], // Custom colors
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                    }
                }
            ],
            legend: {
                show: true, // Enable legend
                position: "top", // Position: 'top', 'right', 'bottom', 'left'
                fontSize: "10px",
                labels: {
                    colors: "#333", // Legend text color
                    useSeriesColors: false, // Use the same colors as the chart series
                }
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%', // Adjust the size of the donut hole
                    }
                }
            },
            tooltip: {
                enabled: false, // Disable tooltip
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return Math.round(val) + "%"; // Ensures whole numbers without decimals
                },
                style: {
                    fontSize: "12px",
                },
            },
        },
    });

    return (
        <div style={{ height: "18.1rem" }}>
            <div id="chart">
                <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="donut"
                    height={250} // Adjust the height of the chart
                />
            </div>
        </div>
    );
}

export default DonutChart;
