import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomsAndBedsReport } from "../../../components/State/Admin/Action";

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Skeleton,
  TextField,
  MenuItem,
  useTheme,
} from "@mui/material";
import {
  BedDouble,
  Bed,
  Building2,
  IndianRupee,
  UserCheck,
  Activity,
  CalendarRange,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  Area,
} from "recharts";

const Reports = ({ setIsSignUpOrLogin }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { bedReport, isLoadingBedReport } = useSelector((state) => state.admin);

  const [range, setRange] = useState("this_month");
  const [customDates, setCustomDates] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    setIsSignUpOrLogin(false);
  }, []);
  // ================= FETCH ON FILTER CHANGE =================
  useEffect(() => {
    if (range === "custom") {
      if (customDates.startDate && customDates.endDate) {
        dispatch(
          getRoomsAndBedsReport({
            startDate: customDates.startDate,
            endDate: customDates.endDate,
          }),
        );
      }
    } else {
      dispatch(getRoomsAndBedsReport({ range }));
    }
  }, [range, customDates.startDate, customDates.endDate, dispatch]);

  // ================= SAFE DATA EXTRACTION =================
  const {
    summary = {},
    revenue = {},
    trends = {},
    range: rangeData = {},
  } = bedReport || {};

  const trendData = trends.dateWiseRevenue || [];
  const revenueByRoomType = revenue.revenueByRoomType || [];

  const xKey = trendData.length > 0 ? Object.keys(trendData[0])[0] : "date";

  const primary = theme.palette.primary.main;
  const lightPrimary = theme.palette.primary.light;

  return (
    <Box p={4}>
      {/* ================= HEADER + FILTER ================= */}
      <Box
        mb={5}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={3}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Room & Bed Analytics
          </Typography>

          {!isLoadingBedReport && rangeData.label && (
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <CalendarRange size={16} color={theme.palette.text.secondary} />
              <Typography variant="body2" color="text.secondary">
                {rangeData.label} • {rangeData.from} → {rangeData.to}
              </Typography>
            </Box>
          )}
        </Box>

        <Box display="flex" gap={2} alignItems="center">
          <TextField
            select
            size="small"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            sx={{
              minWidth: 180,
              background: theme.palette.background.paper,
              borderRadius: 2,
            }}
          >
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="last_7_days">Last 7 Days</MenuItem>
            <MenuItem value="this_month">This Month</MenuItem>
            <MenuItem value="this_year">This Year</MenuItem>
            <MenuItem value="custom">Custom Range</MenuItem>
          </TextField>

          {range === "custom" && (
            <>
              <TextField type="date" size="small" />
              <TextField type="date" size="small" />
            </>
          )}
        </Box>
      </Box>

      {/* ================= SUMMARY CARDS ================= */}
      <Grid container spacing={3} mb={4}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Grid item xs={12} md={2.4} key={i}>
            <Card
              elevation={0}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 3,
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              <CardContent>
                {isLoadingBedReport ? (
                  <>
                    <Skeleton height={30} width="40%" />
                    <Skeleton height={25} width="60%" />
                  </>
                ) : (
                  <SummaryCardContent index={i} summary={summary} />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ================= REVENUE SECTION ================= */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              p: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.primary.main}10)`,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <CardContent>
              {isLoadingBedReport ? (
                <>
                  <Skeleton height={30} width="60%" />
                  <Skeleton height={40} width="80%" />
                </>
              ) : (
                <Box display="flex" alignItems="center" gap={2}>
                  <IndianRupee size={32} color={primary} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Revenue
                    </Typography>

                    <Typography variant="h4" fontWeight={700} mt={1}>
                      ₹ {(revenue.totalRoomRevenue || 0).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card
            elevation={0}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 3,
            }}
          >
            <CardContent>
              <Typography variant="subtitle1" mb={2} fontWeight={600}>
                Revenue by Room Type
              </Typography>

              {isLoadingBedReport ? (
                <Skeleton variant="rectangular" height={300} />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={revenueByRoomType}
                      dataKey="revenue"
                      nameKey="roomType"
                      outerRadius={100}
                    >
                      {revenueByRoomType.map((_, index) => (
                        <Cell
                          key={index}
                          fill={
                            theme.palette.primary[
                              ["light", "main", "dark"][index % 3]
                            ]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ================= TREND ================= */}
      {/* ================= ANALYTICS SECTION ================= */}
      <Grid container spacing={3}>
        {/* ===== Revenue Trend ===== */}
        <Grid item xs={12}>
          <Card
            elevation={0}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 3,
              background: theme.palette.background.paper,
            }}
          >
            <CardContent>
              <Typography variant="subtitle1" mb={2} fontWeight={600}>
                Revenue Trend
              </Typography>

              {isLoadingBedReport ? (
                <Skeleton variant="rectangular" height={300} />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={theme.palette.primary.main}
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="95%"
                          stopColor={theme.palette.primary.main}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={theme.palette.divider}
                    />

                    <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />

                    <Tooltip
                      formatter={(value) =>
                        `₹ ${Number(value).toLocaleString()}`
                      }
                      contentStyle={{
                        borderRadius: 8,
                        border: "none",
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke={theme.palette.primary.main}
                      fill="url(#revenueGradient)"
                      strokeWidth={2.5}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

/* ================= SUMMARY CONTENT ================= */

const SummaryCardContent = ({ index, summary }) => {
  const theme = useTheme();

  const items = [
    {
      title: "Total Rooms",
      value: summary.totalRooms || 0,
      icon: <Building2 size={20} />,
      color: theme.palette.primary.main,
    },
    {
      title: "Total Beds",
      value: summary.totalBeds || 0,
      icon: <BedDouble size={20} />,
      color: theme.palette.info.main,
    },
    {
      title: "Available Beds",
      value: summary.availableBeds || 0,
      icon: <Bed size={20} />,
      color: theme.palette.success.main,
    },
    {
      title: "Occupied Beds",
      value: summary.occupiedBeds || 0,
      icon: <UserCheck size={20} />,
      color: theme.palette.warning.main,
    },
    {
      title: "Occupancy Rate",
      value: summary.occupancyPercentage || "0%",
      icon: <Activity size={20} />,
      color: theme.palette.error.main,
    },
  ];

  const item = items[index];

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box>
        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.secondary }}
        >
          {item.title}
        </Typography>

        <Typography variant="h5" fontWeight={700} mt={0.5}>
          {item.value}
        </Typography>
      </Box>

      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `${item.color}15`,
          color: item.color,
        }}
      >
        {item.icon}
      </Box>
    </Box>
  );
};

export default Reports;
