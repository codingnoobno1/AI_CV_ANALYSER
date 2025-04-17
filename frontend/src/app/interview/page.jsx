'use client';
import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import InterviewSchedule from '../components/InterviewSchedule'; // Interview schedule component

const Interview = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Live Interview Scheduling
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <InterviewSchedule />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Interview;
