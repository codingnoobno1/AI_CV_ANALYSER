// src/app/bias-report/page.jsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import BiasAnalysis from '@/components/BiasAnalysis';

const BiasReport = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Bias Detection and Analysis Report
      </Typography>
      <BiasAnalysis />
    </Container>
  );
};

export default BiasReport;
