import React, {useState} from 'react'
import CommonPanel from "../components/CommonPanel.jsx";
import style from "./Inventory.module.scss";
import {useNavigate} from "react-router-dom";
import {Cell, Pie, PieChart, ResponsiveContainer, Sector} from "recharts";

const inventoryData = [
    { name: 'Medicines',         value: 200, percentage: '15' },
    { name: 'Surgical tools',    value: 150, percentage: '29'  },
    { name: 'Devices',           value: 100, percentage: '19'  },
    { name: 'Emergency Supplies',value:  105, percentage: '29'  }
];

/* A simple color palette for the Pie chart slices */
const COLORS = ['#25307F', '#5461BE', '#586EB4', '#DAE4FF'];

const Inventory = () => {
    const navigate = useNavigate()

    const [activeIndex, setActiveIndex] = useState(null);

    const onPieEnter = (_, idx) => setActiveIndex(idx);
    const onPieLeave = () => setActiveIndex(null);

    const renderActiveShape = (props) => {
        const {
            cx, cy,
            innerRadius, outerRadius,
            startAngle, endAngle,
            fill, percent
        } = props;

        const RADIAN = Math.PI / 180;
        // midpoint angle of this slice
        const midAngle = (startAngle + endAngle) / 2;
        // radius halfway between inner & outer
        const labelRadius = innerRadius + (outerRadius - innerRadius) / 2;
        // compute label coords
        const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
        const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);

        return (
            <g>
                {/* Popped-out slice */}
                <Sector
                    cx={cx}
                    cy={cy -3}
                    innerRadius={innerRadius + 2}
                    outerRadius={outerRadius + 7}
                    startAngle={startAngle}
                    cornerRadius={8}
                    endAngle={endAngle}
                    fill={fill}
                />
                {/* Percentage inside the slice */}
                <text
                    x={x}
                    y={y - 3}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{ fontSize: 9, fontWeight: 'bold', fill: '#ffffff' }}
                >
                    {Math.round(percent * 100)}%
                </text>
            </g>
        );
    };

    return (
        <>
            <div style={{
                position: 'fixed',
                zIndex: 1000,
                top: 0,
                width: '77.6vw',
                background: " #F1F1F1",
                paddingBottom: '1rem'
            }}>
                <CommonPanel/>
            </div>

            <div className={style.parent}>
                <div className={style.head}>
                    <div className={style.headingSection}>
                        <div className={style.heading}>
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 26 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() => navigate(-1)}
                                style={{cursor: 'pointer'}}
                            >
                                <g clipPath="url(#clip0_3883_12162)">
                                    <path
                                        d="M18.0054 3.23919C17.4746 2.70836 16.6188 2.70836 16.0879 3.23919L7.08543 12.2417C6.66293 12.6642 6.66293 13.3467 7.08543 13.7692L16.0879 22.7717C16.6188 23.3025 17.4746 23.3025 18.0054 22.7717C18.5363 22.2409 18.5363 21.385 18.0054 20.8542L10.1621 13L18.0163 5.14586C18.5363 4.62586 18.5363 3.75919 18.0054 3.23919Z"
                                        fill="black"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3883_12162">
                                        <rect width="26" height="26" rx="13" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            <h4>Cardiology Inventory</h4>
                        </div>
                    </div>
                </div>

                <div className={style.inventoryGrid}>
                    {Array(10).fill(0).map((_, index) => {
                        if (index === 9) {
                            return (
                                <React.Fragment key={index}>
                                    {/* Pie Graph goes in column 4, row 1 */}
                                    <div className={style.graphCardWrapper}>
                                        <div className={style.graphCard}>
                                            <div className={style.graphTitle}>Category Graph</div>
                                            <div className={style.cardContent}>
                                                <ResponsiveContainer width="100%" height={270}>
                                                    <PieChart>
                                                        <Pie
                                                            data={inventoryData}
                                                            dataKey="value"
                                                            nameKey="name"
                                                            cx="50%"
                                                            cy="50%"
                                                            innerRadius={70}
                                                            outerRadius={105}
                                                            paddingAngle={4}
                                                            cornerRadius={8}
                                                            activeIndex={activeIndex}
                                                            activeShape={renderActiveShape}
                                                            onMouseEnter={onPieEnter}
                                                            onMouseLeave={onPieLeave}
                                                        >
                                                            {inventoryData.map((entry, index) => (
                                                                <Cell key={`slice-${index}`}
                                                                      fill={COLORS[index % COLORS.length]}/>
                                                            ))}
                                                        </Pie>
                                                    </PieChart>
                                                </ResponsiveContainer>

                                                <div className={style.totalLabel}>
                                                    <span>Total</span>
                                                    <h2>33K</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 10th card (index 9), now rendered below the graph */}
                                    <div className={style.card} style={{gridColumn: "4"}}>
                                        <div className={style.circle}></div>
                                        <div>
                                            <div className={style.label}>CATEGORY NAME</div>
                                            <div className={style.amount}>40k (49%)</div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        }

                        return (
                            <div key={index} className={style.card}>
                                <div className={style.circle}></div>
                                <div>
                                    <div className={style.label}>CATEGORY NAME</div>
                                    <div className={style.amount}>40k (49%)</div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>

        </>
    )
}
export default Inventory
