import React, { useEffect, useMemo, useState } from "react";

import { Box, Grid, TextField, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import CommonPanel from "../Components/CommonPanel.jsx";
import {
  getEarnings,
  getGraphData,
} from "../../../components/State/Admin/Action.js";

/* ---------------- THEME ---------------- */

const THEME = {
  primary: "#444FA2",
  secondary: "#5765CA",
  bg: "#F1F1F1",
};

const GRAPH_RANGES = [
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "last_7_days" },
  { label: "This Week", value: "this_week" },
  { label: "Last Week", value: "last_week" },
  { label: "This Month", value: "this_month" },
  { label: "This Year", value: "this_year" },
];

/* ---------------- MAIN ---------------- */

const Earnings = ({ setIsSignUpOrLogin }) => {
  const dispatch = useDispatch();

  // Graph (charts + summary)
  const [graphRange, setGraphRange] = useState("this_month");

  // Doctor table
  const [doctorRange, setDoctorRange] = useState("monthly");
  const [doctorFromDate, setDoctorFromDate] = useState("");
  const [doctorToDate, setDoctorToDate] = useState("");

  const [search, setSearch] = useState("");
  const [doctorRows, setDoctorRows] = useState([]);

  // Graphs
  useEffect(() => {
    dispatch(getGraphData({ range: graphRange }));
  }, [graphRange, dispatch]);

  useEffect(() => {
    const params = {};
    const now = new Date();

    if (doctorRange === "daily") {
      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      params.startDate = start.toISOString();
      params.endDate = end.toISOString();
    }

    if (doctorRange === "weekly") {
      const start = new Date();
      start.setDate(now.getDate() - 7);

      params.startDate = start.toISOString();
      params.endDate = now.toISOString();
    }

    if (doctorRange === "monthly") {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);

      params.startDate = start.toISOString();
      params.endDate = now.toISOString();
    }

    if (doctorRange === "yearly") {
      const start = new Date(now.getFullYear(), 0, 1);

      params.startDate = start.toISOString();
      params.endDate = now.toISOString();
    }

    if (doctorRange === "custom" && fromDate && toDate) {
      params.startDate = fromDate;
      params.endDate = toDate;
    }

    dispatch(getEarnings(params)).then((res) => {
      setDoctorRows(res?.doctors || []);
    });
  }, [doctorRange, doctorFromDate, doctorToDate, dispatch]);

  useEffect(() => {
    setIsSignUpOrLogin?.(false);
  }, []);

  const { cardEarnings, graphEarnings, cardPatients, graphPatients } =
    useSelector((state) => state.admin);

  const xAxisKey = useMemo(() => {
    switch (graphRange) {
      case "today":
        return "hour";

      case "this_month":
        return "week";
      case "this_year":
        return "month";
      default:
        return "day";
    }
  }, [graphRange]);

  return (
    <PageWrapper>
      <Header />

      <Content>
        <FilterBar timeFilter={graphRange} setTimeFilter={setGraphRange} />

        {/* ===== Earnings ===== */}
        <Section title="Earnings Overview">
          <SummaryRow
            items={[
              {
                label: "Total Earnings",
                value: `₹${cardEarnings?.totalEarnings?.toLocaleString("en-IN") || 0}`,
                color: THEME.primary,
              },
              {
                label: "OPD Earnings",
                value: `₹${cardEarnings?.opdEarnings?.toLocaleString("en-IN") || 0}`,
                color: THEME.primary,
              },
              {
                label: "IPD Earnings",
                value: `₹${cardEarnings?.ipdEarnings?.toLocaleString("en-IN") || 0}`,
                color: THEME.secondary,
              },
            ]}
          />

          <ChartCard
            title="Earnings Trend (OPD vs IPD)"
            data={graphEarnings || []}
            xAxisKey={xAxisKey}
          />
        </Section>

        {/* ===== Patients ===== */}
        <Section title="Patient Load Overview">
          <SummaryRow
            items={[
              {
                label: "Total Patients",
                value: cardPatients?.totalPatients || 0,
                color: THEME.primary,
              },
              {
                label: "OPD Patients",
                value: cardPatients?.opdPatients || 0,
                color: THEME.primary,
              },
              {
                label: "IPD Patients",
                value: cardPatients?.ipdPatients || 0,
                color: THEME.secondary,
              },
            ]}
          />

          <ChartCard
            title="Patient Trend (OPD vs IPD)"
            data={graphPatients || []}
            xAxisKey={xAxisKey}
          />
        </Section>

        {/* ===== Doctor-wise Summary ===== */}
        <Section title="Doctor-wise Earnings Summary">
          <DoctorTable
            rows={doctorRows}
            search={search}
            setSearch={setSearch}
            timeFilter={doctorRange}
            setTimeFilter={setDoctorRange}
            fromDate={doctorFromDate}
            toDate={doctorToDate}
            setFromDate={setDoctorFromDate}
            setToDate={setDoctorToDate}
          />
        </Section>
      </Content>
    </PageWrapper>
  );
};

export default Earnings;

/* ---------------- LAYOUT ---------------- */

const PageWrapper = ({ children }) => (
  <div style={{ background: THEME.bg, minHeight: "100vh", marginTop: "180px" }}>
    {children}
  </div>
);

