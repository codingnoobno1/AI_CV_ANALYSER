// src/app/components/BiasAnalysis.jsx
import React from 'react';
import { Typography, Paper } from '@mui/material';

const BiasAnalysis = () => {
  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Typography variant="h6">Bias Detection Summary</Typography>
      <Typography variant="body1">No significant bias detected in recent interviews.</Typography>
    </Paper>
  );
};

export default BiasAnalysis;
