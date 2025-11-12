import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Paper, Typography, Grid, CircularProgress } from "@mui/material";
// import { useLazyGetAccountPlatformStatsQuery } from "../redux/api/account-platform.api";
// import PageHeading from "../components/PageHeading";

import DashboardStatisticsCards from "../components/back-office/dashboard/DashboardStatisticsCards";
import FormSubmissionsPieChart from "../components/back-office/dashboard/FormSubmissionsPieChart";
import DashboardRecentActivity from "../components/back-office/dashboard/DashboardRecentActivity";
import DashboardColumnChart from "../components/back-office/dashboard/DashboardColumnChart";
import StatsRefreshButton from "../components/back-office/dashboard/StatsRefreshButton";
import DownloadReport from "../components/back-office/dashboard/DownloadReport";
import PageHeading from "../components/back-office/layout/PageHeading";
import type { Stats } from "../types/stats";


const stats: Stats = { // TODO: replace with actual stats
    forms: [],
    formSubmissions: [],
    features: [],
  };

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);



  // const [getAccountPlatformStats, { data: accountPlatformStats, isError, isLoading, isFetching }] =
  //   useLazyGetAccountPlatformStatsQuery();

  // const fetchAccountPlatformStats = async () => {
  //   setIsRefreshing(true);
  //   try {
  //     await getAccountPlatformStats(accountId);
  //   } catch (error) {
  //     // If there's an error fetching account stats, redirect to 404
  //     navigate("not-found");
  //   }
  // };

  useEffect(() => {
    if (isRefreshing) {
      setTimeout(() => {
        setIsRefreshing(false);
      }, 400);
    }
  }, [isRefreshing]);

  useEffect(() => {
    if (isDownloading) {
      setTimeout(() => {
        setIsDownloading(false);
      }, 400);
    }
  }, [isDownloading]);

  // useEffect(() => {
  //   fetchAccountPlatformStats();
  // }, []);

  // if (isLoading || isFetching) {
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         minHeight: "80vh",
  //       }}
  //     >
  //       <CircularProgress size={60} />
  //     </Box>
  //   );
  // }

  return (
    <Box sx={{ position: "relative" }}>
      <Stack spacing={4}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
          <PageHeading headingText="דשבורד" />
          <StatsRefreshButton isRefreshing={isRefreshing} 
          // onRefresh={fetchAccountPlatformStats} 
          onRefresh={() => {
            console.log("Refreshing stats");
          }}
          />
          <DownloadReport
            isDownloading={isDownloading}
            // onDownload={fetchAccountPlatformStats}
            onDownload={() => {
              console.log("Downloading report");
            }}
          />
        </Stack>

        <DashboardStatisticsCards 
        stats={stats}
         />

        {/* Chart Section */}
        <DashboardColumnChart 
        stats={stats}
         />

        {/* Pie Chart and Recent Activity Grid */}
        <Grid container spacing={3}>
          {/* Pie Chart Section */} 
          <Grid size={{ xs: 12, md: 7.5 }}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                borderRadius: 1,
                height: "100%",
              }}
            >
              <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
                חלוקת הגשות לפי טופס
              </Typography>
              <FormSubmissionsPieChart 
              stats={stats}
              />
            </Paper>
          </Grid>

          {/* Recent Activity Section */}
          <Grid size={{ xs: 12, md: 4.5 }}>
            <DashboardRecentActivity 
            stats={stats}
             />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default DashboardPage;
