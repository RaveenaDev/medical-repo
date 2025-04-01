import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Cardiology", value: 30, color: "#F14400" },
  { name: "Gynecology", value: 30, color: "#EAA000" },
  { name: "Dentistry", value: 15, color: "#2E823B" },
  { name: "Orthopedic", value: 10, color: "#5461BE" },
  { name: "Pulmonology", value: 15, color: "#66A7B4" },
];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const labelRadius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const insideX = cx + labelRadius * Math.cos(-midAngle * RADIAN);
  const insideY = cy + labelRadius * Math.sin(-midAngle * RADIAN);

  // Connector Line - Long inside, Short outside
  const startX = cx + outerRadius * Math.cos(-midAngle * RADIAN);
  const startY = cy + outerRadius * Math.sin(-midAngle * RADIAN);
  const endX = cx + (outerRadius + 30) * Math.cos(-midAngle * RADIAN);
  const endY = cy + (outerRadius + 30) * Math.sin(-midAngle * RADIAN);
  const labelX = endX + (endX > cx ? 15 : -15);

  return (
    <g>
      {/* Inside Chart Percentage */}
      <text
        x={insideX}
        y={insideY}
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="12px"
        fontWeight="600"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>

      {/* L-shaped Connector Line */}
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="#CBCBCB"
        strokeWidth={1.5}
      />
      <line
        x1={endX}
        y1={endY}
        x2={labelX}
        y2={endY}
        stroke="#CBCBCB"
        strokeWidth={1.5}
      />

      {/* Outside Label */}
      <text
        x={labelX}
        y={endY}
        textAnchor={labelX > cx ? "start" : "end"}
        fill="#878787"
        fontSize="14px"
        fontWeight="500"
      >
        {`${data[index].name} `}
      </text>
    </g>
  );
};

const DonutChart = () => {
  return (
    <div style={{ width: "100%", height: 303 }}>
      {" "}
      {/* Ensure parent has defined height */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={480} height={300}>
          <Pie
            data={data}
            cx={240}
            cy={140}
            innerRadius={68}
            outerRadius={105}
            fill="#8884d8"
            dataKey="value"
            labelLine={false}
            label={renderCustomizedLabel}
            stroke="white"
            strokeWidth={4}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;
