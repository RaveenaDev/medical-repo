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
import { getEarnings } from "../../../components/State/Admin/Action.js";

/* ---------------- THEME ---------------- */

const THEME = {
  primary: "#444FA2",
  secondary: "#5765CA",
  bg: "#F1F1F1",
};

/* ---------------- MAIN ---------------- */

const Earnings = ({ setIsSignUpOrLogin }) => {
  const dispatch = useDispatch();
  const totalEarnings = useSelector((s) => s.admin.totalEarnings);

  const [period, setPeriod] = useState("This Year");
  const [year, setYear] = useState("2025");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setIsSignUpOrLogin?.(false);
    dispatch(getEarnings(year));
  }, [dispatch, year]);

  const filteredTrend = useMemo(() => {
    const selectedYear = Number(year);

    let data = earningsTrend.filter(
      (d) => d.date.getFullYear() === selectedYear
    );

    if (period === "This Year") return data;

    if (period === "This Month") {
      const now = new Date();
      return data.filter(
        (d) =>
          d.date.getMonth() === now.getMonth() &&
          d.date.getFullYear() === now.getFullYear()
      );
    }

    if (period === "Last Month") {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);

      return data.filter(
        (d) =>
          d.date.getMonth() === lastMonth.getMonth() &&
          d.date.getFullYear() === lastMonth.getFullYear()
      );
    }

    if (period === "Custom" && fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);

      return data.filter((d) => d.date >= from && d.date <= to);
    }

    return data;
  }, [period, year, fromDate, toDate]);
  const filteredPatientTrend = filteredTrend.map((d) => ({
    ...d,
    opd: Math.floor(200 + Math.random() * 200),
    ipd: Math.floor(100 + Math.random() * 100),
  }));

  const mergedDoctorData = doctors.map((d) => ({
    name: d.name,
    opdEarnings: d.opdEarnings,
    ipdEarnings: d.ipdEarnings,
    opdPatients: d.opdPatients,
    ipdPatients: d.ipdPatients,
  }));

  return (
    <PageWrapper>
      <Header />

      <Content>
        <FilterBar
          period={period}
          setPeriod={setPeriod}
          year={year}
          setYear={setYear}
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
        />

        {/* ===== Earnings ===== */}
        <Section title="Earnings Overview">
          <SummaryRow
            items={[
              {
                label: "Total Earnings",
                value: "₹5,40,000",
                color: THEME.primary,
              },
              {
                label: "OPD Earnings",
                value: "₹2,20,000",
                color: THEME.primary,
              },
              {
                label: "IPD Earnings",
                value: "₹3,20,000",
                color: THEME.secondary,
              },
            ]}
          />

          <ChartCard
            title="Earnings Trend (OPD vs IPD)"
            data={filteredTrend}
          ></ChartCard>
        </Section>

        {/* ===== Patients ===== */}
        <Section title="Patient Load Overview">
          <SummaryRow
            items={[
              { label: "Total Patients", value: "1,860", color: THEME.primary },
              { label: "OPD Patients", value: "1,240", color: THEME.primary },
              { label: "IPD Patients", value: "620", color: THEME.secondary },
            ]}
          />

          <ChartCard
            title="Patient Trend (OPD vs IPD)"
            data={filteredPatientTrend}
          ></ChartCard>
        </Section>

        {/* ===== Doctor-wise Summary ===== */}
        <Section title="Doctor-wise Earnings Summary">
          <DoctorTable
            rows={mergedDoctorData}
            search={search}
            setSearch={setSearch}
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

const FilterBar = ({
  period,
  setPeriod,
  year,
  setYear,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}) => (
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
      label="Period"
      value={period}
      onChange={(e) => setPeriod(e.target.value)}
    >
      {["Today", "This Month", "Last Month", "This Year", "Custom"].map((p) => (
        <MenuItem key={p} value={p}>
          {p}
        </MenuItem>
      ))}
    </TextField>

    <TextField
      select
      size="small"
      label="Year"
      value={year}
      onChange={(e) => setYear(e.target.value)}
    >
      {["2025", "2024", "2023"].map((y) => (
        <MenuItem key={y} value={y}>
          {y}
        </MenuItem>
      ))}
    </TextField>

    {period === "Custom" && (
      <>
        <TextField
          size="small"
          type="date"
          label="From"
          InputLabelProps={{ shrink: true }}
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <TextField
          size="small"
          type="date"
          label="To"
          InputLabelProps={{ shrink: true }}
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </>
    )}
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

const ChartCard = ({ title, data, children }) => (
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
          <XAxis dataKey="month" />
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

const DoctorTable = ({ rows, search, setSearch }) => {
  const filteredRows = rows.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <h4>Doctor-wise Summary</h4>
        <TextField
          size="small"
          placeholder="Search doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

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
                <td style={td}>{r.name}</td>
                <td style={td}>₹{r.opdEarnings}</td>
                <td style={td}>₹{r.ipdEarnings}</td>
                <td style={td}>{r.opdPatients}</td>
                <td style={td}>{r.ipdPatients}</td>
                <td style={td}>₹{r.opdEarnings + r.ipdEarnings}</td>
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

const format = (v, currency) => (currency ? `₹${v}` : v);
const th = { padding: 10, textAlign: "left" };
const td = { padding: 10, borderBottom: "1px solid #eee" };

/* ---------------- DUMMY DATA ---------------- */

const earningsTrend = Array.from({ length: 24 }, (_, i) => {
  const date = new Date(2024, i);
  return {
    date, //  date
    month: date.toLocaleString("en", {
      month: "short",
      year: "2-digit",
    }),
    opd: Math.floor(50000 + Math.random() * 50000),
    ipd: Math.floor(80000 + Math.random() * 70000),
  };
});

const patientTrend = earningsTrend.map((m) => ({
  month: m.month,
  opd: Math.floor(200 + Math.random() * 200),
  ipd: Math.floor(100 + Math.random() * 100),
}));

const doctors = Array.from({ length: 50 }, (_, i) => ({
  name: `Dr. Doctor ${i + 1}`,
  opdEarnings: Math.floor(20000 + Math.random() * 80000),
  ipdEarnings: Math.floor(40000 + Math.random() * 120000),
  opdPatients: Math.floor(50 + Math.random() * 200),
  ipdPatients: Math.floor(20 + Math.random() * 100),
}));