const Header = () => (
  <Box
    sx={{
      position: "fixed",
      top: 0,
      width: "77%",
      zIndex: 100,
      background: THEME.bg,
      p: 1,
    }}
  >
    <CommonPanel />
  </Box>
);

const Content = ({ children }) => (
  <Box
    sx={{
      pt: "170px",
      pb: 4,
      mx: "1.5rem",
      background: "#fff",
      p: 2,
      borderRadius: 2,
    }}
  >
    {children}
  </Box>
);

/* ---------------- FILTERS ---------------- */

const FilterBar = ({ timeFilter, setTimeFilter }) => (
  <Box
    sx={{
      position: "sticky",
      top: 70,
      zIndex: 10,
      background: "#fff",
      borderBottom: "1px solid #eee",
      mb: 3,
      pb: 2,
      display: "flex",
      gap: 2,
      flexWrap: "wrap",
    }}
  >
    <TextField
      select
      size="small"
      label="Time Range"
      value={timeFilter}
      onChange={(e) => setTimeFilter(e.target.value)}
    >
      {GRAPH_RANGES.map((r) => (
        <MenuItem key={r.value} value={r.value}>
          {r.label}
        </MenuItem>
      ))}
    </TextField>
  </Box>
);

/* ---------------- UI BLOCKS ---------------- */

const Section = ({ title, children }) => (
  <Box sx={{ mt: 4 }}>
    <h3 style={{ color: THEME.primary }}>{title}</h3>
    {children}
  </Box>
);

const SummaryRow = ({ items }) => (
  <Grid container spacing={2} mb={3}>
    {items.map((i, idx) => (
      <Grid item xs={12} sm={6} md={4} key={idx}>
        <Box
          sx={{
            background: THEME.bg,
            p: 2,
            borderRadius: 2,
            borderLeft: `4px solid ${i.color}`,
          }}
        >
          <p style={{ margin: 0, fontSize: 13 }}>{i.label}</p>
          <h2 style={{ margin: 0, color: i.color }}>{i.value}</h2>
        </Box>
      </Grid>
    ))}
  </Grid>
);

const ChartCard = ({ title, data, xAxisKey }) => (
  <Box
    sx={{
      background: THEME.bg,
      p: 2,
      borderRadius: 2,
      mb: 3,
      width: "100%",
      minHeight: 320,
    }}
  >
    <p style={{ fontWeight: 500 }}>{title}</p>
    {data?.length ? (
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />

          <YAxis />
          <Tooltip />
          <CartesianGrid horizontal vertical={false} stroke="#BFC5F5" />
          <defs>
            <linearGradient id="opdGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={THEME.primary} stopOpacity={0.6} />
              <stop
                offset="100%"
                stopColor={THEME.primary}
                stopOpacity={0.05}
              />
            </linearGradient>
            <linearGradient id="ipdGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={THEME.secondary} stopOpacity={0.6} />
              <stop
                offset="100%"
                stopColor={THEME.secondary}
                stopOpacity={0.05}
              />
            </linearGradient>
          </defs>

          <Area dataKey="opd" fill="url(#opdGrad)" stroke="none" />
          <Area dataKey="ipd" fill="url(#ipdGrad)" stroke="none" />
        </AreaChart>
      </ResponsiveContainer>
    ) : (
      <EmptyState text="No data available" />
    )}
  </Box>
);

/* ---------------- TABLE ---------------- */

const DoctorTable = ({
  rows,
  search,
  setSearch,
  timeFilter,
  setTimeFilter,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}) => {
  const filteredRows = rows.filter((r) =>
    r.doctorName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 1,
          flexWrap: "wrap",
        }}
      >
        <h4>Doctor-wise Summary</h4>

        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            size="small"
            placeholder="Search doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <TextField
            select
            size="small"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <MenuItem value="daily">Today</MenuItem>
            <MenuItem value="weekly">This Week</MenuItem>
            <MenuItem value="monthly">This Month</MenuItem>
            <MenuItem value="yearly">This Year</MenuItem>
            <MenuItem value="custom">Custom</MenuItem>
          </TextField>
        </Box>
      </Box>

      {timeFilter === "custom" && (
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <TextField
            size="small"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <TextField
            size="small"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </Box>
      )}

      <Box sx={{ maxHeight: 420, overflowY: "auto", border: "1px solid #eee" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ position: "sticky", top: 0, background: THEME.bg }}>
            <tr>
              <th style={th}>Doctor</th>
              <th style={th}>OPD ₹</th>
              <th style={th}>IPD ₹</th>
              <th style={th}>OPD Patients</th>
              <th style={th}>IPD Patients</th>
              <th style={th}>Total ₹</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((r, i) => (
              <tr key={i}>
                <td style={td}>{r.doctorName}</td>

                <td style={td}>₹{r.opd.earnings.toLocaleString("en-IN")}</td>

                <td style={td}>₹{r.ipd.earnings.toLocaleString("en-IN")}</td>

                <td style={td}>{r.opd.count}</td>

                <td style={td}>{r.ipd.count}</td>

                <td style={td}>₹{r.total.earnings.toLocaleString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

/* ---------------- HELPERS ---------------- */

const EmptyState = ({ text }) => (
  <Box
    sx={{
      height: 280,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#999",
    }}
  >
    {text}
  </Box>
);

const th = { padding: 10, textAlign: "left" };
const td = { padding: 10, borderBottom: "1px solid #eee" };
