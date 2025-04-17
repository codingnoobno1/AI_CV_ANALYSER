'use client';
import React from 'react';
import { Container, Grid, Paper, Typography, AppBar, Toolbar, Button } from '@mui/material';
import Link from 'next/link'; // Import Link for navigation

import CandidateTable from '../components/CandidateTable'; // Candidate list component
import RealTimeFeedback from '../components/RealTimeFeedback'; // Real-time feedback component

const Dashboard = () => {
  return (
    <Container>
      {/* Navbar Section */}
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} href="/bias-report">
            Bias Report
          </Button>
          <Button color="inherit" component={Link} href="/interview">
            Interview
          </Button>
          <Button color="inherit" component={Link} href="/verify-candidate">
            Verify Candidate
          </Button>
        </Toolbar>
      </AppBar>

      {/* Dashboard Content */}
      <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
        HR Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Candidate Table Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <CandidateTable />
          </Paper>
        </Grid>
        {/* Real-Time Feedback Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <RealTimeFeedback />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
