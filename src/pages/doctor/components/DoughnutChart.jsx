import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Label,
} from "recharts";

const DoughnutChart = ({ data, height = 240 }) => {
  // Track which slice is hovered
  const [activeIndex, setActiveIndex] = useState(null);

  // Total for center label
  const total = data.reduce((sum, d) => sum + d.value, 0);

  // Handlers to set/clear active index
  const onPieEnter = (_, idx) => setActiveIndex(idx);
  const onPieLeave = () => setActiveIndex(null);

  // Custom shape for the active (hovered) slice
  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      percent,
        payload
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
          cy={cy}
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
          style={{ fontSize: 9, fontWeight: "bold", fill: payload.inColor || "#ffffff" }}
        >
          {Math.round(percent * 100)}%
        </text>
      </g>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        zIndex: "1 !important", // ensure it appears above other content
      }}
    >
      {/* Left: Chart */}
      <div style={{ width: "20vw" }}>
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              startAngle={230}
              endAngle={-35}
              innerRadius={65}
              outerRadius={100}
              cornerRadius={8}
              paddingAngle={2}
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {data.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}

              {/* Center label with custom SVG + total */}
              <Label
                position="center"
                content={({ viewBox }) => {
                  const { cx, cy } = viewBox;
                  return (
                    <g>
                      {/* SVG Icon */}
                      <svg
                        x={cx - 16.5}
                        y={cy - 20}
                        width="33"
                        height="22"
                        viewBox="0 0 33 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="33" height="22" rx="5" fill="#E9F0EC" />
                        <mask
                          id="mask0"
                          style={{ maskType: "alpha" }}
                          maskUnits="userSpaceOnUse"
                          x="5"
                          y="0"
                          width="22"
                          height="22"
                        >
                          <rect x="5" width="22" height="22" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0)">
                          <path
                            d="M8.11634 16.5L6.83301 15.2167L11.6913 10.3583C12.2261 9.82361 12.8754 9.55625 13.6393 9.55625C14.4031 9.55625 15.0525 9.82361 15.5872 10.3583L16.6413 11.4125C16.8247 11.5958 17.0424 11.6875 17.2945 11.6875C17.5465 11.6875 17.7643 11.5958 17.9476 11.4125L22.0268 7.33333H19.6663V5.5H25.1663V11H23.333V8.63958L19.2309 12.7188C18.6962 13.2535 18.0469 13.5208 17.283 13.5208C16.5191 13.5208 15.8698 13.2535 15.3351 12.7188L14.258 11.6417C14.09 11.4736 13.8761 11.3896 13.6163 11.3896C13.3566 11.3896 13.1427 11.4736 12.9747 11.6417L8.11634 16.5Z"
                            fill="#25307F"
                          />
                        </g>
                      </svg>
                      {/* Total number */}
                      <text
                        x={cx}
                        y={cy + 25}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{
                          fontSize: 22,
                          fontWeight: "bold",
                          fill: "#2D3179",
                        }}
                      >
                        {new Intl.NumberFormat().format(total)}
                      </text>
                    </g>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Right: Legend */}
      <div
        style={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          paddingLeft: "20px",
        }}
      >
        {data.map((entry, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "1px",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                minWidth: 16,
                height: 16,
                backgroundColor: entry.color,
                borderRadius: 4,
              }}
            />
            <span
              style={{
                color: "#2D3179",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoughnutChart;
