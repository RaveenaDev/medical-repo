import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getTPAReport } from "../../../../components/State/Admin/Action.js";

/* ---------------- THEME ---------------- */

const THEME = {
  primary: "#444FA2",
  bg: "#F1F1F1",
  success: "#2e7d32",
  danger: "#d32f2f",
  warning: "#ed6c02",
};

/* ---------------- MAIN ---------------- */

const TPAReports = () => {
  const dispatch = useDispatch();
  const { tpaloading, tpadata, tpaerror } = useSelector((s) => s.admin);

  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState("");
  const [company, setCompany] = useState("");

  /* Reset month when year changes */
  useEffect(() => {
    setMonth("");
  }, [year]);

  useEffect(() => {
    dispatch(getTPAReport({ year, month, company }));
  }, [year, month, company, dispatch]);

  /* ---------------- AGGREGATED COMPANY DATA ---------------- */

  const companyRows = useMemo(() => {
    if (!tpadata?.months) return [];

    const map = {};

    Object.values(tpadata.months).forEach((m) => {
      m.companies?.forEach((c) => {
        if (!map[c.company]) {
          map[c.company] = {
            company: c.company,
            totalCases: 0,
            acceptedCases: 0,
            rejectedCases: 0,
            pendingCases: 0,
            acceptedAmount: 0,
            rejectedAmount: 0,
          };
        }

        map[c.company].totalCases += c.totalCases;
        map[c.company].acceptedCases += c.acceptedCases;
        map[c.company].rejectedCases += c.rejectedCases;
        map[c.company].pendingCases += c.pendingCases;
        map[c.company].acceptedAmount += c.acceptedAmount;
        map[c.company].rejectedAmount += c.rejectedAmount;
      });
    });

    return Object.values(map).sort(
      (a, b) => b.acceptedAmount - a.acceptedAmount
    );
  }, [tpadata]);

  /* ---------------- STATES ---------------- */

  if (tpaerror) {
    return <p style={{ color: "red", padding: 20 }}>{tpaerror}</p>;
  }

  if (!tpadata || !tpadata.overall) {
    return <p style={{ padding: 20 }}>No TPA data for selected filters</p>;
  }

  /* ---------------- UI ---------------- */

  return (
    <PageWrapper>
      <Content>
        <Backdrop
          open={tpaloading}
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <CircularProgress sx={{ color: "#25307F" }} />
        </Backdrop>

        <FilterBar
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
          company={company}
          setCompany={setCompany}
        />

        {!tpadata || !tpadata.overall ? (
          <p style={{ padding: 20 }}>No TPA data for selected filters</p>
        ) : (
          <>
            {/* ===== SUMMARY ===== */}
            <Section title="TPA Summary">
              <SummaryRow
                items={[
                  {
                    label: "Total Cases",
                    value: tpadata.overall.totalCases,
                    color: THEME.primary,
                  },
                  {
                    label: "Accepted",
                    value: tpadata.overall.acceptedCases,
                    color: THEME.success,
                  },
                  {
                    label: "Rejected",
                    value: tpadata.overall.rejectedCases,
                    color: THEME.danger,
                  },
                  {
                    label: "Pending",
                    value: tpadata.overall.pendingCases,
                    color: THEME.warning,
                  },
                ]}
              />
            </Section>

            {/* ===== COMPANY TABLE ===== */}
            <Section title="Company-wise Breakdown">
              <CompanyTable rows={companyRows} />
            </Section>
          </>
        )}
      </Content>
    </PageWrapper>
  );
};

export default TPAReports;

/* ---------------- LAYOUT ---------------- */

const PageWrapper = ({ children }) => (
  <div style={{ background: THEME.bg, paddingTop: "2vh" }}>{children}</div>
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
      minHeight: "79vh",
    }}
  >
    {children}
  </Box>
);

/* ---------------- FILTERS ---------------- */

const FilterBar = ({ year, setYear, month, setMonth, company, setCompany }) => (
  <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
    <TextField
      select
      size="small"
      label="Year"
      value={year}
      onChange={(e) => setYear(e.target.value)}
    >
      {[2025, 2024, 2023].map((y) => (
        <MenuItem key={y} value={y}>
          {y}
        </MenuItem>
      ))}
    </TextField>

    <TextField
      select
      size="small"
      label="Month"
      value={month}
      onChange={(e) => setMonth(e.target.value)}
    >
      <MenuItem value="">All Months</MenuItem>
      {[
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ].map((m, i) => (
        <MenuItem key={m} value={i + 1}>
          {m}
        </MenuItem>
      ))}
    </TextField>

    <TextField
      size="small"
      label="Insurance Company"
      placeholder="Search company"
      value={company}
      onChange={(e) => setCompany(e.target.value)}
    />
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
      <Grid item xs={12} sm={6} md={3} key={idx}>
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

/* ---------------- TABLE ---------------- */

const CompanyTable = ({ rows }) => (
  <Box sx={{ border: "1px solid #eee", maxHeight: 420, overflowY: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead style={{ position: "sticky", top: 0, background: THEME.bg }}>
        <tr>
          <th style={th}>Company</th>
          <th style={th}>Total Cases</th>
          <th style={th}>Accepted</th>
          <th style={th}>Rejected</th>
          <th style={th}>Pending</th>
          <th style={th}>Accepted (₹)</th>
          <th style={th}>Rejected (₹)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td style={td}>{r.company}</td>
            <td style={td}>{r.totalCases}</td>
            <td style={td}>{r.acceptedCases}</td>
            <td style={td}>{r.rejectedCases}</td>
            <td style={td}>{r.pendingCases}</td>
            <td style={td}>₹{r.acceptedAmount.toLocaleString("en-IN")}</td>
            <td style={{ ...td, color: THEME.danger }}>
              ₹{Math.abs(r.rejectedAmount).toLocaleString("en-IN")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Box>
);

/* ---------------- STYLES ---------------- */

const th = { padding: 10, textAlign: "left", fontSize: 13 };
const td = {
  padding: 10,
  textAlign: "left",
  borderBottom: "1px solid #eee",
  fontSize: 13,
};
