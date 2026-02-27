import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  Backdrop,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Drawer,
  Badge,
  Chip,
} from "@mui/material";
import { Calendar, CalendarRange, CalendarDays } from "lucide-react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
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

  const [filterOpen, setFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState("year");

  const currentYear = new Date().getFullYear();
  const [yearFrom, setYearFrom] = useState(currentYear);
  const [yearTo, setYearTo] = useState("");

  const [monthYear, setMonthYear] = useState(currentYear);
  const [monthFrom, setMonthFrom] = useState(1);
  const [monthTo, setMonthTo] = useState("");

  const [customStart, setCustomStart] = useState(null);
  const [customEnd, setCustomEnd] = useState(null);
  const [company, setCompany] = useState("");

  useEffect(() => {
    dispatch(
      getTPAReport({
        filterType: "year",
        yearFrom: currentYear,
      }),
    );
  }, []);
  useEffect(() => {
    const saved = localStorage.getItem("tpaFilters");
    if (saved) {
      const parsed = JSON.parse(saved);
      setFilterType(parsed.filterType);
      setYearFrom(parsed.yearFrom);
      setYearTo(parsed.yearTo);
      setMonthYear(parsed.monthYear);
      setMonthFrom(parsed.monthFrom);
      setMonthTo(parsed.monthTo);
    }
  }, []);
  /* ---------------- AGGREGATED COMPANY DATA ---------------- */

  const companyRows = useMemo(() => {
    if (!tpadata) return [];

    // ================= MONTHLY RESPONSE =================
    if (tpadata.companies) {
      return tpadata.companies
        .map((c) => ({
          ...c,
          company: (c.company || "Unknown").trim(),
        }))
        .sort((a, b) => b.acceptedAmount - a.acceptedAmount);
    }

    // ================= YEARLY RESPONSE =================
    if (tpadata.months) {
      const map = {};

      Object.values(tpadata.months).forEach((m) => {
        m.companies?.forEach((c) => {
          const name = (c.company || "Unknown").trim();

          if (!map[name]) {
            map[name] = {
              company: name,
              totalCases: 0,
              acceptedCases: 0,
              rejectedCases: 0,
              pendingCases: 0,
              acceptedAmount: 0,
              rejectedAmount: 0,
              pendingAmount: 0,
              recoveredAmount: 0,
              remainingAmount: 0,
              totalClaimedAmount: 0,
            };
          }

          map[name].totalCases += c.totalCases;
          map[name].acceptedCases += c.acceptedCases;
          map[name].rejectedCases += c.rejectedCases;
          map[name].pendingCases += c.pendingCases;
          map[name].acceptedAmount += c.acceptedAmount;
          map[name].rejectedAmount += c.rejectedAmount;
          map[name].pendingAmount += c.pendingAmount || 0;
          map[name].recoveredAmount += c.recoveredAmount || 0;
          map[name].remainingAmount += c.remainingAmount || 0;
          map[name].totalClaimedAmount += c.totalClaimedAmount || 0;
        });
      });

      return Object.values(map).sort(
        (a, b) => b.acceptedAmount - a.acceptedAmount,
      );
    }

    return [];
  }, [tpadata]);

  /* ---------------- STATES ---------------- */

  if (tpaerror) {
    return <p style={{ color: "red", padding: 20 }}>{tpaerror}</p>;
  }

  if (filterType === "custom" && (!customStart || !customEnd)) {
    return (
      <PageWrapper>
        <Content>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                TPA Reports
              </Typography>

              <Typography variant="body2" sx={{ color: "#6B7280", mt: 0.5 }}>
                {filterType === "year" &&
                  (yearTo
                    ? `Years: ${yearFrom} - ${yearTo}`
                    : `Year: ${yearFrom}`)}

                {filterType === "month" &&
                  (monthTo
                    ? `Months: ${MONTHS[monthFrom - 1]} - ${
                        MONTHS[monthTo - 1]
                      } ${monthYear}`
                    : `Month: ${MONTHS[monthFrom - 1]} ${monthYear}`)}

                {filterType === "custom" &&
                  customStart &&
                  customEnd &&
                  `Custom: ${customStart.format(
                    "DD MMM YYYY",
                  )} - ${customEnd.format("DD MMM YYYY")}`}
              </Typography>
            </Box>

            <Button
              variant="outlined"
              onClick={() => setFilterOpen(true)}
              startIcon={<Calendar size={16} />}
            >
              Filters
            </Button>
          </Box>
          <Typography sx={{ mt: 4, color: "#6B7280" }}>
            Please select a start and end date.
          </Typography>

          <Drawer
            anchor="right"
            open={filterOpen}
            onClose={() => setFilterOpen(false)}
            PaperProps={{
              sx: {
                width: 360,
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
              },
            }}
          >
            <Box sx={{ width: 340, p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Filters
              </Typography>

              <FilterBar
                filterType={filterType}
                setFilterType={setFilterType}
                yearFrom={yearFrom}
                setYearFrom={setYearFrom}
                yearTo={yearTo}
                setYearTo={setYearTo}
                monthFrom={monthFrom}
                setMonthFrom={setMonthFrom}
                monthTo={monthTo}
                setMonthTo={setMonthTo}
                customStart={customStart}
                setCustomStart={setCustomStart}
                customEnd={customEnd}
                setCustomEnd={setCustomEnd}
                company={company}
                setCompany={setCompany}
                monthYear={monthYear}
                setMonthYear={setMonthYear}
                compact
              />

              <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  disabled={tpaloading}
                  onClick={() => {
                    dispatch(
                      getTPAReport({
                        filterType,
                        yearFrom,
                        yearTo,
                        monthFrom,
                        monthTo,
                        customStart: customStart?.format("YYYY-MM-DD"),
                        customEnd: customEnd?.format("YYYY-MM-DD"),
                        company,
                        monthYear,
                      }),
                    );
                    localStorage.setItem(
                      "tpaFilters",
                      JSON.stringify({
                        filterType,
                        yearFrom,
                        yearTo,
                        monthYear,
                        monthFrom,
                        monthTo,
                      }),
                    );
                    setFilterOpen(false);
                  }}
                >
                  {tpaloading ? "Applying..." : "Apply"}
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    setFilterType("year");
                    setYearFrom(currentYear);
                    setYearTo("");
                    setMonthFrom(1);
                    setMonthTo("");
                    setCustomStart(null);
                    setCustomEnd(null);
                    setCompany("");
                  }}
                >
                  Reset
                </Button>
              </Box>
            </Box>
          </Drawer>
        </Content>
      </PageWrapper>
    );
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
          }}
        >
          {/* LEFT: TITLE */}
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            TPA Reports
          </Typography>

          {/* RIGHT: CHIPS + BUTTON */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            {/* YEAR FILTER CHIP */}
            {filterType === "year" && (
              <Chip
                size="small"
                label={yearTo ? `${yearFrom} – ${yearTo}` : `Year: ${yearFrom}`}
                onDelete={() => {
                  setFilterType("year");
                  setYearTo("");
                }}
              />
            )}

            {/* MONTH FILTER CHIP */}
            {filterType === "month" && (
              <Chip
                size="small"
                label={
                  monthTo
                    ? `${MONTHS[monthFrom - 1]} – ${
                        MONTHS[monthTo - 1]
                      } ${monthYear}`
                    : `${MONTHS[monthFrom - 1]} ${monthYear}`
                }
                onDelete={() => {
                  setFilterType("year");
                  setMonthTo("");
                }}
              />
            )}

            {/* CUSTOM FILTER CHIP */}
            {filterType === "custom" && customStart && customEnd && (
              <Chip
                size="small"
                label={`${customStart.format(
                  "DD MMM YYYY",
                )} – ${customEnd.format("DD MMM YYYY")}`}
                onDelete={() => {
                  setFilterType("year");
                  setCustomStart(null);
                  setCustomEnd(null);
                }}
              />
            )}

            {/* COMPANY CHIP */}
            {company && (
              <Chip
                size="small"
                label={company.trim()}
                onDelete={() => setCompany("")}
              />
            )}

            {/* FILTER BUTTON */}
            <Button
              variant="outlined"
              onClick={() => setFilterOpen(true)}
              startIcon={<Calendar size={16} />}
              sx={{ borderRadius: 2 }}
            >
              Filters
            </Button>
          </Box>
        </Box>

        <Drawer
          anchor="right"
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
          PaperProps={{
            sx: {
              width: 360,
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
            },
          }}
        >
          <Box sx={{ width: 340, p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Filters
            </Typography>

            <FilterBar
              filterType={filterType}
              setFilterType={setFilterType}
              yearFrom={yearFrom}
              setYearFrom={setYearFrom}
              yearTo={yearTo}
              setYearTo={setYearTo}
              monthFrom={monthFrom}
              setMonthFrom={setMonthFrom}
              monthTo={monthTo}
              setMonthTo={setMonthTo}
              customStart={customStart}
              setCustomStart={setCustomStart}
              customEnd={customEnd}
              setCustomEnd={setCustomEnd}
              company={company}
              setCompany={setCompany}
              monthYear={monthYear}
              setMonthYear={setMonthYear}
              compact
            />

            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
              <Button
                fullWidth
                variant="contained"
                disabled={tpaloading}
                onClick={() => {
                  dispatch(
                    getTPAReport({
                      filterType,
                      yearFrom,
                      yearTo,
                      monthFrom,
                      monthTo,
                      customStart: customStart?.format("YYYY-MM-DD"),
                      customEnd: customEnd?.format("YYYY-MM-DD"),
                      company,
                      monthYear,
                    }),
                  );
                  localStorage.setItem(
                    "tpaFilters",
                    JSON.stringify({
                      filterType,
                      yearFrom,
                      yearTo,
                      monthYear,
                      monthFrom,
                      monthTo,
                    }),
                  );
                  setFilterOpen(false);
                }}
              >
                {tpaloading ? "Applying..." : "Apply"}
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  setFilterType("year");
                  setYearFrom(currentYear);
                  setYearTo("");
                  setMonthFrom(1);
                  setMonthTo("");
                  setCustomStart(null);
                  setCustomEnd(null);
                  setCompany("");
                }}
              >
                Reset
              </Button>
            </Box>
          </Box>
        </Drawer>
        {!tpadata || !tpadata.overall ? (
          <p style={{ padding: 20 }}>No TPA data for selected filters</p>
        ) : (
          <>
            {/* ===== SUMMARY ===== */}
            <Section title="Overview">
              {/* CASE METRICS */}
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
                    label: "Pending",
                    value: tpadata.overall.pendingCases,
                    color: THEME.warning,
                  },
                  {
                    label: "Rejected",
                    value: tpadata.overall.rejectedCases,
                    color: THEME.danger,
                  },
                ]}
              />

              {/* FINANCIAL METRICS */}
              <SummaryRow
                items={[
                  {
                    label: "Total Claimed",
                    value: `₹${tpadata.overall.totalClaimedAmount.toLocaleString(
                      "en-IN",
                    )}`,
                    color: "#5E35B1",
                  },
                  {
                    label: "Approved Amount",
                    value: `₹${tpadata.overall.acceptedAmount.toLocaleString(
                      "en-IN",
                    )}`,
                    color: THEME.success,
                  },
                  {
                    label: "Recovered Amount",
                    value: `₹${tpadata.overall.recoveredAmount.toLocaleString(
                      "en-IN",
                    )}`,
                    color: "#0288D1",
                  },
                  {
                    label: "Remaining Amount",
                    value: `₹${Math.abs(
                      tpadata.overall.remainingAmount,
                    ).toLocaleString("en-IN")}`,
                    color:
                      tpadata.overall.remainingAmount >= 0
                        ? THEME.warning
                        : THEME.danger,
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

const YEARS = [2023, 2024, 2025, 2026];

const MONTHS = [
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
];

const FilterBar = ({
  filterType,
  setFilterType,
  yearFrom,
  setYearFrom,
  yearTo,
  setYearTo,
  monthFrom,
  setMonthFrom,
  monthTo,
  setMonthTo,
  customStart,
  setCustomStart,
  customEnd,
  setCustomEnd,
  company,
  setCompany,
  monthYear,
  setMonthYear,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        background: "#FAFBFF",
      }}
    >
      {/* FILTER TYPE */}
      <ToggleButtonGroup
        value={filterType}
        exclusive
        onChange={(e, val) => val && setFilterType(val)}
        sx={{ mb: 3 }}
      >
        <ToggleButton value="year">
          <Calendar size={16} style={{ marginRight: 6 }} />
          Year
        </ToggleButton>
        <ToggleButton value="month">
          <CalendarDays size={16} style={{ marginRight: 6 }} />
          Month
        </ToggleButton>
        <ToggleButton value="custom">
          <CalendarRange size={16} style={{ marginRight: 6 }} />
          Custom
        </ToggleButton>
      </ToggleButtonGroup>

      {/* YEAR FILTER */}
      {filterType === "year" && (
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            select
            label="From Year"
            size="small"
            value={yearFrom}
            onChange={(e) => setYearFrom(e.target.value)}
          >
            {YEARS.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="To Year (optional)"
            size="small"
            value={yearTo}
            onChange={(e) => setYearTo(e.target.value)}
          >
            <MenuItem value="">Single Year</MenuItem>
            {YEARS.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      )}

      {/* MONTH FILTER */}
      {filterType === "month" && (
        <Box display="flex" gap={2} flexWrap="wrap">
          {/* YEAR SELECTOR */}
          <TextField
            select
            label="Year"
            size="small"
            value={monthYear}
            onChange={(e) => setMonthYear(e.target.value)}
          >
            {YEARS.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </TextField>

          {/* FROM MONTH */}
          <TextField
            select
            label="From Month"
            size="small"
            value={monthFrom}
            onChange={(e) => setMonthFrom(e.target.value)}
          >
            {MONTHS.map((m, i) => (
              <MenuItem key={m} value={i + 1}>
                {m}
              </MenuItem>
            ))}
          </TextField>

          {/* TO MONTH */}
          <TextField
            select
            label="To Month (optional)"
            size="small"
            value={monthTo}
            onChange={(e) => setMonthTo(e.target.value)}
          >
            <MenuItem value="">Single Month</MenuItem>
            {MONTHS.map((m, i) => (
              <MenuItem key={m} value={i + 1}>
                {m}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      )}

      {/* CUSTOM FILTER */}
      {filterType === "custom" && (
        <Box display="flex" gap={2} flexWrap="wrap">
          <DatePicker
            label="Start Date"
            value={customStart}
            onChange={setCustomStart}
          />
          <DatePicker
            label="End Date"
            value={customEnd}
            onChange={setCustomEnd}
          />
        </Box>
      )}

      {/* COMPANY FILTER */}
      <Box mt={3}>
        <TextField
          size="small"
          label="Insurance Company"
          placeholder="Search company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </Box>
    </Paper>
  );
};

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
          <th style={th}>Cases</th>
          <th style={th}>Accepted</th>
          <th style={th}>Pending</th>
          <th style={th}>Rejected</th>
          <th style={th}>Claimed (₹)</th>
          <th style={th}>Approved (₹)</th>
          <th style={th}>Recovered (₹)</th>
          <th style={th}>Remaining (₹)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td style={{ ...td, fontWeight: 500 }}>{r.company}</td>

            <td style={td}>{r.totalCases}</td>
            <td style={{ ...td, color: THEME.success }}>{r.acceptedCases}</td>
            <td style={{ ...td, color: THEME.warning }}>{r.pendingCases}</td>
            <td style={{ ...td, color: THEME.danger }}>{r.rejectedCases}</td>

            <td style={td}>
              ₹{r.totalClaimedAmount?.toLocaleString("en-IN") || 0}
            </td>

            <td style={{ ...td, color: THEME.success }}>
              ₹{r.acceptedAmount?.toLocaleString("en-IN") || 0}
            </td>

            <td style={{ ...td, color: "#0288D1" }}>
              ₹{r.recoveredAmount?.toLocaleString("en-IN") || 0}
            </td>

            <td
              style={{
                ...td,
                color: r.remainingAmount >= 0 ? THEME.warning : THEME.danger,
              }}
            >
              ₹{Math.abs(r.remainingAmount || 0).toLocaleString("en-IN")}
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
