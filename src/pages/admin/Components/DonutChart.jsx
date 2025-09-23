import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { getAllDepartments } from "../../../components/State/Admin/Action";
import { Tooltip } from "recharts";

const PieChartTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    if (item.name === "Others" && item.details) {
      return (
        <div
          style={{
            background: "white",
            border: "1px solid #ccc",
            padding: "8px",
            borderRadius: "6px",
          }}
        >
          <p>
            <b>Others:</b>
          </p>
          <ul style={{ margin: 0, paddingLeft: "18px" }}>
            {item.details.map((d, i) => (
              <li key={i}>
                {d.name}: {d.value}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div
        style={{
          background: "white",
          border: "1px solid #ccc",
          padding: "8px",
          borderRadius: "6px",
        }}
      >
        <p>
          <b>{item.name}</b>: {item.value}
        </p>
      </div>
    );
  }
  return null;
};

// Distinct colors
const COLORS = [
  "#F14400",
  "#EAA000",
  "#2E823B",
  "#5461BE",
  "#66A7B4",
  "#C73B8A",
  "#009688",
  "#9C27B0",
  "#3F51B5",
  "#795548",
  "#607D8B",
  "#8BC34A",
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
  data,
}) => {
  //  const labelRadius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const chartMax = Math.min(cx, cy); // chart center is at cx, cy

  const screenWidth = window.innerWidth;
  const radiusIncrement = screenWidth <= 1024 ? 15 : 30;
  const labelRadius = Math.min(outerRadius + radiusIncrement, chartMax - 18);

  const insideX = cx + labelRadius * Math.cos(-midAngle * RADIAN);
  const insideY = cy + labelRadius * Math.sin(-midAngle * RADIAN);

  // Connector Line
  const startX = cx + outerRadius * Math.cos(-midAngle * RADIAN);
  const startY = cy + outerRadius * Math.sin(-midAngle * RADIAN);
  // Step 1: Compute a safe distance, never exceeding half chart size

  const endX = cx + labelRadius * Math.cos(-midAngle * RADIAN);
  const endY = cy + labelRadius * Math.sin(-midAngle * RADIAN);
  const labelX = endX + (endX > cx ? 12 : -12); // 12px for padding from connector

  return (
    <g>
      {/* Inside Percentage */}
      <text
        x={insideX}
        y={insideY}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#FFFFFF"
        fontSize="11px"
        fontWeight="500"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>

      {/* Connector Lines */}
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

      {/* Outside Department Name */}
      <text
        x={labelX}
        y={endY}
        textAnchor={labelX > cx ? "start" : "end"}
        fill="#878787"
        fontSize="14px"
        fontWeight="500"
        dominantBaseline="middle"
      >
        {data[index].name.length > 8
          ? data[index].name.slice(0, 8) + "…"
          : data[index].name}
      </text>
    </g>
  );
};

const DonutChart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDepartments());
  }, [dispatch]);

  const departments = useSelector((store) => store.admin.departments);

  // Transform API data
  const rawData = departments
    .map((dept) => ({
      name: dept.departmentName,
      value: dept.totalPatients,
    }))
    .filter((d) => d.value > 0);

  // Merge very small slices into "Others"
  const threshold = 0.02; // 2%
  const total = departments.reduce((sum, d) => sum + d.totalPatients, 0);

  let big = [];
  let smallSum = 0;
  let othersList = [];

  departments.forEach((dept) => {
    const value = dept.totalPatients;
    if (value / total < threshold) {
      smallSum += value;
      othersList.push({ name: dept.departmentName, value });
    } else {
      big.push({ name: dept.departmentName, value });
    }
  });

  if (smallSum > 0) {
    big.push({ name: "Others", value: smallSum, details: othersList });
  }

  const departmentData = big;

  const screenWidth = window.innerWidth;
  let innerRadius = "45%";
  let outerRadius = "70%";

  // For screens 1024px or less, reduce both radii by 20%
  if (screenWidth <= 1200) {
    innerRadius = "25%";
    outerRadius = "40%";
  }
  return (
    <div style={{ width: "100%", height: 303 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={departmentData}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            fill="#8884d8"
            dataKey="value"
            labelLine={false}
            label={(props) =>
              renderCustomizedLabel({ ...props, data: departmentData })
            }
            stroke="white"
            strokeWidth={4}
          >
            {departmentData.map((entry, index) => {
              const fillColor =
                entry.name === "Others"
                  ? "#B0B0B0"
                  : COLORS[index % COLORS.length];
              return <Cell key={`cell-${index}`} fill={fillColor} />;
            })}
          </Pie>
          <Tooltip content={<PieChartTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;
