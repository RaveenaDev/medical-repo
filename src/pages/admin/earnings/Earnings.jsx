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

  const [timeFilter, setTimeFilter] = useState("monthly");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [search, setSearch] = useState("");

  const applyTimeFilter = (data) => {
    const now = new Date();

    if (timeFilter === "daily") {
      return data.filter((d) => d.date.toDateString() === now.toDateString());
    }

    if (timeFilter === "weekly") {
      const start = new Date();
      start.setDate(now.getDate() - 7);
      return data.filter((d) => d.date >= start && d.date <= now);
    }

    if (timeFilter === "monthly") {
      return data.filter(
        (d) =>
          d.date.getMonth() === now.getMonth() &&
          d.date.getFullYear() === now.getFullYear()
      );
    }

    if (timeFilter === "custom" && fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      return data.filter((d) => d.date >= from && d.date <= to);
    }

    return data;
  };
  const generateTodayHourlyData = () => {
    const data = [];
    const today = new Date();

    for (let h = 0; h < 24; h++) {
      const date = new Date(today);
      date.setHours(h, 0, 0, 0);

      data.push({
        date,
        label: `${h}:00`,
        opd: Math.floor(200 + Math.random() * 300),
        ipd: Math.floor(400 + Math.random() * 600),
      });
    }

    return data;
  };

  useEffect(() => {
    setIsSignUpOrLogin?.(false);
  }, [dispatch]);

  const filteredTrend = useMemo(() => {
    if (timeFilter === "daily") {
      return generateTodayHourlyData();
    }

    return applyTimeFilter(earningsTrend);
  }, [timeFilter, fromDate, toDate]);

  const filteredPatientTrend = filteredTrend.map((d) => ({
    ...d,
    opd: Math.floor(200 + Math.random() * 200),
    ipd: Math.floor(100 + Math.random() * 100),
  }));

  const filteredDoctors = doctors.map((doc) => {
    const filteredRecords = applyTimeFilter(doc.records);

    const totals = filteredRecords.reduce(
      (acc, r) => {
        acc.opdEarnings += r.opdEarnings;
        acc.ipdEarnings += r.ipdEarnings;
        acc.opdPatients += r.opdPatients;
        acc.ipdPatients += r.ipdPatients;
        return acc;
      },
      {
        opdEarnings: 0,
        ipdEarnings: 0,
        opdPatients: 0,
        ipdPatients: 0,
      }
    );

    return {
      name: doc.name,
      ...totals,
    };
  });
  const earningsSummary = useMemo(() => {
    return filteredTrend.reduce(
      (acc, d) => {
        acc.opd += d.opd;
        acc.ipd += d.ipd;
        acc.total += d.opd + d.ipd;
        return acc;
      },
      { opd: 0, ipd: 0, total: 0 }
    );
  }, [filteredTrend]);
  const patientSummary = useMemo(() => {
    return filteredPatientTrend.reduce(
      (acc, d) => {
        acc.opd += d.opd;
        acc.ipd += d.ipd;
        acc.total += d.opd + d.ipd;
        return acc;
      },
      { opd: 0, ipd: 0, total: 0 }
    );
  }, [filteredPatientTrend]);

  return (
    <PageWrapper>
      <Header />

      <Content>
        <FilterBar
          timeFilter={timeFilter}
          setTimeFilter={setTimeFilter}
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
                value: `₹${earningsSummary.total.toLocaleString("en-IN")}`,
                color: THEME.primary,
              },
              {
                label: "OPD Earnings",
                value: `₹${earningsSummary.opd.toLocaleString("en-IN")}`,
                color: THEME.primary,
              },
              {
                label: "IPD Earnings",
                value: `₹${earningsSummary.ipd.toLocaleString("en-IN")}`,
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
              {
                label: "Total Patients",
                value: patientSummary.total,
                color: THEME.primary,
              },
              {
                label: "OPD Patients",
                value: patientSummary.opd,
                color: THEME.primary,
              },
              {
                label: "IPD Patients",
                value: patientSummary.ipd,
                color: THEME.secondary,
              },
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
            rows={filteredDoctors}
            search={search}
            setSearch={setSearch}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            fromDate={fromDate}
            toDate={toDate}
            setFromDate={setFromDate}
            setToDate={setToDate}
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
  timeFilter,
  setTimeFilter,
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
      label="Time Range"
      value={timeFilter}
      onChange={(e) => setTimeFilter(e.target.value)}
    >
      <MenuItem value="daily">Today</MenuItem>
      <MenuItem value="weekly">This Week</MenuItem>
      <MenuItem value="monthly">This Month</MenuItem>
      <MenuItem value="yearly">This Year</MenuItem>
      <MenuItem value="custom">Custom</MenuItem>
    </TextField>

    {timeFilter === "custom" && (
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
          <XAxis dataKey="label" />

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
    r.name.toLowerCase().includes(search.toLowerCase())
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

const earningsTrend = (() => {
  const data = [];
  const today = new Date();

  for (let i = 0; i < 90; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    data.push({
      date,
      label: date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
      opd: Math.floor(3000 + Math.random() * 5000),
      ipd: Math.floor(6000 + Math.random() * 9000),
    });
  }

  return data.reverse();
})();

const patientTrend = earningsTrend.map((m) => ({
  month: m.month,
  opd: Math.floor(200 + Math.random() * 200),
  ipd: Math.floor(100 + Math.random() * 100),
}));

const doctors = Array.from({ length: 15 }, (_, i) => {
  const records = [];

  for (let d = 0; d < 90; d++) {
    const date = new Date();
    date.setDate(date.getDate() - d);

    records.push({
      date,
      opdEarnings: Math.floor(2000 + Math.random() * 4000),
      ipdEarnings: Math.floor(5000 + Math.random() * 8000),
      opdPatients: Math.floor(5 + Math.random() * 15),
      ipdPatients: Math.floor(2 + Math.random() * 8),
    });
  }

  return {
    doctorId: `doc_${i + 1}`,
    name: `Dr. Doctor ${i + 1}`,
    records,
  };
});
